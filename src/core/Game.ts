import {Grid} from "./Grid";
import {RandomPicker} from "../utils/RandomPicker";
import {Player, ShotStatus, Team} from "./Player";
import {Coordinate, GameConfig, InvalidPlayerException} from "..";
import {InvalidGameStatusException} from "../exception/InvalidGameStatusException";

export class Game {
    private _hasStarted: Boolean = false;
    private _hasEnded: Boolean = false;

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
        if (!this._hasStarted) {
            throw new InvalidGameStatusException();
        }

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
        this._currentTarget = (this._currentPlayer.team === Team.BLACK)? this._playerWhite : this._playerBlack;
    }

    private _definedStart(config: GameConfig) {
        if (config.playerOrder[0].team === config.playerOrder[1].team) {
            throw new InvalidPlayerException('The both provided player belong to the same team. Try with different player instead.');
        }

        this._currentPlayer = config.playerOrder[0];
        this._currentTarget = config.playerOrder[1];
    }
}
