import {Warship, WarshipClass} from "../Warship";

export class Frigate extends Warship {
    constructor() {
        super(1, WarshipClass.FRIGATE);
    }
}
