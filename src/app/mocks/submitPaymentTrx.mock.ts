import { PaymentTrxRequest } from '../models/paymentTrxRequest';
import { PaymentTrxResponse } from '../models/paymentTrxResponse';
import * as moment from 'moment';

export class PaymentMock {

    public processPaymentTrxMock(paymentTrxRequest: PaymentTrxRequest): PaymentTrxResponse {
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
