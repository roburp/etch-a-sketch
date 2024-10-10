//create a grid (16x16 by default)
function createGrid(size = 16) {
  let width = size;
  let height = size;

  const container = document.querySelector(".container");

  //cleanup
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (i = height; i > 0; i--) {
    for (j = width; j > 0; j--) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.style.flexBasis = `${100 / width}%`; // flex-basis: 100% / width
      container.appendChild(box);
      box.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "black";
      });
      //add event listener for hover
    }
  }
}

//clear grid
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

//create a custom grid between 1-100
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
//creates a default 16x16 grid on page load
createGrid();
