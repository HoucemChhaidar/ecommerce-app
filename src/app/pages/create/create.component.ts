import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
	selector: 'app-create',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './create.component.html',
	styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
	newProduct: any = {};

	constructor(
		private storage: AngularFireStorage,
		private firestore: AngularFirestore
	) { }

	ngOnInit() { }

	async onImageSelected(event: any) {
		const file = event.target.files[0];
		const filePath = `products/${Math.random().toString(36).substring(2, 15)}-${file.name}`;

		try {
			``
			const uploadTask = await this.storage.upload(filePath, file);
			const imageURL = await uploadTask.ref.getDownloadURL();
			this.newProduct.imageURL = imageURL;
		} catch (error) {
			console.error('Image upload error:', error);

		}
	}

	onSubmit() {
		this.newProduct.id = Math.random().toString(36).substring(2, 15);
		this.firestore.collection('products').doc(this.newProduct.id).set(this.newProduct)
			.then(response => {
				console.log('Product created successfully:', response);
				this.newProduct = {};
			})
			.catch(error => {
				console.error('Error creating product:', error);
			});
	}
}
