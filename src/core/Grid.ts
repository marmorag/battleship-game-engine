import {Coordinate} from "../utils/Coordinate";

export class Grid {

    private height: number;
    private width: number;
    private hitPosition: Array<Coordinate>;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
}
