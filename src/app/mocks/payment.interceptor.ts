import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import * as Constants from '../constants/constants';
import { PaymentTrxRequest } from '../models/paymentTrxRequest';
import { PaymentTrxResponse } from '../models/paymentTrxResponse';

@Injectable()
export class MockPaymentInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url === `${Constants.ApiBaseUrl}/submitPaymentTrx`) {
      const paymentResponse = this.processPaymentTrxMock(req.body);
      const response = new HttpResponse({
        body: paymentResponse
      });
      return Observable.of(response);
    }
    return next.handle(req);
  }

  processPaymentTrxMock(paymentTrxRequest: PaymentTrxRequest): PaymentTrxResponse {
    const goodPaymentTrxResponse: PaymentTrxResponse = {
      id: '12345',
      trxDateTime: moment().format('LLLL'),
      isSuccessful: true,
      trxAmount: paymentTrxRequest.paymentAmount,
      confirmationCode: 'A12345',
      errorCode: '',
      errorMessage: '',
      paymentTrxRequest,
    };
    const badPaymentTrxResponse: PaymentTrxResponse = {
      id: '12345',
      trxDateTime: moment().format('LLLL'),
      isSuccessful: false,
      trxAmount: paymentTrxRequest.paymentAmount,
      confirmationCode: '',
      errorCode: 'Z509',
      errorMessage: 'Insufficient Funds',
      paymentTrxRequest,
    };
    const random = Math.random();
    return (random > 0.5) ? goodPaymentTrxResponse : badPaymentTrxResponse;
  }

}
