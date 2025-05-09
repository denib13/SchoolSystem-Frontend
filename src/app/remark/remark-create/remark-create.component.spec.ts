import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkCreateComponent } from './remark-create.component';

describe('RemarkCreateComponent', () => {
  let component: RemarkCreateComponent;
  let fixture: ComponentFixture<RemarkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemarkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
