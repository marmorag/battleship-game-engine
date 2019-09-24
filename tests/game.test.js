import Game from "../src/Game";

describe('Behavior', () => {
    it('should be able to initialize a new game', function () {
        const game = new Game();

        expect(game).toHaveProperty('grid');
    });
});
