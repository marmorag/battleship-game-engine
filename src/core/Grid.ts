import {Coordinate, Orientation, WarshipPlacementStatus} from "..";
import {CollisionDetector, CollisionStatus} from "../utils/CollisionDetector";
import {Warship} from "./Warship";

export class Grid {
    private readonly _size: number;
    private readonly _hitPositions: Coordinate[];
    private _warshipPositions: Warship[];

    constructor(size: number) {
        this._size = size;
        this._hitPositions = [];
        this._warshipPositions = [];
    }

    get size(): number {
        return this._size;
    }

    get warshipPositions(): Warship[] {
        return this._warshipPositions;
    }

    set warshipPositions(value: Warship[]) {
        this._warshipPositions = value;
    }

    get hitPositions(): Coordinate[] {
        return this._hitPositions;
    }

    public hitPosition(coordinate: Coordinate) {
        this._hitPositions.push(coordinate);
    }

    public isPlaceable(coordinate: Coordinate, orientation: Orientation, warship: Warship): WarshipPlacementStatus {
        if (CollisionDetector
            .detectBorderCollision(coordinate, orientation, warship, this.size) === CollisionStatus.COLLIDE) {
            return WarshipPlacementStatus.OUTBOUND;
        }

        for (const innerWarship of this.warshipPositions) {
            if (!!innerWarship.head() && innerWarship.collide(warship)) {
                return WarshipPlacementStatus.COLLIDE;
            }
        }

        return WarshipPlacementStatus.AVAILABLE;
    }
}
