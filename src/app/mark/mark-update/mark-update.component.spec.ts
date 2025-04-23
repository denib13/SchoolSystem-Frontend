import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkUpdateComponent } from './mark-update.component';

describe('MarkUpdateComponent', () => {
  let component: MarkUpdateComponent;
  let fixture: ComponentFixture<MarkUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
