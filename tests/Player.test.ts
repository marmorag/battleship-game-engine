import {Coordinate, Game, InvalidPlacementException, Orientation, Player, Team} from "../src";

describe("Player - Base Behavior", () => {
    const game = new Game();
    const palpatine = new Player(Team.BLACK);
    const chewie = new Player(Team.WHITE);

    game.start(chewie, palpatine);

    it("should be not able to place two colliding warship", () => {
        palpatine.placeWarship(new Coordinate(1, 1), Orientation.NORTH, palpatine.warships[0]);
        expect(() => palpatine.placeWarship(new Coordinate(1, 1), Orientation.NORTH, palpatine.warships[0]))
            .toThrowError(InvalidPlacementException);
    });
});
