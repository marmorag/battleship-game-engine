import {Game} from "./core/Game";

export * from "./core/Player";
export * from './core/Grid';
export * from './core/Game';
export * from "./core/Warship";
export * from "./utils/Coordinate";
export * from "./exception/InvalidOrientationException";
export * from "./exception/WarshipNotPlacedException";
export * from "./exception/WarshipAlreadyPlacedException";

export default Game
export {GameConfig} from "./utils/GameConfig";
export {InvalidPlayerException} from "./exception/InvalidPlayerException";
export {InvalidPlacementException} from "./exception/InvalidPlacementException";
export {InvalidGameStatusException} from "./exception/InvalidGameStatusException";
