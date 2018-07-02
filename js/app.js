/**********BUGS**********
 * matched cards are still pushing to array and logging to moves counter on click
 * timer counter will not stop
 * timer starts on reset button click
 *
 */


/**************************************************
 **********FLIP CARD & CHECK FOR MATCH**********
 **************************************************/

let matchingTestArr = [];
let matchedArr = [];
let card = document.querySelectorAll('li.card');
let cardSetTwo = document.querySelectorAll('li.card');
const deck = document.querySelector('.deck')
let won = document.querySelector('div.modal');
const reset = document.querySelector('i.fa-repeat');
let clockId;
let clockOn = false;
const click = document.getElementById('deck-id')


// listens for click to start timer
if (clockOn === false) {
click.addEventListener('click', startTimer);
} else {
	console.log("clock is already on");
}

document.addEventListener('DOMContentLoaded', addEvent);

//adds eventlistener to every  card, pushes to array.
function addEvent() {
for (let i = 0; i < card.length; i++) {
	card[i].addEventListener('click', function() {
		moveCounter();
		matchingTestArr.push(this);
		testArr();
		removeStars();
		earnedStars();
	});
  }
}

//checks array to see if index 0 and 1 are full.
//if true, calls function to 'flip' cards.
//last statement prevents more than 2 objects in array.
//disables clicks from being logged to move counter
function testArr() {
if (matchingTestArr.length === 1) {
	flipCardOne();
} else if (matchingTestArr.length === 2) {
		flipCardTwo();
	} else if (matchingTestArr.length > 2) {
		matchingTestArr.splice(2);
	}
}
//'flips' card by adding class 'open' and 'show' to card1	
function flipCardOne() {
	matchingTestArr[0].classList.add('open', 'show', 'disabled', 'hvr-grw-rotate');
}
	
//'flips' card by adding class 'open' and 'show' to card2
function flipCardTwo() {
	matchingTestArr[1].classList.add('open', 'show', 'disabled', 'hvr-grw-rotate');
	disableAllCards();
	compareCards();
}

//compares card1 and card2
function compareCards() {
	let card1 = matchingTestArr[0].querySelector('i').classList.value;
	let card2 = matchingTestArr[1].querySelector('i').classList.value;
	if (card1 === card2) {
		matchTrue();
	} else if (card1 != card2) {
		setTimeout(matchFalse, 1000);
	}	
}

//matches cards, clears array, checks for game won.
function matchTrue() {
	matchingTestArr[0].classList.add('match');
	matchingTestArr[1].classList.add('match');
	matchingTestArr[0].classList.remove('open', 'show', 'disabled', 'hvr-grw-rotate');
	matchingTestArr[1].classList.remove('open', 'show', 'disabled', 'hvr-grw-rotate');
	matchedArr.push(matchingTestArr[0])
	matchedArr.push(matchingTestArr[1])
	matchingTestArr.splice(0);
	enableAllCards();
	//Once all cards are matched, run the function to show modal
	if (matchedArr.length === 16) {
		showModal();
	}
}

//flips cards back over, clears array
function matchFalse() {
	matchingTestArr[0].classList.remove('open', 'show', 'disabled', 'hvr-grw-rotate');
	matchingTestArr[1].classList.remove('open', 'show', 'disabled', 'hvr-grw-rotate');
	matchingTestArr.splice(0);
	enableAllCards();
}

function disableAllCards() {
	for(let i = 0; i < cardSetTwo.length; i++) {
		cardSetTwo[i].classList.add('disabled')
	}
}

function enableAllCards() {
	for(let i = 0; i < cardSetTwo.length; i++) {
		cardSetTwo[i].classList.remove('disabled')
	}
}

/******************************************
 **********TIME & MOVE COUNTERS**********
 ******************************************/

let minutes = document.querySelector('span.minutes');
let seconds = document.querySelector('span.seconds');
let total = 0;
let moves = 0;

//add event listener for clicks on cards 
//logs clicks to variable moves
function moveCounter() {
//for (let i = 0; i < cardSetTwo.length; i++) {
//	cardSetTwo[i].onclick = function () {
		moves ++;
		movesDisplay()
	}
//converts variable moves number to string
//updates span HTML
function movesDisplay() {
	movesString = moves.toString();
	document.querySelector('span.moves').innerHTML = movesString;
}
//resets variable moves to = 0
//resets moves display in game to 0
function movesReset() {
	moves = 0;
	document.querySelector('span.moves').innerHTML = '0';
}


function startTimer() { 
	if (clockOn === false) {
	clockId = setInterval(setTime, 1000);
	}
	clockOn = true;
}

function stopTimer() {
	if (clockOn === true) {
	clearInterval(clockId);
	}
}



