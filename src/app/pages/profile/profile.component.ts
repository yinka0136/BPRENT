import { ResponseStructure } from 'src/app/_models/respose';
import { MessageService } from 'src/app/_services/message.service';
import { PagedResponse } from 'src/app/_models/pagination';
import { PaginationInfo } from './../../_models/pagination';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AdServiceService } from 'src/app/_services/ad-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/_services/users.service';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  adminForm: FormGroup;
  message: string;
  updatePasswordForm: FormGroup;
  avatarUrl;
  favoritAds: any[] = [];
  myProfile;
  myAds: any[] = [];
  pending: any[] = [];
  disabled: any[] = [];
  approved: any[] = [];
  declined: any[] = [];
  messageIndex: any = 0;
  expired: any[] = [];
  closed: any[] = [];
  sentMessages: any[] = [];
  show: boolean = false;
  recievedMessages: any[] = [];
  favoritAdsPaginationInfo: PaginationInfo;
  myAdsPaginationInfo: PaginationInfo;
  pendingPaginationInfo: PaginationInfo;
  disabledPaginationInfo: PaginationInfo;
  approvedPaginationInfo: PaginationInfo;
  declinedPaginationInfo: PaginationInfo;
  expiredPaginationInfo: PaginationInfo;
  closedPaginationInfo: PaginationInfo;
  sentMessagesPaginationInfo: PaginationInfo;
  recievedMessagesPaginationInfo: PaginationInfo;
  IsHidden;

  sub: Subscription = new Subscription();
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private ad: AdServiceService,
    private _global: GlobalService,
    private fb: FormBuilder,
    private _user: UsersService,
    private _message: MessageService
  ) {}

  ngOnInit(): void {
    this.getResolvedProfileDetails();
    this.initProfileForm();
    this.initAdminForm();
    this.profileForm.disable();
    this.initPasswordUpdateForm();
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      email: [this.myProfile.email, [Validators.email]],
      firstName: [this.myProfile.firstName],
      lastName: [this.myProfile.lastName],
      address: [this.myProfile.address],
      phoneNumber: [
        this.myProfile.phoneNumber,
        [
          Validators.pattern(
            '^[+]([0-9]{3})(((8)(0|1))|((7)(0))|((9)(0)))\\d{8}$'
          ),
        ],
      ],
    });
  }
  initAdminForm() {
    this.adminForm = this.fb.group({
      email: ['', [Validators.email]],
      firstName: ['', [Validators.email]],
      lastName: ['', [Validators.email]],
      password: ['', [Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[+]([0-9]{3})(((8)(0|1))|((7)(0))|((9)(0)))\\d{8}$'
          ),
        ],
      ],
    });
  }
  initPasswordUpdateForm() {
    this.updatePasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    });
  }
  getResolvedProfileDetails() {
    this.route.data.subscribe((res) => {
      console.log(res);
      this.myProfile = res['resolvedData'].profile['responseResult'];
      const favoriteResponse = res['resolvedData'].favorites['result'];
      this.favoritAds = favoriteResponse.ads;
      this.favoritAdsPaginationInfo = favoriteResponse.paginationInfo;
      const myAdsResponse = res['resolvedData'].myAds['result'];
      this.myAds = myAdsResponse.ads;
      this.myAdsPaginationInfo = myAdsResponse.paginationInfo;
      this.pending = res['resolvedData'].pending['result'].ads;
      this.pendingPaginationInfo =
        res['resolvedData'].pending['result'].paginationInfo;
      this.approved = res['resolvedData'].approved['result'].ads;
      this.approvedPaginationInfo =
        res['resolvedData'].approved['result'].paginationInfo;
      this.declined = res['resolvedData'].declined['result'].ads;
      this.declinedPaginationInfo =
        res['resolvedData'].declined['result'].paginationInfo;
      this.disabled = res['resolvedData'].disabled['result'].ads;
      this.disabledPaginationInfo =
        res['resolvedData'].disabled['result'].paginationInfo;
      this.expired = res['resolvedData'].expired['result'].ads;
      this.expiredPaginationInfo =
        res['resolvedData'].expired['result'].paginationInfo;
      this.closed = res['resolvedData'].closed['result'].ads;
      this.closedPaginationInfo =
        res['resolvedData'].closed['result'].paginationInfo;
      const sentMessagesResponse = res['resolvedData'].sentMessages['result'];
      this.sentMessages = sentMessagesResponse.messages;
      this.sentMessagesPaginationInfo = sentMessagesResponse.paginationInfo;
      const recievedMessagesResponse =
        res['resolvedData'].recievedMessages['result'];
      this.recievedMessages = recievedMessagesResponse.messages;
      this.recievedMessagesPaginationInfo =
        recievedMessagesResponse.paginationInfo;
    });
  }
  uploadAvatar(file) {
    this._global.showSpinner();
    this.sub.add(
      this._user.uploadAvatar(file).subscribe({
        next: (res) => {
          this._global.hideSpinner();
          console.log(res);
        },
      })
    );
  }
  toggleDisabled() {
    var x = document.getElementById('update').innerText;
    console.log(x);
    if (x === 'Edit') {
      document.getElementById('update').innerText = 'Cancel';
    } else {
      document.getElementById('update').innerText = 'Edit';
    }
    if (x === 'Edit') {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }

    this.IsHidden = !this.IsHidden;
  }

  togglePasswordUpdate() {
    this.show = !this.show;
  }

  updatePassword() {
    this._global.showSpinner();
    const payload = this.updatePasswordForm.value;
    this.sub.add(
      this._user.updatePassword(payload).subscribe({
        next: (res: ResponseStructure) => {
          this._global.hideSpinner();
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  updateProfile() {
    const payload = this.profileForm.value;
    this._global.showSpinner();
    this._user.updateProfile(payload).subscribe({
      next: (res: ResponseStructure) => {
        console.log(res);
        this._global.globalSuccessHandler(res);
      },
    });
  }
  logout() {
    this.auth.logout();
  }
  navigateMyAdPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.myAds(page, 5).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.myAds = res.result['ads'];
          this.myAdsPaginationInfo = res.result['paginationInfo'];
          console.log(res, this.myAdsPaginationInfo);
        },
      })
    );
  }
  manageCat() {
    this.router.navigate(['create-category']);
  }
  deleteAd(slug) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.delete(slug);
      }
    });
  }
  copyToClipboard() {
    const referralLink = <HTMLInputElement>document.getElementById('referral');
    referralLink.select();
    referralLink.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Link copied to clipboard');
  }
  delete(slug) {
    this.ad.deleteAd(slug).subscribe({
      next: (res) => {
        this.myAds = this.myAds.filter((a) => a.slug != slug);
        console.log(res);
        Swal.fire('Deleted!', 'Your ad has been deleted.', 'success');
      },
    });
  }
  createAdmin() {
    this._global.showSpinner();
    const payload = this.adminForm.value;
    this.sub.add(
      this._user.createAdmin(payload).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  setI(i) {
    this.messageIndex = i;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendSent() {
    this._global.showSpinner();
    const payload = { message: this.message };
    this._message
      .createMessage(payload, this.sentMessages[this.messageIndex].from.slug)
      .subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
        },
      });
  }

  sendRecieved() {
    this._global.showSpinner();
    const payload = { message: this.message };
    this._message
      .createMessage(payload, this.sentMessages[this.messageIndex].from.slug)
      .subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
        },
      });
  }
}
