/* #region variables*/
const LOGGING = false;
const SUITS = ["♠", "♣", "♥", "♦"];
const CARDWIDTH = 85;
const CARDSLOT = CARDWIDTH + 10;
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
let dealerText = document.getElementById('dcards-text');
let playerText = document.getElementById('pcards-text');
let deck = [];
let shuffledDeck = [];
let game = {};
let dealer = {}

let player = {
  name: 'Player1',
  chips: 0
}
/* #endregion */

initializeGame();

if (player.name == 'Player1') playerEl.style.display = "none";

function checkDealerHand() {
  log('inside checkDealerHand');
  for (let card of dealer.hand) {
    card.isFaceDown = false;
  }
  displayCards(dealer, dealerEl);
  if (!player.isAlive) return;
  if (player.hasBlackjack) return;
  log('player is still alive. Continuing in checkDealerHand');
  while (dealer.total < 17) {
    if (dealer.totalWithAce <= 17 || dealer.totalWithAce > 21) {
      log(`Dealer hits with ${dealer.total}/${dealer.totalWithAce}`);
      dealerHit();
    } else dealer.total = dealer.totalWithAce;
    displayCards(dealer, dealerEl);
  }

  if (dealer.total > 21) {
    result('win', `Win! (D:Busted)`);
    return;
  }
  if (dealer.total === player.total) {
    result('push', `Push: (${dealer.total})`);
    return;
  }

  if (dealer.total < player.total) result('win', `Win! (D:${dealer.total})`);
  else result('lose', `Lose: (D:${dealer.total})`);
}

function checkForBlackJack() {
  log('inside checkForBlackJack');
  if (!dealer.hasBlackjack && !player.hasBlackjack) return false;
  if (dealer.hasBlackjack) {
    if (!player.hasBlackjack) result('lose', "Lose: (D:BJ)");
    else result('push', "Push: (BJ)");
  } else if (player.hasBlackjack) {
      result('win', "Win! Blackjack!")
      sumEl.textContent = `Sum: ${player.totalWithAce}`
  }

  displayCards(player, cardsEl);
  checkDealerHand();
  return true;
}

function checkPlayerHand() {
  if (player.has21) {
    message = "You've got 21!"
    checkDealerHand();
    hideCardButtons();
  } else if (player.total < 21 || (player.hasAce && player.totalWithAce < 21)) {
    messageEl.textContent = "Hit or Stand?";
    showElement(hitButton);
    showElement(standButton);
    log('continuing in checkPlayerHand');
  } else {
    result('lose', "Lose: Busted");
    checkDealerHand();
  }

  if (player.hasAce) {
    if (player.isStanding || player.has21) sumEl.textContent = `Sum: ${player.totalWithAce}`;
    else if (player.totalWithAce < 21 && !player.isStanding) sumEl.textContent = `Sum: ${player.total}/${player.totalWithAce}`;
    else sumEl.textContent = `Sum: ${player.total}`; // (player.totalWithAce > 21) 
  }
  else sumEl.textContent = `Sum: ${player.total}`;
  
  displayCards(player, cardsEl);
}

function clearCardDisplay(element) {
  numNodes = element.childNodes.length;
  for (let i = 1; i <= numNodes; i++) {
    element.removeChild(element.childNodes[0]);
  }
}

function dealCard(person, dealType='normal', i) {
  let card;
  if (dealType == 'normal') card = shuffledDeck.pop();
  else {
    card = initializeDeck()[i];
    log(`RIGGED! Dealing ${card.text} to ${person.name}`);
  }
  if (card.isFaceCard) card.value = 10;
  if (card.isAce) {
    card.value = 1;
    person.hasAce = true;
  }

  person.total += card.value;
  if (person.hasAce) person.totalWithAce = person.total + 10;
  if (person.total === 21 || person.totalWithAce === 21) {
    person.has21 = true;
    person.totalWithAce = person.total = 21;
  }
  if (person.has21 && person.hand.length == 1) person.hasBlackjack = true;
  if (person.total > 21) person.isBusted = true;
  if (person.isDealer && person.hand.length === 0) {
    card.isFaceDown = true;
  }
  person.hand.push(card);
}

function dealerHit() {
  dealCard(dealer);
}

