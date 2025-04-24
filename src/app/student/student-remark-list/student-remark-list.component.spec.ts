import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRemarkListComponent } from './student-remark-list.component';

describe('StudentRemarkListComponent', () => {
  let component: StudentRemarkListComponent;
  let fixture: ComponentFixture<StudentRemarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRemarkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentRemarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
