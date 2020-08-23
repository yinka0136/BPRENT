import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/_services/coin.service';
import { ResponseStructure } from 'src/app/_models/respose';
import { CatStatesService } from 'src/app/_services/cat-states.service';
import { PaystackOptions } from 'angular4-paystack';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

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
  keyword;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private coinService: CoinService,
    private category: CatStatesService
  ) {}

  ngOnInit(): void {
    if (this.loggedIn()) {
      this.email = JSON.parse(localStorage.getItem('user')).email;
      this.userRole = JSON.parse(localStorage.getItem('user')).role;
      this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    }
    this.getAllCategories();
    console.log(this.loggedIn());
  }
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    console.log('Payment successfull', ref);
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
  getInput(keyword) {
    this.keyword = keyword;
  }
  search() {
    this.router.navigate(['products']);
    console.log(this.keyword);
  }

  // async buy() {
  //   const { value: amount } = await Swal.fire({
  //     title: '1 coin = 100Naira',
  //     input: 'number',
  //     inputPlaceholder: 'Number of coins',
  //   });

  //   if (amount) {
  //     this.amount = amount;
  //     this.amount = this.amount * 100 * 100;
  //     console.log(this.amount);
  //     this.paystack.nativeElement.click();
  //   }
  // }

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
  }
}
