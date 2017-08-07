import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotificationActions } from '../actionHandlers/notification.actions';
import * as Constants from '../constants/constants';
import { VehicleType } from '../models/vehicleType';
import { ApiService, REQUEST_TYPE_DELETE, REQUEST_TYPE_GET, REQUEST_TYPE_POST, REQUEST_TYPE_PUT } from '../services/api.service';
import { UPDATE_APP_STATE } from '../stores/appState.store';
import { UPDATE_VEHICLE_TYPES } from '../stores/vehicles.store';

@Injectable()
export class AppStateActions {

    constructor(
        private _store: Store<any>,
        private _api: ApiService,
        private _notificationActions: NotificationActions
    ) { }

    public initializeApp(): void {
        // load vehicle types
        const vehicleTypesReq = new HttpRequest(REQUEST_TYPE_GET, `${Constants.ApiBaseUrl}/vehicleTypes`);
        this._api.callApiService<VehicleType[]>(vehicleTypesReq)
            .subscribe(
                (vehicleTypes: Array<VehicleType>) => {
                    this._store.dispatch({ type: UPDATE_VEHICLE_TYPES, payload: vehicleTypes });
                },
                (err) => {
                    this._store.dispatch({ type: UPDATE_VEHICLE_TYPES, payload: [] });
                    this._notificationActions.notifyError({ title: 'Error loading Vehicle types', message: JSON.stringify(err) });
                }
            );
    }

    public updateState(stateChanges): void {
        this._store.dispatch(
            {
                type: UPDATE_APP_STATE,
                payload: stateChanges
            }
        );
    }

}
