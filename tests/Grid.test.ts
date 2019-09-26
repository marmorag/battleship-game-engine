import {Coordinate, Destroyer, Grid, Orientation, WarshipPlacementStatus} from "../src";
import {SMALL_SIZE_GRID} from "../src/utils/GameConfig";

describe('Grid - Base Behavior', function () {
    it('should be able to place a boat correctly : Destroyer, NORTH', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.NORTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should be able to place a boat correctly (edge case) : Destroyer, NORTH', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 2), Orientation.NORTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should not be able to place a boat : Destroyer, NORTH', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 3), Orientation.NORTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });

    it('should be able to place a boat correctly : Destroyer, SOUTH', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 3), Orientation.SOUTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should be able to place a boat correctly (edge case) : Destroyer, SOUTH', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 2), Orientation.SOUTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should not be able to place a boat : Destroyer, SOUTH', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.SOUTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });

    it('should be able to place a boat correctly : Destroyer, EAST', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.EAST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should be able to place a boat correctly (edge case) : Destroyer, EAST', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(2, 1), Orientation.EAST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should not be able to place a boat : Destroyer, EAST', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(3, 1), Orientation.EAST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });

    it('should be able to place a boat correctly : Destroyer, WEST', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(3, 1), Orientation.WEST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should be able to place a boat correctly (edge case) : Destroyer, WEST', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(2, 1), Orientation.WEST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it('should not be able to place a boat : Destroyer, WEST', function () {
        let ussIntrepid = new Destroyer();
        let grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPosition.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        let placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.WEST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });
});
