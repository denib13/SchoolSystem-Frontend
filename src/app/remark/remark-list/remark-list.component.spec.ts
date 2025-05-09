import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkListComponent } from './remark-list.component';

describe('RemarkListComponent', () => {
  let component: RemarkListComponent;
  let fixture: ComponentFixture<RemarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
