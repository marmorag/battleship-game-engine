import {
    Carrier,
    Coordinate,
    Cruiser,
    Destroyer,
    Frigate,
    Orientation,
    WarshipClass,
    WarshipNotPlacedException,
    WarshipPartStatus
} from "..";

describe('Warship - Base Behavior', () => {
    it('should be able to be create', function () {
        let ussCalister = new Carrier();

        expect(ussCalister.class()).toBe(WarshipClass.CARRIER);
        expect(ussCalister.size()).toBe(4);

        expect(ussCalister.partStatus()).toStrictEqual(Array(4).fill(WarshipPartStatus.NOMINAL));

        ussCalister.setPosition(new Coordinate(4, 5), Orientation.NORTH);

        expect(ussCalister.head()).toBeInstanceOf(Coordinate);
        expect(ussCalister.head()).toStrictEqual(new Coordinate(4, 5));
        expect(ussCalister.orientation()).toBe(Orientation.NORTH);
    });

    it('should be able to be hit', function () {
        let ussEnterprise = new Destroyer();
        ussEnterprise.setPosition(new Coordinate(10, 5), Orientation.SOUTH);

        expect(ussEnterprise.hasBeenHit(new Coordinate(0, 0))).toBe(false);
        expect(ussEnterprise.partStatus()).toStrictEqual(Array(ussEnterprise.size()).fill(WarshipPartStatus.NOMINAL));

        expect(ussEnterprise.hasBeenHit(new Coordinate(10, 3))).toBe(true);
        expect(ussEnterprise.partStatus()).toStrictEqual([
            WarshipPartStatus.NOMINAL,
            WarshipPartStatus.NOMINAL,
            WarshipPartStatus.HIT,
        ]);
        expect(ussEnterprise.isAlive()).toBe(true);
    });

    it('should not be able to be hit not on ship : NORTH', function () {
        let ussPaladin = new Frigate();
        ussPaladin.setPosition(new Coordinate(10, 5), Orientation.NORTH);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);
    });

    it('should not be able to be hit not on ship : SOUTH', function () {
        let ussPaladin = new Frigate();
        ussPaladin.setPosition(new Coordinate(10, 5), Orientation.SOUTH);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);
    });

    it('should not be able to be hit not on ship : WEST', function () {
        let ussPaladin = new Frigate();
        ussPaladin.setPosition(new Coordinate(10, 5), Orientation.WEST);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);
    });
    it('should not be able to be hit not on ship : EAST', function () {
        let ussPaladin = new Frigate();
        ussPaladin.setPosition(new Coordinate(10, 5), Orientation.EAST);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 6))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 5))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(9, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(10, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);

        expect(ussPaladin.hasBeenHit(new Coordinate(11, 4))).toBe(false);
        expect(ussPaladin.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL]);
    });


    it('should be able to be destroyed', function () {
        let ussCrusader = new Cruiser();
        ussCrusader.setPosition(new Coordinate(10, 5), Orientation.WEST);

        expect(ussCrusader.hasBeenHit(new Coordinate(0, 0))).toBe(false);
        expect(ussCrusader.partStatus()).toStrictEqual([WarshipPartStatus.NOMINAL, WarshipPartStatus.NOMINAL]);

        expect(ussCrusader.hasBeenHit(new Coordinate(10, 5))).toBe(true);
        expect(ussCrusader.partStatus()).toStrictEqual([
            WarshipPartStatus.HIT,
            WarshipPartStatus.NOMINAL,
        ]);
        expect(ussCrusader.isAlive()).toBe(true);

        expect(ussCrusader.hasBeenHit(new Coordinate(9, 5))).toBe(true);
        expect(ussCrusader.partStatus()).toStrictEqual([
            WarshipPartStatus.HIT,
            WarshipPartStatus.HIT,
        ]);
        expect(ussCrusader.isAlive()).toBe(false);
    });

    it('should throw an exception if warship has not been placed', function () {
        let ussBroken = new Carrier();

        expect(() => ussBroken.hasBeenHit(new Coordinate(0, 0))).toThrow(WarshipNotPlacedException)
    });
});
