import Tile, { TextureLayers } from "./tile.js";
import * as fs from 'fs';
export default class Gameboard {
    ySize;
    xSize;
    #board = [];
    constructor(ySize = 20, xSize = 20) {
        this.ySize = ySize;
        this.xSize = xSize;
        return this;
    }
    generateEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.ySize; y++) {
            let row = [];
            for (let x = 0; x < this.xSize; x++) {
                row.push(new Tile());
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
    addLayer({ x = 5, y = 5 }, textureLayer = TextureLayers.GRASS) {
        this.#board[y][x].addLayer(textureLayer);
    }
    removeLayer({ x = 5, y = 5 }, textureLayer = TextureLayers.GRASS) {
        this.#board[y][x].removeLayer(textureLayer);
    }
    saveBoard(fileName = 'somefile') {
        fs.writeFileSync(fileName, JSON.stringify(this.#board));
    }
    toggleWalkable({ x = 5, y = 5 }) {
        this.#board[y][x].toggleWalkable();
        if (this.#board[y][x].walkable) {
            this.#board[y][x].addLayer(TextureLayers.PATH);
            this.#board[y][x].removeLayer(TextureLayers.GRASS);
        }
        else {
            this.#board[y][x].addLayer(TextureLayers.GRASS);
            this.#board[y][x].removeLayer(TextureLayers.PATH);
        }
    }
    loadBoard(fileName = 'somefile') {
        this.#board = [];
        try {
            const board = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
            const jsonboard = JSON.parse(board);
            this.parseBoardJSON(jsonboard);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    parseBoardJSON(board) {
        console.log("\nBeginning JSON Validation");
        if (board.length && Array.isArray(board)) {
            for (let y = 0; y < board.length; y++) {
                const internalTile = [];
                if (board[y].length && Array.isArray(board[y])) {
                    for (let x = 0; x < board[y].length; x++) {
                        const row = board[y][x];
                        internalTile.push(new Tile(row.walkable, row.textureLayers));
                    }
                }
                this.#board.push(internalTile);
            }
        }
        console.log('Finished JSON Import');
    }
}
