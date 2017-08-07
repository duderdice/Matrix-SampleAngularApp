import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockPaymentInterceptor } from './mocks/payment.interceptor';
import { MockVehicleInterceptor } from './mocks/vehicle.interceptor';

export const APP_MOCK_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: MockPaymentInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockVehicleInterceptor, multi: true }
];
