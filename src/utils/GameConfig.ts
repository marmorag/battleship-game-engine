import {Carrier, Cruiser, Destroyer, Frigate, Player, Warship} from "..";
import {InvalidGridSizeException} from "../exception/InvalidGridSizeException";

export const SMALL_SIZE_GRID = 5;
export const MEDIUM_SIZE_GRID = 10;
export const LARGE_SIZE_GRID = 15;

export class GameConfig {
    public gridSize: number = 10;
    private _randomStart: boolean = true;
    private _playerOrder: Player[] = [];

    public defineStart(firstPlayer: Player, secondPlayer: Player) {
        this._randomStart = false;
        this._playerOrder = [firstPlayer, secondPlayer];
    }

    get randomStart(): boolean {
        return this._randomStart;
    }

    get playerOrder(): Player[] {
        return this._playerOrder;
    }

    get warshipPool(): Warship[] {
        if (3 <= this.gridSize && this.gridSize <= SMALL_SIZE_GRID) {
            return [
                new Destroyer(),
                new Frigate(),
            ];
        } else if (this.gridSize <= MEDIUM_SIZE_GRID) {
            return [
                new Carrier(),
                new Destroyer(),
                new Cruiser(),
                new Frigate(),
            ];
        } else if (this.gridSize >= LARGE_SIZE_GRID) {
            return [
                new Carrier(),
                new Destroyer(),
                new Destroyer(),
                new Cruiser(),
                new Cruiser(),
                new Frigate(),
                new Frigate(),
                new Frigate(),
            ];
        } else {
            throw new InvalidGridSizeException();
        }
    }
}
