import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAddTeachersComponent } from './school-add-teachers.component';

describe('SchoolAddTeachersComponent', () => {
  let component: SchoolAddTeachersComponent;
  let fixture: ComponentFixture<SchoolAddTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAddTeachersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolAddTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
