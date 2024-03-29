export class Product {
	constructor(
		public id: string,
		public title: string,
		public price: number,
		public description: string,
		public imageURL: string,
		public counter: number
	) { }

	static fromJson(json: any): Product {
		return new Product(
			json.id,
			json.title,
			json.price,
			json.description,
			json.imageURL,
			json.counter
		);
	}

	static fromJsonArray(json: any[]): Product[] {
		return json.map(Product.fromJson);
	}

	toString(): string {
		return `Product(id=${this.id}, title=${this.title}, price=${this.price}, description=${this.description}, image=${(this.imageURL)})`;
	}

	toJson(): any {
		return {
			id: this.id,
			title: this.title,
			price: this.price,
			description: this.description,
			imageURL: this.imageURL,
		};
	}
}
