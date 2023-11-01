import Gameboard from "./gameboard.js";
import { TextureLayers } from "./tile.js";

const gameboard = new Gameboard();

gameboard.generateEmptyBoard();
gameboard.drawBoard();
gameboard.toggleWalkable({x: 0, y: 0});
gameboard.addLayer({x: 0, y: 0}, TextureLayers.REDSTART);
// gameboard.removeLayer({x: 0, y: 0}, TextureLayers.REDSTART);
gameboard.saveBoard();
gameboard.loadBoard();
gameboard.drawBoard();

gameboard.toggleWalkable({x: 0, y: 0});
gameboard.toggleWalkable({x: 0, y: 0});
