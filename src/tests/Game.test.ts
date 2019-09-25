import { Game } from "../core/Game";

describe('Behavior', () => {
    it('should be able to initialize a new game', function () {
        const game = new Game();

        expect(game.hasStarted).toBe(false);
    });
});
