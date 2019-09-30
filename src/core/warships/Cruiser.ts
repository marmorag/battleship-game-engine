import {WarshipClass} from "../..";
import {Warship} from "../Warship";

export class Cruiser extends Warship {
    constructor() {
        super(2, WarshipClass.CRUISER);

    }
}
