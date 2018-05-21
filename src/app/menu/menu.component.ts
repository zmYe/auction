import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _menus: Array<Menu>;
  private _currentMenuId: number;


  get menus(): Array<Menu> {
    return this._menus;
  }

  set menu(value: Array<Menu>) {
    this._menus = value;
  }

  get currentMenuId(): number {
    return this._currentMenuId;
  }

  set currentMenuId(value: number) {
    this._currentMenuId = value;
  }

  constructor(public router: Router) {
  }

  ngOnInit() {
    this._menus = [
      new Menu(1, '首页', 'dashboard'),
      new Menu(2, '股票管理', 'stock')
    ];

    this._currentMenuId = 1;
  }

  nav(menu: Menu) {
    this.router.navigateByUrl(menu.link);
    this._currentMenuId = menu.id;
  }
}

export class Menu {
  constructor(public id: number,
              public name: string,
              public link: string) {
  }
}
