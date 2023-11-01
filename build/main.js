"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameboard_js_1 = __importDefault(require("./gameboard.js"));
const tile_js_1 = require("./tile.js");
const gameboard = new gameboard_js_1.default();
console.log("hello world", gameboard.board);
gameboard.generateEmptyBoard();
gameboard.drawBoard();
gameboard.toggleWalkable({ x: 0, y: 0 });
gameboard.addLayer({ x: 0, y: 0 }, tile_js_1.TextureLayers.REDSTART);
// gameboard.removeLayer({x: 0, y: 0}, TextureLayers.REDSTART);
gameboard.saveBoard();
gameboard.loadBoard();
gameboard.drawBoard();
