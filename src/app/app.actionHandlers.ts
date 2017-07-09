import { AppStateActions } from './actionHandlers/appState.actions';
import { LoaderActions } from './actionHandlers/loader.actions';
import { NotificationActions } from './actionHandlers/notification.actions';
import { UserActions } from './actionHandlers/user.actions';

export const APP_ACTION_HANDLERS = [
    AppStateActions,
    LoaderActions,
    NotificationActions,
    UserActions,
];
