export class ApiResponse<T> {

    constructor(result: T, statusCode: number, message: string, errors: string[]){
        this.result = result;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
    result: T;
    statusCode: number;
    message: string;
    errors: string[];
}
