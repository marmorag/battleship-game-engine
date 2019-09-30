import {Coordinate, Game, InvalidPlacementException, InvalidPlayerException, Orientation, Player, Team} from "../src";

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

    it("should not be able to place a warship outbound of the grid", () => {
        expect(() => palpatine.placeWarship(new Coordinate(0, 0), Orientation.SOUTH, palpatine.warships[0]))
            .toThrowError(InvalidPlacementException);
    });

    it("should return that player is alive even if the grid has not been initialized", () => {
        const dooku = new Player(Team.BLACK);
        expect(dooku.isAlive).toBe(true);
    });
});
