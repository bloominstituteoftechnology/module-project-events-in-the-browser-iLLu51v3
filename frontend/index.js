// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime(); // Record start time
  console.log(startTime); // display (in ms) time reference to Date.getTime creation

  function getTimeElapsed() {
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
  for (let n = 0; n < 5; n++) {
    // 5 iterations
    // Creating the rows //
    let row = document.createElement("div"); // building a row
    document.querySelector("#grid").appendChild(row); // appending the built row
    row.classList.add("row"); // adding class name to the row
    // Creating the squares //
    for (let m = 0; m < 5; m++) {
      // inner loop: 5 times per row: creates 5 squares
      let square = document.createElement("div"); // building one square
      square.classList.add("square"); // adding class name to square
      row.appendChild(square); // appending the built square
      square.addEventListener("click", () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if (!square.classList.contains("targeted")) {
          const squares = getAllSquares().forEach((sq) => {
            document.querySelector(".targeted").classList.remove("targeted");
            square.classList.add("targeted");
            /**
             **We choose to include '!' (not) because why?**
             *Because we are looking to clear the class name 'targeted'
             * Why clear the attributed className?:
             * Foresight to not comeback and recode or overcode...
             * The intended result is to not have miltiple squares be 'targeted' simultaneously and have a resulting border styling from being .targeted...
             * In short:
             * We want to clear the 'targeted' square to allow a new square to become 'targeted' if/when a new square is selected...
             * Overall:
             * When a new square is clicked, that square is given the class name 'targeted' as well as the paired CSS selector tag '.targeted' while the previous square is cleared of the both...
             * **NOTE:**
             * querySelector('.targeted') is specifying the CSS selector tag (denoted in js by using the '.')
             * The second 'targeted' is the className of the square which has the CSS selector tag attributes paired to it.*/
          });
        }
        console.log("Click Activation Engaged"); // displays message
        console.log(square.classList.contains("square")); //true if it is a square
        console.log(square.classList.contains("targeted")); // true if it is targeted
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
  generateRandomIntegers().forEach((randomInt) => {
    // Puts live mosquitoes in 5 random squares disignated by the random indices generated a few lines earlier
    let mosquito = document.createElement("img");
    mosquito.src = "./mosquito.png"; // style: skeeter img
    mosquito.style.transform = `rotate(${Math.floor(
      Math.random() * 359
    )}deg) scale (${Math.random() * 0.4 + 0.8})`; // style: skeeter angle of display
    mosquito.dataset.status = "alive"; // style: status style set by CSS applied
    allSquares[randomInt].appendChild(mosquito);
  });

  document.addEventListener("keydown", (evt) => {
    // for arrow-key and space bar action requiring event action/result
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    console.log(evt.key);
    let isUp = evt.key === keys.up; // lets 'isUp' = the up key event if the event.key was the 'up' key with the "ArrowUp" value
    let isDown = evt.key === keys.down;
    let isLeft = evt.key === keys.left;
    let isRight = evt.key === keys.right;

    let targeted = document.querySelector('targeted') // creates a 3rd 'targeted', but is a declared variable within the keydown eventListener: allows for determining which square is targeted in relation to the key pressed.
    if (isUp) {
      console.log("Lifting Off")
    } else if (isDown) {
      console.log("Striking Down")
    } else if (isLeft) {
      console.log("Traveling Left")
      if (targeted.previousElementSibling) {
        targeted.classList.remove('targeted')
        targeted.previousElementSibling.classList.add('targeted')
      } // if last square was targeted, once moving left to the next square, the className 'targeted' is removed and applied to the new square.
      // if the targeted square is the left-most square, the square will be reselected
      
    } else if (isRight) {
      console.log("Veering Right")
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈

    // 👉 TASK 5 - End the game 👈
    console.log("Armageddon Key Activated");
  });
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { moduleProject2 };
else moduleProject2();
