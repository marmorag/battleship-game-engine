
export class RandomPicker {
    public static randomFromArray<T>(elements: T[]): T {
        return  elements[Math.floor(Math.random() * elements.length)];
    }
}
