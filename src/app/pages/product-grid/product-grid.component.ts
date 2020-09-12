import { Component, OnInit } from '@angular/core';
import { PaginationInfo } from 'src/app/_models/pagination';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  currentDate: Date = new Date();
  ads: any[] = [];
  paginationInfo: PaginationInfo;
  constructor() {}

  ngOnInit(): void {}
  getAds(event) {
    this.ads = event.ads;
    this.paginationInfo = event.paginationInfo;
    console.log(this.ads, this.paginationInfo);
  }
}
