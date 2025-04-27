import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMarkListComponent } from './teacher-mark-list.component';

describe('TeacherMarkListComponent', () => {
  let component: TeacherMarkListComponent;
  let fixture: ComponentFixture<TeacherMarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherMarkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherMarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
