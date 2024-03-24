export class User {

    constructor(
        private id: number,
        private name: string,
        private email: string,
        private password: string,
    ) { }


    public get Id(): number {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public get Email(): string {
        return this.email;
    }

    public get Password(): string {
        return this.password;
    }


    public set Id(id: number) {
        this.id = id;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public set Email(email: string) {
        this.email = email;
    }

    public set Password(password: string) {
        this.password = password;
    }

    public static toJson(user: User): any {
        return {
            id: user.Id,
            name: user.Name,
            email: user.Email,
            password: user.Password
        };
    }

    public static fromJson(json: any): User {
        const user = new User(
            json.id,
            json.name,
            json.email,
            json.password,
        );
        return user;
    }

    public static Empty(): User {
        return new User(0, '', '', '');
    }
}
