import {WarshipClass} from "../..";
import {Warship} from "../Warship";

export class Destroyer extends Warship {
    constructor() {
        super(3, WarshipClass.DESTROYER);
    }
}
