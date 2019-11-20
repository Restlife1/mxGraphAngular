import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramVComponent } from './diagram-v.component';

describe('DiagramVComponent', () => {
  let component: DiagramVComponent;
  let fixture: ComponentFixture<DiagramVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
