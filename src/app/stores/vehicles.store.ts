import { Reducer, Action } from '@ngrx/store';
import { makeClone } from '../helpers/utilities';
import { VehicleType } from '../models/vehicleType';

// ActionTypes
export const
    UPDATE_VEHICLE_TYPES = 'UPDATE_VEHICLE_TYPES';

// Stores
export const vehicleTypes = (state: Array<VehicleType> = [], action: Action) => {
    switch (action.type) {

        case UPDATE_VEHICLE_TYPES:
            return action.payload;

        default:
            return state;

    }
};

