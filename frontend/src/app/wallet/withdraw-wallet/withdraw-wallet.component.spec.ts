import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawWalletComponent } from './withdraw-wallet.component';

describe('WithdrawWalletComponent', () => {
  let component: WithdrawWalletComponent;
  let fixture: ComponentFixture<WithdrawWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
