let grids = [],
    buttons = document.querySelectorAll(".btn");

createGrid(20);

function createGrid(noOfGrids) {

    let gameArea = document.getElementById("game-area");
    
    clearContainer(gameArea);

    let sizeOfGrid = gameArea.offsetHeight / noOfGrids;

    gameArea.style.gridTemplateRows = 
    gameArea.style.gridTemplateColumns = `repeat(${noOfGrids}, ${sizeOfGrid}px)`;

    for(let i = 1; i <= (noOfGrids * noOfGrids); i++) {

        gameArea.appendChild(createSingleGrid(i));
    }

    grids =  [...document.getElementsByClassName("grid-item")];
}

//to clear #game-area to accomodate new grids or else they will bw added to the bottom
function clearContainer(gameArea) {

    //removing every children of #game-area
    if(gameArea.firstChild) {

        while (gameArea.firstChild) {   

            gameArea.removeChild(gameArea.firstChild);
        }
    }
}

function createSingleGrid(gridNumber) {

    let smallDiv = document.createElement("div");

    smallDiv.setAttribute("class", "grid-item");

    smallDiv.setAttribute("id", `grid-item-${gridNumber}`);

    return smallDiv;
}

buttons.forEach( button => button.addEventListener('click', performAction));

function performAction(event) {

    switch(event.srcElement.id) {
        
        case "change-dimension" : changeDimension();
        break;

        case "random-color" : startSketch("randomColor");
        break;

        case "black" : startSketch("black");
        break;

        case "black-trail" : startSketch("black trail");
        break;

        case "clear" : clear();
        break;

        case "reset" : reset();
        break;
    }
}

function changeDimension() {

    reset();

    let newGridNo;
    
    //validation of input for number of grids between 10-64
    do{
        //prompt returns a string so parse it into number
        newGridNo = parseInt(prompt("Enter number of grids you want to create.\nPlease enter number between 10-64!"));  
    }while(isNaN(newGridNo) || newGridNo < 1 || newGridNo > 64 || newGridNo == "null");

    createGrid(newGridNo);

    startSketch("black");
}

//colorMode's value will decide which color to use while sketching
function startSketch(colorMode) {

    grids.forEach(grid => grid.addEventListener("mouseover", giveGridColor));

    //for optional challenge to create last black grid
    let blackTrailPercentage = 10;

    function giveGridColor(event) {

        let selectedGrid = document.getElementById(event.srcElement.id);

        let r = randomRgbValue(),
            g = randomRgbValue(),
            b = randomRgbValue();

        if(colorMode === "randomColor") {

            selectedGrid.style.background = `rgb(${r}, ${g}, ${b})`;
        }else if(colorMode == "black trail") {

            selectedGrid.style.background = `rgb(${r - (r/blackTrailPercentage)},
                ${g - (g/blackTrailPercentage)}, ${b - (b/blackTrailPercentage)})`;

            blackTrailPercentage--;

            if(blackTrailPercentage < 1) {
                blackTrailPercentage = 10;
            }
            
        }else {
            selectedGrid.style.background = colorMode;
        }
    }

    function randomRgbValue() {
        return Math.floor(Math.random() * 255);
    }
}

function clear() {
    startSketch("white");
}

function reset() {
    grids.forEach( grid => grid.style.background = "white");
}