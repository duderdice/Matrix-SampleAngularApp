import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import * as Constants from '../constants/constants';
import * as moment from 'moment';
import { PaymentTrxRequest } from '../models/paymentTrxRequest';
import { PaymentTrxResponse } from '../models/paymentTrxResponse';

import { ApiService, REQUEST_TYPE_GET, REQUEST_TYPE_POST, REQUEST_TYPE_PUT, REQUEST_TYPE_DELETE } from '../services/api.service';
import { LoggingService, LogLevels } from '../services/logging.service';
import { AppStateActions } from '../actionHandlers/appState.actions';
import { NotificationActions } from './notification.actions';
import { LOAD_USER_PROFILE, UPDATE_ALIGNED_CUSTOMERS, CLEAR_USER_ROLE_MASK } from '../stores/user.store';
import { UPDATE_PAYMENT_TRX, CLEAR_PAYMENT_TRX } from '../stores/payment.store';

@Injectable()
export class UserActions {
    private RESPONSE_MESSAGE_TYPE = Constants.RESPONSE_MESSAGE_TYPE;
    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _loggingService: LoggingService,
        private _notificationActions: NotificationActions,
        private _appStateActions: AppStateActions,
        private _router: Router
    ) { }

    public userLogin(qlid: string): void {
        this._api.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${Constants.ApiBaseUrl}/users/login`,
            body: qlid
        }).subscribe(
            user => {
                // const userRoleMask = this._userHelper.getUserRoleMask(user);
                // let redirectNeeded = this._quoteHelper.isQuoteReloadNeeded();
                // this._store.dispatch({ type: UPDATE_USER_ROLE_MASK, payload: userRoleMask })
                this._appStateActions.updateState({ 'global.isUserSessionActive': true });
                // this.setCurrentCustomerProfile(user.defaultCustomer);
                // this._masterDataActions.refreshMasterDataSetsAfterLoginProfile();
                this._store.dispatch(
                    {
                        type: LOAD_USER_PROFILE,
                        payload: user
                    }
                );
                this._store.dispatch(
                    {
                        type: UPDATE_ALIGNED_CUSTOMERS,
                        payload: user.alignedCustomers
                    }
                );
                // this._quoteHelper.setQuoteAutoSaveStatus(this._quoteHelper.getActiveQuote());

                // if (redirectNeeded) {
                //     this._router.navigate(['/dashboard']);
                // }
            },
            err => {
                this._notificationActions.notifyError({ title: 'User Login', message: `${err.status} - ${err.statusText}` });
            }
            );
    }

    public userLogout(qlid: string): void {
        // first close any open quotes
        // this.closeQuote();

        this._api.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${Constants.ApiBaseUrl}/users/logout`,
            body: qlid
        }).subscribe(
            () => {
                this._appStateActions.updateState({ 'global.isUserSessionActive': false });
                this._appStateActions.updateState({ 'quote.paramsId': null });
                this._store.dispatch({ type: CLEAR_USER_ROLE_MASK })
                this._notificationActions.notifySuccess({ title: 'User Logout', message: `User ${qlid} successfully logged out.` });
            },
            err => {
                // in case of error, assume user session is no longer valid
                this._appStateActions.updateState({ 'global.isUserSessionActive': false });
                this._notificationActions.notifyError({ title: 'User Logout', message: `${err}` });
            }
            );
    }

    public getUserProfile(): void {
        this._api.callApiService({
            requestType: REQUEST_TYPE_GET,
            url: `${Constants.ApiBaseUrl}/users/current/profile`,
        }).subscribe(
            user => {
                // const userRoleMask = this._userHelper.getUserRoleMask(user);
                // this._store.dispatch({ type: UPDATE_USER_ROLE_MASK, payload: userRoleMask })
                // this.setCurrentCustomerProfile(user.defaultCustomer);
                // this._masterDataActions.refreshMasterDataSetsAfterLoginProfile();
                this._store.dispatch(
                    {
                        type: LOAD_USER_PROFILE,
                        payload: user
                    }
                );
                this._store.dispatch(
                    {
                        type: UPDATE_ALIGNED_CUSTOMERS,
                        payload: user.alignedCustomers
                    }
                );

            },
            err => {
                this._notificationActions.notifyError({ title: 'User Profile', message: `${err.status} - ${err.statusText}` });
            }
            );
    }

    public processPaymentTrx(paymentTrxRequest: PaymentTrxRequest): void {
        const paymentTrxResponse = this.submitPaymentTrxMock(paymentTrxRequest);
        if (paymentTrxResponse.isSuccessful) {
            this._notificationActions.notifySuccess({ title: 'Payment-Trx', message: `Payment transaction successful - confirmation code ${paymentTrxResponse.confirmationCode}` });
            this._appStateActions.updateState({ 'isPaymentTransactionModalShown': false });
        } else {
            this._notificationActions.notifyWarning({
                title: 'Payment-Trx', message: `Payment transaction failed:  [${paymentTrxResponse.errorCode}] ${paymentTrxResponse.errorMessage}`
            });
        }
        this._store.dispatch({ type: UPDATE_PAYMENT_TRX, payload: paymentTrxResponse });
    }

    //------------------------------------------------------------------------------------------------
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
        let random = Math.random();
        return (random > 0.5) ? goodPaymentTrxResponse : badPaymentTrxResponse;
    }
}
