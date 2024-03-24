import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../../Models/Product/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  getCart(): Product[] {
    const cart: string | null | undefined = this.localStorage?.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (!Array.isArray(parsedCart)) {
        throw new Error('Cart data is not an array');
      }
      return parsedCart.map(product => Product.fromJson(product));
    } else {
      return [];
    }
  }

  clearCart() {
    this.localStorage?.removeItem('cart');
    console.log('Cart cleared');
    this.localStorage?.setItem('cart', JSON.stringify([]));
  }

  deleteFromCart(product: Product) {
    const cart: string | null | undefined = this.localStorage?.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (!Array.isArray(parsedCart)) {
        throw new Error('Cart data is not an array');
      }
      const index = parsedCart.findIndex(p => p.id === product.id);
      if (index !== -1) {
        parsedCart.splice(index, 1);
        this.localStorage?.setItem('cart', JSON.stringify(parsedCart));
      }
    }
  }

  updateCart(product: Product) {
    const cart: string | null | undefined = this.localStorage?.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (!Array.isArray(parsedCart)) {
        throw new Error('Cart data is not an array');
      }
      const index = parsedCart.findIndex(p => p.id === product.id);
      if (index !== -1) {
        parsedCart[index] = product.toJson();
        this.localStorage?.setItem('cart', JSON.stringify(parsedCart));
      }
    }
  }

  getTotalPrice(): number {
    const cart: string | null | undefined = this.localStorage?.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (!Array.isArray(parsedCart)) {
        throw new Error('Cart data is not an array');
      }
      return parsedCart.reduce((total, product) => total + product.price, 0);
    }
    return 0;
  }

}
