// Store framework functions
import { Store, StoreModule } from '@ngrx/store';

// Stores/Reducers
import { appState, loaderState } from './stores/appState.store';
import { user, userRoleMask } from './stores/user.store';
import { vehicleTypes } from './stores/vehicles.store';
import { payment } from './stores/payment.store';

export const APP_STORES = {
    // AppState.store
    appState,
    loaderState,

    // User.store
    user,
    userRoleMask,

    // Vehicles
    vehicleTypes,

    // Payment
    payment,
};
