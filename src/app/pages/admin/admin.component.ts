import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [FontAwesomeModule, RouterModule],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
	faAdd = faAdd;
	faPencilAlt = faPencilAlt;
	faTrash = faTrash;

	products: Product[] = [];

	constructor(
		private authServices: AuthService,
		private router: Router,
		private productServices: ProductService,
		private firestore: AngularFirestore
	) { }

	ngOnInit() {
		this.productServices.fetchAllProducts().then(products => {
			this.products = products as Product[];
		});
	}

	editProduct(product: Product) {
	}

	async deleteProduct(product: Product) {
		try {
			await this.firestore.collection('products').doc(product.id).delete();
			console.log('Product deleted successfully');
			this.products = this.products.filter(p => p.id !== product.id);
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	}
}
