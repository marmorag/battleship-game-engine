
export class RandomPicker {

    static randomFromEnum<T>(anEnum: T): T[keyof T] {
        const enumValues = Object.keys(anEnum)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][];

        const randomIndex = Math.floor(Math.random() * enumValues.length);

        return enumValues[randomIndex];
    }

    static randomFromArray<T>(elements: T[]): T {
        return  elements[Math.floor(Math.random()*elements.length)];
    }
}
