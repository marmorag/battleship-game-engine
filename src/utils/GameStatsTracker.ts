export class GameStatsTracker {

    private _turnPlayed: number = 0;

    logTurn() {
        this._turnPlayed++;
    }

    get turnPlayed(): number {
        return this._turnPlayed;
    }
}
