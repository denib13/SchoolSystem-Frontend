import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddParentComponent } from './student-add-parent.component';

describe('StudentAddParentComponent', () => {
  let component: StudentAddParentComponent;
  let fixture: ComponentFixture<StudentAddParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAddParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
