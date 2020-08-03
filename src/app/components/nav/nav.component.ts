import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
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
}
