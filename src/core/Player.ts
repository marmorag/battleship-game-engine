import {Grid} from "./Grid";
import {Warship} from "./Warship";
import {Coordinate} from "..";


export enum Team {
    WHITE,
    BLACK
}

interface Playable {
    play(): Coordinate;
}

export class Player {

    private grid: Grid;
    private team: Team;
    private boats: Warship[];

    constructor(grid: Grid, team: Team, isBot: Boolean = true) {
        this.grid = grid;
        this.team = team;
    }
}

