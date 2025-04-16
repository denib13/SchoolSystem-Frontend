import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUpdateComponent } from './school-update.component';

describe('SchoolUpdateComponent', () => {
  let component: SchoolUpdateComponent;
  let fixture: ComponentFixture<SchoolUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
