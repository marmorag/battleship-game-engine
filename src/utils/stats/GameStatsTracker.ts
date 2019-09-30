import {Coordinate, InvalidGameStatusException, Player, ShotStatus, Team} from "../..";
import {Turn} from "./Turn";

export class GameStatsTracker {

    private _history: Turn[] = [];

    public logTurn(player: Player, target: Player, coordinate: Coordinate, result: ShotStatus) {
        this._history.push(new Turn(player, target, coordinate, result));
    }

    public getReport() {
        if (this.turnPlayed === 0) {
            throw new InvalidGameStatusException("The reports can't be produced if no turn has been played.");
        }

        const blackPlayer = this._history[0].player.team === Team.BLACK ?
            this._history[0].player :
            this._history[0].target;
        const whitePlayer = this._history[0].player.team === Team.WHITE ?
            this._history[0].player :
            this._history[0].target;

        return {
            [Team.BLACK]: this._getStats(blackPlayer),
            [Team.WHITE]: this._getStats(whitePlayer),
            played: this.turnPlayed,
        };
    }

    get turnPlayed(): number {
        return this._history.length;
    }

    get history(): Turn[] {
        return this._history;
    }

    /**
     * Produce stats for given player on the whole game
     * @param player
     * @private
     */
    private _getStats(player: Player) {
        const totalTurn = this.turnPlayed;
        let totalHit = 0;
        let totalPlayed = 0;
        let accuracy = 0.0;

        this._history.forEach((currentTurn) => {
            if (currentTurn.player.team === player.team) {
                if ([ShotStatus.HIT, ShotStatus.SINK].includes(currentTurn.result) ) {
                    totalHit++;
                }
                totalPlayed++;
            }
        });

        accuracy = totalHit / totalPlayed;

        return {
            accuracy,
            finalGrid: player.grid,
            hit: totalHit,
            played: totalPlayed,
        };
    }
}
