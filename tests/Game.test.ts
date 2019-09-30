import {
    Coordinate,
    Game,
    GameConfig,
    InvalidGameStatusException, InvalidPlayerException,
    Orientation,
    Player,
    ShotStatus,
    Team,
    WarshipPartStatus,
} from "../src";
import {SMALL_SIZE_GRID} from "../src";

describe("Behavior", () => {

    describe("should be able to play game", () => {
        const game = new Game();
        const gameConfig = new GameConfig();

        const obiWan = new Player(Team.WHITE);
        const anakin = new Player(Team.BLACK);

        it("should be able to initialize a game", () => {
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

        it("should be able to place players warship", () => {
            const radianVII = obiWan.warships[0];
            const tantiveIV = obiWan.warships[1];

            obiWan.placeWarship(new Coordinate(0, 0), Orientation.NORTH, radianVII);

            expect(radianVII.head()).toStrictEqual(new Coordinate(0, 0));
            expect(radianVII.orientation()).toBe(Orientation.NORTH);

            obiWan.placeWarship(new Coordinate(1, 1), Orientation.EAST, tantiveIV);

            expect(tantiveIV.head()).toStrictEqual(new Coordinate(1, 1));
            expect(tantiveIV.orientation()).toBe(Orientation.EAST);

            const scimitar = anakin.warships[0];
            const rogueShadow = anakin.warships[1];

            anakin.placeWarship(new Coordinate(2, 3), Orientation.SOUTH, scimitar);

            expect(scimitar.head()).toStrictEqual(new Coordinate(2, 3));
            expect(scimitar.orientation()).toBe(Orientation.SOUTH);

            anakin.placeWarship(new Coordinate(4, 4), Orientation.WEST, rogueShadow);

            expect(rogueShadow.head()).toStrictEqual(new Coordinate(4, 4));
            expect(rogueShadow.orientation()).toBe(Orientation.WEST);
        });

        it("should be able to play a turn", () => {
            expect(game.currentPlayer).toBeInstanceOf(Player);
            expect(game.currentPlayer).toStrictEqual(obiWan);

            expect(game.playTurn(new Coordinate(0, 0))).toBe(ShotStatus.MISS);

            expect(anakin.grid.hitPositions).toStrictEqual([new Coordinate(0, 0)]);

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

        it("should be able to hit a boat", () => {
            expect(game.playTurn(new Coordinate(4, 3))).toBe(ShotStatus.MISS);
            expect(game.playTurn(new Coordinate(2, 3))).toBe(ShotStatus.HIT);

            expect(anakin.warships[0].partStatus())
                .toStrictEqual([WarshipPartStatus.HIT, WarshipPartStatus.NOMINAL, WarshipPartStatus.NOMINAL]);
            expect(anakin.warships[0].isAlive()).toBe(true);
        });

        it("should be able to destroy a warship", () => {
            expect(game.playTurn(new Coordinate(4, 4))).toBe(ShotStatus.MISS);
            expect(game.playTurn(new Coordinate(4, 4))).toBe(ShotStatus.SINK);

            expect(anakin.warships[1].partStatus()).toStrictEqual([WarshipPartStatus.HIT]);
            expect(anakin.warships[1].isAlive()).toBe(false);
        });

        it("should be able to win a game", () => {
            expect(game.playTurn(new Coordinate(4, 2))).toBe(ShotStatus.MISS);
            expect(game.playTurn(new Coordinate(2, 2))).toBe(ShotStatus.HIT);

            expect(anakin.isAlive).toBe(true);
            expect(obiWan.isAlive).toBe(true);

            expect(game.playTurn(new Coordinate(4, 1))).toBe(ShotStatus.MISS);
            expect(game.playTurn(new Coordinate(2, 1))).toBe(ShotStatus.SINK);

            expect(anakin.isAlive).toBe(false);
            expect(obiWan.isAlive).toBe(true);

            const gameResult = game.gameResult;

            expect(gameResult.winner).toStrictEqual(obiWan);
            expect(gameResult.looser).toStrictEqual(anakin);
            expect(gameResult.tracker.turnPlayed).toBe(9);
        });

        it("should be able to generate result report", () => {
            expect(game.gameResult.stats).toStrictEqual({
                looser: anakin,
                played: 9,
                winner: obiWan,
                [Team.WHITE]: {
                    accuracy: 4 / 5,
                    finalGrid: obiWan.grid,
                    hit: 4,
                    played: 5,
                },
                [Team.BLACK]: {
                    accuracy: 0 / 4,
                    finalGrid: anakin.grid,
                    hit: 0,
                    played: 4,
                },
            });
        });

        it("should throw an exception if we try to play another turn", () => {
            expect(() => game.playTurn(new Coordinate(0, 0))).toThrowError(InvalidGameStatusException);
        });
    });
});

describe("Error case", () => {
    it("should throw exception if game not started and try to play a turn", () => {
        const game = new Game();

        expect(() => game.playTurn(new Coordinate(0, 0))).toThrowError(InvalidGameStatusException);
    });

    it("should throw exception if both player belong to the same team", () => {
        const game = new Game();
        const obiWan = new Player(Team.WHITE);
        const anakin = new Player(Team.WHITE);

        expect(() => game.start(obiWan, anakin)).toThrowError(InvalidPlayerException);
    });

    it("should throw error if game has already started and try to start it again", () => {
        const game = new Game();
        const gameConfig = new GameConfig();
        const obiWan = new Player(Team.WHITE);
        const anakin = new Player(Team.BLACK);

        gameConfig.gridSize = 5;

        game.start(obiWan, anakin, gameConfig);

        expect(() => game.start(obiWan, anakin, gameConfig)).toThrowError(InvalidGameStatusException);
    });

    it("should throw an exception if we try to get the report ans game has not ended", () => {
        const game = new Game();
        const obiWan = new Player(Team.WHITE);
        const anakin = new Player(Team.BLACK);
        game.start(obiWan, anakin);

        expect(() => game.gameResult).toThrowError(InvalidGameStatusException);
    });

    it("should throw an exception if player provided in start config belong to the same team", () => {
        const game = new Game();
        const gameConfig = new GameConfig();
        const obiWan = new Player(Team.WHITE);
        const anakin = new Player(Team.BLACK);

        gameConfig.gridSize = 5;
        gameConfig.defineStart(obiWan, obiWan);

        expect(() => game.start(obiWan, anakin, gameConfig)).toThrowError(InvalidPlayerException);
    });

    it("should throw an exception if both player is not ready", () => {
        const game = new Game();
        const gameConfig = new GameConfig();
        const obiWan = new Player(Team.WHITE);
        const anakin = new Player(Team.BLACK);

        gameConfig.gridSize = 5;

        game.start(obiWan, anakin, gameConfig);

        expect(() => game.playTurn(new Coordinate(0, 0))).toThrowError(InvalidPlayerException);
    });
});
