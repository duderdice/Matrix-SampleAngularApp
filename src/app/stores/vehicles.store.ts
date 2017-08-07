import { Action, Reducer } from '@ngrx/store';
import { VehicleType } from '../models/vehicleType';

// ActionTypes
export const
    UPDATE_VEHICLE_TYPES = 'UPDATE_VEHICLE_TYPES',
    CLEAR_VEHICLE_TYPES = 'CLEAR_VEHICLE_TYPES';

// Stores
export function vehicleTypes(state: Array<VehicleType> = [], action: Action) {
    switch (action.type) {

        case UPDATE_VEHICLE_TYPES:
            return action.payload;

        case CLEAR_VEHICLE_TYPES:
            return [];

        default:
            return state;

    }
};
