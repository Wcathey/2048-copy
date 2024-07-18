
window.addEventListener('DOMContentLoaded', (e) => {
let score = 0;
let moves = 0;

let columns = {
    1: [0, 4, 8, 12],
    2: [1, 5, 9, 13],
    3: [2, 6, 10, 14],
    4: [3, 7, 11, 15]
}




const scoreVal = document.getElementById('score-Int');
const movesVal = document.getElementById('moves-Int');
const gridBlock = document.querySelectorAll('.grid-block');

scoreVal.innerText = score;
movesVal.innerText = moves;


//creates a random number and rounds to nearest whole number
const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

// sets a random position using helper function at a max of 16
const randomPosition = () => {
    let position1 = randomNumber(16);
    let position2 = randomNumber(16);

    if(position1 !== position2) {
        return [position1, position2];
    }
    //if both of the numbers are the same recursively call the function
    else {
       return randomPosition();
    }
}

const randomValue = () => {
   let possibleValues = [2, 4];
   return possibleValues[randomNumber(2)];
}


// returns the column number from position of tile
const findColumns = (positions) => {
    let columnList = []
    positions.forEach((position) => {
        for(let i = 1; i <= 4; i++) {
            if(columns[i].includes(position)) {
                columnList.push(i);
            }
        }
    })
    return columnList;



}

// helper function for key event down. drop each tile down to the bottom 11 spaces
//if the innertext are the same, add the two numbers together and make new tile
//if both numbers are different, decrease drop value by 4

const findDropValue = (columns) => {
    let dropValue = []

    columns.forEach((column) => {
        dropValue.push(column + 11);
    })

    return dropValue;
}

const createTiles = (amount, value) => {
    const tiles = [];
    for(let i = 0; i < amount; i++) {
        let tile = document.createElement('div');
        tile.setAttribute('class', 'tile');
        tile.innerText = value;
        tiles.push(tile);
    }

    return tiles;

}

//adds starting tiles to the game board and returns the positions and tiles that were placed
const loadStartingTiles = () => {

    let positions = randomPosition();
    let tiles = createTiles(2, 2);

    for(let i = 0; i < positions.length; i++) {
        let currPos = positions[i];

        for(let j = 0; j < tiles.length; j++) {
            let currTile = tiles[i];
            gridBlock[currPos].append(currTile);
        }
    }
    return [positions, tiles];

}

//helper function to make innerText value a number so it can be added together
const makeNumber = (innerText) => {
return Number(innerText);
}

//checks column and max drop area to move tiles down the gameboard
const dropTile = (tileData) => {
    const columnList = findColumns(tileData[0]);
    const dropValue = findDropValue(columnList);
    const tiles = tileData[1];


    if(dropValue[0] === dropValue[1]) {
        let newValue = 0;
        for(let i = 0; i < tiles.length; i++) {
            let currTile = tiles[i];
            newValue += makeNumber(tiles[i].innerText);
            currTile.remove()
        }
        let joinedTile = createTiles(1, newValue);
        tileData[1] = joinedTile;
        gridBlock[dropValue[0]].append(joinedTile[0]);
    }

    else {
        for(let j = 0; j < dropValue.length; j++) {
            let currVal = dropValue[j];
            gridBlock[currVal].append(tiles[j]);
        }
    }
    //create a new tile with a value of 2 or 4 that appends to board
    //should execute regardless of conditional
        let newTile = createTiles(1, randomValue());

        gridBlock[randomPosition()[0]].append(newTile[0]);



}

const startGame = () => {
    //call load function to generate starting tiles and store to the data to a variable
    //index 0 being positions, index 1 being tiles
   const tileData = loadStartingTiles();

    window.addEventListener('keydown', (e) => {






        if(e.key === 'ArrowDown') {
            dropTile(tileData)


        }
        if(e.key === 'ArrowLeft') {

        }
        if(e.key === 'ArrowRight') {

        }

    } )

};

startGame();



})
