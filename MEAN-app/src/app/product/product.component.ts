import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductService } from "../Services/product.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private form: FormGroup;
  public Products:Object[];
  url;
  constructor(private productservice: ProductService,
    private http: HttpClient) { }

  ngOnInit() {
      this.productservice.getProduct().subscribe(response => {
      if (response.success) {
        this.Products = response.product;
        this.productservice.sendProduct(this.Products);
        console.log(this.Products)
        return true;
      }
      this.Products = [];
      return false;
    })
}
}
