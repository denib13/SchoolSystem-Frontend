import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkUpdateComponent } from './remark-update.component';

describe('RemarkUpdateComponent', () => {
  let component: RemarkUpdateComponent;
  let fixture: ComponentFixture<RemarkUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemarkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
