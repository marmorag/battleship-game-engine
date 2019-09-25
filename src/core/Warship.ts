import {Coordinate, Orientation} from "..";
import {InvalidOrientationException} from "..";

export enum WarshipClass {
    CARRIER,
    DESTROYER,
    CRUISER,
    FRIGATE
}

export enum WarshipPartStatus {
    NOMINAL,
    HIT
}

export abstract class Warship {
    protected _class: WarshipClass;
    protected _size: number;
    protected _partStatus: Array<WarshipPartStatus>;
    protected _isAlive: Boolean;

    /**
     * Head of the ship coordinate
     */
    protected _head: Coordinate;
    /**
     * Direction to the tail from the head
     */
    protected _orientation: Orientation;

    protected constructor(size: number, shipClass: WarshipClass) {
        this._size = size;
        this._class = shipClass;
        this._isAlive = true;
        this._partStatus = Array(this._size).fill(WarshipPartStatus.NOMINAL);
    }

    public setPosition(coordinate: Coordinate, orientation: Orientation) {
        this._head = coordinate;
        this._orientation = orientation;
    }

    public hasBeenHit(coordinate: Coordinate): Boolean {
        let hasHit: Boolean = false;

        switch (this._orientation) {
            case Orientation.NORTH:
                hasHit = (this._head.y <= coordinate.y && coordinate.y <= (this._head.y + this._size)) && this._head.x === coordinate.x;
                break;
            case Orientation.SOUTH:
                hasHit = ((this._head.y - this._size) <= coordinate.y && coordinate.y <= this._head.y) && this._head.x === coordinate.x;
                break;
            case Orientation.EAST:
                hasHit = (this._head.x <= coordinate.x && coordinate.x <= (this._head.x + this._size)) && this._head.y === coordinate.y;
                break;
            case Orientation.WEST:
                hasHit = ((this._head.x - this._size) <= coordinate.x && coordinate.x <= this._head.x) && this._head.y === coordinate.y;
                break;
            default:
                throw new InvalidOrientationException();
        }

        if (hasHit) {
            this._updateStatus(coordinate);
        }

        return hasHit;
    }


    class(): WarshipClass {
        return this._class;
    }

    size(): number {
        return this._size;
    }

    partStatus(): Array<WarshipPartStatus> {
        return this._partStatus;
    }

    isAlive(): Boolean {
        return this._isAlive;
    }

    head(): Coordinate {
        return this._head;
    }

    orientation(): Orientation {
        return this._orientation;
    }

    private _updateStatus(coordinate: Coordinate) {
        let hitPosition: number;

        switch (this._orientation) {
            case Orientation.NORTH:
                hitPosition = coordinate.y - this._head.y;
                break;
            case Orientation.SOUTH:
                hitPosition = this._head.y - coordinate.y;
                break;
            case Orientation.EAST:
                hitPosition = coordinate.y - this._head.y;
                break;
            case Orientation.WEST:
                hitPosition = this._head.y - coordinate.y;
                break;
            default:
                throw new InvalidOrientationException();
        }

        this._partStatus[hitPosition] = WarshipPartStatus.HIT;

        this._isAlive = this._partStatus.includes(WarshipPartStatus.NOMINAL)
    }
}

export class Carrier extends Warship{
    constructor() {
        super(4, WarshipClass.CARRIER);
    }
}

export class Destroyer extends Warship{
    constructor() {
        super(3, WarshipClass.DESTROYER);
    }
}

export class Cruiser extends Warship{
    constructor() {
        super(2, WarshipClass.CRUISER);

    }
}

export class Frigate extends Warship{
    constructor() {
        super(1, WarshipClass.FRIGATE);
    }
}
