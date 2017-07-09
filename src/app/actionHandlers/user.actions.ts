import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Constants from '../constants/constants';
import * as moment from 'moment';
import { PaymentTrxRequest } from '../models/paymentTrxRequest';
import { PaymentTrxResponse } from '../models/paymentTrxResponse';

import { NotificationActions } from './notification.actions';
import { UPDATE_PAYMENT_TRX, CLEAR_PAYMENT_TRX } from '../stores/payment.store';

@Injectable()
export class UserActions {

    // private RESPONSE_MESSAGE_TYPE = Constants.RESPONSE_MESSAGE_TYPE;

    constructor(
        private _store: Store<any>,
        private _notificationActions: NotificationActions
    ) { }

    public processPaymentTrx(paymentTrxRequest: PaymentTrxRequest): void {
        const paymentTrxResponse = this.submitPaymentTrxMock(paymentTrxRequest);
        if (paymentTrxResponse.isSuccessful) {
            this._notificationActions.notifySuccess({
                title: 'Payment-Trx', message: `Payment transaction successful - confirmation code ${paymentTrxResponse.confirmationCode}`
            });
        } else {
            this._notificationActions.notifyWarning({
                title: 'Payment-Trx', message: `Payment transaction failed:  [${paymentTrxResponse.errorCode}] ${paymentTrxResponse.errorMessage}`
            });
        }
        this._store.dispatch({ type: UPDATE_PAYMENT_TRX, payload: paymentTrxResponse });
    }

    // ------------------------------------------------------------------------------------------------
    // mock services

    private submitPaymentTrxMock(paymentTrxRequest: PaymentTrxRequest): PaymentTrxResponse {
        const goodPaymentTrxResponse: PaymentTrxResponse = {
            id: '12345',
            trxDateTime: moment().format('LLLL'),
            isSuccessful: true,
            trxAmount: paymentTrxRequest.paymentAmount,
            confirmationCode: 'A12345',
            errorCode: '',
            errorMessage: '',
            paymentTrxRequest,
        };
        const badPaymentTrxResponse: PaymentTrxResponse = {
            id: '12345',
            trxDateTime: moment().format('LLLL'),
            isSuccessful: false,
            trxAmount: paymentTrxRequest.paymentAmount,
            confirmationCode: '',
            errorCode: 'Z509',
            errorMessage: 'Insufficient Funds',
            paymentTrxRequest,
        };
        const random = Math.random();
        return (random > 0.5) ? goodPaymentTrxResponse : badPaymentTrxResponse;
    }
}
