createGrid();

function createGrid() {

    let container = document.getElementById("game-area");

    for(let i = 1; i <= 400; i++) {

        let smallDiv = document.createElement("div");

        smallDiv.setAttribute("class", "grid-item");

        smallDiv.setAttribute("id", `grid-item-${i}`);

        container.appendChild(smallDiv);
    }
}

let divs = {
    buttons : {
        dimension_button : document.getElementById("change-dimension"),
        random_button : document.getElementById("random-color"),
        reset_button : document.getElementById("reset"),
        clear_button : document.getElementById("clear")
    },

    grids : [...document.getElementsByClassName("grid-item")]
};

let buttons = document.querySelectorAll(".btn");

buttons.forEach( button => button.addEventListener('click', perform));

function perform(event) {
    switch(event.srcElement.id) {
        case "change-dimension" : changeDimension();
        break;

        case "random-color" : randomColor();
        break;

        case "reset" : reset();
        break;

        case "clear" : clear();
        break;
    }
}

function changeDimension() {
    console.log(1);
}

function randomColor() {

    divs.buttons.random_button.addEventListener('click', getRandomColor);

    function getRandomColor(event) {
        divs.grids.forEach(grid => grid.addEventListener('mouseover', changeGridColor));
    }

    function changeGridColor(event) {
    
        let selectedGrid = document.getElementById(event.srcElement.id); 
        
        selectedGrid.style.background = `rgb(${randomRgbValue()}, ${randomRgbValue()}, ${randomRgbValue()})`;
    
    }

    function randomRgbValue() {
        return Math.floor(Math.random() * 255);
    }
}

function reset() {
    divs.grids.forEach( grid => grid.style.background = "white");
}

function clear() {
    console.log(4);
}