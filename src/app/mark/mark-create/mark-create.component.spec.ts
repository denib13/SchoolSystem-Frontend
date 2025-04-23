import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkCreateComponent } from './mark-create.component';

describe('MarkCreateComponent', () => {
  let component: MarkCreateComponent;
  let fixture: ComponentFixture<MarkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
