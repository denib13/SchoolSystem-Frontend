import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildrenListComponent } from './parent-children-list.component';

describe('ParentChildrenListComponent', () => {
  let component: ParentChildrenListComponent;
  let fixture: ComponentFixture<ParentChildrenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentChildrenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentChildrenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
