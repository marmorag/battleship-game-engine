import {Coordinate} from "..";
import {Warship} from "./Warship";

export class Grid {

    private height: number;
    private width: number;
    private hitPosition: Array<Coordinate>;
    private boatPosition: Array<Warship>;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
}
