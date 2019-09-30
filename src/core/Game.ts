import {Coordinate, GameConfig, InvalidGameStatusException, InvalidPlayerException} from "..";
import {GameResult} from "..";
import {GameStatsTracker} from "..";
import {RandomPicker} from "../utils/RandomPicker";
import {Grid} from "./Grid";
import {Player} from "./Player";
import {Team} from "../utils/enum/Team";
import {ShotStatus} from "../utils/enum/ShotStatus";

export class Game {
    private _hasStarted: boolean = false;
    private _hasEnded: boolean = false;
    private _gameStatsTracker: GameStatsTracker;

    private _playerWhite: Player;
    private _playerBlack: Player;
    private _currentPlayer: Player = null;
    private _currentTarget: Player = null;
    private _gameResult: GameResult = null;

    public start(whitePlayer: Player, blackPlayer: Player, config: GameConfig = null) {
        if (!config) {
            config = new GameConfig();
        }

        if (this._hasStarted) {
            return;
        }

        if (whitePlayer.team === blackPlayer.team) {
            throw new InvalidPlayerException("Both player can't belong to the same team.");
        }

        this._playerWhite = whitePlayer;
        this._playerBlack = blackPlayer;

        this._init(config);
        this._hasStarted = true;
        this._gameStatsTracker = new GameStatsTracker();
    }

    public playTurn(coordinate: Coordinate): ShotStatus {
        if (!this._hasStarted) {
            throw new InvalidGameStatusException("Tha game has not been initialized yet.");
        }

        if (this._hasEnded) {
            throw new InvalidGameStatusException("Tha game has ended.");
        }

        if (!this._playerBlack.isReady || !this._playerBlack.isReady) {
            throw new InvalidPlayerException("At least one player is not ready to play. Try to place boat before.");
        }

        const turnStatus = this._currentTarget.hit(coordinate);

        this._gameStatsTracker.logTurn(this._currentPlayer, this._currentTarget, coordinate, turnStatus);

        if (!this._currentTarget.isAlive) {
            this._endGame();
            return turnStatus;
        }

        this._changeTurn();
        return turnStatus;
    }

    get hasStarted(): boolean {
        return this._hasStarted;
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    get currentTarget() {
        return this._currentTarget;
    }

    get gameResult(): GameResult {
        if (!this._hasEnded) {
            throw new InvalidGameStatusException("The game has not yet ended. Please retry after some turn.");
        }
        return this._gameResult;
    }

    private _init(config: GameConfig = null) {
        if (config.randomStart) {
            this._randomStart();
        } else {
            this._definedStart(config);
        }

        this._playerWhite.grid = new Grid(config.gridSize);
        this._playerWhite.warships = config.warshipPool;

        this._playerBlack.grid = new Grid(config.gridSize);
        this._playerBlack.warships = config.warshipPool;
    }

    private _changeTurn() {
        [this._currentPlayer, this._currentTarget] = [this._currentTarget, this._currentPlayer];
    }

    private _randomStart() {
        this._currentPlayer = RandomPicker.randomFromArray([this._playerBlack, this._playerWhite]);
        this._currentTarget = (this._currentPlayer.team === Team.BLACK) ? this._playerWhite : this._playerBlack;
    }

    private _definedStart(config: GameConfig) {
        if (config.playerOrder[0].team === config.playerOrder[1].team) {
            throw new InvalidPlayerException("The both provided player belong to the same team. Try with different player instead.");
        }

        this._currentPlayer = config.playerOrder[0];
        this._currentTarget = config.playerOrder[1];
    }

    private _endGame() {
        this._hasEnded = true;
        this._gameResult = new GameResult(this._currentPlayer, this._currentTarget, this._gameStatsTracker);
    }
}
