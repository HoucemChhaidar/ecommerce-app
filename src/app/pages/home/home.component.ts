import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../Models/Product/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Add this line for styling
})
export class HomeComponent {
  products: Product[] = [];
  constructor(authServices: AuthService, router: Router, public productServices: ProductService) {
    if (authServices.authenticated == false) {
      router.navigate(['/login']);
    }
    this.productServices.fetchAllProducts().then(products => {
      this.products = products;
    });
  }
}
