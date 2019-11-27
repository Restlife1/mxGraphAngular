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
  private v1 = 'assets/images/square.png';
  private v2 = 'assets/images/squareIn.png';
  private v3 = 'assets/images/squareOut.png';
  private v4 = 'assets/images/arrow1.png';

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
		
		this.addToolbarItem(this.v1, 1);
		this.addToolbarItem(this.v2, 2);
		this.addToolbarItem(this.v3, 3);
		this.addToolbarItem(this.v4, 4);
		
	}

	
}
private addToolbarItem(image, type)
	{
		// Function that is executed when the image is dropped on
		// the graph. The cell argument points to the cell under
		// the mousepointer if there is one.

		switch(type){

			case 1:
				var functMainSquare = function(graph: mxgraph.mxGraph, evt, cell)
				{
					graph.stopEditing(false);
			
					var pt = graph.getPointForEvent(evt);

					//var doc = mx.mxUtil.createXmlDocument();

					//var xml = mx.mxUtils.createElement();
					
					var v1 = graph.insertVertex(graph.getDefaultParent(), null, "Yep", pt.x, pt.y, 120, 70, '');
					v1.setConnectable(false);		//Poniendolo a true se conectan las cajas mediante las flechas internas

					
				}

				var img = this.toolbar.addMode(null, image, functMainSquare);
		mx.mxUtils.makeDraggable(img, this.graph, functMainSquare);

			break;

			case 2:
				var functGreenSquare = function(graph: mxgraph.mxGraph, evt, cell)
				{
					graph.stopEditing(false);
			
					var pt = graph.getPointForEvent(evt);

					//var doc = mx.mxUtil.createXmlDocument();

					//var xml = mx.mxUtils.createElement();
					
					var v1 = graph.insertVertex(graph.getDefaultParent(), null, "Yep", pt.x, pt.y, 50, 70, '');
					v1.setConnectable(false);		//Poniendolo a true se conectan las cajas mediante las flechas internas

				}

				var img = this.toolbar.addMode(null, image, functGreenSquare);
				mx.mxUtils.makeDraggable(img, this.graph, functGreenSquare);

			break;

			case 3:
				var functRedSquare = function(graph: mxgraph.mxGraph, evt, cell)
				{
					graph.stopEditing(false);
			
					var pt = graph.getPointForEvent(evt);

					//var doc = mx.mxUtil.createXmlDocument();

					//var xml = mx.mxUtils.createElement();
					
					var v1 = graph.insertVertex(graph.getDefaultParent(), null, "Yep", pt.x, pt.y, 30, 30, '');
					v1.setConnectable(false);		//Poniendolo a true se conectan las cajas mediante las flechas internas

				}

				var img = this.toolbar.addMode(null, image, functRedSquare);
				mx.mxUtils.makeDraggable(img, this.graph, functRedSquare);

			break;

			case 4:
				var functArrow = function(graph: mxgraph.mxGraph, evt, cell)
				{
					graph.stopEditing(false);
			
					var pt = graph.getPointForEvent(evt);

					//var doc = mx.mxUtil.createXmlDocument();

					//var xml = mx.mxUtils.createElement();
					
					var v1 = graph.insertVertex(graph.getDefaultParent(), null, "Yep", pt.x, pt.y, 70, 10, '');
					v1.setConnectable(false);		//Poniendolo a true se conectan las cajas mediante las flechas internas

				}

				var img = this.toolbar.addMode(null, image, functArrow);
				mx.mxUtils.makeDraggable(img, this.graph, functArrow);

			break;

		}

		/*var functMainSquare = function(graph: mxgraph.mxGraph, evt, cell)
		{
			graph.stopEditing(false);
	
			var pt = graph.getPointForEvent(evt);

			//var doc = mx.mxUtil.createXmlDocument();

			//var xml = mx.mxUtils.createElement();
			
			var v1 = graph.insertVertex(graph.getDefaultParent(), null, "Yep", pt.x, pt.y, 120, 70, '');
			v1.setConnectable(false);		//Poniendolo a true se conectan las cajas mediante las flechas internas*/

			/*var v2 = graph.insertVertex(graph.getDefaultParent(), null, "Duh", pt.x, pt.y, 50, 50);
			v2.setConnectable(false);*/

		}
	
		// Creates the image which is used as the drag icon (preview)
		/*var img = this.toolbar.addMode(null, image, functMainSquare);
		mx.mxUtils.makeDraggable(img, this.graph, functMainSquare);*/
	}


