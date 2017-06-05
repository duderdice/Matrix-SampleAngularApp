import { Reducer, Action } from '@ngrx/store';
import { LogLevels } from '../services/logging.service';
import { makeClone } from '../helpers/utilities';
import * as Constants from '../constants/constants';

// ActionTypes
export const
    UPDATE_APP_STATE = 'UPDATE_APP_STATE';

// declare all valid properties in initial state, as we validate when updating
const initialAppState = {

    /* globals */
    'global.apiVersion': "",
    'global.isUserSessionActive': false,

    /* logging service */
    'logging.sendToConsole': true,
    'logging.sendToApi': false,
    'logging.logLevel': LogLevels.ERROR,

    /* Modals */
    'quote.isNonERPCountryModalShown': false,
    'quote.isOrderTypeModalShown': false,
    'quote.isConfigurationSuggestionsModalShown': false,

    /* Main Menu */
    'menu.mainMenuCollapsed': true,
    'menu.chatMenuCollapsed': true,
    'menu.showCreateQuoteModal': false,
    'menu.productMenuCollapsed': true,
    'menu.quoteHeaderMenuCollapsed': true,
    'menu.serviceMenuCollapsed': true,
    'menu.freightMenuCollapsed': true,
    'menu.optionsMenuCollapsed': true,
    'menu.serviceOptionsMenuCollapsed': true,
    'menu.showDeleteQuoteModal': false,

    /* search */
    'search.quoteSearchObject': null,
    'search.returnToQuoteSearchResults': false,
    'search.backToSearchResultsNeeded': false

};
export const appState = (state: any = initialAppState, action: Action) => {
    switch (action.type) {
        case UPDATE_APP_STATE:
            var newState = makeClone(state);
            Object.keys(action.payload).map((prop) => {
                // only update known properties, to catch errors
                if (prop in state) {
                    let newValue = action.payload[prop];
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
            var newState = makeClone(state);
            newState.isLoaderVisible = true;
            ++newState.refCount;
            if (action.payload.shouldBlock) {
                newState.isBlockerVisible = true;
            }
            // console.log(`START_LOADER => ${JSON.stringify(newState)}`);
            return newState;

        case STOP_LOADER:
            var newState = makeClone(state);
            --newState.refCount;
            newState.isLoaderVisible = (newState.refCount > 0);
            if (newState.isBlockerVisible && newState.refCount === 0) {
                newState.isBlockerVisible = false; // Blocker was on but is no longer needed
            }
            // console.log(`STOP_LOADER => ${JSON.stringify(newState)}`);
            return newState;

        default:
            return state;
    }
};
