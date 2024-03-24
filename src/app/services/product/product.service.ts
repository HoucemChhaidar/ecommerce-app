import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../Models/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  public async fetchAllProducts() {

    const products: Product[] = [];
    const response = await this.http.get('http://localhost:3000/products').subscribe(
      (data: any) => {
        for (const product of data) {
          products.push(Product.fromJson(product));
        }
      });
    return products;
  }
}
