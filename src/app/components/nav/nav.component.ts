import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/_services/coin.service';
import { ResponseStructure } from 'src/app/_models/respose';
import { CatStatesService } from 'src/app/_services/cat-states.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  categories: any[] = [];
  // @ViewChild('query', { static: false }) query: ElementRef<HTMLInputElement>;
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
  manageCat() {
    this.router.navigate(['create-category']);
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

  buyCoin(payload) {
    this.coinService.buyCoins(payload).subscribe((res: ResponseStructure) => {
      console.log(res);
    });
  }

  getAllCategories() {
    this.category.getAllCategories().subscribe({
      next: (res: ResponseStructure) => {
        this.categories = res.responseResult;
      },
    });
  }
}
