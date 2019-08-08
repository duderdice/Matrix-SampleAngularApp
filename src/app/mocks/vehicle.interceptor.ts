import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as Constants from '../constants/constants';
import { VehicleType } from '../models/vehicleType';

@Injectable()
export class MockVehicleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url === `${Constants.ApiBaseUrl}/vehicleTypes`) {
      const vehicleResponse = this.getVehicleTypes();
      const response = new HttpResponse({
        body: vehicleResponse
      });
      return Observable.of(response);
    }
    return next.handle(req);
  }

  getVehicleTypes(): Array<VehicleType> {
    const vehicleTypes = [
      {
        id: 'S',
        name: 'Model S',
        description: 'Luxury sedan with great performance',
        imageUrl: 'https://s1.cdn.autoevolution.com/images/gallery/TESLA-MOTORS-Model-S-4693_82.jpg',
        basePrice: 65000,
      },
      {
        id: '3',
        name: 'Model 3',
        description: 'An affordable compact car for the masses',
        imageUrl: 'http://cdn.coresites.factorymedia.com/mpora_new/wp-content/uploads/2015/06/1966_vw_beetle_by_dangeruss-d5qbyyz.jpg',
        basePrice: 35000,
      },
      {
        id: 'X',
        name: 'Model X',
        description: 'Luxury SUV with great performance and cargo capacity',
        imageUrl: 'https://cdn.arstechnica.net/wp-content/uploads/2014/05/DSC_2096-980x651.jpg',
        basePrice: 75000,
      },
    ];
    return vehicleTypes;
  }
}
