import {
    Coordinate,
    InvalidOrientationException,
    Orientation,
    WarshipAlreadyPlacedException,
    WarshipNotPlacedException,
} from "..";
import {CollisionDetector, CollisionStatus} from "../utils/CollisionDetector";

export enum WarshipClass {
    CARRIER,
    DESTROYER,
    CRUISER,
    FRIGATE,
}

export enum WarshipPartStatus {
    NOMINAL,
    HIT,
}

export enum WarshipPlacementStatus {
    OUTBOUND,
    COLLIDE,
    AVAILABLE,
}

export abstract class Warship {
    protected _partStatus: WarshipPartStatus[];
    protected _isAlive: boolean;
    /**
     * Identifier about warship class and so, its size
     */
    protected _class: WarshipClass;
    /**
     * The size of the warship
     */
    protected _size: number;
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
        if (!!this._head) {
            throw new WarshipAlreadyPlacedException();
        }

        this._head = coordinate;
        this._orientation = orientation;
    }

    public hasBeenHit(coordinate: Coordinate): boolean {
        if (!this._head || this._orientation === null) {
            throw new WarshipNotPlacedException();
        }

        let hasHit: boolean = false;

        switch (this._orientation) {
            case Orientation.NORTH:
                hasHit = (this._head.y <= coordinate.y && coordinate.y <= (this._head.y + (this._size - 1)))
                    && this._head.x === coordinate.x;
                break;
            case Orientation.SOUTH:
                hasHit = ((this._head.y - (this._size - 1)) <= coordinate.y && coordinate.y <= this._head.y)
                    && this._head.x === coordinate.x;
                break;
            case Orientation.EAST:
                hasHit = (this._head.x <= coordinate.x && coordinate.x <= (this._head.x + (this._size - 1)))
                    && this._head.y === coordinate.y;
                break;
            case Orientation.WEST:
                hasHit = ((this._head.x - (this._size - 1)) <= coordinate.x && coordinate.x <= this._head.x)
                    && this._head.y === coordinate.y;
                break;
        }

        if (hasHit) {
            this._updateStatus(coordinate);
        }

        return hasHit;
    }

    public collide(warship: Warship): boolean {
        return CollisionDetector.detectWarshipCollision(this, warship) === CollisionStatus.COLLIDE;
    }

    public class(): WarshipClass {
        return this._class;
    }

    public size(): number {
        return this._size;
    }

    public partStatus(): WarshipPartStatus[] {
        return this._partStatus;
    }

    public isAlive(): boolean {
        return this._isAlive;
    }

    public head(): Coordinate {
        return this._head;
    }

    public orientation(): Orientation {
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
                hitPosition = coordinate.x - this._head.x;
                break;
            case Orientation.WEST:
                hitPosition = this._head.x - coordinate.x;
                break;
            default:
                throw new InvalidOrientationException();
        }

        this._partStatus[hitPosition] = WarshipPartStatus.HIT;

        this._isAlive = this._partStatus.includes(WarshipPartStatus.NOMINAL);
    }
}
