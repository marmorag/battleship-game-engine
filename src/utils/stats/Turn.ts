import {Coordinate, Player, ShotStatus} from "../..";

export class Turn {
    private readonly _player: Player;
    private readonly _target: Player;
    private readonly _result: ShotStatus;
    private readonly _coordinate: Coordinate;

    constructor(player: Player, target: Player, coordinate: Coordinate, result: ShotStatus) {
        this._player = player;
        this._target = target;
        this._result = result;
        this._coordinate = coordinate;
    }

    get player(): Player {
        return this._player;
    }

    get target(): Player {
        return this._target;
    }

    get coordinate(): Coordinate {
        return this._coordinate;
    }

    get result(): ShotStatus {
        return this._result;
    }
}
