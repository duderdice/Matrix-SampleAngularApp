import { Reducer, Action } from '@ngrx/store';
import { PaymentTrxResponse } from '../models/paymentTrxResponse';

// ActionTypes
export const
    UPDATE_PAYMENT_TRX = 'UPDATE_PAYMENT_TRX',
    CLEAR_PAYMENT_TRX = 'UPDATE_PAYMENT_TRX';

// Stores
export function payment(state: PaymentTrxResponse = null, action: Action) {
    switch (action.type) {

        case UPDATE_PAYMENT_TRX:
            return action.payload;

        case CLEAR_PAYMENT_TRX:
            return null;

        default:
            return state;

    }
};

