import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../Models/Product/product';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private http: HttpClient, private firestore: AngularFirestore) { }

	public async fetchAllProducts() {
		const products = await this.firestore.collection('products').get().toPromise();
		return products?.docs.map(doc => doc.data() as any);
	}

	public async fetchProductById(id: string) {
		const product = await this.firestore.collection('products').doc(id).get().toPromise();
		return product?.data();
	}

	public async addProduct(product: Product) {
		(await this.firestore.collection('products').add(product.id)).set({
			...product,
		});
	}

	public async updateProduct(product: Product) {
		(await this.firestore.collection('products').doc(product.id.toString()).update({
			...product,
		}));
	}

	public async deleteProduct(product: Product) {
		(await this.firestore.collection('products').doc(product.id.toString()).delete());
		console.log('Product deleted');
		return true;
	}
}
