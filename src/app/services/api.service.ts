import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { LoaderActions } from '../actionHandlers/loader.actions';
import * as Constants from '../constants/constants';
import { LoggingService, LogLevels } from './logging.service';

// declare Angular HTTP RequestType constants for callers
export const
    REQUEST_TYPE_GET = 'GET',
    REQUEST_TYPE_POST = 'POST',
    REQUEST_TYPE_PUT = 'PUT',
    REQUEST_TYPE_DELETE = 'DELETE';

@Injectable()
export class ApiService {

    constructor(
        private _http: HttpClient,
        private _loggingService: LoggingService,
        private _loaderActions: LoaderActions
    ) { }

    public callApiService<T>(req: HttpRequest<any>): Observable<T> {
        this._loggingService.sendLogMessage(LogLevels.DEBUG, `Entered ApiService.callApiService(${req.method}, ${req.url}, ${req.headers}, ${req.body})`);

        let response;
        this._loaderActions.showLoaderGraphic(true);
        switch (req.method) {

            case REQUEST_TYPE_GET:
                this._http
                    .get<T>(req.url)
                    .subscribe(
                        res => {
                            response = res;
                            this._loaderActions.hideLoaderGraphic();
                            return response;
                        },
                        err => {
                            response = err;
                            this._loaderActions.hideLoaderGraphic();
                            this.getLoggableErrorMessage({ req, err });
                            return response;
                        }
                    );
                break;

            case REQUEST_TYPE_POST:
                this._http
                    .post<T>(req.url, req.body)
                    .subscribe(
                        res => {
                            response = res;
                            this._loaderActions.hideLoaderGraphic();
                            return response;
                        },
                        err => {
                            response = err;
                            this._loaderActions.hideLoaderGraphic();
                            this.getLoggableErrorMessage({ req, err });
                            return response;
                        }
                    );
                break;

            case REQUEST_TYPE_PUT:
                this._http
                    .put<T>(req.url, req.body)
                    .subscribe(
                        res => {
                            response = res;
                            this._loaderActions.hideLoaderGraphic();
                            return response;
                        },
                        err => {
                            response = err;
                            this._loaderActions.hideLoaderGraphic();
                            this.getLoggableErrorMessage({ req, err });
                            return response;
                        }
                    );
                break;

            case REQUEST_TYPE_DELETE:
                this._http
                    .delete<T>(req.url)
                    .subscribe(
                        res => {
                            response = res;
                            this._loaderActions.hideLoaderGraphic();
                            return response;
                        },
                        err => {
                            response = err;
                            this._loaderActions.hideLoaderGraphic();
                            this.getLoggableErrorMessage({ req, err });
                            return response;
                        }
                    );
                break;
            default:
                throw new Error(`invalid value provided for RequestType => [${req.method}]`);
        }
        return Observable.of(response);
    }

    // public callApiServiceXhr({ requestType, url, headers, body, shouldBlock, responseType }: { requestType: string, url: string, headers?: Headers, body?: string, shouldBlock?: boolean, responseType?: ResponseContentType }): Observable<any> {
    //     this._loaderActions.showLoaderGraphic(shouldBlock);
    //     this._loggingService.sendLogMessage(LogLevels.DEBUG, `Entered ApiService.callApiServiceXhr(${requestType}, ${url}, ${headers}, ${body})`);
    //     return Observable.create((observer) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.open(requestType, url, true);
    //         xhr.withCredentials = true;
    //         xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //         xhr.onreadystatechange = () => {
    //             if (xhr.readyState === 4) {
    //                 this._loaderActions.hideLoaderGraphic();
    //                 if (xhr.status === 200 || xhr.status === 201) {
    //                     // observer.next(JSON.stringify(xhr.response));
    //                     observer.next(JSON.parse(xhr.response));
    //                     observer.complete();
    //                 } else {
    //                     observer.error(JSON.parse(xhr.response));
    //                 }
    //             }
    //         };
    //         xhr.send(body);
    //     });
    // }

    private getLoggableErrorMessage({ req, err}: { req: HttpRequest<any>, err: HttpErrorResponse}): string {
        const bodyTxt = JSON.stringify(err);
        return `Error occurred in ApiService.callApiService(${req.method}, ${req.url}, ${req.headers}, ${err.message} => ${err}`;
    }

}
