/* #region variables*/
const LOGGING = true;
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
let chipsBet = document.querySelector('.chips-bet');
let chipsBetContainer = document.querySelector('.chips-bet-container');
let prevBetButton = document.getElementById('prev-bet-btn');
let clearBetButton = document.getElementById('clear-bet-btn');
let placeBetButton = document.getElementById('place-bet-btn');
let betButtonsText = document.getElementById('bet-buttons-text');
let cardButtonsDiv = document.querySelector('.card-buttons');
let betButtonsDiv = document.querySelector('.bet-buttons');
let betContainer = document.querySelector('.bet-container');
let actionsDiv = document.querySelector('.actions');
let ownedContainer = document.querySelector('.owned-container');
let ownedText = document.querySelector('.owned-text');
let chipsBetText = document.querySelector('.chips-bet-text');
let chipsToBet = document.querySelector('.chips-to-bet');
let chipsOwned = document.querySelector('.chips-owned');
let ownedBet = document.querySelector('.owned-bet');
let buttonsConfigured = false;
let to;
let cb;
let deck = [];
let shuffledDeck = [];
let game = {
  hasStarted: false
};
let dealer = {}

let player = {
  name: 'Player1',
  chips: 0
}
/* #endregion */

initializeGame();

if (player.name == 'Player1') playerEl.style.display = "none";

function applyBet(amt) {
  log(`applyBet(${amt})`);
  player.bet = amt;
  betButtonsText.classList.remove('error');
  if (player.bet <= 0) {
    configureButtons();
    return;
  }
  player.betPlaced = true;
  log(`player betplaced is ${player.betPlaced}: ${player.bet}`);
  player.previousBet = player.bet;
  undisplayElement(chipsToBet);
  configureButtons();
  buttonsConfigured = false;
  renderGame();
}

function bet(amount) {
  log(`bet(${amount})`);
  if ((player.chips - amount) < 0) {
    betButtonsText.textContent = 'Bet is too high';
    betButtonsText.classList.add('error');
    displayElement(betButtonsText);
    hideElement(prevBetButton);
    showElement(clearBetButton);
    return;
  }
  player.bet += amount;
  player.chips -= amount;
  player.chipsPlaced = true;
  chipsBet.textContent = player.bet;
  chipsOwned.textContent = player.chips;
  if (player.bet > 0) {
    undisplayElement(betButtonsText);
    hideElement(prevBetButton);
    showElement(clearBetButton);
    showElement(placeBetButton);
  } else {
    displayElement(betButtonsText);
    hideElement(clearBetButton);
    hideElement(placeBetButton);
  }
  configureButtons();
}

function bet1() {
  bet(1);
}

function bet5() {
  bet(5);
}

function bet10() {
  bet(10);
}

function bet25() {
  bet(25);
}