function setTime() {
  total ++;
  seconds.innerHTML = pad(total % 60);
  minutes.innerHTML = pad(parseInt(total / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


function timeReset() {
	total = 0;
	seconds.innerHTML = '00';
	minutes.innerHTML = '00';
	//clearInterval();
}


/************************************
 **********GAME WON DISPLAY**********
 ************************************/

//shows modal when matchedArr length = 16 cards
function showModal() {
	won.style.display = 'block';
	//total = 0;
	timeReset();
	stopTimer();
	totalMoves();
	earnedStars();
	setTimeout(hideModal, 1000);
}

//hides modal when user click outside box
function hideModal() {
	if (won.style.display = 'block') {
		window.onclick = function(event) {
			won.style.display = 'none';
		matchingTestArr.splice(0); //empties array 
		matchedArr.splice(0); //empties array
		}
		} else {
		won.style.display = 'block'
	}
  }

//removes stars based on number of moves
function removeStars() {
	let starFive = document.querySelector('i.star-five')
	let starFour = document.querySelector('i.star-four')
	let starThree =document.querySelector('i.star-three')
	let starTwo = document.querySelector('i.star-two')
	if (moves === 20) {
		starFive.classList.add('fa-star-o');
		starFive.classList.remove('fa-star');
	} else if (moves === 25) {
		starFour.classList.add('fa-star-o');
		starFour.classList.remove('fa-star');
	} else if (moves === 30) {
		starThree.classList.add('fa-star-o');
		starThree.classList.remove('fa-star');
	} else if (moves === 35) {
		starTwo.classList.add('fa-star-o');
		starTwo.classList.remove('fa-star');
	}
}

//displays earned stars 
function earnedStars() {
	let earnedFive = document.querySelector('i.earned-five')
	let earnedFour = document.querySelector('i.earned-four')
	let earnedThree =document.querySelector('i.earned-three')
	let earnedTwo = document.querySelector('i.earned-two')
	if (moves === 20) {
		earnedFive.classList.add('fa-star-o');
		earnedFive.classList.remove('fa-star');
	} else if (moves === 25) {
		earnedFour.classList.add('fa-star-o');
		earnedFour.classList.remove('fa-star');
	} else if (moves === 30) {
		earnedThree.classList.add('fa-star-o');
		earnedThree.classList.remove('fa-star');
	} else if (moves === 35) {
		earnedTwo.classList.add('fa-star-o');
		earnedTwo.classList.remove('fa-star');
	}
}

//reset stars

function resetStars() {
	document.querySelector('i.earned-five').classList.remove('fa-star-o');
	document.querySelector('i.earned-five').classList.add('fa-star')
	document.querySelector('i.earned-four').classList.remove('fa-star-o');
	document.querySelector('i.earned-four').classList.add('fa-star')
	document.querySelector('i.earned-three').classList.remove('fa-star-o');
	document.querySelector('i.earned-three').classList.add('fa-star')
	document.querySelector('i.earned-two').classList.remove('fa-star-o');
	document.querySelector('i.earned-two').classList.add('fa-star')
	document.querySelector('i.star-five').classList.remove('fa-star-o');
	document.querySelector('i.star-five').classList.add('fa-star');
	document.querySelector('i.star-four').classList.remove('fa-star-o');
	document.querySelector('i.star-four').classList.add('fa-star');
	document.querySelector('i.star-three').classList.remove('fa-star-o');
	document.querySelector('i.star-three').classList.add('fa-star');
	document.querySelector('i.star-two').classList.remove('fa-star-o');
	document.querySelector('i.star-two').classList.add('fa-star');
	
}


//display number of moves taken to win
function totalMoves() {
	const movesDisplay = moves.toString();
	document.querySelector('span.total-moves').innerHTML = movesDisplay;
}

/*************************************
 **********RESET AND SHUFFLE**********
 *************************************/

//runs functions to reset game when reset button is clicked
reset.onclick = function() {
	resetGame();
}

function resetGame() {
	matchingTestArr.splice(0); //empties array
	shuffleDeck(); 
	matchedArr.splice(0); //empties array
	timeReset();
	stopTimer();
	movesReset();
	resetStars();
	clockOn = false;
	}

/* creates an array and stores in shuffleArr
 * passes shuffleArr into shuffle function and stores result in shuffledDeck
 * appends shuffled deck to variable card
 */
function shuffleDeck() {
	const shuffleArr = Array.from(document.querySelectorAll('.deck li'));
	const shuffledDeck = shuffle(shuffleArr);
	for (card of shuffledDeck) {
		deck.appendChild(card);
	}
	//flips cards back over to starting position
	for(let i = 0; i < shuffleArr.length; i++) {
		shuffleArr[i].classList.remove('match', 'open', 'show', 'disabled');
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(shuffleArr) {
    let currentIndex = shuffleArr.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = shuffleArr[currentIndex];
        shuffleArr[currentIndex] = shuffleArr[randomIndex];
        shuffleArr[randomIndex] = temporaryValue;
    }

    return shuffleArr;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
