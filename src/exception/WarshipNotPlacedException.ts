export class WarshipNotPlacedException implements Error {
    public message: string = "The warship you are trying to use has not been placed yet.";
    public name: string = "Warship Not Placed Exception";
}
