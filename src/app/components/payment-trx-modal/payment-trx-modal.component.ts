import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { NotificationActions } from '../../actionHandlers/notification.actions';
import { UserActions } from '../../actionHandlers/user.actions';
import { PaymentTrxRequest } from '../../models/paymentTrxRequest';
import { PaymentTrxResponse } from '../../models/paymentTrxResponse';

@Component({
  selector: 'app-payment-trx-modal',
  // templateUrl: './payment-trx-modal.component.html',
  template: `
    <div class="overlay">
      <div class="paymentTrxPanel">
        <div class="closeIcon" (click)="closeModal()">
          <i class="fa fa-window-close-o" aria-hidden="true"></i>
        </div>
        <div class="paymentTrxFields">
          <div class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Name </label>
            <input class="paymentTrxInputField" type="text" size="30" [(ngModel)]="name" />
          </div>
          <div class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Card # </label>
            <input class="paymentTrxInputField" type="text" size="30" [(ngModel)]="cardNumber" />
          </div>
          <div class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Exp Month </label>
            <input class="paymentTrxInputField" type="text" size="5" [(ngModel)]="expMonth" />
            <span class="spacer">&nbsp;</span>
            <label class="paymentTrxInputLabel">Exp Year </label>
            <input class="paymentTrxInputField" type="text" size="5" [(ngModel)]="expYear" />
          </div>
          <div class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Security Code </label>
            <input class="paymentTrxInputField" type="text" width="5" [(ngModel)]="securityCode" />
          </div>
          <div class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Amount: </label>
            <span class="spacer">&nbsp;</span>
            <span class="paymentTrxInputLabel">{{ paymentAmount | currency : 'USD' : true }}</span>
          </div>
          <div *ngIf="!paymentTrxResponse || !paymentTrxResponse?.isSuccessful" class="paymentTrxInputGroup center">
            <button type="button" (click)="placeOrder()">Place Order</button>
          </div>
          <div *ngIf="paymentTrxResponse && paymentTrxResponse.isSuccessful" class="paymentTrxInputGroup">
            <span class="spacer">&nbsp;</span>
          </div>
          <div *ngIf="paymentTrxResponse && paymentTrxResponse.isSuccessful" class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Conf Code: {{ paymentTrxResponse?.confirmationCode }}</label>
          </div>
          <div *ngIf="paymentTrxResponse && paymentTrxResponse.isSuccessful" class="paymentTrxInputGroup">
            <label class="paymentTrxInputLabel">Date: {{ paymentTrxResponse?.trxDateTime }}</label>
          </div>
        </div>
      </div>
    </div>
  `,
  // styleUrls: ['./payment-trx-modal.component.css']
  styles: [`
    .overlay {
      z-index: 10;
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0,0,0,.65);
    }
    .paymentTrxPanel {
      background: white;
      margin-top: 20vh;
      margin-left: 20vw;
      height: 60vh;
      width: 60vw;
      border-radius: 25px;
    }
    .paymentTrxFields {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      height: 50%;
      padding-top: 5%;
      width: 40%;
      padding-left: 30%;
    }
    .paymentTrxInputGroup {
      display: flex;
      flex-flow: row nowrap;
    }
    .paymentTrxInputLabel {
      flex: 1;
      font-family: sans-serif;
      font-size: 2em;
      padding-right: 0.25em;
      white-space: nowrap;
    }
    .paymentTrxInputField {
      vertical-align: middle;
      font-family: monospace;
      font-size: 2em;
    }
    .center {
      justify-content: center;
    }
    .spacer {
      flex: 2;
    }
    .closeIcon {
      float: right;
      padding-top: 0.5em;
      padding-right: 0.5em;
      font-size: 2em;
    }
  `],
})
export class PaymentTrxModalComponent implements OnInit, OnDestroy {
  @Input() public paymentAmount: number;
  @Output() public paymentTrxModalClosed = new EventEmitter();

  public name: string;
  public cardNumber: string;
  public expMonth: string;
  public expYear: string;
  public securityCode: string;

  public paymentTrxResponse: PaymentTrxResponse;
  private paymentTrxResponseSubscription;

  constructor(
    private _store: Store<any>,
    private _appStateActions: AppStateActions,
    private _notificationActions: NotificationActions,
    private _userActions: UserActions
  ) { }

  public ngOnInit() {
    this.paymentTrxResponseSubscription = this._store.select('payment').subscribe((ptr: PaymentTrxResponse) => {
      this.paymentTrxResponse = ptr;
      if (this.paymentTrxResponse && this.paymentTrxResponse.isSuccessful) {
        this.name = this.paymentTrxResponse.paymentTrxRequest.name;
        this.cardNumber = this.paymentTrxResponse.paymentTrxRequest.cardNumber;
        this.expMonth = this.paymentTrxResponse.paymentTrxRequest.expMonth;
        this.expYear = this.paymentTrxResponse.paymentTrxRequest.expYear;
        this.securityCode = this.paymentTrxResponse.paymentTrxRequest.securityCode;
      }
    });
  }

  public ngOnDestroy() {
    this.paymentTrxResponseSubscription.unsubscribe();
  }

  public placeOrder() {
    // validate fields
    if (!this.name) {
      this._notificationActions.notifyError({ title: 'Payment-Trx', message: `Please provide a credit card NAME for this payment transaction.` });
      return;
    }
    if (!this.cardNumber) {
      this._notificationActions.notifyError({ title: 'Payment-Trx', message: `Please provide a credit card # for this payment transaction.` });
      return;
    }
    if (!this.expMonth) {
      this._notificationActions.notifyError({ title: 'Payment-Trx', message: `Please provide a credit card Expiration Month for this payment transaction.` });
      return;
    }
    if (!this.expYear) {
      this._notificationActions.notifyError({ title: 'Payment-Trx', message: `Please provide a credit card Expiration Year for this payment transaction.` });
      return;
    }
    if (!this.securityCode) {
      this._notificationActions.notifyError({ title: 'Payment-Trx', message: `Please provide a credit card Security Code for this payment transaction.` });
      return;
    }

    const paymentTrxRequest: PaymentTrxRequest = {
      name: this.name,
      cardNumber: this.cardNumber,
      expMonth: this.expMonth,
      expYear: this.expYear,
      securityCode: this.securityCode,
      paymentAmount: this.paymentAmount,
    }
    this._userActions.processPaymentTrx(paymentTrxRequest);
  }

  public closeModal() {
    // this._appStateActions.updateState({ 'isPaymentTransactionModalShown': false });
    this.paymentTrxModalClosed.emit();
  }

}
