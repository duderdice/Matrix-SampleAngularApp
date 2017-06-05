import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

export const APP_ROUTES: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'toolbar', component: ToolbarComponent },
];
