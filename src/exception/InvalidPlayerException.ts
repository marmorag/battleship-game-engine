export class InvalidPlayerException implements Error {
    message: string = 'An error happend with a player';
    name: string = InvalidPlayerException.name;

    constructor(message: string) {
        this.message = message;
    }

}
