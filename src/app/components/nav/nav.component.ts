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
  sub: Subscription = new Subscription();
  email: any;
  amount: any;
  categories: any[] = [];
  reference;
  options: PaystackOptions = {
    amount: 100 * 100,
    email: JSON.parse(localStorage.getItem('user')).email,
    ref: `${Math.ceil(Math.random() * 10e10)}`,
  };
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
    this.getAllCategories();
    console.log(this.loggedIn());
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    console.log('Payment successfull', ref);
    // this.buyCoin();
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

  async buy() {
    const { value: amount } = await Swal.fire({
      title: '1 coin = 60kobo',
      input: 'number',
      inputPlaceholder: 'Enter amount of coin to buy',
    });

    if (amount) {
      this.amount = amount;
      console.log(this.amount);
      this.paystack.nativeElement.click();
    }
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
