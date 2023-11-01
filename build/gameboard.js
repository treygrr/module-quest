"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tile_js_1 = __importStar(require("./tile.js"));
const fs = __importStar(require("fs"));
class Gameboard {
    xSize = 20;
    ySize = 20;
    #board = [[]];
    constructor() {
        this.xSize = 20;
        this.ySize = 20;
        return this;
    }
    generateEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.ySize; y++) {
            let row = [];
            for (let x = 0; x < this.xSize; x++) {
                row.push(new tile_js_1.default());
            }
            board.push(row);
        }
        this.board = board;
    }
    get board() {
        return this.#board;
    }
    set board(x) {
        this.#board = x;
    }
    drawBoard() {
        for (let y = 0; y < this.#board.length; y++) {
            let line = "";
            for (let x = 0; x < this.#board[y].length; x++) {
                if (this.#board[y][x].walkable) {
                    line += '1';
                }
                else {
                    line += '0';
                }
            }
            console.log(line);
        }
    }
    addLayer({ x = 5, y = 5 }, textureLayer = tile_js_1.TextureLayers.GRASS) {
        console.log(this.#board[y][x]);
        this.#board[y][x].addLayer(textureLayer);
        console.log(this.#board[y][x]);
    }
    removeLayer({ x = 5, y = 5 }, textureLayer = tile_js_1.TextureLayers.GRASS) {
        console.log(this.#board[y][x]);
        this.#board[y][x].removeLayer(textureLayer);
        console.log(this.#board[y][x]);
    }
    saveBoard(fileName = 'somefile') {
        fs.writeFileSync(fileName, JSON.stringify(this.#board));
    }
    toggleWalkable({ x = 5, y = 5 }) {
        this.#board[y][x].toggleWalkable();
        if (this.#board[y][x].walkable) {
            this.#board[y][x].addLayer(tile_js_1.TextureLayers.PATH);
            this.#board[y][x].removeLayer(tile_js_1.TextureLayers.GRASS);
        }
        else {
            this.#board[y][x].addLayer(tile_js_1.TextureLayers.GRASS);
            this.#board[y][x].removeLayer(tile_js_1.TextureLayers.PATH);
        }
    }
    loadBoard(fileName = 'somefile') {
        const board = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
        try {
            this.#board = JSON.parse(board);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = Gameboard;
