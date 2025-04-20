import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAddStudentsComponent } from './school-add-students.component';

describe('SchoolAddStudentsComponent', () => {
  let component: SchoolAddStudentsComponent;
  let fixture: ComponentFixture<SchoolAddStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAddStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolAddStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
