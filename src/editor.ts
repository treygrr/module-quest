import Gameboard from "./gameboard.js";
import * as tty from 'node:tty';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { clear } from "node:console";
import { TextureLayers } from "./tile.js";
import { ReadStream } from "node:fs";

const rl = readline.createInterface({ input, output });

const stdin:NodeJS.ReadStream = process.stdin;
const stdout = process.stdout;
let currentFilename: string;
let listeningForInput: boolean = false;
let addLayer = false;
let removeLayer = false;

interface CursorPosition {
    x: number,
    y: number
}

const curPos: CursorPosition = {
    x: 0,
    y: 0,
}

process.stdout.on('resize', () => {
    // console.log(`${process.stdout.columns}x${process.stdout.rows}`);
    if (isEditing) {
        showBoardEditor();
    }
});

let isEditing = false;
let gb: Gameboard;
stdin.setRawMode(true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding('utf8');

// on any data into stdin
  

const showStartMessage = async () => {
    console.log('What would you like to do?');
    console.log('(1) Create a blank board');
    console.log('(2) Load a saved board to edit');

    const answer = await rl.question('');

    return answer
}

const drawBoard = ():string => {
    let allValues = ''
    gb.board.forEach((row, y)=> {
        let rowValues:string = ''
        row.forEach((col, x) => {
            // '\x1b[36mX \x1b[0m' : 'O '
            rowValues += col.walkable
                ? (y === curPos.y && x === curPos.x)
                    ? '\x1b[36mX \x1b[0m'
                    : 'X '
                : (y === curPos.y && x === curPos.x)
                    ? '\x1b[36m0 \x1b[0m'
                    : '0 '
        })
        allValues += rowValues + '\n'
    })
    return allValues
}

const showBoardEditor = async () => {
    clearConsole();
    const board = gb.board?.[curPos.y]?.[curPos.x]

    if (board?.textureLayers) {
        console.log(gb.board[curPos.y][curPos.x].textureLayers)
    }
    if (board?.textureLayers.length && addLayer) {
        let layerToAdd = -1;
        Object.keys(TextureLayers).forEach((textureLayer, index) => {
            console.log(`(${index}): ` + textureLayer)
        })
        while (Number.isNaN(layerToAdd) || layerToAdd > Object.keys(TextureLayers)?.length || layerToAdd < 0) {
            layerToAdd = parseInt(await rl.question('Please select one index from the list to add. '));
        }
        // take the int layerToAdd and get the key from the TextureLayers enum
        const textureLayer = Object.keys(TextureLayers)[layerToAdd]
        gb.addLayer({ x: curPos.x, y: curPos.y}, textureLayer as TextureLayers)
        addLayer = false;
        return
    }
}

const renderBoardUI = () => {
    SelectMode(true);
    console.log(drawBoard(), curPos);
}

const showStartOptions = async () => {
    clearConsole();
    const input = await showStartMessage();
    async function askY (): Promise<number> {
        let ySize = 0;
        let failed = false;
        while (ySize > 50 || ySize < 5 || Number.isNaN(ySize)) {
            if (failed) {
                console.log('Incorrect value provided');
            }
            ySize = parseInt(await rl.question('How large should the Y axis be? Max 50. Min 5. '));
            failed = true;
        }
        return ySize;
    }
    async function askX (): Promise<number> {
        let xSize = 0
        while (xSize > 50 || xSize < 5 || Number.isNaN(xSize)) {
            xSize = parseInt(await rl.question('How large should the X axis be? Max 50. min 5. '));
        }
        return xSize;
    }
    if (input === '1') {
        const ySize = await askY();

        const xSize = await askX();

        gb = new Gameboard(ySize, xSize);
        gb.generateEmptyBoard();
        isEditing = true;
        renderBoardUI();
    }
    else if (input === '2') {
        gb = new Gameboard();
        let board = false;
        let fileName: string | null = null
        let failed = false
        while(board === false || fileName === null) {
            if (failed) {
                console.log('Invalid file name given');
            }
            fileName = await rl.question('File name to open: ');
            board = gb.loadBoard(fileName)
            failed = true;
        }
        currentFilename = fileName
        isEditing = true;
        renderBoardUI();
    } else {
        clearConsole();
        console.log('Invalid option Given');
        showStartMessage();
    }
}


const clearConsole = () => {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
}

let inputStream

const SelectMode = (enabled: boolean) => {
    let inputs = ''
    const keyfunc = (key: string) => {
        inputs += key
        // ctrl-c ( end of text )
        if (key === 'w') {
            inputs = ''
            gb.toggleWalkable({ x: curPos.x, y: curPos.y})
        }
        if (inputs.includes('al')) {
            inputs = ''
            // add layer
            addLayer = true;
        }
        if (inputs.includes('rl')) {
            inputs = ''
            removeLayer = true;
        }
        if (key === "\u0003") {
            process.exit();
        }
        if (key == '\u001B\u005B\u0041') {
            curPos.y = curPos.y - 1
        }
        if (key == '\u001B\u005B\u0043') {
            curPos.x = curPos.x + 1
        }
        if (key == '\u001B\u005B\u0042') {
            curPos.y = curPos.y + 1
        }
        if (key == '\u001B\u005B\u0044') {
            curPos.x = curPos.x - 1
        }
        renderBoardUI();
    }
    if (enabled === false) {
        stdin.removeListener('data', keyfunc);
        listeningForInput = false;
        return;
    } else if (listeningForInput === false) {
        listeningForInput = true;
        stdin.on('data', keyfunc);
    }
}

if (isEditing) {
    // showBoardEditor();
}
else {
    await showStartOptions();
}


