import {Coordinate, Orientation, Warship} from "..";

export enum CollisionStatus {
    COLLIDE,
    MISS,
}

export class CollisionDetector {

    public static detectWarshipCollision(warshipOrigin: Warship, warshipTested: Warship): CollisionStatus {
        if (!warshipOrigin.head() || !warshipTested.head()) {
            return CollisionStatus.MISS;
        }

        const originCoordinate = CollisionDetector._processCoordinate(warshipOrigin);
        const testedCoordinate = CollisionDetector._processCoordinate(warshipTested);

        return CollisionDetector._collide(originCoordinate, testedCoordinate);
    }

    public static detectShotCollision(shotFired: Coordinate, warship: Warship): CollisionStatus {
        const warshipCoordinates = this._processCoordinate(warship);

        return this._collide([shotFired], warshipCoordinates);
    }

    public static detectBorderCollision(
        coordinate: Coordinate,
        orientation: Orientation,
        warship: Warship,
        size: number,
    ) {
        let maxY;
        let minY;
        let maxX;
        let minX;
        let placeable: boolean;

        switch (orientation) {
            case Orientation.EAST:
                minX = coordinate.x;
                maxX = coordinate.x + (warship.size() - 1);
                placeable = (0 <= coordinate.y && coordinate.y <= size - 1)
                    && (0 <= minX && maxX <= size - 1);
                break;
            case Orientation.WEST:
                maxX = coordinate.x;
                minX = coordinate.x - (warship.size() - 1);
                placeable = (0 <= coordinate.y && coordinate.y <= size - 1)
                    && (0 <= minX && maxX <= size - 1);
                break;
            case Orientation.NORTH:
                minY = coordinate.y;
                maxY = coordinate.y + (warship.size() - 1);
                placeable = (0 <= coordinate.x && coordinate.x <= size - 1)
                    && (0 <= minY && maxY <= size - 1);
                break;
            case Orientation.SOUTH:
                maxY = coordinate.y;
                minY = coordinate.y - (warship.size() - 1);
                placeable = (0 <= coordinate.x && coordinate.x <= size - 1)
                    && (0 <= minY && maxY <= size - 1);
                break;
        }

        return (placeable) ? CollisionStatus.MISS : CollisionStatus.COLLIDE;
    }

    public static _collide(originCoordinates: Coordinate[], testedCoordinates: Coordinate[]): CollisionStatus {
        for (const originCoordinate of originCoordinates) {
            for (const testedCoordinate of testedCoordinates) {
               if (originCoordinate.x === testedCoordinate.x && originCoordinate.y === testedCoordinate.y) {
                   return CollisionStatus.COLLIDE;
               }
            }
        }

        return CollisionStatus.MISS;
    }

    private static _processCoordinate(warship: Warship): Coordinate[] {
        const coordinates = [];

        for (let i = 0; i < warship.size(); i++) {
            let coordinate: Coordinate;

            switch (warship.orientation()) {
                case Orientation.NORTH:
                    coordinate = new Coordinate(warship.head().x, warship.head().y + i);
                    break;
                case Orientation.SOUTH:
                    coordinate = new Coordinate(warship.head().x, warship.head().y - i);
                    break;
                case Orientation.WEST:
                    coordinate = new Coordinate(warship.head().x - i, warship.head().y);
                    break;
                case Orientation.EAST:
                    coordinate = new Coordinate(warship.head().x + i, warship.head().y);
                    break;
            }
            coordinates.push(coordinate);
        }

        return coordinates;
    }
}
