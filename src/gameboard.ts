import Tile, { TextureLayers } from "./tile.js";
import * as fs from 'fs';

export default class Gameboard {
  private xSize: number = 20;
  private ySize: number = 20;
  #board: Tile[][] = [[]];
  constructor () {
    this.xSize = 20;
    this.ySize = 20;
    return this;
  }

  generateEmptyBoard () {
    let board = [];
    for(let y = 0; y < this.ySize; y++) {
      let row = [];
      for(let x = 0; x < this.xSize; x++) {
	row.push(new Tile());
      }
      board.push(row);
    }
    this.board = board;
  }

  get board () {
    return this.#board;
  }

  set board (x) {
    this.#board = x;
  }

  drawBoard () {
	for (let y = 0; y < this.#board.length; y++) { 
	  let line = "";
	  for (let x = 0; x < this.#board[y].length; x++) {
		  if (this.#board[y][x].walkable) {
			  line += '1';
		  }else {
			  line += '0';
		  }
	  }`
	  console.log(line);
	}
  }

  addLayer ({ x = 5, y = 5 }: { x: number, y: number }, textureLayer: TextureLayers = TextureLayers.GRASS) {
	  console.log(this.#board[y][x]);
	  this.#board[y][x].addLayer(textureLayer);
	  console.log(this.#board[y][x]);
  }

  removeLayer({ x = 5, y = 5 }, textureLayer: TextureLayers = TextureLayers.GRASS){
	  console.log(this.#board[y][x]);
	  this.#board[y][x].removeLayer(textureLayer);
	  console.log(this.#board[y][x]);
	
  }

  saveBoard (fileName: string = 'somefile') {
	fs.writeFileSync(fileName, JSON.stringify(this.#board));
  }

  toggleWalkable({ x = 5, y = 5 }: { x: number, y: number }) {
	  this.#board[y][x].toggleWalkable();
	  if (this.#board[y][x].walkable) {
		  this.#board[y][x].addLayer(TextureLayers.PATH);
		  this.#board[y][x].removeLayer(TextureLayers.GRASS);
	  } else {
		  this.#board[y][x].addLayer(TextureLayers.GRASS);
		  this.#board[y][x].removeLayer(TextureLayers.PATH);
	  }
  }

  loadBoard (fileName: string = 'somefile') {
	this.#board = [[]];
	const board = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
	try {
		this.#board = JSON.parse(board) as Tile[][];
	} catch (e) {
		console.log(e)
	}
  }

  parseBoardJSON(board: any) {
	  Console.log("\nBeginning JSON Validation");
	  if (!board.length && Array.isArray(board)) {
		  for (let y = 0; y < board.length; y++) {
			  if (board[y].length && Array.isArray(board[y]
		  }
	  }
}

