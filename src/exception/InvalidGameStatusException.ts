export class InvalidGameStatusException implements Error {
    constructor(message: string) {
        this.message = message;
    }

    message: string;
    name: string = InvalidGameStatusException.name;
}
