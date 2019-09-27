import {Coordinate, Destroyer, Grid, Orientation, WarshipPlacementStatus} from "../src";
import {SMALL_SIZE_GRID} from "../src/utils/GameConfig";

describe("Grid - Base Behavior", () => {
    it("should be able to place a boat correctly : Destroyer, NORTH", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.NORTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should be able to place a boat correctly (edge case) : Destroyer, NORTH", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 2), Orientation.NORTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should not be able to place a boat : Destroyer, NORTH", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 3), Orientation.NORTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });

    it("should be able to place a boat correctly : Destroyer, SOUTH", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 3), Orientation.SOUTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should be able to place a boat correctly (edge case) : Destroyer, SOUTH", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 2), Orientation.SOUTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should not be able to place a boat : Destroyer, SOUTH", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.SOUTH, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });

    it("should be able to place a boat correctly : Destroyer, EAST", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.EAST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should be able to place a boat correctly (edge case) : Destroyer, EAST", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(2, 1), Orientation.EAST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should not be able to place a boat : Destroyer, EAST", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(3, 1), Orientation.EAST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });

    it("should be able to place a boat correctly : Destroyer, WEST", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(3, 1), Orientation.WEST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should be able to place a boat correctly (edge case) : Destroyer, WEST", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(2, 1), Orientation.WEST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.AVAILABLE);
    });

    it("should not be able to place a boat : Destroyer, WEST", () => {
        const ussIntrepid = new Destroyer();
        const grid = new Grid(SMALL_SIZE_GRID);

        expect(grid.size).toBe(5);
        expect(grid.hitPositions.length).toBe(0);
        expect(grid.warshipPositions.length).toBe(0);

        const placeable = grid.isPlaceable(new Coordinate(1, 1), Orientation.WEST, ussIntrepid);
        expect(placeable).toBe(WarshipPlacementStatus.OUTBOUND);
    });
});
