import {Grid} from "./Grid";
import {RandomPicker} from "../utils/RandomPicker";
import {Player, ShotStatus, Team} from "./Player";
import {Coordinate, GameConfig, InvalidPlayerException} from "..";

export class Game {
    private _hasStarted: Boolean = false;

    private _playerWhite: Player;
    private _playerBlack: Player;
    private _currentPlayer: Player = null;
    private _currentTarget: Player = null;

    start(whitePlayer: Player, blackPlayer: Player, config: GameConfig = GameConfig.getDefault()) {
        if (this._hasStarted) {
            return;
        }

        if (whitePlayer.team === blackPlayer.team) {
            throw new InvalidPlayerException('Both player can\'t belong to the same team.');
        }

        this._playerWhite = whitePlayer;
        this._playerBlack = blackPlayer;

        this._init(config);
        this._hasStarted = true;
    }

    playTurn(coordinate: Coordinate): ShotStatus {
        if (!this._playerBlack.isReady || !this._playerBlack.isReady) {
            throw new InvalidPlayerException('At least one player is not ready to play. Try to place boat before.');
        }

        let turnStatus = this._currentTarget.hit(coordinate);

        this._changeTurn();
        return turnStatus;
    }

    get hasStarted(): Boolean {
        return this._hasStarted;
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    get currentTarget() {
        return this._currentTarget;
    }

    private _init(config: GameConfig = null) {
        this._currentPlayer = RandomPicker.randomFromArray([this._playerBlack, this._playerWhite]);
        this._currentTarget = (this._currentPlayer.team === Team.BLACK)? this._playerWhite : this._playerBlack;

        this._playerWhite.grid = new Grid(config.gridSize);
        this._playerWhite.warships = config.warshipPool;

        this._playerBlack.grid = new Grid(config.gridSize);
        this._playerBlack.warships = config.warshipPool;
    }

    private _changeTurn() {
        if (this._currentPlayer.team === Team.BLACK) {
            this._currentPlayer = this._playerWhite;
            this._currentTarget = this._playerBlack;
        } else {
            this._currentPlayer = this._playerBlack;
            this._currentTarget = this._playerWhite;
        }
    }
}
