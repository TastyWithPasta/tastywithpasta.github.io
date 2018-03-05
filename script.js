//
// Blackjack
// by Who Cares
//

let suits = [ "Hearts", "Clubs", "Diamonds", "Spades" ]
let values = [ "Ace", "King", "Queen", "Jack", "Ten", "Nine", 
"Eight", "Seven", "Six", "Five", "Four", "Three", "Two"]
let card = {
    suit: "Hearts",
    value: "Queen"
};
console.log(card.suit);
console.log(card.value);

function createDeck(){
    let deck = [];
    for(let i=0; i<suits.length; i++){
        for(let j=0; j<values.length; j++) {
            let card = {
                suit: suits[i],
                value: values[j],
            };
            deck.push(card);
        }
    }
    return deck;
}

function getNextCard(deckOfCards){
    return deckOfCards.shift();
}

function pickACard(deckOfCards)
{
    let spliceIndex = Math.trunc(Math.random() * deckOfCards.length);
    if(Number.isNaN(spliceIndex))
        console.log("Woops, there's an error while picking a card!")
    let cardPicked = deckOfCards.splice(spliceIndex, 1)[0];
    return cardPicked;
}

function getCardName(card) {
    return card.value + " of " + card.suit;
}

let deck = createDeck();
let playerCards = [ pickACard(deck), pickACard(deck) ];
console.log(getCardName(pickACard(deck)));


console.log("Welcome to BlackJack");
console.log("You are dealt: \n" + getCardName(playerCards[0]) + "\n" + getCardName(playerCards[1]));


let okButton = document.getElementById("ok-button");
okButton.addEventListener("click", function(){
    document.getElementById("paragraph").innerText = "Button Clicked!";
})