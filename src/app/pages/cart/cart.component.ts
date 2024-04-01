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
		this.cartItems = this.cartService.getCart();
	}

	removeFromCart(productId: string) {
		this.cartService.deleteFromCart(productId);
		this.cartItems = this.cartService.getCart();
	}

	decrementQuantity(productId: string) {
		const cartItem = this.cartItems.find(item => item.id === productId);
		if (cartItem && cartItem.counter > 1) {
			cartItem.counter--;
			this.cartService.updateCart(cartItem);
		}
	}

	incrementQuantity(productId: string) {
		const cartItem = this.cartItems.find(item => item.id === productId);
		if (cartItem) {
			cartItem.counter++;
			this.cartService.updateCart(cartItem);
		}
	}

	calculateTotalPrice(): string {
		let totalPrice = 0;
		this.cartItems.forEach(item => totalPrice += item.price * item.counter);
		return totalPrice.toFixed(2);
	}

	clearCart() {
		this.cartService.clearCart();
		this.ngOnInit();
	}
}
