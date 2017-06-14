import { Reducer, Action } from '@ngrx/store';
import { LogLevels } from '../services/logging.service';
import * as Constants from '../constants/constants';

// ActionTypes
export const
    UPDATE_APP_STATE = 'UPDATE_APP_STATE';

// declare all valid properties in initial state, as we validate when updating
const initialAppState = {
    /* globals */
    'global.apiVersion': '',
    'global.isUserSessionActive': false,

    /* logging service */
    'logging.sendToConsole': true,
    'logging.sendToApi': false,
    'logging.logLevel': LogLevels.ERROR,

    /* Modals */
    'isPaymentTransactionModalShown': false,

    /* Main Menu */
    'menu.mainMenuCollapsed': true,

    /* search */
    'search.quoteSearchObject': null,
    'search.returnToQuoteSearchResults': false,
    'search.backToSearchResultsNeeded': false
};

export const appState = (state: any = initialAppState, action: Action) => {
    switch (action.type) {
        case UPDATE_APP_STATE:
            const newState = Object.assign({}, state);
            Object.keys(action.payload).map((prop) => {
                // only update known properties, to catch errors
                if (prop in state) {
                    const newValue = action.payload[prop];
                    newState[prop] = newValue;
                } else {
                    // console.log(`invalid property [${prop}] passed into UiState-reducer`);
                }
            });
            return newState;

        default:
            return state;

    }
};

// ******************************************************************************************************** //
// support for LoaderGraphic state mgmt
// keep separate from other appState to minimize cascading/frequent updates

// ActionTypes
export const
    START_LOADER = 'START_LOADER',
    STOP_LOADER = 'STOP_LOADER';

// declare all valid properties in initial state, as we validate when updating
const loaderInitialState = {
    isLoaderVisible: false,
    isBlockerVisible: false,
    refCount: 0,
}

export const loaderState = (state: any = loaderInitialState, action: Action) => {
    switch (action.type) {

        case START_LOADER:
            return Object.assign(
                {},
                state,
                {
                    isBlockerVisible: action.payload.shouldBlock ? true : state.isBlockerVisible,
                    isLoaderVisible: true,
                    refCount: state.refCount + 1,
                }
            );

        case STOP_LOADER:
            return Object.assign(
                {},
                state,
                {
                    isBlockerVisible: (state.isBlockerVisible && (state.refCount - 1) === 0) ? false : state.isBlockerVisible,
                    isLoaderVisible: ((state.refCount - 1) > 0),
                    refCount: state.refCount - 1,
                }
            );

        default:
            return state;
    }
};
