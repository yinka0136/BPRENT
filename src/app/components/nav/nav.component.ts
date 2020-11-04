import { PaginationInfo } from './../../_models/pagination';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/_services/coin.service';
import { ResponseStructure } from 'src/app/_models/respose';
import { CatStatesService } from 'src/app/_services/cat-states.service';
import { PaystackOptions } from 'angular4-paystack';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/_services/global.service';
import { AdServiceService } from 'src/app/_services/ad-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  sub: Subscription = new Subscription();
  paystackAmount;
  amountCost;
  categories: any[] = [];
  reference;
  userRole;
  email;
  // options: PaystackOptions = {
  //   amount: this.amount * 100 * 100,
  //   email: JSON.parse(localStorage.getItem('user')).email,
  //   ref: `${Math.ceil(Math.random() * 10e10)}`,
  // };
  @ViewChild('paystack', { static: false }) paystack: ElementRef<
    HTMLInputElement
  >;
  // @Output() ads = new EventEmitter<{
  //   ads: [];
  //   paginationInfo: PaginationInfo;
  //   keyword: string;
  // }>();
  keyword;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private coinService: CoinService,
    private category: CatStatesService,
    private _global: GlobalService,
    private _ad: AdServiceService
  ) {}

  ngOnInit(): void {
    if (this.loggedIn()) {
      this.email = JSON.parse(localStorage.getItem('user')).email;
      this.userRole = JSON.parse(localStorage.getItem('user')).role;
      this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    }
    this.getAllCategories();
    console.log(this.loggedIn());
    window.addEventListener('scroll', this.myFunction, true);
  }
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    console.log('Payment successfull', ref);
    this.buyCoin();
    this.closeModal.nativeElement.click();
  }

  paymentCancel() {
    console.log('payment failed');
  }

  logIn() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/register']);
  }
  loggedIn(): boolean {
    return this.auth.loggedIn();
  }
  postAdd() {
    this.router.navigate(['ad/post']);
  }

  routeHome() {
    this.router.navigate(['home']);
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getInput(keyword, event) {
    this.keyword = keyword;
    if (event.keyCode == 13) {
      this.search();
    }
  }
  search() {
    this._global.showSpinner();
    this._ad.search(0, 5, this.keyword).subscribe({
      next: (res) => {
        this._global.hideSpinner();
        console.log(res['responseResult']);
        const response = res['responseResult'];
        response.keyword = this.keyword;
        this._ad.setData(response);
        this.router.navigate(['products']);
      },
    });
  }

  getAmount(amount) {
    this.paystackAmount = amount * 100 * 100;
    this.amountCost = amount * 100;
  }

  buyCoin() {
    const payload = { reference: this.reference };
    this.sub.add(
      this.coinService.buyCoins(payload).subscribe((res: ResponseStructure) => {
        console.log(res);
      })
    );
  }
  getAllCategories() {
    this.category.getAllCategories().subscribe({
      next: (res: ResponseStructure) => {
        this.categories = res.responseResult;
      },
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    window.removeEventListener('scroll', this.myFunction, true);
  }

  myFunction() {
    var navbar = document.getElementById('myStickyNav');
    var sticky = navbar.offsetTop;
    if (window.pageYOffset >= sticky) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
}