function displayCards(person, cardHolder) {
  showElement(dealerText);
  showElement(dealerEl);
  showElement(playerText);
  showElement(playerEl);
  showElement(cardHolder);
  if (!dealer.hasBlackjack) showElement(sumEl);
  clearCardDisplay(cardHolder);
  cardHolder.style.width = (person.hand.length * CARDSLOT) + 'px';
  for (let card of person.hand) {
    let cardDiv = document.createElement('div');
    let tinyCardTopDiv = document.createElement('div');
    let tinyCardBottomDiv = document.createElement('div');
    let cardDivs = [cardDiv, tinyCardTopDiv, tinyCardBottomDiv];
    cardDiv.className = 'card';
    tinyCardTopDiv.className = 'tiny-card-top';
    tinyCardBottomDiv.className = 'tiny-card-bottom';
    for (cd of cardDivs) {
      if (card.isFaceDown) cd.className += ' face-down';
      else cd.className += ` ${card.color}`;      
      cd.textContent = card.text;
    }
    cardDiv.appendChild(tinyCardTopDiv);
    cardDiv.appendChild(tinyCardBottomDiv);
    cardHolder.appendChild(cardDiv);
  }
}

function hideCardButtons() {
  showElement(startButton);
  hideElement(hitButton);
  hideElement(standButton);
}

function hideElement(element) {
  element.style.visibility = 'hidden';
}

function hit() {
  if (player.hasBlackjack || player.has21 || player.isStanding || !player.isAlive) return;
  log(`player hits with ${player.total}/${player.totalWithAce}`);
  dealCard(player);
  log(`player now has ${player.total}/${player.totalWithAce}`);
  
  checkPlayerHand();
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
      if (card.suit == "♠" || card.suit == "♣") card.color = 'black';
      else card.color = 'red'
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

function initializeGame() {
  initializePerson(dealer);
  initializePerson(player);
  dealer.name = 'Dealer';
  dealer.isDealer = true;
  player.isDealer = false;
  player.isStanding = false;
  player.isAlive = false;
  player.bet = 0;
  cardsEl.style.width = dealerEl.style.width = (CARDSLOT * 2) + 'px';
  deck = initializeDeck();
  clearCardDisplay(cardsEl);
  clearCardDisplay(dealerEl);
  hideCardButtons();
  hideElement(cardsEl);
  hideElement(dealerEl);
  hideElement(dealerText);
  hideElement(playerText);
  hideElement(sumEl);
  messageEl.classList.remove('win','lose','push');
  sumEl.textContent = `Sum: ${player.total}`;
  if (document.querySelector('.bet')) document.querySelector('.bet').remove();
  document.querySelector('.actions').style.justifyContent = 'center';
  game.isInitialized = true;
}

function initializePerson(person) {
  person.hand = [];
  person.has21 = false;
  person.hasAce = false;
  person.hasBlackjack = false;
  person.isBusted = false;
  person.total = 0;
  person.totalWithAce = 0;
}

function log(msg) {
  if (LOGGING) console.log(msg);
}

function renderGame() {
  displayCards(dealer, dealerEl);
  if (checkForBlackJack()) return;
  log('no blackjacks, checking player hand');
  checkPlayerHand();
}

function result(result, msg) {
  messageEl.classList.add(result);
  messageEl.textContent = msg;
  player.isAlive = false;
  hideCardButtons();
}

function showElement(element) {
  element.style.visibility = 'visible';
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

function stand() {
  if (player.hasBlackjack || player.has21 || player.isStanding || !player.isAlive) return;
  player.isStanding = true;
  if (player.hasAce) {
    if (player.totalWithAce > 21) player.totalWithAce = player.total;
    else player.total = player.totalWithAce;
    log(`player is standing with an ace.  (${player.total}/${player.totalWithAce})`);
  } else log(`player is standing with ${player.total}/${player.totalWithAce}`);

  checkPlayerHand();
  checkDealerHand();
}

function startGame() {
  if (document.getElementById('limitations')) document.getElementById('limitations').remove();
  if (!game.isInitialized) {
    initializeGame();
  }
  message = '';
  game.isInitialized = false;
  player.isAlive = true;
  hideElement(startButton);
  shuffledDeck = shuffleDeck();
  dealCard(player);
  dealCard(dealer); //'rigged', 0 is AofS -- 12 is KofS
  dealCard(player);
  dealCard(dealer);
  renderGame();
}
