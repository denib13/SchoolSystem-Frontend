import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeStudentsListComponent } from './grade-students-list.component';

describe('GradeStudentsListComponent', () => {
  let component: GradeStudentsListComponent;
  let fixture: ComponentFixture<GradeStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeStudentsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradeStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
