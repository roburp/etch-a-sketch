let colorful = false;
let gridSize;

//Toggle box color (b&w or colorful)
const toggleButton = document.querySelector("#toggle-color");
const colorText = document.querySelector(".color");
toggleButton.addEventListener("click", () => {
  colorful = colorful ? false : true;
  toggleButton.textContent =
    toggleButton.textContent === "Switch to Colorful" ? "Switch to Black & White" : "Switch to Colorful";
  colorText.textContent === "B&W" ? (colorText.textContent = "Colorful") : (colorText.textContent = "B&W");
});

//Create a grid (16x16 by default)
function createGrid(size = 16) {
  let width = size;
  let height = size;
  gridSize = size;

  const container = document.querySelector(".container");

  //Cleanup - remove all children elements before making a new grid
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (i = height; i > 0; i--) {
    for (j = width; j > 0; j--) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.style.flexBasis = `${100 / width}%`; // flex-basis: (100% / width)
      container.appendChild(box);

      let darkeningCount = 0;

      box.addEventListener("mouseover", (e) => {
        if (colorful === false) {
          e.target.style.backgroundColor = "rgb(0, 0, 0)";
        } else {
          let currentColor = e.target.style.backgroundColor;
          let rgb = currentColor.match(/(\d+)/g); //RegEx which gets all rgb numbers /(\d+)/ and g = global - [#,#,#]

          /*
           * If no color has been set yet, set random color.
           * The color darkens with subsequent hovers until fully black.
           */
          if (rgb === null) {
            const randomColor = getRandomColor();
            e.target.style.backgroundColor = randomColor;
            rgb = randomColor.match(/(\d+)/g);
          } else {
            //Progressively gets darker and ensures 0 is the lowest it can go
            let r = Math.max(0, parseInt(rgb[0] - 25 * darkeningCount));
            let g = Math.max(0, parseInt(rgb[1] - 25 * darkeningCount));
            let b = Math.max(0, parseInt(rgb[2] - 25 * darkeningCount));
            //Set new darkened color
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            darkeningCount++;
          }
        }
      });
    }
  }
}

//Clear grid of colors - sets all boxes to transparent.
function clearGrid() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.style.backgroundColor = "transparent";
  });
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  clearGrid();
});

//Create a custom grid between 1-100
function customGrid() {
  let size = Number(prompt("Enter desired grid size between 1-100."));

  if (!isNaN(size) && size >= 1 && size <= 100) {
    createGrid(size);
  } else {
    alert("Invalid input. Please enter a valid number.");
  }
}

const customButton = document.querySelector("#custom");
customButton.addEventListener("click", () => {
  customGrid();
});

//Generates a random rgb color in rgb(#, #, #) format
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

//creates a default 16x16 grid on page load
createGrid();
