export enum WarshipClass {
    CARRIER,
    DESTROYER,
    CRUISER,
    FRIGATE
}

export abstract class Warship {
    protected readonly class: WarshipClass;
    protected readonly size: number;
    protected partStatus: Array<Boolean>;
    protected isAlive: Boolean;

    protected constructor() {
        this.partStatus = Array(this.size).fill(true);
        this.isAlive = true;
    }
}

export class Carrier extends Warship{
    protected readonly class = WarshipClass.CARRIER;
    protected readonly size = 4;
}

export class Destroyer extends Warship{
    protected readonly class = WarshipClass.DESTROYER;
    protected readonly size = 3;
}

export class Cruiser extends Warship{
    protected readonly class = WarshipClass.CRUISER;
    protected readonly size = 2;
}

export class Frigate extends Warship{
    protected readonly class = WarshipClass.FRIGATE;
    protected readonly size = 1;
}
