import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
// import { Cookie } from 'ng2-cookies';
import * as Constants from '../constants/constants';

import { ApiService, REQUEST_TYPE_GET, REQUEST_TYPE_POST, REQUEST_TYPE_PUT, REQUEST_TYPE_DELETE } from '../services/api.service';
import { LoggingService, LogLevels } from '../services/logging.service';
import {
    LOAD_USER_PROFILE,
    SET_DELEGATE,
    UPDATE_ALIGNED_CUSTOMERS,
    UPDATE_DEFAULT_CUSTOMER,
    UPDATE_MY_CUSTOMER_SEARCH_RESULTS,
    UPDATE_ALL_CUSTOMER_SEARCH_RESULTS,
    CLEAR_MY_CUSTOMER_RESULTS,
    CLEAR_ALL_CUSTOMER_RESULTS,
    UPDATE_USER_SEARCH_RESULTS,
    CLEAR_USER_SEARCH_RESULTS,
    UPDATE_USER_ROLE_MASK,
    CLEAR_USER_ROLE_MASK
} from '../stores/user.store';
import { AppStateActions } from '../actionHandlers/appState.actions';
// import { Customer } from '../models/customer';
// import { CustomerSearchObject } from '../models/customerSearchObject';
// import { MasterDataActions } from './masterDataActions';
import { NotificationActions } from './notification.actions';
// import { QuoteHelper } from '../helpers/quoteHelper';
// import { QuoteActions } from '../actionCreators/quoteActions';
// import { UserHelper } from '../helpers/userHelper';
// import { UserSearchObject } from '../models/userSearchObject';
// import { UserSearchResult } from '../models/userSearchResult';

@Injectable()
export class UserActions {
    // private customerSearchObject: CustomerSearchObject;
    private RESPONSE_MESSAGE_TYPE = Constants.RESPONSE_MESSAGE_TYPE;
    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _loggingService: LoggingService,
        // private _masterDataActions: MasterDataActions,
        private _notificationActions: NotificationActions,
        private _appStateActions: AppStateActions,
        // private _quoteHelper: QuoteHelper,
        // private _quoteActions: QuoteActions,
        // private _userHelper: UserHelper,
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

    // // synchronous close quote operation
    // private async closeQuote() {
    //     try {
    //         let quote = this._quoteHelper.getActiveQuote();
    //         if (quote) {
    //             await this._quoteActions.closeQuote({ quoteNumber: quote.quoteSummaryResponse.quoteNumber });
    //         }
    //     }
    //     catch (err) {
    //         // console.log('Error: ', err.message);
    //     }
    // }

