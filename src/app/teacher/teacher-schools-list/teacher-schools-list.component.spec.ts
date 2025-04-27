import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSchoolsListComponent } from './teacher-schools-list.component';

describe('TeacherSchoolsListComponent', () => {
  let component: TeacherSchoolsListComponent;
  let fixture: ComponentFixture<TeacherSchoolsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSchoolsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherSchoolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
