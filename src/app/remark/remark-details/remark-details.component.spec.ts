import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkDetailsComponent } from './remark-details.component';

describe('RemarkDetailsComponent', () => {
  let component: RemarkDetailsComponent;
  let fixture: ComponentFixture<RemarkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemarkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
