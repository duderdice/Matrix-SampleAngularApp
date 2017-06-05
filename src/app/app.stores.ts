// Store framework functions
import { Store } from "@ngrx/store";

// Stores/Reducers
import { appState, loaderState } from './stores/appState.store';
import { user, userRoleMask } from './stores/user.store';

export const APP_STORES = [

    // AppState.store
    appState,
    loaderState,

    // User.store
    user,
    userRoleMask,

];