import {Warship} from "../Warship";
import {WarshipClass} from "../../utils/enum/WarshipClass";

export class Destroyer extends Warship {
    constructor() {
        super(3, WarshipClass.DESTROYER);
    }
}
