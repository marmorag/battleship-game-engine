export class InvalidOrientationException implements Error {
    public name: string = "Invalid Orientation Exception";
    public message: string = "The current orientation do not match any known one.";
}
