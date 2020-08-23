import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ResponseCode, ResponseStructure } from '../_models/respose';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService
  ) {}
  showSpinner() {
    this._spinner.show();
  }

  hideSpinner() {
    this._spinner.hide();
  }

  hideSpinnerWithMessage(response: ResponseStructure, icon) {
    this._spinner.hide();
    this._toastr[icon](response.responseMessage);
  }

  hideSpinnerWithErrorMessage(response: ResponseStructure) {
    this._spinner.hide();
    // console.log(response);
    this._toastr.error(response.responseMessage);
  }

  hideSpinnerWithError(error) {
    this._spinner.hide();
    this._toastr.error(error);
  }

  globalAuthErrorHandler(error: ResponseStructure) {
    this.hideSpinner();
    if (error) {
      switch (error.responseCode) {
        case ResponseCode.UNAUTHORIZED:
          this._toastr.warning(
            error.responseResult['message'],
            'Hey I know you but you dont have the permission to do this'
          );
          break;
        case ResponseCode.FORBIDDEN:
          this._toastr.warning(error.responseMessage, 'Incorrect Credentials');
          break;
        case ResponseCode.NOT_FOUND:
          this._toastr.warning(error.responseResult, 'Not found');
          break;
        case ResponseCode.BAD_REQUEST:
          this._toastr.warning(error.responseResult, 'Bad Request');
          break;
        default:
          this._toastr.warning(error.responseMessage);
          break;
      }
    }
  }

  globalSuccessHandler(rez: ResponseStructure) {
    this.hideSpinner();
    this._toastr.success(rez.responseMessage);
  }

  successHandlerWithObject(rez: ResponseStructure) {
    this.hideSpinner();
    this._toastr.info(rez.responseResult);
  }

  handleUnauthenticated() {
    this._toastr.error('You have to be logged in', 'Incorrect Credentials');
  }

  handleNetworkError() {
    this._spinner.hide();
    this._toastr.error(
      'An unexpected error occurred, Please ensure that you are connected to the internet!'
    );
  }
  toast(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: icon,
      title: title,
    });
  }
}
