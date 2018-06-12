

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let card = document.querySelectorAll('li.card');

for (i = 0; i < card.length; i++) {
	card[i].addEventListener('click', function () {
		let flippedCard = this.classList.add('open', 'show');
		addToArr();
	});
}

function addToArr() {
	matchingTestArr.push('flippedCard');
}

let matchingTestArr = [];

let firstCard = matchingTestArr[0].querySelector('i').classList;
let secondCard = matchingTestArr[1].querySelector('i').classList;


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
