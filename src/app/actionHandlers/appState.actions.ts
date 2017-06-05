import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// ActionTypes
import {
    UPDATE_APP_STATE,
    START_LOADER,
    STOP_LOADER,
} from '../stores/appState.store';

@Injectable()
export class AppStateActions {

    constructor(
        private _store: Store<any>,
        // private _quoteHelper: QuoteHelper
    ) { }

    public updateState(stateChanges): void {
        this._store.dispatch(
            {
                type: UPDATE_APP_STATE,
                payload: stateChanges
            }
        );
    }

    public showLoaderGraphic(shouldBlock: boolean = false): void {
        this._store.dispatch(
            {
                type: START_LOADER,
                payload: { shouldBlock }
            }
        );
    }

    public hideLoaderGraphic(): void {
        this._store.dispatch(
            {
                type: STOP_LOADER
            }
        );
        this.updateFocus();
    }

    private updateFocus() {
        var self = this;
        setTimeout(() => {
            let appState: any;
            self._store.select('appState').take(1).subscribe(state => appState = state);
            let sourceId = appState['pns_currentFocusElement']
            if (sourceId && document.getElementById(sourceId)) {
                document.getElementById(sourceId).focus();
            }
        }, 100);
    }

}
