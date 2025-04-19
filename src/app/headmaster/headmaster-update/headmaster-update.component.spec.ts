import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmasterUpdateComponent } from './headmaster-update.component';

describe('HeadmasterUpdateComponent', () => {
  let component: HeadmasterUpdateComponent;
  let fixture: ComponentFixture<HeadmasterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmasterUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmasterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
