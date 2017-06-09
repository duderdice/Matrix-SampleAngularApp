import { PaymentTrxRequest } from './paymentTrxRequest';

export class PaymentTrxResponse {
    id: string;
    paymentTrxRequest: PaymentTrxRequest;
    trxDateTime: string;
    isSuccessful: boolean;
    trxAmount: number;
    confirmationCode: string;
    errorCode: string;
    errorMessage: string;
}