function bet100() {
  bet(100);
}

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
  log('checkForBlackJack()');
  if (!dealer.hasBlackjack && !player.hasBlackjack) return false;
  if (dealer.hasBlackjack) {
    if (!player.hasBlackjack) result('lose', "Lose: (D:BJ)");
    else result('push', "Push: (BJ)");
  } else if (player.hasBlackjack) {
      result('bj', "Win! Blackjack!")
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

function clearBet() {
  let amt = parseInt(chipsBet.textContent);
  if (player.chipsPlaced) {
    player.chips += amt;
    player.bet -= amt;
  }
  chipsBet.textContent = player.bet;
  chipsOwned.textContent = player.chips;
  player.chipsPlaced = false;
  hideElement(placeBetButton);
  applyBet(0);
}

function clearCardDisplay(element) {
  log(`clearCardDisplay(${element})`);
  numNodes = element.childNodes.length;
  for (let i = 1; i <= numNodes; i++) {
    element.removeChild(element.childNodes[0]);
  }
}

function configureButtons() {
  log('configureButtons()');
  if (player.betPlaced) {
    log('bet has been placed');
    undisplayElement(betButtonsDiv);
    displayElement(cardButtonsDiv);
    undisplayElement(startButton);
  } else {
    log('no bet placed');
    undisplayElement(cardButtonsDiv);
    displayElement(betButtonsDiv);
    if (parseInt(chipsBet.textContent) <= 0) {
      log(`chipsbet content is lte 0`);
      hideElement(prevBetButton);
      hideElement(clearBetButton);
      hideElement(placeBetButton);
      if (player.previousBet > 0 && ((player.chips - player.previousBet) >= 0)) showElement(prevBetButton);
      betButtonsText.textContent = 'Add chips to play.'
      displayElement(betButtonsText);
    } else {
      log(`chipsbet content is ${chipsBet.textContent}`);
      hideElement(prevBetButton);
      showElement(placeBetButton);
      undisplayElement(betButtonsText);
      if (player.previousBet > 0
          && !player.chipsPlaced
          && ((player.chips - player.previousBet) >= 0)) showElement(prevBetButton);
      if (!player.chipsPlaced
          && (player.chips - parseInt(chipsBet.textContent) < 0)) hideElement(placeBetButton);
      showElement(clearBetButton);
    }
    buttonsConfigured = false;
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

function dealStartingCards() {
  log('dealStartingCards()');
  dealCard(player);
  dealCard(dealer); //'rigged', 0 is AofS -- 12 is KofS
  dealCard(player);
  dealCard(dealer);
}

function displayCards(person, cardHolder) {
  log(`displayCards(${{person}}, ${cardHolder})`);
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

function displayElement(element) {
  element.style.display = 'flex';
}

function hideCardButtons() {
  displayElement(startButton);
  hideElement(hitButton);
  hideElement(standButton);
}

function hideElement(element) {
  element.style.visibility = 'hidden';
}

function hit() {
  log('hit()');
  if (player.hasBlackjack || player.has21 || player.isStanding || !player.isAlive) return;
  log(`player hits with ${player.total}/${player.totalWithAce}`);
  dealCard(player);
  log(`player now has ${player.total}/${player.totalWithAce}`);
  
  checkPlayerHand();
}

function initializeDeck() {
  log('initializeDeck()');
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
  log('initializeGame()');
  initializePerson(dealer);
  initializePerson(player);
  if (!game.hasStarted) {
    player.chips = 1000;
    dealer.name = 'Dealer';
    dealer.isDealer = true;
    player.isDealer = false;
    player.previousBet = 0;
    player.chipsPlaced = false;
    undisplayElement(betContainer);
    undisplayElement(betButtonsDiv);
    displayElement(cardButtonsDiv);
    hideCardButtons();
    actionsDiv.style.justifyContent = 'center';
  } else {
    undisplayElement(cardButtonsDiv);
    displayElement(betButtonsDiv);
    displayElement(betContainer);
    messageEl.textContent = 'Place bet to begin'
    actionsDiv.style.justifyContent = 'space-around';
  }
  player.isStanding = false;
  player.isAlive = false;
  player.bet = 0;
  player.betPlaced = false;
  player.chipsPlaced = false;
  chipsOwned.textContent = player.chips
  cardsEl.style.width = dealerEl.style.width = (CARDSLOT * 2) + 'px';
  deck = initializeDeck();
  clearCardDisplay(cardsEl);
  clearCardDisplay(dealerEl);
  hideElement(cardsEl);
  hideElement(dealerEl);
  hideElement(dealerText);
  hideElement(playerText);
  hideElement(sumEl);
  messageEl.classList.remove('win','lose','push', 'bj');
  sumEl.textContent = `Sum: ${player.total}`;
  game.isInitialized = true;
}

function initializePerson(person) {
  log(`initializePerson(${person.name})`);
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

function placeBet() {
  log(`placeBet() using playerbet of ${player.bet} and chipsbet of ${chipsBet.textContent}`);
  player.bet = parseInt(chipsBet.textContent);
  if (!player.chipsPlaced) {
    player.chips -= parseInt(chipsBet.textContent);
    chipsOwned.textContent = player.chips;
  }
  if (player.bet <= 0) return;
  applyBet(player.bet);
}

function renderGame() {
  log('renderGame()');
  dealStartingCards();
  displayCards(dealer, dealerEl);
  if (checkForBlackJack()) return;
  log('no blackjacks, checking player hand');
  checkPlayerHand();
}

function result(result, msg) {
  messageEl.classList.add(result);
  messageEl.textContent = msg;
  player.isAlive = false;
  if (result == 'win') player.chips += (player.bet * 2);
  else if (result == 'push') player.chips += player.bet;
  else if (result == 'bj') player.chips += (player.bet * 2.5);
  chipsOwned.textContent = player.chips;
  prevBetButton.textContent = `PREV (${player.previousBet})`;
  //chipsBet.textContent = 0;
  hideCardButtons();
}

function prevBet() {
  log(`prevBet() - Previous bet is ${player.previousBet}`);
  if (player.previousBet === 0) return;
  player.bet = player.previousBet;
  player.chips -= player.previousBet;
  chipsOwned.textContent = player.chips;
  chipsBet.textContent = player.bet;
  applyBet(player.bet)
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
  log('stand()');
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
  log('startGame()');
  game.hasStarted = true;
  if (document.getElementById('limitations')) document.getElementById('limitations').remove();
  if (!game.isInitialized) {
    initializeGame();
  }
  message = '';
  log(`chips bet is currently ${chipsBet.textContent}`);
  game.isInitialized = false;
  player.isAlive = true;
  shuffledDeck = shuffleDeck();
  displayElement(betContainer);
  displayElement(chipsToBet);
  undisplayElement(cardButtonsDiv);
  displayElement(betButtonsDiv);
  if (player.chips <= 0) {
    log('player is broke.')
    hideElement(prevBetButton);
    hideElement(clearBetButton);
    hideElement(placeBetButton);
    betButtonsText.classList.add('error');
    betButtonsText.textContent = 'You have 0 chips';
    displayElement(betButtonsText);
    undisplayElement(betContainer);
    return;
  }
  if (!buttonsConfigured) {
    configureButtons();
    console.log('waiting on bet to be placed.');
  }
  if (!player.betPlaced) return;
  console.log('buttons configured and bet placed');
  
  return
}

function undisplayElement(element) {
  element.style.display = 'none';
}