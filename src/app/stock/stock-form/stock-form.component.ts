import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Stock, StockService} from '../stock.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stock: Stock = new Stock(0,'',0,0,'',[]);

  formModel: FormGroup;

  categories = ['IT', '互联网','金融'];

  constructor(private routeInfo: ActivatedRoute, private stockServic: StockService, private router: Router) {
  }

  ngOnInit() {
    let stockId: number = this.routeInfo.snapshot.params['id'];
    // this.routeInfo.params.subscribe((params: Params) => stockId = params['id']);

    let fb: FormBuilder = new FormBuilder();
    this.formModel = fb.group({
      name: [this.stock.name, [Validators.required, Validators.minLength(3)]],
      price: [this.stock.price, Validators.required],
      desc: [this.stock.desc],
      categories: fb.array([
        new FormControl(this.stock.categories.indexOf(this.categories[0]) != -1),
        new FormControl(this.stock.categories.indexOf(this.categories[1]) != -1),
        new FormControl(this.stock.categories.indexOf(this.categories[2]) != -1)
      ], this.categoriesSelectValidator)
    });

    this.stockServic.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        this.formModel.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categories: [
            data.categories.indexOf(this.categories[0]) != -1,
            data.categories.indexOf(this.categories[1]) != -1,
            data.categories.indexOf(this.categories[2]) != -1
          ]

        });
      }
    );
  }

  categoriesSelectValidator(control: FormArray) {
    var valid = false;
    control.controls.forEach(control => {
      if (control.value)
        valid = true;
    });

    if (valid) {
      return null;
    } else {
      return {categoriesLength:true};
    }


  }

  cancel() {
    this.router.navigateByUrl('/stock')
  }

  save() {
    var chineseCategories = [];
    let index = 0;
    for(let i=0; i<3; i++) {
      if(this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.categories = chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    console.log(this.formModel.value);
    console.log(this.formModel.get('categories').errors);
    //this.router.navigateByUrl('/stock')
  }

}
