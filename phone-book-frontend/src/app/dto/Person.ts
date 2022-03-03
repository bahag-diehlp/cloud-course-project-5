export class Person {
    constructor(firstName: string, lastName: string, id: string, email: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.email = email;
    }
    firstName: string;
    lastName: string;
    id: string;
    email: string;
}
