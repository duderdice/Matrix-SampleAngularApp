import { User } from '../models/user';
// import { UserSearchResult } from '../models/userSearchResult';
import { Reducer, Action } from '@ngrx/store';
import { makeClone } from '../helpers/utilities';

export const
    LOAD_USER_PROFILE = 'LOAD_USER_PROFILE',
    SET_DELEGATE = 'SET_DELEGATE',
    UPDATE_ALIGNED_CUSTOMERS = 'UPDATE_ALIGNED_CUSTOMERS',
    UPDATE_DEFAULT_CUSTOMER = 'UPDATE_DEFAULT_CUSTOMER',
    UPDATE_MY_CUSTOMER_SEARCH_RESULTS = 'UPDATE_MY_CUSTOMER_SEARCH_RESULTS',
    UPDATE_ALL_CUSTOMER_SEARCH_RESULTS = 'UPDATE_ALL_CUSTOMER_SEARCH_RESULTS',
    CLEAR_MY_CUSTOMER_RESULTS = 'CLEAR_MY_CUSTOMER_RESULTS',
    CLEAR_ALL_CUSTOMER_RESULTS = 'CLEAR_ALL_CUSTOMER_RESULTS',
    UPDATE_USER_SEARCH_RESULTS = 'UPDATE_USER_SEARCH_RESULTS',
    CLEAR_USER_SEARCH_RESULTS = 'CLEAR_USER_SEARCH_RESULTS',
    UPDATE_USER_ROLE_MASK = 'UPDATE_USER_ROLE_MASK',
    CLEAR_USER_ROLE_MASK = 'CLEAR_USER_ROLE_MASK';

export const
    user = (state: User = null, action: Action) => {
        switch (action.type) {

            case LOAD_USER_PROFILE:
                return action.payload;

            default:
                return state;

        }
    },
    // delegate = (state = null, action: Action) => {
    //     switch (action.type) {
    //         case SET_DELEGATE:
    //             return action.payload;

    //         default:
    //             return state;

    //     }
    // },
    alignedCustomers = (state = [], action: Action) => {
        switch (action.type) {
            case UPDATE_ALIGNED_CUSTOMERS:
                return action.payload;

            default:
                return state;

        }
    },
    defaultCustomers = (state = null, action: Action) => {
        switch (action.type) {
            case UPDATE_DEFAULT_CUSTOMER:
                return action.payload;

            default:
                return state;

        }
    },
    customerSearchResults = (state = [], action: Action) => {
        let newState = makeClone(state);
        switch (action.type) {
            case UPDATE_MY_CUSTOMER_SEARCH_RESULTS:
                return [
                    ...newState,
                    action.payload,
                ];

            case CLEAR_MY_CUSTOMER_RESULTS:
                return [];

            default:
                return state;
        }
    },
    allCustomerSearchResults = (state = [], action: Action) => {
        let newState = makeClone(state);
        switch (action.type) {
            case UPDATE_ALL_CUSTOMER_SEARCH_RESULTS:
                return [
                    ...newState,
                    action.payload,
                ];

            case CLEAR_ALL_CUSTOMER_RESULTS:
                return [];

            default:
                return state;
        }
    },
    // userSearchResults = (state: Array<UserSearchResult> = [], action: Action) => {
    //     switch (action.type) {
    //         case UPDATE_USER_SEARCH_RESULTS:
    //             return [
    //             	...state,
    //             	action.payload
    //            	];

    //         case CLEAR_USER_SEARCH_RESULTS:
    //             return [];

    //         default:
    //             return state;
    //     }
    // },
    userRoleMask = (state: any = {}, action: Action) => {
        switch (action.type) {
            case UPDATE_USER_ROLE_MASK:
                return action.payload;

            case CLEAR_USER_ROLE_MASK:
                return {};

            default:
                return state;
        }
    };

