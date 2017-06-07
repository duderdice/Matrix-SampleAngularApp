import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { VehicleTypeComponent } from './components/vehicleType/vehicleType.component';

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'model/:id', component: VehicleTypeComponent },
];
