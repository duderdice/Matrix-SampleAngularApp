import { NgModule, Inject, OpaqueToken } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions, XHRBackend, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CommonModule } from '@angular/common';
import { VehicleTypesMock } from './vehicleTypes.mock';
import { PaymentMock } from './submitPaymentTrx.mock';
import * as Constants from '../constants/constants';

const
    REQUEST_TYPE_GET = 0,
    REQUEST_TYPE_POST = 1,
    REQUEST_TYPE_PUT = 2,
    REQUEST_TYPE_DELETE = 3;

export function httpFactory(mockBackend, options) {
    return new Http(mockBackend, options);
}

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [MockBackend, BaseRequestOptions],
        },
        MockBackend,
        BaseRequestOptions,
    ]
})
export class MockHttpModule {
    private _delayInMilliseconds = 500;

    constructor(private _mockBackend: MockBackend) {
        _mockBackend.connections
            .delay(this._delayInMilliseconds)
            .map((connection: MockConnection) => {
                const responseOptions = this.getMatchingMockResponse(connection.request);
                return connection.mockRespond(new Response(new ResponseOptions(responseOptions)));
            })
            .subscribe();
    }

    private getMatchingMockResponse(request) {
        let body;
        if (request.url === `${Constants.ApiBaseUrl}/vehicleTypes` && request.method === REQUEST_TYPE_GET) {
            body = (new VehicleTypesMock).getVehicleTypes();
        } else if (request.url === `${Constants.ApiBaseUrl}/submitPaymentTrx` && request.method === REQUEST_TYPE_POST) {
            body = (new PaymentMock).processPaymentTrxMock(request._body);
        } else {
            return {
                status: 404,
                statusText: 'Not Found',
                url: request.url,
            };
        }
        return {
            status: 200,
            statusText: 'OK',
            url: request.url,
            body: JSON.stringify(body),
            headers: new Headers({ 'Content-Type': 'application/json' })
        };
    }

}
