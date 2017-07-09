// borrowed this technique from => https://www.beyondjava.net/blog/mocking-http-services-with-angular-generically/
// see this repo for mock example => https://github.com/stephanrauh/ExploringAngular/tree/master/Tic-Tac-Toe

import { NgModule, Inject, OpaqueToken } from '@angular/core';
import { Http, HttpModule, BaseRequestOptions, XHRBackend, Response, ResponseOptions, Headers } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CommonModule } from '@angular/common';
import { VehicleType } from '../models/vehicleType';

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
                return this.getMockResponse(connection);
            })
            .subscribe();
    }

    private getMockResponse(connection: MockConnection): void {
        const responseOptions = this.getMatchingMockResponse(connection.request.url);
        connection.mockRespond(new Response(new ResponseOptions(responseOptions)));
    }

    private getMatchingMockResponse(url: string) {
        let body;
        switch (url) {

            case '/api/vehicleTypes':
                body = this.getVehicleTypesMock();
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

    // ------------------------------------------------------------------------------------------------
    // mock responses

    private getVehicleTypesMock(): Array<VehicleType> {
        const vehicleTypes = [
            {
                id: 'S',
                name: 'Model S',
                description: 'Luxury sedan with great performance',
                imageUrl: 'http://insideevs.com/wp-content/uploads/2013/12/tesla-model-s-beach.jpg',
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
