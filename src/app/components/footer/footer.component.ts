import { AuthenticationService } from './../../_services/auth.service';
import { AuthService } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ExpectedConditions } from 'protractor';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private _auth: AuthenticationService) {}

  ngOnInit(): void {}
  loggedIn() {
    return this._auth.loggedIn();
  }
}
