card1Index = 0;
card2Index = 0;
turns = 0;
state = 0;
cardValue = null;
gameOn = false;
clicks = 0;

memory = {
  deck1: [],
  deck2: [],
  shuffleDeck: [],
  exposed: [],
  cardSelector: document.querySelectorAll(".box:not(.box1):not(.box18)"),
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
    // console.log(this.shuffleDeck);
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
  // gameStart: function(){
  //   if(this.exposed.length > 0){
  //     console.log(state);
  //     this.gameTracker();
  //   }
  // },
  eventHandler: function() {
    for(var i = 0; i < this.cardSelector.length; i++){
      this.cardSelector[i].setAttribute("data-index",i);
      this.cardSelector[i].addEventListener("click", this.mouseClick);
      // function() {
      //   memory.exposed.push({
      //     attr: this.getAttribute("data-index"),
      //     num: memory.shuffleDeck[this.getAttribute("data-index")]
      //   });
      //   this.innerHTML = memory.shuffleDeck[this.getAttribute("data-index")];
      // });
    }
  },
  mouseClick: function() {
    // game handler. Tells the cards to remain flipped if they are clicked or are successfully matched
    // records the state of the game
    // Game initializes at state 0 with no cards turned, after first card is flipped state 1. Second card it will be at state 2. Once another card is clicked the cards will either be reflipped or remain exposed based on if the match was correct.
    memory.exposed.push({
      attr: this.getAttribute("data-index"),
      num: memory.shuffleDeck[this.getAttribute("data-index")]
    });
    this.innerHTML = memory.shuffleDeck[this.getAttribute("data-index")];
    console.log(memory.exposed);
    clicks++;
    console.log(clicks);
    if (clicks%2===0) {
      console.log("lets check if its a match");
      memory.matchChecker();
    }
  },
  matchChecker: function () {
    if (memory.exposed[memory.exposed.length - 1].num === memory.exposed[memory.exposed.length - 2].num) {
        console.log("match!");
        state = 0;
      } else {
        memory.cardSelector[memory.exposed[memory.exposed.length - 1].attr].innerHTML="";
        memory.cardSelector[memory.exposed[memory.exposed.length - 2].attr].innerHTML="";
        memory.exposed.pop();
        memory.exposed.pop();
        console.log(memory.exposed);
        console.log("no match!");
      }
  },
  runMemory: function(){
    // initializes game
    // can be called to rerun the game and reset the timers/counters
    this.buildDeck(8);
    this.combineDeck();
    this.shuffle();
    this.eventHandler();
    // this.gameTracker();
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


// dummyTurn: function() {
//   // this function will prompt the user to select a card based on a number. Card 1 will relate to the first card in the shuffled deck
//   // this function will need to be removed after GUI is designed for site
//   var cardSelect = prompt("Choose the position you want to return");
//   var cardValue = this.shuffleDeck[parseInt(cardSelect)-1];
//   // console.log(cardValue);
//   this.exposed.push(cardValue);
// },

// tileListBuilder: function() {
//   // This function creates an array of objects to be called on in the assignTile function
//   var cardSelector  = document.querySelectorAll(".box:not(.box1):not(.box18)");
//   for(var i = 0; i < cardSelector.length; i++){
//       cardSelector[i].setAttribute("data-index",i);
//       // this.tileList.push({
//       //   divElement: cardSelector[i],
//       //   value: this.shuffleDeck[i],
//       // });
//     }
// },
// assignTile: function() {
// // this functon is responsible for calling the div elements to turn once clicked
// // Will also need to provide the index of the element that is clicked to feed into the exposed list and checked by the stateFinder
//   for (var i = 0; i < this.cardSelector.length; i++) {
//     // console.log(tileBuilder[i]);
//     this.tileList[i].divElement.addEventListener("click", function(){
//       // console.log(tileBuilder[i].value);
//       memory.exposed.push(memory.shuffleDeck[this.getAttribute("data-index")]);
//       this.exposed.forEach(function(){
//         this.innerHTML = memory.shuffleDeck[this.getAttribute("data-index")];
//       });
//       console.log(memory.exposed);
//     });
//   }
// },


//
// recordClick: function() {
//   memory.exposed.push({
//     attr: this.getAttribute("data-index"),
//     num: this.shuffleDeck[this.getAttribute("data-index")]
//   });
//   gameOn=true;
// },



    // while (memory.exposed.length < memory.shuffleDeck.length) {
    //   if (state === 0) {
    //       memory.exposed[0].attr.innerHTML = memory.exposed[0].num;
    //       state++;
    //   } else if (state === 1) {
    //       memory.exposed[memory.exposed.length -1].attr.innerHTML = memory.exposed[memory.exposed.length -1].num;
    //       state++;
    //   } else if (state === 2 ) {
    //       if (memory.exposed[memory.exposed.length - 1].num === memory.exposed[memory.exposed.length - 2].num) {
    //         console.log("match!");
    //         state = 0;
    //       } else {
    //         memory.exposed.pop();
    //         memory.exposed.pop();
    //         console.log(memory.exposed);
    //         console.log("no match!");
    //         state = 0;
    //       }
    //   } else {
    //     console.log("error");
    //   }
    // }
    // console.log("got em");
