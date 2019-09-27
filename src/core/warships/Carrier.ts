import {Warship, WarshipClass} from "../Warship";

export class Carrier extends Warship {
    constructor() {
        super(4, WarshipClass.CARRIER);
    }
}
