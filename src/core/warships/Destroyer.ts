import {Warship, WarshipClass} from "../Warship";

export class Destroyer extends Warship {
    constructor() {
        super(3, WarshipClass.DESTROYER);
    }
}
