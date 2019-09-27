export class InvalidPlacementException implements Error {

    public message: string;
    public name: string = InvalidPlacementException.name;
    constructor(message: string) {
        this.message = message;
    }
}
