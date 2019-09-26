export class InvalidPlacementException implements Error {
    constructor(message: string) {
        this.message = message;
    }

    message: string;
    name: string = InvalidPlacementException.name;
}
