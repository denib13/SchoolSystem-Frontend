import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentParentListComponent } from './student-parent-list.component';

describe('StudentParentListComponent', () => {
  let component: StudentParentListComponent;
  let fixture: ComponentFixture<StudentParentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentParentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentParentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
