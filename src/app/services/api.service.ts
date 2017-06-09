import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, ResponseType, ResponseContentType, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { AppStateActions } from '../actionHandlers/appState.actions';
import { LoggingService, LogLevels } from './logging.service';
// import { apiMockServiceResponses } from '../servicesMock/api.serviceMock';
// import { inject } from '../servicesMock/mockBackendInjector';
import * as Constants from '../constants/constants';
// import { ErrorHelper } from '../helpers/errorHelper';

// declare Angular HTTP RequestType constants for callers
export const
    REQUEST_TYPE_GET = 'REQUEST_TYPE_GET',    // request.method === 0
    REQUEST_TYPE_POST = 'REQUEST_TYPE_POST',   // request.method === 1
    REQUEST_TYPE_PUT = 'REQUEST_TYPE_PUT',    // request.method === 2
    REQUEST_TYPE_DELETE = 'REQUEST_TYPE_DELETE'; // request.method === 3

@Injectable()
export class ApiService {

    constructor(
        private _http: Http,
        private _loggingService: LoggingService,
        private _appStateActions: AppStateActions,
        // private _errorHelper: ErrorHelper
    ) {
        // if (Constants.USE_MOCKING) {
        //     inject(this, apiMockServiceResponses);
        // }
    }

    public callApiService({ requestType, url, headers, body, shouldBlock, responseType }: { requestType: string, url: string, headers?: Headers, body?: string, shouldBlock?: boolean, responseType?: ResponseContentType }): Observable<any> {
        this._loggingService.sendLogMessage(LogLevels.DEBUG, `Entered ApiService.callApiService(${requestType}, ${url}, ${headers}, ${body})`);

        // ensure we have at least a default headers object
        if (!headers) {
            headers = new Headers();
        }

        // use request options to always set {'withCredentials':true} as well as passing a body on DELETE requests
        const requestOptions = new RequestOptions({
            body,
            headers,
            responseType,
            withCredentials: true
        });

        let response: Observable<Response>;
        // this._appStateActions.showLoaderGraphic(shouldBlock);
        switch (requestType) {

            case REQUEST_TYPE_GET:
                response = this._http.get(url, requestOptions)
                    .map(res => {
                        // this._appStateActions.hideLoaderGraphic();
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                        // this._appStateActions.hideLoaderGraphic();
                        this._loggingService.sendLogMessage(LogLevels.ERROR, this.getLoggableErrorMessage({ requestType, url, headers, body, err }));
                        return Observable.throw(err);
                    });
                break;

            case REQUEST_TYPE_POST:
                response = this._http.post(url, body, requestOptions)
                    .map(res => {
                        // this._appStateActions.hideLoaderGraphic();
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                        // this._appStateActions.hideLoaderGraphic();
                        this._loggingService.sendLogMessage(LogLevels.ERROR, this.getLoggableErrorMessage({ requestType, url, headers, body, err }));
                        return Observable.throw(err);
                    });
                break;

            case REQUEST_TYPE_PUT:
                response = this._http.put(url, body, requestOptions)
                    .map(res => {
                        // this._appStateActions.hideLoaderGraphic();
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                        // this._appStateActions.hideLoaderGraphic();
                        this._loggingService.sendLogMessage(LogLevels.ERROR, this.getLoggableErrorMessage({ requestType, url, headers, body, err }));
                        return Observable.throw(err);
                    });
                break;

            case REQUEST_TYPE_DELETE:
                response = this._http.delete(url, requestOptions)
                    .map(res => {
                        // this._appStateActions.hideLoaderGraphic();
                        return this.getResponseContent(url, res);
                    })
                    .catch(err => {
                        // this._appStateActions.hideLoaderGraphic();
                        this._loggingService.sendLogMessage(LogLevels.ERROR, this.getLoggableErrorMessage({ requestType, url, headers, body, err }));
                        return Observable.throw(err);
                    });
                break;

            default:
                throw new Error(`invalid value provided for RequestType => [${requestType}]`);
        }
        return response;
    }

    public callApiServiceXhr({ requestType, url, headers, body, shouldBlock, responseType }: { requestType: string, url: string, headers?: Headers, body?: string, shouldBlock?: boolean, responseType?: ResponseContentType }): Observable<any> {
        // this._appStateActions.showLoaderGraphic(shouldBlock);
        this._loggingService.sendLogMessage(LogLevels.DEBUG, `Entered ApiService.callApiServiceXhr(${requestType}, ${url}, ${headers}, ${body})`);
        return Observable.create((observer) => {
            const xhr = new XMLHttpRequest();
            xhr.open(requestType, url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    // this._appStateActions.hideLoaderGraphic();
                    if (xhr.status === 200 || xhr.status === 201) {
                        // observer.next(JSON.stringify(xhr.response));
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(JSON.parse(xhr.response));
                    }
                }
            };
            xhr.send(body);
        });
    }

    private getResponseContent(url: string, res: Response) {
        try {
            let contentType = res.headers.get('content-type');
            if (contentType && contentType.indexOf(';') !== -1) {
                // strip the charset declaration to simplify the comparison
                contentType = contentType.substring(0, contentType.indexOf(';'));
            }
            // console.log(`contentType => [${contentType}]`);
            switch (contentType) {

                case 'application/x-file-download':
                    return res;

                case 'application/json':
                    return res.json();

                case 'text/plain':
                case 'text/html':
                    return res.text();

                case 'application/vnd.ms-excel':
                    return res.blob();

                case null:
                    return null;

                default:
                    this._loggingService.sendLogMessage(LogLevels.INFO, `Unhandled Content-Type [${contentType}] in ApiService response from [${url}]; using default logic to provide response.`);
                    return res.text() ? res.json() : {};
            }
        } catch (e) {
            const resContent = JSON.stringify(res).substr(0, 512);
            this._loggingService.sendLogMessage(LogLevels.ERROR, `ERROR while processing response content [${e.name} => ${e.message}]\n\turl => ${url}\n\tresponse => ${resContent}`);
            throw (e);
        } finally {
            //
        }
    }

    private getLoggableErrorMessage({ requestType, url, headers, body, err }: { requestType: string, url: string, headers: Headers, body?: string, err: any }): string {
        // const bodyTxt = this._errorHelper.getErrorMessageFromObservable(err);
        const bodyTxt = JSON.stringify(err);
        return `Error occurred in ApiService.callApiService(${requestType}, ${url}, ${JSON.stringify(headers)}, ${bodyTxt}) => ${err}`;
    }

}
