let grids = [];

createGrid(20);

function createGrid(noOfGrids) {

    let container = document.getElementById("game-area");
    
    clearContainer(container);

    let sizeOfGrid = container.offsetHeight / noOfGrids;

    container.style.gridTemplateRows = 
    container.style.gridTemplateColumns = `repeat(${noOfGrids}, ${sizeOfGrid}px)`;

    for(let i = 1; i <= (noOfGrids * noOfGrids); i++) {

        container.appendChild(createSingleGrid(i));
    }

    grids =  [...document.getElementsByClassName("grid-item")];
}

function clearContainer(gameArea) {

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

document.querySelectorAll(".btn").forEach( button => button.addEventListener('click', perform));

function perform(event) {

    switch(event.srcElement.id) {
        
        case "change-dimension" : changeDimension();
        break;

        case "random-color" : startSketch("randomColor");
        break;

        case "black" : startSketch("black");
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

    do{

        newGridNo = parseInt(prompt("Enter number of grids you want to create.\nPlease enter number between 10-64!"));

        console.log(newGridNo);
        
    }while(isNaN(newGridNo) || newGridNo < 1 || newGridNo > 64 || newGridNo == "null");

    createGrid(newGridNo);

    startSketch("black");
}

function startSketch(colorMode) {

    grids.forEach(grid => grid.addEventListener("mouseover", giveGridColor));

    function giveGridColor(event) {

        let selectedGrid = document.getElementById(event.srcElement.id);

        if(colorMode === "randomColor") {

            selectedGrid.style.background = `rgb(${randomRgbValue()}, ${randomRgbValue()}, ${randomRgbValue()})`;
        }
        else {
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