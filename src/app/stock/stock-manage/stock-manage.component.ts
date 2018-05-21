import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Stock, StockService} from '../stock.service';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {

  stocks: Observable<Stock[]>;

  nameFilter: FormControl = new FormControl();

  keyword: string;

  constructor(public router: Router, private stockServic: StockService) {
  }

  ngOnInit() {
    this.stocks = this.stockServic.getStocks();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => {
        this.keyword = value;
        this.stocks = this.stockServic.getStocks(value);
      });
  }

  create() {
    this.router.navigateByUrl('stock/0');
  }

  update(stock: Stock) {
    this.router.navigateByUrl('stock/' + stock.id);
  }

}
