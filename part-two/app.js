$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  // 1. Make a request to the Deck of Cards API to request a
  // single card from a newly shuffled deck.Once you have the card,
  // console.log the value and the suit(e.g. “5 of spades”, “queen of diamonds”).
  async function reqCard() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
  reqCard();

  // 2. Make a request to the deck of cards API to request a
  // single card from a newly shuffled deck.Once you have the card,
  // make a request to the same API to get one more card from the same deck.
  // Once you have both cards, console.log the values and suits of both cards.
  async function reqMultiCards() {
    let cardData1 = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = cardData1.deck_id;
    let cardData2 = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [cardData1, cardData2].forEach((card) => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }
  reqMultiCards();

  // 3. Build an HTML page that lets you draw cards from a deck.
  // When the page loads, go to the Deck of Cards API to create a new deck,
  // and show a button on the page that will let you draw a card.
  // Every time you click the button, display a new card, until there
  // are no cards left in the deck.
  async function reqAllCards() {
    let $btn = $("button");
    let $cards = $("#cards");

    let deckInfo = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on("click", async function () {
      let deck = await $.getJSON(`${baseURL}/${deckInfo.deck_id}/draw/`);
      let cardImg = deck.cards[0].image;
      $cards.append(
        $("<img>", {
          src: cardImg,
        })
      );
      if (deck.remaining === 0) $btn.remove();
    });
  }
  reqAllCards();
});
