export class Category {
	constructor(
		private id: number,
		private name: string,
	) { }

	public get Id(): number {
		return this.id;
	}

	public get Name(): string {
		return this.name;
	}


	public set Name(name: string) {
		this.name = name;
	}

	public set Id(id: number) {
		this.id = id;
	}

	public toJson(): any {
		return {
			id: this.id,
			name: this.name,
		};
	}

	public static fromJson(json: any): Category {
		return new Category(json.id, json.name);
	}

}
