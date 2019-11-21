import { Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { mxgraph } from 'mxgraph';

declare var require: any;

const mx: typeof mxgraph = require('mxgraph')({
	mxBasePath: 'mxgraph'
});

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements AfterViewInit {

  @ViewChild('graphContainer', {static:false}) graphContainer: ElementRef;
  @ViewChild('toolbar', {static:false}) toolbarVer: ElementRef;

  constructor() { }

  ngAfterViewInit() {

    /*const graph = new mx.mxGraph(this.graphContainer.nativeElement);
    const toolbar = new mx.mxToolbar(this.toolbarVer.nativeElement);*/
	if (!mx.mxClient.isBrowserSupported())
	{
		// Displays an error message if the browser is
		// not supported.
		mx.mxUtils.error('Browser is not supported!', 200, false);
	}
	else
	{
		// Creates the div for the toolbar
		var tbContainer = document.createElement('div');
		tbContainer.id = "tbContainer";
		
		document.body.appendChild(tbContainer);
	
		// Creates new toolbar without event processing
		var toolbar = new mx.mxToolbar(tbContainer);
		toolbar.enabled = false
		
		// Creates the div for the graph
		var container = document.createElement('div');
		container.id = "container";

		document.body.appendChild(container);
		
		// Workaround for Internet Explorer ignoring certain styles
		if (mx.mxClient.IS_QUIRKS)
		{
			document.body.style.overflow = 'hidden';
			new mx.mxDivResizer(tbContainer);
			new mx.mxDivResizer(container);
		}

		// Creates the model and the graph inside the container
		// using the fastest rendering available on the browser
		var model = new mx.mxGraphModel();
		var graph = new mx.mxGraph(container, model);
		graph.dropEnabled = true;
		
		// Matches DnD inside the graph
		mx.mxDragSource.prototype.getDropTarget = function(graph, x, y)
		{
			var cell = graph.getCellAt(x, y);
			
			if (!graph.isValidDropTarget(cell))
			{
				cell = null;
			}
			
			return cell;
		};

		// Enables new connections in the graph
		graph.setConnectable(true);
		graph.setMultigraph(false);

		// Stops editing on enter or escape keypress
		var keyHandler = new mx.mxKeyHandler(graph);
		var rubberband = new mx.mxRubberband(graph);
		
		var addVertex = function(icon, w, h, style)
		{
			var vertex = new mx.mxCell(null, new mx.mxGeometry(0, 0, w, h), style);
			vertex.setVertex(true);
		
			addToolbarItem(graph, toolbar, vertex, icon);
		};

		//var arrow = graph.setBackgroundImage(new mx.mxImage('assets/images/arrow1.png', 90, 15));
		
		//graph.insertVertex('assets/images/square.png', null, 'Hello,', 20, 20, 80, 30);

		addVertex('assets/images/square.png', 120, 60, '');
		addVertex('assets/images/squareIn.png', 20, 20, '');
		addVertex('assets/images/squareOut.png', 20, 20, '');
		addVertex('assets/images/arrow1.png', 90, 15, '');
		/*addVertex('editors/images/rectangle.gif', 100, 40, '');
		addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');*/
	}

	function addToolbarItem(graph, toolbar, prototype, image)
	{
		// Function that is executed when the image is dropped on
		// the graph. The cell argument points to the cell under
		// the mousepointer if there is one.
		var funct = function(graph, evt, cell)
		{
			graph.stopEditing(false);
	
			var pt = graph.getPointForEvent(evt);
			var vertex = graph.getModel().cloneCell(prototype);
			vertex.geometry.x = pt.x;
			vertex.geometry.y = pt.y;
			
			//var style = vertex.graph.getStylesheet().getDefaultParent();
			//style.id = "vertexStyle"
			
			graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
		}
	
		// Creates the image which is used as the drag icon (preview)
		var img = toolbar.addMode(null, image, funct);
		mx.mxUtils.makeDraggable(img, graph, funct);
	}
}


    /*try {
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
	
      var addVertex = function(icon, w, h, style){

					var vertex = new mx.mxCell(null, new mx.mxGeometry(0, 0, w, h), style);
					vertex.setVertex(true);
				
					addToolbarItem(graph, toolbar, vertex, icon);
				};
				
		addVertex('assets/images/square.png', 120, 70, 'shape=swimlane;startSize=30;');
        
        function addToolbarItem(graph, toolbar, prototype, image)
		{
			// Function that is executed when the image is dropped on
			// the graph. The cell argument points to the cell under
			// the mousepointer if there is one.
			var funct = function(graph, evt, cell)
			{
				graph.stopEditing(false);

				var pt = graph.getPointForEvent(evt);
				var vertex = graph.getModel().cloneCell(prototype);
				vertex.geometry.x = pt.x;
				vertex.geometry.y = pt.y;
				
				graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
			}

			// Creates the image which is used as the drag icon (preview)
			var img = toolbar.addMode(null, image, funct);
			mx.mxUtils.makeDraggable(img, graph, funct);
		}
				graph.dropEnabled = true;
		mx.mxDragSource.prototype.getDropTarget = function(graph, x, y)
				{
					var cell = graph.getCellAt(x, y);
					
					if (!graph.isValidDropTarget(cell))
					{
						cell = null;
					}
					
					return cell;
				};

				
				graph.setConnectable(true);
				graph.setMultigraph(false);

				var button = mx.mxUtils.button('Create toolbar entry from selection', function(evt)
				{
					if (!graph.isSelectionEmpty())
					{
						// Creates a copy of the selection array to preserve its state
						var cells = graph.getSelectionCells();
						var bounds = graph.getView().getBounds(cells);
						
						// Function that is executed when the image is dropped on
						// the graph. The cell argument points to the cell under
						// the mousepointer if there is one.
						var funct = function(graph, evt, cell)
						{
							graph.stopEditing(false);
			
							var pt = graph.getPointForEvent(evt);
							var dx = pt.x - bounds.x;
							var dy = pt.y - bounds.y;
							
							graph.setSelectionCells(graph.importCells(cells, dx, dy, cell));
						}
			
						// Creates the image which is used as the drag icon (preview)
						var img = toolbar.addMode(null, 'editors/images/outline.gif', funct);
						mx.mxUtils.makeDraggable(img, graph, funct);
					}
				});

      //const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      //const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);

      //graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      graph.getModel().endUpdate();
      new mx.mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
	}*/

  }


