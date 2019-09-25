import {Grid} from "./Grid";
import {Warship} from "./Warship";


export enum Team {
    WHITE,
    BLACK
}

export class Player {

    private grid: Grid;
    private team: Team;
    private isBot: Boolean;
    private boats: Warship[];

    constructor(grid: Grid, team: Team, isBot: Boolean = true) {
        this.grid = grid;
        this.team = team;
        this.isBot = isBot;
    }

}

