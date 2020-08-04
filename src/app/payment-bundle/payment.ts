import { WindowRef } from './windowref';
import { ExpectedPaystackResponse } from './expected-paystack-response';

export class Payment {
    apiKey = 'pk_test_a64a89ae8c875d73888995ed0487c5aab5a10595';
    winRef2: WindowRef = new WindowRef();
    response: ExpectedPaystackResponse;
    constructor() {}
    initializeTransact(email, amount, companyName, refNumber, responseFunction: (resp) => any): any {
        const paymentGateWay = this.winRef2.nativeWindow.PaystackPop.setup({
            key: this.apiKey,
            email: email,
            amount: parseInt(amount)*100,
            currency: "NGN",
            ref: refNumber,
            metadata: {
               custom_fields: [
                  {
                      display_name: companyName,
                      variable_name: "mobile_number",
                      value: "+2348012345678"
                  }
               ]
            },
            callback: function(response){
                this.response = {
                    transactionCancelled: false,
                    response
                };
                responseFunction(this.response);
            },
            onClose: function(){
                this.response = {
                    transactionCancelled: true,
                    response: {}
                };
            }
        });
        paymentGateWay.openIframe();
    }
}
