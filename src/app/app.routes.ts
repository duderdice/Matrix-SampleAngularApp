import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleTypeComponent } from './components/vehicleType/vehicleType.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'model/:id', component: VehicleTypeComponent },
];
