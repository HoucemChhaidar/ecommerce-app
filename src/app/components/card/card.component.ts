import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../Models/Product/product';
import { CartService } from '../../services/cart/cart.service';

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
	constructor(private cartServices: CartService) { }

	addToCart(product: Product) {
		this.cartServices.addToCart(product);
	}
}
