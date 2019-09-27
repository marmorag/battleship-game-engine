import {Coordinate, Game, GameConfig, Orientation, Player, ShotStatus, Team, WarshipPartStatus} from "../src";
import {SMALL_SIZE_GRID} from "../src/utils/GameConfig";

describe('Behavior', () => {

    describe('should be able to play game', function () {
        const game = new Game();
        const gameConfig = new GameConfig();

        let obiWan = new Player(Team.WHITE);
        let anakin = new Player(Team.BLACK);

        it('could initialize a game', function () {
            expect(game.hasStarted).toBe(false);

            gameConfig.gridSize = SMALL_SIZE_GRID;
            gameConfig.defineStart(obiWan, anakin);

            expect(obiWan.isReady).toBe(false);
            expect(anakin.isReady).toBe(false);

            game.start(obiWan, anakin, gameConfig);

            expect(game.hasStarted).toBe(true);

            expect(obiWan.warships.length).toBe(2);
            expect(anakin.warships.length).toBe(2);
        });

        it('should be able to place players warship', function () {
            let radianVII = obiWan.warships[0];
            let tantiveIV = obiWan.warships[1];

            obiWan.placeWarship(new Coordinate(0,0), Orientation.NORTH, radianVII);

            expect(radianVII.head()).toStrictEqual(new Coordinate(0,0));
            expect(radianVII.orientation()).toBe(Orientation.NORTH);

            obiWan.placeWarship(new Coordinate(1, 1), Orientation.EAST, tantiveIV);

            expect(tantiveIV.head()).toStrictEqual(new Coordinate(1,1));
            expect(tantiveIV.orientation()).toBe(Orientation.EAST);

            let scimitar = anakin.warships[0];
            let rogueShadow = anakin.warships[1];

            anakin.placeWarship(new Coordinate(2,3), Orientation.SOUTH, scimitar);

            expect(scimitar.head()).toStrictEqual(new Coordinate(2,3));
            expect(scimitar.orientation()).toBe(Orientation.SOUTH);

            anakin.placeWarship(new Coordinate(4,4), Orientation.WEST, rogueShadow);

            expect(rogueShadow.head()).toStrictEqual(new Coordinate(4,4));
            expect(rogueShadow.orientation()).toBe(Orientation.WEST);
        });

        it('should be able to play a turn', function () {
            expect(game.currentPlayer).toBeInstanceOf(Player);
            expect(game.currentPlayer).toStrictEqual(obiWan);

            expect(game.playTurn(new Coordinate(0, 0))).toBe(ShotStatus.MISS);

            expect(game.currentPlayer).toStrictEqual(anakin);
            expect(game.currentTarget).toStrictEqual(obiWan);

            expect(obiWan.warships[0].partStatus())
                .toStrictEqual([WarshipPartStatus.NOMINAL, WarshipPartStatus.NOMINAL, WarshipPartStatus.NOMINAL]);
            expect(obiWan.warships[0].isAlive()).toBe(true);
            expect(obiWan.warships[1].partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);
            expect(obiWan.warships[1].isAlive()).toBe(true);

            expect(anakin.warships[0].partStatus())
                .toStrictEqual([WarshipPartStatus.NOMINAL, WarshipPartStatus.NOMINAL, WarshipPartStatus.NOMINAL]);
            expect(anakin.warships[0].isAlive()).toBe(true);
            expect(anakin.warships[1].partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);
            expect(anakin.warships[1].isAlive()).toBe(true);
        });

        it('should be able to destroy a warship', function () {

        });
    });
});
