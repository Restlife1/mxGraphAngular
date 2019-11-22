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
  
  private graph: mxgraph.mxGraph;
  private toolbar: mxgraph.mxToolbar;

  constructor() { }

  ngAfterViewInit() {

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
		this.toolbar = new mx.mxToolbar(tbContainer);
		this.toolbar.enabled = false
		
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
		this.graph = new mx.mxGraph(container, model);
		this.graph.dropEnabled = true;
		
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
		this.graph.setConnectable(true);
		this.graph.setMultigraph(false);

		// Stops editing on enter or escape keypress
		var keyHandler = new mx.mxKeyHandler(this.graph);
		var rubberband = new mx.mxRubberband(this.graph);
		
		/*var addVertex = function(icon, w, h, style)
		{
			var vertex = new mx.mxCell(null, new mx.mxGeometry(0, 0, w, h), style);
			vertex.setVertex(true);
		
			addToolbarItem(graph, toolbar, vertex, icon);
		};*/

		//var arrow = graph.setBackgroundImage(new mx.mxImage('assets/images/arrow1.png', 90, 15));
		/*var layout = new mx.mxRadialTreeLayout(this.graph);
		var parent = this.graph.getDefaultParent();
		var vertex = this.graph.insertVertex(parent, null, 'Funca', 20, 20, 80, 30, '');
		this.graph.insertEdge(parent, null, '', vertex);*/
		
		this.addToolbarItem('assets/images/square.png');
		this.addToolbarItem('assets/images/squareIn.png');
		this.addToolbarItem('assets/images/squareOut.png');
		this.addToolbarItem('assets/images/arrow1.png');
		
	}

	
}
private addToolbarItem(image)
	{
		// Function that is executed when the image is dropped on
		// the graph. The cell argument points to the cell under
		// the mousepointer if there is one.
		var funct = function(graph, evt, cell)
		{
			graph.stopEditing(false);
	
			var pt = graph.getPointForEvent(evt);
			
			//var style = vertex.graph.getStylesheet().getDefaultParent();
			//style.id = "vertexStyle"
			
			graph.setSelectionCells(graph.importCells([pt], 0, 0, cell));
		}
	
		// Creates the image which is used as the drag icon (preview)
		var img = this.toolbar.addMode(null, image, funct);
		mx.mxUtils.makeDraggable(img, this.graph, funct);
	}

}


