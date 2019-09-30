import {Coordinate, InvalidPlacementException, Orientation} from "..";
import {ShotStatus, Team} from "..";
import {Grid} from "./Grid";
import {Warship} from "./Warship";
import {WarshipPlacementStatus} from "../utils/enum/WarshipPlacementStatus";

export class Player {
    private readonly _team: Team;
    private _grid: Grid;

    constructor(team: Team) {
        this._team = team;
    }

    /**
     * Hit the player at the given coordinates
     * @param coordinate
     */
    public hit(coordinate: Coordinate): ShotStatus {
        let hasHit: boolean = false;
        let destroyed: boolean = false;

        for (const warship of this.warships) {
            if (warship.isAlive() && warship.hasBeenHit(coordinate)) {
                hasHit = true;
                destroyed = !warship.isAlive();
                break;
            }
        }

        this.grid.hitPosition(coordinate);
        return (hasHit) ? ((destroyed) ? ShotStatus.SINK : ShotStatus.HIT) : ShotStatus.MISS;
    }

    /**
     * Place the warship given coordinates and orientation
     * @param coordinate
     * @param orientation
     * @param warship
     *
     * @throws InvalidPlacementException
     */
    public placeWarship(coordinate: Coordinate, orientation: Orientation, warship: Warship) {
        const placementStatus = this.grid.isPlaceable(coordinate, orientation, warship);

        if (placementStatus === WarshipPlacementStatus.AVAILABLE) {
            warship.setPosition(coordinate, orientation);
        } else if (placementStatus === WarshipPlacementStatus.OUTBOUND) {
            throw new InvalidPlacementException("The given placement is out of the grid bound. Please provide a valid one.");
        } else if (placementStatus === WarshipPlacementStatus.COLLIDE) {
            throw new InvalidPlacementException("The given placement is colliding with another warship placement. Please provide a valid one.");
        }
    }

    get isAlive(): boolean {
        if (!this._grid) {
            return true;
        }

        const alive: boolean[] = [];
        for (const wahrsip of this.warships) {
            alive.push(wahrsip.isAlive());
        }
        return alive.includes(true);
    }

    get isReady(): boolean {
        if (!this._grid) {
            return false;
        }

        let ready: boolean = true;
        for (const warship of this.warships) {
            ready = ready && !!warship.head();
        }

        return ready;
    }

    get grid(): Grid {
        return this._grid;
    }

    set grid(value: Grid) {
        this._grid = value;
    }

    get warships(): Warship[] {
        return this._grid.warshipPositions;
    }

    set warships(value: Warship[]) {
        this._grid.warshipPositions = value;
    }

    get team(): Team {
        return this._team;
    }
}