    public changeUserLogin(newQlid: string): void {
        // first close any open quotes
        // this.closeQuote();

        this._api.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${Constants.ApiBaseUrl}/users/current/changelogin`,
            body: newQlid
        }).subscribe(
            user => {
                // const userRoleMask = this._userHelper.getUserRoleMask(user);
                // this._store.dispatch({ type: UPDATE_USER_ROLE_MASK, payload: userRoleMask })
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
                // this._quoteActions.clearPreviousQuoteData();
                // this.setCurrentCustomerProfile(user.defaultCustomer)
                // this._masterDataActions.refreshMasterDataSetsAfterLoginProfile();
                // this._quoteHelper.setQuoteAutoSaveStatus(this._quoteHelper.getActiveQuote());
                this._router.navigate(['/']);
            },
            err => {
                this._notificationActions.notifyError({ title: 'User Change Login', message: `${err.status} - ${err.statusText}` });
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

    public getDelegate() {
        this._api.callApiService({
            requestType: REQUEST_TYPE_GET,
            url: `${Constants.ApiBaseUrl}/users/current/delegation`,
        }).subscribe(
            delegate => {
                this._store.dispatch(
                    {
                        type: SET_DELEGATE,
                        payload: delegate
                    }
                );
            },
            err => {
                this._notificationActions.notifyError({ title: 'Get Delegate', message: `${err.status} - ${err.statusText}` });
            }
            );
    }

    public addDelegate(params): void {
        this._api.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${Constants.ApiBaseUrl}/users/current/delegation`,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(params),
        }).subscribe(
            res => {
                if (res) {
                    res.forEach(res => {
                        if (res.messageType === this.RESPONSE_MESSAGE_TYPE.SUCCESS) {
                            this._notificationActions.notifyInfo({ title: 'Add Delegate', message: `${res.messageType} - ${res.message}` });
                        } else {
                            this._notificationActions.notifyError({ title: 'Add Delegate', message: `${res.messageType} - ${res.message}` });
                        }
                    });
                }
                this.getDelegate();
            },
            err => {
                this._notificationActions.notifyError({ title: 'Add Delegate', message: `${err.status} - ${err.statusText}` });
            }
            );
    }

    // public setCurrentCustomerProfile(customerProfile): void {
    //     this._store.dispatch(
    //         {
    //             type: SET_CURRENT_CUSTOMER_PROFILE,
    //             payload: customerProfile
    //         }
    //     );
    // }

    public removeDelegate(): void {
        this._api.callApiService({
            requestType: REQUEST_TYPE_DELETE,
            url: `${Constants.ApiBaseUrl}/users/current/delegation`,
        }).subscribe(
            res => {
                this.getDelegate();
            },
            err => {
                this._notificationActions.notifyError({ title: 'Remove Delegate', message: `${err.status} - ${err.statusText}` });
            }
            );
    }

    public updateAlignedCustomers({ params }): void {
        this._api.callApiService({
            requestType: REQUEST_TYPE_PUT,
            url: `${Constants.ApiBaseUrl}/users/current/customers`,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(params.customerGID),
        }).subscribe(
            user => {
                this._notificationActions.notifySuccess({ title: 'Link Customer', message: `Successfully linked customer.` });
                this._store.dispatch(
                    {
                        type: UPDATE_ALIGNED_CUSTOMERS,
                        payload: user.alignedCustomers,
                    }
                );
            },
            err => {
                let formattedErr = err.json();
                if (formattedErr && formattedErr.length) {
                    formattedErr.forEach(err => {
                        this._notificationActions.notifyError({ title: 'Update-Aligned-Customers', message: `${err.messageType} - ${err.message}` });
                    });
                    this.getUserProfile();
                } else {
                    this._notificationActions.notifyError({ title: 'Update-Aligned-Customers', message: `${err.status} - ${err.statusText}` });
                }
            }
            );
    }

    // public searchUsers(params: UserSearchObject, clearResults: boolean): void {
    //     this._api.callApiService({
    //         requestType: REQUEST_TYPE_POST,
    //         url: `${Constants.ApiBaseUrl}/users/search`,
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //         body: JSON.stringify(params),
    //     }).subscribe(
    //         (users: UserSearchResult) => {
    //             if (clearResults || users && users.resultList && users.resultList.fullListSize === 0) {
    //                 this.clearUserSearch();
    //             }
    //             this._store.dispatch(
    //                 {
    //                     type: UPDATE_USER_SEARCH_RESULTS,
    //                     payload: users
    //                 }
    //             );
    //         },
    //         err => {
    //             this.clearUserSearch();
    //             this._notificationActions.notifyError({ title: 'Search Users', message: `${err.status} - ${err.statusText}` });
    //         }
    //         );
    // }

    public clearUserSearch() {
        this._store.dispatch(
            {
                type: CLEAR_USER_SEARCH_RESULTS
            }
        );
    }

    // public removeAlignedCustomers({ params }) {
    //     this._api.callApiService({
    //         requestType: REQUEST_TYPE_DELETE,
    //         url: `${Constants.ApiBaseUrl}/users/current/customers`,
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //         body: JSON.stringify(params.customerGID),
    //     }).subscribe(
    //         user => {
    //             this._store.dispatch(
    //                 {
    //                     type: UPDATE_ALIGNED_CUSTOMERS,
    //                     payload: user.alignedCustomers
    //                 }
    //             );
    //             this._notificationActions.notifySuccess({ title: 'Unlink-Aligned-Customers', message: `Aligned customer(s) successfully unlinked.` });
    //         },
    //         err => {
    //             let
    //                 parsed = JSON.parse(err._body),
    //                 errMsg = parsed[0].message;

    //             this._notificationActions.notifyError({ title: 'Unlink-Aligned-Customers', message: `${err.status} - ${errMsg}` });
    //         }
    //         );
    // }

    // public updateDefaultCustomers({ params }): void {
    //     this._api.callApiService({
    //         requestType: REQUEST_TYPE_PUT,
    //         url: `${Constants.ApiBaseUrl}/users/current/customers/default`,
    //         headers: new Headers({ 'Content-Type': 'text/plain' }),
    //         body: params.customerGID,
    //     }).subscribe(
    //         defaultCustomers => {
    //             this._store.dispatch(
    //                 {
    //                     type: UPDATE_DEFAULT_CUSTOMER,
    //                     payload: defaultCustomers
    //                 }
    //             );
    //             this.getUserProfile();
    //         },
    //         err => {
    //             let message: string;
    //             if (err && err.json() && err.json()[0].message) {
    //                 message = err.json()[0].message
    //             } else {
    //                 message = `${err.status} - ${err.statusText}`;
    //             }
    //             this._notificationActions.notifyError({ title: '', message: message });
    //             //                this._notificationActions.notifyError({ title: 'Update-Default-Customers', message: `${err.status} - ${err.statusText}` });
    //         }
    //         );
    // }

    // public searchMyCustomers(searchObject: CustomerSearchObject, clearCustomers: boolean): void {
    //     this._appStateActions.updateState({ 'loader.newCustomerSearchResultsLoading': true });
    //     this.customerSearchObject = searchObject;
    //     this._api.callApiService({
    //         requestType: REQUEST_TYPE_POST,
    //         url: `${Constants.ApiBaseUrl}/customers`,
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //         body: JSON.stringify(searchObject),
    //     }).subscribe(
    //         customerSearchResults => {
    //             this._loggingService.sendLogMessage(LogLevels.DEBUG, `UserActions.searchMyCustomers() results => ${JSON.stringify(customerSearchResults)}`);
    //             if (this.customerSearchObject === searchObject) {
    //                 if (clearCustomers || (customerSearchResults && customerSearchResults.customerList && customerSearchResults.customerList.fullListSize === 0)) {
    //                     this.clearSearchCustomerResults();
    //                 }
    //                 this._appStateActions.updateState({ 'loader.newCustomerSearchResultsLoading': false });
    //                 this._store.dispatch(
    //                     {
    //                         type: UPDATE_MY_CUSTOMER_SEARCH_RESULTS,
    //                         payload: customerSearchResults
    //                     }
    //                 );
    //             }
    //         },
    //         err => {
    //             this._notificationActions.notifyError({ title: 'Search-Customers', message: `${err.status} - ${err.statusText}` });
    //             this.clearSearchCustomerResults();
    //             this._appStateActions.updateState({ 'loader.newCustomerSearchResultsLoading': false });
    //         }
    //         );
    // }

    // public clearSearchCustomerResults(): void {
    //     this._store.dispatch(
    //         {
    //             type: CLEAR_MY_CUSTOMER_RESULTS,
    //             payload: []
    //         }
    //     );
    // }

    // public searchAllCustomers(searchObject: CustomerSearchObject, clearCustomers: boolean): void {
    //     this._appStateActions.updateState({ 'loader.newAllCustomerSearchResultsLoading': true });
    //     this.customerSearchObject = searchObject;
    //     this._api.callApiService({
    //         requestType: REQUEST_TYPE_POST,
    //         url: `${Constants.ApiBaseUrl}/customers`,
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //         body: JSON.stringify(searchObject),
    //     }).subscribe(
    //         allCustomerSearchResults => {
    //             this._loggingService.sendLogMessage(LogLevels.DEBUG, `UserActions.searchAllCustomers() results => ${JSON.stringify(allCustomerSearchResults)}`);
    //             if (this.customerSearchObject === searchObject) {
    //                 if (clearCustomers || (allCustomerSearchResults && allCustomerSearchResults.customerList && allCustomerSearchResults.customerList.fullListSize === 0)) {
    //                     this.clearSearchAllCustomerResults();
    //                 }
    //                 this._appStateActions.updateState({ 'loader.newAllCustomerSearchResultsLoading': false });
    //                 this._store.dispatch(
    //                     {
    //                         type: UPDATE_ALL_CUSTOMER_SEARCH_RESULTS,
    //                         payload: allCustomerSearchResults
    //                     }
    //                 );
    //             }
    //         },
    //         err => {
    //             this._notificationActions.notifyError({ title: 'Search-Customers', message: `${err.status} - ${err.statusText}` });
    //             this.clearSearchAllCustomerResults();
    //             this._appStateActions.updateState({ 'loader.newAllCustomerSearchResultsLoading': false });
    //         }
    //         );
    // }

    // public clearSearchAllCustomerResults(): void {
    //     this._store.dispatch(
    //         {
    //             type: CLEAR_ALL_CUSTOMER_RESULTS,
    //         }
    //     );
    // }

}
