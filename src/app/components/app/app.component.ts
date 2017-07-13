import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { AppStateActions } from '../../actionHandlers/appState.actions';

@Component({
    selector: 'app-root',
    //   templateUrl: './app.component.html',
    template: `
        <toaster-container [toasterconfig]="toasterconfig"></toaster-container>
        <div class="mainBodyLayout">
            <app-mocking-ribbon></app-mocking-ribbon>
            <app-header></app-header>
            <div class="mainBody">
                <router-outlet></router-outlet>
            </div>
            <app-footer></app-footer>
        </div>
    `,
    // styleUrls: ['./app.component.css']
    styles: [`
        .mainBodyLayout {
            display: flex;
            flex-flow: column nowrap;
            height: 100vh;
        }
        .mainBody {
            flex: 1 0;
        }
    `],
})
export class AppComponent implements OnInit {
    public toasterconfig: ToasterConfig = new ToasterConfig({ showCloseButton: true });

    constructor(
        private _appStateActions: AppStateActions
    ) { }

    public ngOnInit() {
        this._appStateActions.initializeApp();
    }

}
