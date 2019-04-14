import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeHistoryComponent } from './order-type-history.component';

describe('OrderTypeHistoryComponent', () => {
  let component: OrderTypeHistoryComponent;
  let fixture: ComponentFixture<OrderTypeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
