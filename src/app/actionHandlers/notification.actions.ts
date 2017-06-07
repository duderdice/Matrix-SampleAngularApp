import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class NotificationActions {

    constructor(
        private _toasterService: ToasterService,
        private _store: Store<any>,
    ) { }

    public notify({ type, title, message }: { type: string, title: string, message: string }): void {
        this._toasterService.pop(type, title, message);
    }

    public notifySuccess({ title, message }: { title: string, message: string }): void {
        this._toasterService.pop('success', title, message);
    }

    public notifyInfo({ title, message }: { title: string, message: string }): void {
        this._toasterService.pop('info', title, message);
    }

    public notifyWarning({ title, message }: { title: string, message: string }): void {
        this._toasterService.pop('warning', title, message);
    }

    public notifyError({ title, message }: { title: string, message: string }): void {
        this._toasterService.pop('error', title, message);
    }

}
