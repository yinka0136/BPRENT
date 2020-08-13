import { PagedResponse } from 'src/app/_models/pagination';
import { PaginationInfo } from './../../_models/pagination';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  favoritAds: any[] = [];
  myAds: any[] = [];
  sentMessages: any[] = [];
  recievedMessages: any[] = [];
  favoritAdsPaginationInfo: PaginationInfo;
  myAdsPaginationInfo: PaginationInfo;
  sentMessagesPaginationInfo: PaginationInfo;
  recievedMessagesPaginationInfo: PaginationInfo;

  sub: Subscription = new Subscription();
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getResolvedProfileDetails();
  }
  getResolvedProfileDetails() {
    this.route.data.subscribe((res) => {
      console.log(res);
      const favoriteResponse = res['resolvedData'].favorites['result'];
      this.favoritAds = favoriteResponse.ads;
      this.favoritAdsPaginationInfo = favoriteResponse.paginationInfo;
      const myAdsResponse = res['resolvedData'].myAds['result'];
      this.myAds = myAdsResponse.ads;
      this.myAdsPaginationInfo = myAdsResponse.paginationInfo;
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
  logout() {
    this.auth.logout();
  }
  navigateIndividualPage(event) {}
  manageCat() {
    this.router.navigate(['create-category']);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
