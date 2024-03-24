export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public description: string,
        public category: string,
        public image: string
    ) { } 

    static fromJson(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.price,
            json.description,
            json.category,
            json.image
        );
    } 

    static fromJsonArray(json: any[]): Product[] {
        return json.map(Product.fromJson);
    } 
    
    toString(): string {
        return `Product(id=${this.id}, name=${this.name}, price=${this.price}, description=${this.description}, category=${this.category}, image=${this.image})`;
    } 
    
    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.image,
        };
    }
}
