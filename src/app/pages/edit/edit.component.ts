import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-edit',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
	product: any = {};
	productId: string | null = null;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	) { }

	ngOnInit() {
		this.productId = this.route.snapshot.paramMap.get('id');

		if (this.productId) {
			this.productService.fetchProductById(this.productId)
				.then(product => {
					if (product) {
						this.product = product;
					} else {
						console.error('Error: Product not found with ID:', this.productId);
					}
				})
				.catch(error => {
					console.error('Error fetching product:', error);
				});
		} else {
			console.error('Error: Missing product ID in route');
		}
	}

	onSubmit() {
		this.productService.updateProduct(this.product)
			.then(() => {
				console.log('Product updated successfully');
				this.router.navigate(['/admin']);
			})
			.catch(error => {
				console.error('Error updating product:', error);
			});
	}
}
