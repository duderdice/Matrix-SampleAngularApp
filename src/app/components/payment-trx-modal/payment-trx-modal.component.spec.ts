import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTrxModalComponent } from './payment-trx-modal.component';

describe('PaymentTrxModalComponent', () => {
  let component: PaymentTrxModalComponent;
  let fixture: ComponentFixture<PaymentTrxModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTrxModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTrxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
