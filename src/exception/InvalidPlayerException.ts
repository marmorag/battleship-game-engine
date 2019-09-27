export class InvalidPlayerException implements Error {
    public message: string = "An error happend with a player";
    public name: string = InvalidPlayerException.name;

    constructor(message: string) {
        this.message = message;
    }

}
