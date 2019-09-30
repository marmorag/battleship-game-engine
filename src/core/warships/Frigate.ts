import {Warship} from "../Warship";
import {WarshipClass} from "../../utils/enum/WarshipClass";

export class Frigate extends Warship {
    constructor() {
        super(1, WarshipClass.FRIGATE);
    }
}
