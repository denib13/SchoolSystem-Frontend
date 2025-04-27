import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTeacherListComponent } from './school-teacher-list.component';

describe('SchoolTeacherListComponent', () => {
  let component: SchoolTeacherListComponent;
  let fixture: ComponentFixture<SchoolTeacherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolTeacherListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolTeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
