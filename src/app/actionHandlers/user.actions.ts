import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as Constants from '../constants/constants';
import { PaymentTrxRequest } from '../models/paymentTrxRequest';
import { PaymentTrxResponse } from '../models/paymentTrxResponse';
import { ApiService, REQUEST_TYPE_DELETE, REQUEST_TYPE_GET, REQUEST_TYPE_POST, REQUEST_TYPE_PUT } from '../services/api.service';
import { CLEAR_PAYMENT_TRX, UPDATE_PAYMENT_TRX } from '../stores/payment.store';
import { NotificationActions } from './notification.actions';

@Injectable()
export class UserActions {
    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _notificationActions: NotificationActions
    ) { }

    public processPaymentTrx(paymentTrxRequest: PaymentTrxRequest): void {
        const processPaymentReq = new HttpRequest(REQUEST_TYPE_POST, `${Constants.ApiBaseUrl}/submitPaymentTrx`, paymentTrxRequest);
        this._api.callApiService<PaymentTrxResponse>(processPaymentReq)
            .subscribe(
                (response) => {
                    if (response.isSuccessful) {
                        this._store.dispatch({ type: UPDATE_PAYMENT_TRX, payload: response });
                        this._notificationActions.notifySuccess({
                            title: 'Payment-Trx', message: `Payment transaction successful - confirmation code ${response.confirmationCode}`
                        });
                    } else {
                        this._store.dispatch({ type: UPDATE_PAYMENT_TRX, payload: [] });
                        this._notificationActions.notifyWarning({
                            title: 'Payment-Trx', message: `Payment transaction failed:  [${response.errorCode}] ${response.errorMessage}`
                        });
                    }
                },
                (err) => {
                    this._store.dispatch({ type: UPDATE_PAYMENT_TRX, payload: [] });
                    this._notificationActions.notifyError({ title: 'Error loading payment', message: JSON.stringify(err) });
                }
            );
    }

}
