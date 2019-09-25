export class WarshipNotPlacedException implements Error {
    message: string = 'The warship you are trying to use has not been placed yet.';
    name: string = 'Warship Not Placed Exception';
}
