import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubjectListComponent } from './teacher-subject-list.component';

describe('TeacherSubjectListComponent', () => {
  let component: TeacherSubjectListComponent;
  let fixture: ComponentFixture<TeacherSubjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSubjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
