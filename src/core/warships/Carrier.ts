import {WarshipClass} from "../..";
import {Warship} from "../Warship";

export class Carrier extends Warship {
    constructor() {
        super(4, WarshipClass.CARRIER);
    }
}
