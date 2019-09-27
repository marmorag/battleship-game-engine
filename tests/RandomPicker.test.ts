import {Player, Team} from "../src";
import {RandomPicker} from "../src/utils/RandomPicker";

describe("RandomPicker - Behavior", () => {
    it("should work", () => {
        const playerWhite = new Player(Team.WHITE);
        const playerBlack = new Player(Team.BLACK);

        const random = RandomPicker.randomFromArray([playerWhite, playerBlack]);

        expect(random).toBeInstanceOf(Player);
    });
});
