import { User } from '../models/user';
// import { UserSearchResult } from '../models/userSearchResult';
import { Reducer, Action } from '@ngrx/store';
import { makeClone } from '../helpers/utilities';

export const
    LOAD_USER_PROFILE = 'LOAD_USER_PROFILE',
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

