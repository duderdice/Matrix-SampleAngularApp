// borrowed this technique from => https://www.beyondjava.net/blog/mocking-http-services-with-angular-generically/
// see this repo for mock example => https://github.com/stephanrauh/ExploringAngular/tree/master/Tic-Tac-Toe

import { NgModule, Inject, OpaqueToken } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions, XHRBackend, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CommonModule } from '@angular/common';
import { VehicleTypesMock } from './vehicleTypes.mock';

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
                const responseOptions = this.getMatchingMockResponse(connection.request.url);
                return connection.mockRespond(new Response(new ResponseOptions(responseOptions)));
            })
            .subscribe();
    }

    private getMatchingMockResponse(url: string) {
        let body;
        switch (url) {

            case '/api/vehicleTypes':
                body = (new VehicleTypesMock).getVehicleTypes();
                break;

            default:
                return {
                    status: 404,
                    statusText: 'Not Found',
                    url: url,
                };
        };

        return {
            status: 200,
            statusText: 'OK',
            url: url,
            body: JSON.stringify(body),
            headers: new Headers({ 'Content-Type': 'application/json' })
        };
    }

}
