import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Store } from '@ngrx/store';
// import { SAVE_RECENT_NOTIFICATION } from '../reducers/selectedQuote-reducer';
// import { ApplicationConstantsHelper } from '../helpers/applicationConstantsHelper';

@Injectable()
export class NotificationActions {
    constructor(
        private _toasterService: ToasterService,
        private _store: Store<any>,
        // private _applicationConstantsHelper: ApplicationConstantsHelper
    ) { }

    public notify({ type, title, message }: { type: string, title: string, message: string }): void {
        // const max = this._applicationConstantsHelper.getApplicationConstant('MAXIMUM_NOTIFICATIONS') || 20;
        const max = 20;
        // this._store.dispatch({ type: SAVE_RECENT_NOTIFICATION, payload: { when: new Date(), message: message, max } });
        this._toasterService.pop(type, title, message);
    }

    public notifySuccess({ title, message }: { title: string, message: string }): void {
        // const max = this._applicationConstantsHelper.getApplicationConstant('MAXIMUM_NOTIFICATIONS') || 20;
        const max = 20;
        // this._store.dispatch({ type: SAVE_RECENT_NOTIFICATION, payload: { when: new Date(), message: message, max } });
        this._toasterService.pop('success', title, message);
    }

    public notifyInfo({ title, message }: { title: string, message: string }): void {
        // const max = this._applicationConstantsHelper.getApplicationConstant('MAXIMUM_NOTIFICATIONS') || 20;
        const max = 20;
        // this._store.dispatch({ type: SAVE_RECENT_NOTIFICATION, payload: { when: new Date(), message: message, max } });
        this._toasterService.pop('info', title, message);
    }

    public notifyWarning({ title, message }: { title: string, message: string }): void {
        // const max = this._applicationConstantsHelper.getApplicationConstant('MAXIMUM_NOTIFICATIONS') || 20;
        const max = 20;
        // this._store.dispatch({ type: SAVE_RECENT_NOTIFICATION, payload: { when: new Date(), message: message, max } });
        this._toasterService.pop('warning', title, message);
    }

    public notifyError({ title, message }: { title: string, message: string }): void {
        // const max = this._applicationConstantsHelper.getApplicationConstant('MAXIMUM_NOTIFICATIONS') || 20;
        const max = 20;
        // this._store.dispatch({ type: SAVE_RECENT_NOTIFICATION, payload: { when: new Date(), message: message, max } });
        this._toasterService.pop('error', title, message);
    }

}
