//const suits = ['S','C','H','D'];
const SUITS = ["♠", "♣", "♥", "♦"];
let sum = 0;
let dealerSum = 0;
let message = '';
let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let cardsEl = document.getElementById('cards-el');
let playerEl = document.getElementById('player-el');
let dealerEl = document.getElementById('dealer-el');
let startButton = document.getElementById('start-btn');
let hitButton = document.getElementById('hit-btn');
let standButton = document.getElementById('stand-btn');
let deck = [];
let shuffledDeck = [];
let game = {};
let dealer = {}
let player = {
  name: '',
  chips: 0,
}

initializeGame();

if (player.name == '') { playerEl.style.display = "none" }

function hideButton(button) {
  button.style.display = 'none';
}

function showButton(button) {
  button.style.display = 'initial';
}

function hideCardButtons() {
  showButton(startButton);
  hideButton(hitButton);
  hideButton(standButton);
}

function shuffleDeck() {
  let newDeck = [];
  let cardCount = deck.length;
  for (let i = 0; i < cardCount; i++) {
    let cardNumber = Math.floor(Math.random() * deck.length);
    newDeck.push(deck.splice(cardNumber, 1)[0]);
  }
  return newDeck;
}

function initializeGame() {
  dealer.total = 0;
  dealer.hasBlackJack = false;
  dealer.hasAce = false;
  dealer.hand = []
  player.total = 0;
  player.totalWithAce = 0;
  player.isAlive = false;
  player.isStanding = false;
  player.has21 = false;
  player.hasBlackJack = false;
  player.hasAce = false;
  player.hand = [];
  deck = initializeDeck();
  hideCardButtons();
  game.isInitialized = true;
}

function startGame() {
  if (!player.hasBlackJack && !player.has21 && player.isAlive) return;
  if (!game.isInitialized) {
    initializeGame();
  }
  game.isInitialized = false;
  player.isAlive = true;
  hideButton(startButton);
  shuffledDeck = shuffleDeck();
  dealCard(player);
  dealCard(dealer);
  dealCard(player);
  dealCard(dealer);
  if (dealer.hasAce && dealer.totalWithAce === 21) dealer.hasBlackJack = true;
  if (player.hasAce && player.totalWithAce === 21) player.hasBlackJack = true;
  renderGame();
}

function dealCard(person) {
  let card = shuffledDeck.pop();
  if (card.isFaceCard) card.value = 10;
  if (card.isAce) {
    card.value = 1;
    person.hasAce = true;
  }

  person.total += card.value;
  if (person.hasAce) person.totalWithAce = person.total + 10;
  person.hand.push(card);
}

function renderGame() {
  dealerEl.textContent = `Dealer Cards: ?? ${dealer.hand[1].text}`;
  if (dealer.hasBlackJack && !player.hasBlackJack) {
    message = "Dealer has Blackjack.  You lose."
    showPlayerHand();
    player.isAlive = false;
    messageEl.textContent = message;
    checkDealerHand();
    hideCardButtons();
    return;
  }
  if (dealer.hasBlackJack && player.hasBlackJack) {
    message = "You and Dealer have Blackjack.  You Push."
    showPlayerHand();
    player.isAlive = false;
    messageEl.textContent = message;
    hideCardButtons();
    return;
  }
  if (player.hasBlackJack) {
    message = "You've got Blackjack!";
    checkDealerHand();
    hideCardButtons();
    return;
  }

  if (player.total < 21 || (player.hasAce && player.totalWithAce < 21)) {
    message = "Do you want another card?";
    showButton(hitButton);
    showButton(standButton);
  } else if (player.total === 21 || player.totalWithAce === 21) {
        message = "You've got 21!"
        player.has21 = true;
        checkDealerHand();
        hideCardButtons();
  } else {
    message = "You're out of the game!";
    player.isAlive = false;
    checkDealerHand();
    hideCardButtons();
  }

  messageEl.textContent = message;
  showPlayerHand();
}

function showPlayerHand() {
  if (player.hasAce) {
    if (player.hasBlackJack || player.isStanding || (player.totalWithAce === 21)) sumEl.textContent = `Sum: ${player.totalWithAce}`;
    else if (player.totalWithAce < 21 && !player.isStanding) sumEl.textContent = `Sum: ${player.total}/${player.totalWithAce}`;
    else if (player.totalWithAce > 21) sumEl.textContent = `Sum: ${player.total}`;
    else sumEl.textContent = `Sum: ${player.totalWithAce}`;
  }
  else sumEl.textContent = `Sum: ${player.total}`;

  let cardDisplay = '';
  for (bjCard of player.hand) {
    cardDisplay += ` ${bjCard.text}`;
  }
  cardsEl.textContent = `Player Cards:${cardDisplay}`;
}

function hit() {
  if (player.hasBlackJack || player.has21 || player.isStanding || !player.isAlive) return;
  dealCard(player);
  renderGame();
  message = "Drawing a new card from the deck";
}

function dealerHit() {
  dealCard(dealer);
}

function stand() {
  if (player.hasBlackJack || player.has21 || player.isStanding || !player.isAlive) return;
  player.isStanding = true;
  if (player.hasAce && player.totalWithAce < 21) player.total = player.totalWithAce;
  message = `Player stands on ${player.total}`;
  messageEl.textContent = message;
  showPlayerHand();
  checkDealerHand();
}

function checkDealerHand() {
  dealerEl.textContent = `Dealer Cards: ${dealer.hand[0].text} ${dealer.hand[1].text}`;
  if (!player.isAlive) return;
  if (player.hasBlackJack) return;

  while (dealer.total < 17) {
    messageEl.textContent = `Dealer has ${dealer.total}.  Dealer hits.`;
    dealerHit();
    dealerEl.textContent += ` ${dealer.hand[dealer.hand.length - 1].text}`;
  }
  if (dealer.total > 21) {
    message = `The Dealer busts with ${dealer.total}.  You Win!`;
    player.isAlive = false;
    messageEl.textContent = message;
    hideCardButtons();
    return;
  }
  if (dealer.total === player.total) {
    message = `You and Dealer both have ${dealer.total}.  You Push.`;
    player.isAlive = false;
    messageEl.textContent = message;
    hideCardButtons();
    return;
  }
  if (dealer.total < player.total) {
    message = `Dealer has ${dealer.total}.  You Win!`;
    player.isAlive = false;
    messageEl.textContent = message;
  } else {
    message = `Dealer has ${dealer.total}.  You Lose.`;
    player.isAlive = false;
    messageEl.textContent = message;
  }
  hideCardButtons();
}

function initializeDeck() {
  let deck = [];
  for (let s = 0; s < 4; s++) {
    for (let i = 1; i <= 13; i++) {
      let card = {
        value: i,
        isAce: false,
        isFaceCard: false,
        suit: SUITS[s]
      }
      deck.push(card)
    }
  }

  for (let card of deck) {
    switch (card.value) {
      case 1:
        card.text = 'A';
        card.isAce = true;
        break;
      case 11:
        card.text = 'J' ;
        card.isFaceCard = true;
        break;
      case 12:
        card.text = 'Q';
        card.isFaceCard = true;
        break;
      case 13:
        card.text = 'K';
        card.isFaceCard = true;
        break;
      default:
        card.text = `${card.value}`;
        break;
    }
    card.text += card.suit;
  }
  return deck;
}

