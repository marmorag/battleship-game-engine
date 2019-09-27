export class InvalidGameStatusException implements Error {

    public message: string;
    public name: string = InvalidGameStatusException.name;
    constructor(message: string) {
        this.message = message;
    }
}
