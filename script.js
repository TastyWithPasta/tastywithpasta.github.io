//
// Blackjack
// by Who Cares
//

let suits = [ "Hearts", "Clubs", "Diamonds", "Spades" ]
let values = [ "Ace", "King", "Queen", "Jack", "Ten", "Nine", 
"Eight", "Seven", "Six", "Five", "Four", "Three", "Two"]
let deck = [ ];

for(let i=0; i<suits.length; i++){
    for(let j=0; j<values.length; j++) {
        deck.push(values[j] + " of " + suits[i]);
    }
}


let playerCards = [ deck[0], deck [2] ];

console.log("Welcome to BlackJack");
console.log("You are dealt: \n" + playerCards[0] + "\n" + playerCards[1]);


console.log(deck);