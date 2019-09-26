import {Coordinate, Orientation, WarshipPlacementStatus} from "..";
import {Warship} from "./Warship";

export class Grid {
    private readonly _size: number;
    private _hitPosition: Array<Coordinate>;
    private _warshipPositions: Array<Warship>;

    constructor(size: number) {
        this._size = size;
        this._hitPosition = [];
        this._warshipPositions = [];
    }

    get size(): number {
        return this._size;
    }

    get warshipPositions(): Array<Warship> {
        return this._warshipPositions;
    }

    set warshipPositions(value: Array<Warship>) {
        this._warshipPositions = value;
    }

    get hitPosition(): Array<Coordinate> {
        return this._hitPosition;
    }

    set hitPosition(value: Array<Coordinate>) {
        this._hitPosition = value;
    }

    isPlaceable(coordinate: Coordinate, orientation: Orientation, warship: Warship): WarshipPlacementStatus {
        // TODO : handle ship collision
        let maxY, minY, maxX, minX;
        let placeable: Boolean;

        switch (orientation) {
            case Orientation.EAST:
                minX = coordinate.x;
                maxX = coordinate.x + (warship.size() - 1);
                placeable = (0 <= coordinate.y && coordinate.y <= this._size - 1) && (0 <= minX && maxX <= this._size -1);
                break;
            case Orientation.WEST:
                maxX = coordinate.x;
                minX = coordinate.x - (warship.size() - 1);
                placeable = (0 <= coordinate.y && coordinate.y <= this._size - 1) && (0 <= minX && maxX <= this._size -1);
                break;
            case Orientation.NORTH:
                minY = coordinate.y;
                maxY = coordinate.y + (warship.size() - 1);
                placeable = (0 <= coordinate.x && coordinate.x <= this._size - 1) && (0 <= minY && maxY <= this._size -1);
                break;
            case Orientation.SOUTH:
                maxY = coordinate.y;
                minY = coordinate.y - (warship.size() - 1);
                placeable = (0 <= coordinate.x && coordinate.x <= this._size - 1) && (0 <= minY && maxY <= this._size -1);
                break;
        }

        if (!placeable) {
            return WarshipPlacementStatus.OUTBOUND;
        }

        for (let innerWarship of this.warshipPositions) {
            if (!!innerWarship.head() && innerWarship.collide(warship)){
                return WarshipPlacementStatus.COLLIDE;
            }
        }

        return WarshipPlacementStatus.AVAILABLE;
    }
}
