import {Warship} from "../Warship";
import {WarshipClass} from "../../utils/enum/WarshipClass";

export class Carrier extends Warship {
    constructor() {
        super(4, WarshipClass.CARRIER);
    }
}
