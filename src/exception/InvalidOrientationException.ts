export class InvalidOrientationException implements Error {
    name: string = 'Invalid Orientation Exception';
    message: string = 'The current orientation do not match any known one.';
}
