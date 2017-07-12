import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotificationActions } from '../actionHandlers/notification.actions';
import * as Constants from '../constants/constants';
import { VehicleType } from '../models/vehicleType';
import { ApiService, REQUEST_TYPE_GET, REQUEST_TYPE_POST, REQUEST_TYPE_PUT, REQUEST_TYPE_DELETE } from '../services/api.service';
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
        this._api.callApiService({
            requestType: REQUEST_TYPE_GET,
            url: `${Constants.ApiBaseUrl}/vehicleTypes`,
        }).subscribe(
            (vehicleTypes: Array<VehicleType>) => {
                this._store.dispatch({ type: UPDATE_VEHICLE_TYPES, payload: vehicleTypes });
            },
            (err) => {
                this._store.dispatch({ type: UPDATE_VEHICLE_TYPES, payload: [] });
                this._notificationActions.notifyError({ title: 'Error loading Vehicle types', message: JSON.stringify(err) });
            });
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
