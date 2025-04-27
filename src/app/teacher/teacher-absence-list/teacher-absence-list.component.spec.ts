import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAbsenceListComponent } from './teacher-absence-list.component';

describe('TeacherAbsenceListComponent', () => {
  let component: TeacherAbsenceListComponent;
  let fixture: ComponentFixture<TeacherAbsenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAbsenceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherAbsenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
