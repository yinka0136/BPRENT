import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdServiceService } from 'src/app/_services/ad-service.service';
import { GlobalService } from 'src/app/_services/global.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  newAds: any[] = [];
  boostedAds: any[] = [];
  sub: Subscription = new Subscription();
  trendingAds: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private adService: AdServiceService,
    private _global: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log(res);
      const result = res['resolvedData'];
      this.categories = result['categories'].responseResult;
      this.newAds = result['newAds'].responseResult;
      this.trendingAds = result['trendingAds'].responseResult;
      this.boostedAds = result['boostedAds'].responseResult;
      console.log(this.boostedAds);
    });
    $('.carousel').carousel({
      interval: 3000,
    });
  }
  toggleSaveTrending(slug, index, e) {
    e.stopPropagation();
    e.preventDefault();
    this.sub.add(
      this.adService.toggleSaveAd(slug).subscribe({
        next: (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: res['responseMessage'],
          });
          console.log(res);
          this.trendingAds[index].bookmarked = !this.trendingAds[index]
            .bookmarked;
        },
      })
    );
  }
  toggleSaveNew(slug, index, e) {
    e.stopPropagation();
    e.preventDefault();
    this.sub.add(
      this.adService.toggleSaveAd(slug).subscribe({
        next: (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: res['responseMessage'],
          });
          console.log(res);
          this.newAds[index].bookmarked = !this.newAds[index].bookmarked;
        },
      })
    );
  }

  searchBySubCat(slug) {
    this._global.showSpinner();
    const payload = { slug: slug, page: 1, size: 5 };
    this.adService.searchAdBySubCategory(payload).subscribe({
      next: (res) => {
        this._global.hideSpinner();
        console.log(res['responseResult']);
        const response = res['responseResult'];
        this.adService.setData(response);
        this.router.navigate(['products']);
      },
    });
  }
  ngOnDestroy(): void {}
}
