export interface ExpectedPaystackResponse {
  transactionCancelled: boolean,
  response: {
    message: string;
    status: string;
    trxref: string;
    transaction: string;
    reference: string;
  }
}
