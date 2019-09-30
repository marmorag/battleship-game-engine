import {Warship} from "../Warship";
import {WarshipClass} from "../../utils/enum/WarshipClass";

export class Cruiser extends Warship {
    constructor() {
        super(2, WarshipClass.CRUISER);

    }
}
