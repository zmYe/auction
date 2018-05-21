import { Injectable } from '@angular/core';
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {
  }

  // private stocks: Stock[] = [
  //   new Stock(1, '第一只股票', 1.9, 3.5, '这是第一只股票，是我在学习慕课网Angular入门实战时创建的', ['IT', '互联网']),
  //   new Stock(2, '第二只股票', 2.9, 4.5, '这是第二只股票，是我在学习慕课网Angular入门实战时创建的', ['金融']),
  //   new Stock(3, '第三只股票', 3.9, 2.5, '这是第三只股票，是我在学习慕课网Angular入门实战时创建的', ['IT']),
  //   new Stock(4, '第四只股票', 4.9, 1.5, '这是第四只股票，是我在学习慕课网Angular入门实战时创建的', ['互联网']),
  //   new Stock(6, '第五只股票', 6.9, 3.5, '这是第六只股票，是我在学习慕课网Angular入门实战时创建的', ['金融']),
  //   new Stock(7, '第六只股票', 7.9, 5.0, '这是第七只股票，是我在学习慕课网Angular入门实战时创建的', ['IT', '金融']),
  //   new Stock(8, '第七只股票', 8.9, 4.5, '这是第八只股票，是我在学习慕课网Angular入门实战时创建的', ['金融', '互联网'])
  // ];


  getStocks(name?: string): Observable<Stock[]>{
    // return this.stocks;
    let params: HttpParams = new HttpParams();
    if(name != null ) {
      params = params.append("name",name);
    }
    return this.http.get<Stock[]>('/api/stock', {params:params});

  }

  getStock(id: number): Observable<Stock> {
    // let stock: Stock = this.stocks.find(sto => sto.id == id);
    // if (!stock) {
    //   stock = new Stock(0, '', 0, 0, '', []);
    // }
    // return stock;
    return this.http.get<Stock>('/api/stock/' + id);
  }

}

export class Stock {
  constructor(public id: number,
              public name: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {

  }
}
