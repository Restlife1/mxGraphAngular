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

    const graph = new mx.mxGraph(this.graphContainer.nativeElement);
    const toolbar = new mx.mxToolbar(this.toolbarVer.nativeElement);

    try {
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

      //const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      //const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);

      //graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      graph.getModel().endUpdate();
      new mx.mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }

  }

}
