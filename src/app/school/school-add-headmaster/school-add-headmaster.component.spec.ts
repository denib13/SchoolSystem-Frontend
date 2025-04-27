import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAddHeadmasterComponent } from './school-add-headmaster.component';

describe('SchoolAddHeadmasterComponent', () => {
  let component: SchoolAddHeadmasterComponent;
  let fixture: ComponentFixture<SchoolAddHeadmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAddHeadmasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolAddHeadmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
