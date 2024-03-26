import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product/product';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCart(); // Call getCart on init
  }

  removeFromCart(productId: number) {
    this.cartService.deleteFromCart(new Product(productId, '', 0, '', [], '', 0)); // Pass a minimal Product instance for deletion
    this.cartItems = this.cartService.getCart(); // Refresh the cart items
  }

  decrementQuantity(productId: number) {
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.updateCart(cartItem); // Update cart with adjusted quantity
    }
  }

  incrementQuantity(productId: number) {
    const cartItem = this.cartItems.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
      this.cartService.updateCart(cartItem); // Update cart with adjusted quantity
    }
  }

  calculateTotalPrice(): string {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.price * item.quantity);
    return totalPrice.toFixed(2);
  }

  clearCart() {
    this.cartService.clearCart();
    this.ngOnInit();
  }
}
