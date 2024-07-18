

window.addEventListener('DOMContentLoaded', (e) => {

let score = 0;
let moves = 0;
let filledTiles = [];

let columns = {
    0: ['0', '4', '8', '12'],
    1: ['1', '5', '9', '13'],
    2: ['2', '6', '10', '14'],
    3: ['3', '7', '11', '15']
}
let values = Object.entries(columns);

const scoreVal = document.getElementById('score-Int');
const movesVal = document.getElementById('moves-Int');
const gridBlock = document.querySelectorAll('.grid-block');

scoreVal.innerText = score;
movesVal.innerText = moves;

//helper function to generate a random number
//on start should be 16 and adjust based on how many gridblocks hold tiles
const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}
//returns a random position integer to use a tile position
const randomPosition = () => {
    let position = randomNumber(16);
    return position;
};

const randomValue = () => {
    let possibleValues = [2, 4];
    return possibleValues[randomNumber(2)];
 }



const createTile = () => {
let tile = document.createElement('div');
tile.setAttribute('class', 'tile');


tile.innerText = randomValue();
return tile;
}

const getTileIds = (tileList) => {
    let existingIds = [];
    if(tileList.length) {

    tileList.forEach((tile) => {
        existingIds.push(tile.id);
    })

}
return existingIds;
}

//used for start of game that will create two tiles with value of 2 using helper functions

const loadStartingTiles = (amount) => {


for(let i = 0; i < amount; i++) {
    let existingIds = getTileIds(filledTiles);
    console.log(existingIds)
    let startPosition = randomPosition();


    if(!existingIds.includes(startPosition.toString())) {
        let newTile = createTile();
        newTile.setAttribute('id', startPosition);

        gridBlock[startPosition].append(newTile);
        filledTiles.push(newTile);


    }
    else {
        return loadStartingTiles(1);
    }



}

}

const dropValue = (tileId) => {



    for(let val of values) {


       if(val[1].includes(tileId)) {
        return val[1]
       }
    }

}

//function to move tiles down on gameboard
const dropTiles = (tileList) => {

    for(let i = 0; i < tileList.length; i++) {

        let currTile = tileList[i];


        let possiblePositions = dropValue(currTile.id);

        for(let j = possiblePositions.length -1; j > 0; j--) {
            let position = possiblePositions[j];

            //if the tile is already at the bottom of the board dont move it

            if(currTile.id === position) {

                break;
            }
            //change tile position only if theres nothing below it
            //refactor to if the number add together
            if(gridBlock[position].innerText === '') {

            gridBlock[position].append(currTile);
            //update the tiles id to the new position it sits at
            currTile.id = position;

            break;

            }

        }


    }

    }
// function that moves tiles up on game board
    const liftTiles = (tileList) => {

    for(let i = 0; i < tileList.length; i++) {
    let currTile = tileList[i];


    let possiblePositions = dropValue(currTile.id);

    //loop through the positions from bottom of gameboard
    for(let j = 0; j < possiblePositions.length; j++) {
        let position = possiblePositions[j];




        if(currTile.id === position) {

            break;
        }
        //change tile position only if theres nothing above it
        //refactor to if the number add together
        if(gridBlock[position].innerText === '') {

        gridBlock[position].append(currTile);
        //update the tiles id to the new position it sits at
        currTile.id = position;

        break;

        }

    }


}
    }



    const shiftTilesRight = (tileList) => {
        let existingPositions = []
        let existingIds = getTileIds(tileList);

        for(let i = 0; i < values.length; i++) {
            let keyPair = values[i];
            let column = keyPair[0];
            let positions = keyPair[1];

            for(let j = 0; j < existingIds.length; j++) {
                let id = existingIds[j];

                let newPosition = moveValueRight(column) + Number(id)
                if(positions.includes(id)) {
                    if(existingPositions.includes(newPosition)) {
                     newPosition -= 1

                    gridBlock[newPosition].append(tileList[j])
                    }

                    else {
                        existingPositions.push(newPosition)
                        gridBlock[newPosition].append(tileList[j])
                    }
                    tileList[j].id = newPosition;

                }





            }

        }



    }




    const shiftTilesLeft = (tileList) => {
        let existingPositions = []
        let existingIds = getTileIds(tileList);

        for(let i = 0; i < values.length; i++) {
            let keyPair = values[i];
            let column = keyPair[0];
            let positions = keyPair[1];

            for(let j = 0; j < existingIds.length; j++) {
                let id = existingIds[j];

                let newPosition = Number(id) - moveValueLeft(column)
                if(positions.includes(id)) {
                    if(existingPositions.includes(newPosition)) {
                     newPosition +=1

                    gridBlock[newPosition].append(tileList[j])
                    }

                    else {
                        existingPositions.push(newPosition)
                        gridBlock[newPosition].append(tileList[j])
                    }
                    tileList[j].id = newPosition;

                }





            }

        }



    }

    const moveValueRight = (column) => {
        if(column === '0') return 3;
        if(column === '1') return 2;
        if(column === '2') return 1;
        if(column === '3') return 0;

    }

    const moveValueLeft = (column) => {
        if(column === '0') return 0;
        if(column === '1') return 1;
        if(column === '2') return 2;
        if(column === '3') return 3;

    }








const startGame = () => {
    loadStartingTiles(2);

}

startGame();

window.addEventListener('keydown', (e) => {
switch (e.key) {
    case 'ArrowDown' :
        dropTiles(filledTiles);
        loadStartingTiles(1)

    break;

    case 'ArrowLeft' :
        shiftTilesLeft(filledTiles)


    break;

    case 'ArrowRight' :
        shiftTilesRight(filledTiles)
        
    break;

    case "ArrowUp" :
        liftTiles(filledTiles);
        loadStartingTiles(1)

    break;
}
})

})
