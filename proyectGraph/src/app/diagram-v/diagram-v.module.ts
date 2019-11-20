import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiagramVComponent } from './diagram-v.component';
import { GraphComponent } from '../graph/graph.component';



@NgModule({
  declarations: [DiagramVComponent, GraphComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{

      path: '',
      component: DiagramVComponent

    }])
  ]
})
export class DiagramVModule { }
