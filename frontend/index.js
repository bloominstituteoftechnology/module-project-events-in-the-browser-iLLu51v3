// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime(); // Record start time
  function getTimeElapsed() { // eslint-disable-line
    // To be used at end of game to get elapsed time; paragraph.info
    let currentTime = new Date().getTime();
    return currentTime - startTime;
  }

  // Setting up the footer content //
  let footer = document.querySelector("footer");
  let currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let keys = {
    // To easily check `event.key` on keyboard events
    space: " ",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    left: "ArrowLeft",
  };

  // Helper function to grab all squares //
  const getAllSquares = () => document.querySelectorAll(".square");

  // Populating the grid with rows and squares //
  for (let n = 0; n < 5; n++) { // 5 iterations // Creating the rows //
    let row = document.createElement("div"); // building a row
    document.querySelector("#grid").appendChild(row); // appending the built row
    row.classList.add("row"); // adding 'row' to classList
    for (let m = 0; m < 5; m++) { // inner loop: 5 times per row: creates 5 squares (or indices)
      let square = document.createElement("div"); // building one square
      square.classList.add("square"); // adding 'square' to classList
      row.appendChild(square); // appending the built square classList
      square.addEventListener("click", () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if (!square.classList.contains("targeted")) {
          const squares = getAllSquares().forEach((sq) => { // eslint-disable-line
            document.querySelector(".targeted").classList.remove("targeted");
            square.classList.add("targeted");
            /**
             **We choose to include '!' (not) because why?**
             *Because we are looking to clear the classList 'targeted'
             * -- Why clear the attributed classList?:
             * --- Foresight to not comeback and recode or overcode...
             * --- The intended result is to not have miltiple squares be 'targeted' simultaneously and have a resulting border styling from being .targeted...
             * In short:
             * -- We want to clear the 'targeted' square to allow a new square to become 'targeted' if/when a new square is selected...
             * Overall:
             * -- When a new square is clicked, that square is given the classList 'targeted' as well as the paired CSS selector tag '.targeted'. 
             * -- The previous square is cleared of the both...
             * **NOTE:**
             * -- querySelector('.targeted') is specifying the CSS selector tag (denoted in js by using the '.')
             * -- The second 'targeted' is the classList of the square which has the CSS selector tag attributes paired to it.*/
          });
        }
      });
    }
  }
  document
    .querySelector(".row:nth-child(3)") // Specifying 3rd row, 3rd square
    .children[2].classList.add("targeted"); // Initial/specific square being targeted

  // Helper function to obtain 5 random indices (row/column array of squares: each square with an index) (0-24 : the # of squares) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = [];
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25);
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt);
      }
    }
    return randomInts;
  }
  let allSquares = getAllSquares();
  generateRandomIntegers().forEach((randomInt) => { // Puts live skeeter in 5 random squares disignated by the random indices generated a few lines earlier
    let mosquito = document.createElement("img");
    mosquito.src = "./mosquito.png"; // style: skeeter img
    mosquito.style.transform = `rotate(${Math.floor(
      Math.random() * 359
    )}deg) scale (${Math.random() * 0.4 + 0.8})`; // style: skeeter angle of display
    mosquito.dataset.status = "alive"; // style: status style set by CSS applied
    allSquares[randomInt].appendChild(mosquito);
  });

  document.addEventListener("keydown", (evt) => { // for arrow-key and space bar action requiring event action/result
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    let isUp = evt.key === keys.up; // lets 'isUp' = the up key event if the event.key was the 'up' key with the "ArrowUp" value
    let isDown = evt.key === keys.down;
    let isLeft = evt.key === keys.left;
    let isRight = evt.key === keys.right;

    let targeted = document.querySelector(".targeted"); // declares a 3rd 'targeted', but is variable within the keydown eventListener; Not a class or selector: Allows for determining which square is targeted, once passsing the following conditional in relation to the key pressed.
    if (isUp) {
      if (targeted.parentElement.previousElementSibling) {
        let rowIdx = Array.from(targeted.parentElement.children).indexOf(
          targeted
        );
        targeted.classList.remove("targeted");
        targeted.parentElement.previousElementSibling.children[
          rowIdx
        ].classList.add("targeted");
      } 
      // squares are children, parentElement is the row, siblings pertain to the child or parent in context
      // rowIdx : indices are w/in arrays, so Array.from is applied to transform the array like object into an array. rowIdx takes the index of the square (current) of the parent row to then apply 'targeted' to the same index on the next row moved to.
      // classList.add : the previous rows sibiling (new row) now attains targeted classList on the child square @ rowIDx (same square index, but on a new row)
    } else if (isDown) {
      if (targeted.parentElement.nextElementSibling) {
        let rowIdx = Array.from(targeted.parentElement.children).indexOf(
          targeted
        );
        targeted.classList.remove("targeted");
        targeted.parentElement.nextElementSibling.children[
          rowIdx
        ].classList.add("targeted");
      }
    } else if (isLeft) {
      if (targeted.previousElementSibling) {
        targeted.classList.remove("targeted");
        targeted.previousElementSibling.classList.add("targeted");
      } 
      // if last square was targeted, moving to the next square will remove classList & apply to new square
      // When the targeted square is the left-most square, the square will be reselected
    } else if (isRight) {
      if (targeted.nextElementSibling) {
        targeted.classList.remove("targeted");
        targeted.nextElementSibling.classList.add("targeted");
      } 
      // 'nextElementSibling' has the same parameters, but specific to the opposite direction as what was previously coded above
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈

    // 👉 TASK 5 - End the game 👈
  });
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { moduleProject2 };
else moduleProject2();
