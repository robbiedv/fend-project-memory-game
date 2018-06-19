/**********BUGS**********
 * second card clicked does not flip
 *
 *
 *
 */

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



/**************************************************
 **********FLIPS CARDS & CHECKS FOR MATCH**********
 **************************************************/

let matchingTestArr = [];
let matchedArr = [];
let card = document.querySelectorAll('li.card');
const deck = document.querySelector('.deck')
document.addEventListener('DOMContentLoaded', addEvent);

//adds eventlistener to every  card, pushes to array.
function addEvent() {
for (i = 0; i < card.length; i++) {
	card[i].addEventListener('click', function() {
		matchingTestArr.push(this);
		testArr();
	});
}
}

//checks array to see if index 0 and 1 are full.
//if true, calls function to 'flip' cards.
//last statement prevents more than 2 objects in array.
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
	matchingTestArr[0].classList.remove('open', 'show', 'hvr-grw-rotate');
	matchingTestArr[1].classList.remove('open', 'show', 'hvr-grw-rotate');
	matchedArr.push(matchingTestArr[0])
	matchedArr.push(matchingTestArr[1])
	matchingTestArr.splice(0);
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
}

/****************************
 **********GAME WON**********
 ****************************/

let won = document.querySelector('div.modal');

function showModal() {
	won.style.display = 'block';
	setTimeout(hideModal, 1000);
}


function hideModal() {
	if (won.style.display = 'block') {
		window.onclick = function(event) {
			won.style.display = 'none';
		} 

	} else {
		won.style.display = 'block'
	}
}


/*************************************
 **********RESET AND SHUFFLE**********
 *************************************/

const reset = document.querySelector('i.fa-repeat');

//runs functions to reset game when reset button is clicked
reset.onclick = function() {
	resetGame();
}

function resetGame() {
	matchingTestArr.splice(0); //empties array
	shuffleDeck(); 
	matchedArr.splice(0); //empties array
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
	for(i = 0; i < shuffleArr.length; i++) {
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

//card[4].querySelector('i').classList.value


/*
//add event listener and 'flip' cards
let card = document.querySelectorAll('li.card');
let flippedCard = '';

for (i = 0; i < card.length; i++) {
	card[i].addEventListener('click', function() {
		let clickedCard = this;
		clickedCard.classList.add('open', 'show')
		flippedCard += clickedCard.querySelector('i').value;
		addToArr();
	});
}

//add flipped cards to array
function addToArr() {
	matchingTestArr.push(flippedCard);
	//convert();
}

let matchingTestArr = [];
*/


/*
function convert() {
	let test = matchingTestArr[0]
	console.log(test.classList);
}
*/
	
/*
// grab class names on <i> element
function listClassNames () {
let cardOne = matchingTestArr[0];
let cardTwo = matchingTestArr[1];
console.log(cardOne.firstChild);
}
*/
	
//compare class names. If true, add 'match' class to element.
//if false, remove class 'open' and 'show' from <li> element.
//remove both items from array.

/*
var cardOne = matchingTestArr[0].querySelector('i');
var cardTwo = matchingTestArr[1].querySelector('i');

function matchingTest () {
	if (card1 === card2) {
		card1.add('match');
		card2.add('match');
	} else {
		card1.remove('open', 'show');
		card2.remove('open', 'show');
	}
}
*/

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
