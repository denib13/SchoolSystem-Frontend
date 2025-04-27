import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRemarkListComponent } from './teacher-remark-list.component';

describe('TeacherRemarkListComponent', () => {
  let component: TeacherRemarkListComponent;
  let fixture: ComponentFixture<TeacherRemarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRemarkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherRemarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
