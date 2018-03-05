//
// Blackjack
// by Who Cares
//

let suits = [ "Hearts", "Clubs", "Diamonds", "Spades" ];
let values = [ "Ace", "King", "Queen", "Jack", "Ten", "Nine", 
"Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];

// DOM Variables
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

// Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

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

function pickARandomCard(deckOfCards)
{
    let spliceIndex = Math.trunc(Math.random() * deckOfCards.length);
    if(Number.isNaN(spliceIndex))
        console.log("Woops, there's an error while picking a card!")
    let cardPicked = deckOfCards.splice(spliceIndex, 1)[0];
    return cardPicked;
}

function shuffleDeck(deckOfCards)
{
    for(let i=0; i < deck.length; i++){
        let swapIndex = Math.trunc(Math.random() * deckOfCards.length)
        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp;
    }    
}

function getCardValue(card){
    switch(card.value){
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }
}

function getCardName(card) {
    return card.value + " of " + card.suit;
}

function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    for(let i = 0; i < cardArray.length; ++i){
        let currentCard = cardArray[i];
        score += getCardValue(currentCard);
        if(currentCard.value === 'Ace'){
            hasAce = true;
        }
    }

    if(hasAce && score + 9 <= 21){
        return score + 9;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus(){
    if(!gameStarted){
        textArea.innerText = "Welcome to Jack Black!";
        return;
    }

    let dealerCardString ="";
    for(let i=0; i < dealerCards.length; i++){
        dealerCardString += getCardName(dealerCards[i]) + "\n";
    }

    let playerCardString =""
    for(let i=0; i < playerCards.length; i++){
        playerCardString += getCardName(playerCards[i]) + "\n";
    }

    updateScores();

    textArea.innerText = 
    "Dealer has:\n" +
    dealerCardString +
    "(score: " + dealerScore + ")\n\n" +

    "Player has:\n" +
    playerCardString +
    "(score: " + playerScore + ")";

    if(gameOver){
        if(playerWon){
            textArea.innerText = "YOU WIN, YAY!";
        }
        else {
            textArea.innerText = "DEALER WINS, BOO!"
        }
        newGameButton.style.visibility = "visible";
        hitButton.style.visibility = "hidden";
        stayButton.style.visibility = "hidden";
    }
}

function checkForEndOfGame(){
    updateScores();

    if(gameOver) {
        while(dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21){
                dealerCards.push(getNextCard(deck));
                updateScores();
        }
    }

    if(playerScore > 21){
        playerWon = false;
        gameOver = true;
    }
    else if(dealerScore > 21){
        playerWon = true;
        gameOver = true;
    }
    else if(gameOver){
        if(playerScore > dealerScore){
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }
}

hitButton.style.visibility = "hidden";
stayButton.style.visibility = "hidden";
showStatus();

newGameButton.addEventListener("click", function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    playerCards = [ getNextCard(deck), getNextCard(deck) ];
    dealerCards = [ getNextCard(deck), getNextCard(deck) ];

    textArea.innerText = "Game started!";

    newGameButton.style.visibility = "none";
    hitButton.style.visibility = "visible";
    stayButton.style.visibility = "visible";

    showStatus();
});
hitButton.addEventListener("click", function(){
    playerCards.push(getNextCard(deck));
    checkForEndOfGame();
    showStatus();
});
stayButton.addEventListener("click", function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

/*
console.log("Welcome to BlackJack");
console.log("You are dealt: \n" + getCardName(playerCards[0]) + "\n" + getCardName(playerCards[1]));
*/
