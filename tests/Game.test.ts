import {Coordinate, Game, GameConfig, Orientation, Player, Team} from "../src";
import {SMALL_SIZE_GRID} from "../src/utils/GameConfig";

describe('Behavior', () => {
    it('should be able to play game', function () {
        const game = new Game();
        const gameConfig = new GameConfig();
        expect(game.hasStarted).toBe(false);

        gameConfig.gridSize = SMALL_SIZE_GRID;

        let obiWan = new Player(Team.WHITE);
        let anakin = new Player(Team.BLACK);

        expect(obiWan.isReady).toBe(false);
        expect(anakin.isReady).toBe(false);

        game.start(obiWan, anakin, gameConfig);

        expect(game.hasStarted).toBe(true);

        expect(obiWan.warships.length).toBe(2);
        expect(anakin.warships.length).toBe(2);

        let radianVII = obiWan.warships[0];
        let tantiveIV = obiWan.warships[1];

        obiWan.placeWarship(new Coordinate(0,0), Orientation.NORTH, radianVII);
        obiWan.placeWarship(new Coordinate(1, 1), Orientation.EAST, tantiveIV);

        let scimitar = anakin.warships[0];
        let rogueShadow = anakin.warships[1];

        anakin.placeWarship(new Coordinate(2,3), Orientation.SOUTH, scimitar);
        anakin.placeWarship(new Coordinate(4,4), Orientation.WEST, rogueShadow);

        expect(radianVII.head()).toBe(new Coordinate(0,0));
        expect(radianVII.orientation()).toBe(Orientation.NORTH);
        expect(tantiveIV.head()).toBe(new Coordinate(1,1));
        expect(tantiveIV.orientation()).toBe(Orientation.EAST);

        expect(scimitar.head()).toBe(new Coordinate(2,3));
        expect(scimitar.orientation()).toBe(Orientation.SOUTH);
        expect(rogueShadow.head()).toBe(new Coordinate(4,4));
        expect(rogueShadow.orientation()).toBe(Orientation.WEST);
    });
});
