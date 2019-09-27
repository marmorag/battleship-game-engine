import {Warship, WarshipClass} from "../Warship";

export class Cruiser extends Warship {
    constructor() {
        super(2, WarshipClass.CRUISER);

    }
}
