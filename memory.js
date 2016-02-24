card1Index = 0;
card2Index = 0;
turns = 0;
state = 0;
cardValue = null;

memory = {
  deck1: [],
  deck2: [],
  shuffleDeck: [],
  exposed: [],
  tileList: [],
  buildDeck: function(matchQty){
    // generates matching lists for decks 1 & 2 and replaces it in the deck variables
    //look at code from high card project for generating cards in a deck
    //ultimately will need to accept an argument for how many cards to generate in the deck
    for (var i =1; i<= matchQty; i++) {
      this.deck1.push(i);
      this.deck2.push(i);
    }
    // console.log(this.deck1);
    // console.log(this.deck2);
  },
  combineDeck: function(){
    // Combines decks into a deck to be shuffled
    // shuffles the deck and replaces the order in the deck variables
    // look at code from high card project
    for (var card1 in this.deck1) {
      this.shuffleDeck.push(card1);
    }
    for (var card2 in this.deck2) {
      this.shuffleDeck.push(card2);
    }
    console.log(this.shuffleDeck);
  },
  shuffle: function(){
    // assigns values from shuffled deck list to cards
    // Fisher-Yates (aka Knuth) Shuffle thanks to stackoverflow
    var currentIndex = this.shuffleDeck.length;
    var temporaryValue;
    var randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = this.shuffleDeck[currentIndex];
      this.shuffleDeck[currentIndex] = this.shuffleDeck[randomIndex];
      this.shuffleDeck[randomIndex] = temporaryValue;
    }
    console.log(this.shuffleDeck);
  },
  dummyTurn: function() {
    // this function will prompt the user to select a card based on a number. Card 1 will relate to the first card in the shuffled deck
    // this function will need to be removed after GUI is designed for site
    var cardSelect = prompt("Choose the position you want to return");
    var cardValue = this.shuffleDeck[parseInt(cardSelect)-1];
    // console.log(cardValue);
    this.exposed.push(cardValue);
  },
  stateFinder: function(){
    // event handler. Tells the cards to remain flipped if they are clicked or are successfully matched
    // records the state of the game
    // Game initializes at state 0 with no cards turned, after first card is flipped state 1. Second card it will be at state 2. Once another card is clicked the cards will either be reflipped or remain exposed based on if the match was correct.
    while (this.exposed.length < this.shuffleDeck.length) {
      if (state === 0) {
          this.dummyTurn();
          state = 1;
      } else if (state === 1) {
          this.dummyTurn();
          state = 2;
      } else if (state === 2 ){
          if (this.exposed[this.exposed.length - 1] === this.exposed[this.exposed.length - 2]) {
            console.log("match!");
            state = 0;
          } else {
            this.exposed.pop();
            this.exposed.pop();
            console.log(this.exposed);
            console.log("no match!");
            state = 0;
          }
      } else {
        console.log("error");
      }
    }
    console.log("got em");
  },
  tileListBuilder: function() {
    var cardSelector  = document.querySelectorAll(".box:not(.box1):not(.box18)");
    for(var i = 0; i < cardSelector.length || i < this.shuffleDeck.length ; i++){
        cardSelector[i].setAttribute("data-index",i);
        this.tileList.push({
          divElement: cardSelector[i],
          value: this.shuffleDeck[i],
        });
      }
  },
  assignTile: function() {
    for (var i = 0; i < this.tileList.length; i++) {
      // console.log(tileBuilder[i]);
      this.tileList[i].divElement.addEventListener("click", function(){
        // console.log(tileBuilder[i].value);
        this.innerHTML = memory.shuffleDeck[this.getAttribute("data-index")];
      });
    }
  },
  runMemory: function(){
  // initializes game
  // can be called to rerun the game and reset the timers/counters
  this.buildDeck(8);
  this.combineDeck();
  this.shuffle();
  this.tileListBuilder();
  this.assignTile();
  // this.stateFinder();
  }
};

memory.runMemory();


// ------------------------
// var cardSelector  = document.querySelectorAll(".box:not(.box1):not(.box18)");
//
// var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//
// tileBuilder = [];
// function buildArray() {
//   for(var i = 0; i < cardSelector.length || i < array.length ; i++){
//       cardSelector[i].setAttribute("data-index",i);
//       tileBuilder.push({
//         divElement: cardSelector[i],
//         value: array[i],
//       });
//     };
// }
// buildArray();
//
// for (var i = 0; i < tileBuilder.length; i++) {
//   // console.log(tileBuilder[i]);
//   tileBuilder[i].divElement.addEventListener("click", function(){
//     // console.log(tileBuilder[i].value);
//     this.innerHTML = array[this.getAttribute("data-index")];
//   });
// }
