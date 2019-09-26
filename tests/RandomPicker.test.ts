import {Player, Team} from "../src";
import {RandomPicker} from "../src/utils/RandomPicker";

describe('RandomPicker - Behavior', function () {
    it('should work', function () {
        let playerWhite = new Player(Team.WHITE);
        let playerBlack = new Player(Team.BLACK);

        let random = RandomPicker.randomFromArray([playerWhite, playerBlack]);

        expect(random).toBeInstanceOf(Player);
    });
});
