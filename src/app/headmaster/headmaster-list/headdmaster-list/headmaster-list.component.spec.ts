import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmasterListComponent } from './headmaster-list.component';

describe('HeaddmasterListComponent', () => {
  let component: HeadmasterListComponent;
  let fixture: ComponentFixture<HeadmasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmasterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
