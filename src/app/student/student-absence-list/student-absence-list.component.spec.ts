import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAbsenceListComponent } from './student-absence-list.component';

describe('StudentAbsenceListComponent', () => {
  let component: StudentAbsenceListComponent;
  let fixture: ComponentFixture<StudentAbsenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAbsenceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAbsenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
