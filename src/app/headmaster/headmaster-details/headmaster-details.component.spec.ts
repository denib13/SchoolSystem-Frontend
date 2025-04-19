import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmasterDetailsComponent } from './headmaster-details.component';

describe('HeadmasterDetailsComponent', () => {
  let component: HeadmasterDetailsComponent;
  let fixture: ComponentFixture<HeadmasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmasterDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
