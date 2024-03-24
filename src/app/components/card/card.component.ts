import { Component, Inject, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../Models/Product/product';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product!: Product;
  faShoppingCart = faShoppingCart;
  localStorage?: Storage;
  constructor(@Inject(DOCUMENT) document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  addToCart(product: Product) {
    try {
      let cart: string | null | undefined = this.localStorage?.getItem('cart');
      if (cart) {
        const parsedCart = JSON.parse(cart);
        if (!Array.isArray(parsedCart)) {
          throw new Error('Cart data is not an array');
        }
        parsedCart.push(product.toJson());
        cart = JSON.stringify(parsedCart);
      } else {
        cart = JSON.stringify([product.toJson()]);
      }
      this.localStorage?.setItem('cart', cart);
      console.log(cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  
  
}
