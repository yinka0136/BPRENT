import { ResponseStructure } from './../../_models/respose';
import { PagedResponse } from 'src/app/_models/pagination';
import { PaginationInfo } from './../../_models/pagination';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  adminForm: FormGroup;
  updatePasswordForm: FormGroup;
  allPaginationInfo: PaginationInfo;
  pendingPaginationInfo: PaginationInfo;
  disabledPaginationInfo: PaginationInfo;
  approvedPaginationInfo: PaginationInfo;
  declinedPaginationInfo: PaginationInfo;
  expiredPaginationInfo: PaginationInfo;
  closedPaginationInfo: PaginationInfo;

  avatarUrl;
  myProfile;
  allAds: any[] = [];
  pending: any[] = [];
  disabled: any[] = [];
  approved: any[] = [];
  declined: any[] = [];
  expired: any[] = [];
  closed: any[] = [];
  show: boolean = false;
  IsHidden;

  sub: Subscription = new Subscription();
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private ad: AdServiceService,
    private _global: GlobalService,
    private fb: FormBuilder,
    private _user: UsersService
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
      const adDetails = res['resolvedData'].allAds['result'];
      this.allAds = adDetails.ads;
      this.allPaginationInfo = adDetails.paginationInfo;
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
      this.ad.myAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.allAds = res.result['ads'];
          this.allPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  navigatePendingPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.findAllPendingAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.pending = res.result['ads'];
          this.pendingPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  navigateApprovedPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.findAllApprovedAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.approved = res.result['ads'];
          this.approvedPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  navigateDisabledPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.findAllDisabledAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.disabled = res.result['ads'];
          this.disabledPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  navigateDeclinedPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.findAllDeclinedAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.declined = res.result['ads'];
          this.declinedPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  navigateExpiredPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.findAllExpiredAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.expired = res.result['ads'];
          this.expiredPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  navigateClosedPage(page) {
    console.log(page);
    this._global.showSpinner();
    this.sub.add(
      this.ad.findAllClosedAds(page, 10).subscribe({
        next: (res: PagedResponse<any>) => {
          this._global.hideSpinner();
          this.closed = res.result['ads'];
          this.closedPaginationInfo = res.result['paginationInfo'];
        },
      })
    );
  }
  manageCat() {
    this.router.navigate(['create-category']);
  }
  deleteAd(slug) {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    // }).then((result) => {
    //   if (result.value) {
    //     this.delete(slug);
    //   }
    // });
  }

  // delete(slug) {
  //   this.ad.deleteAd(slug).subscribe({
  //     next: (res) => {
  //       this.myAds = this.myAds.filter((a) => a.slug != slug);
  //       console.log(res);
  //       Swal.fire('Deleted!', 'Your ad has been deleted.', 'success');
  //     },
  //   });
  // }
  createAdmin() {
    this._global.showSpinner();
    const payload = this.adminForm.value;
    this.sub.add(
      this._user.createAdmin(payload).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this.adminForm.reset();
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
