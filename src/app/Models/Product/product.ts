export class Product {
	constructor(
		public id: number,
		public name: string,
		public price: number,
		public description: string,
		public categoryIds: number[],
		public image: string,
		public quantity: number
	) { }

	static fromJson(json: any): Product {
		return new Product(
			json.id,
			json.name,
			json.price,
			json.description,
			json.categoryIds,
			json.image,
			json.quantity
		);
	}

	static fromJsonArray(json: any[]): Product[] {
		return json.map(Product.fromJson);
	}

	toString(): string {
		return `Product(id=<span class="math-inline">\{this\.id\}, name\=</span>{this.name}, price=<span class="math-inline">\{this\.price\}, description\=</span>{this.description}, categoryIds=<span class="math-inline">\{this\.categoryIds\}, image\=</span>{this.image}, quantity=${this.quantity})`;
	}

	toJson(): any {
		return {
			id: this.id,
			name: this.name,
			price: this.price,
			description: this.description,
			categoryIds: this.categoryIds,
			image: this.image,
			quantity: this.quantity
		};
	}
}
