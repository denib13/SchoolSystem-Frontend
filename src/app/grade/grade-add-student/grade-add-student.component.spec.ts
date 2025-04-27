import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAddStudentComponent } from './grade-add-student.component';

describe('GradeAddStudentComponent', () => {
  let component: GradeAddStudentComponent;
  let fixture: ComponentFixture<GradeAddStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeAddStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradeAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
