import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarkListComponent } from './student-mark-list.component';

describe('StudentMarkListComponent', () => {
  let component: StudentMarkListComponent;
  let fixture: ComponentFixture<StudentMarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMarkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentMarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
