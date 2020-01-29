const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectAnswers = [];
  }

  returnCurrentCard() {
    return this.deck.cards[this.turns];
  }

  takeTurn(guess) {
    const turn = new Turn(guess, this.returnCurrentCard());
    !turn.evaluateGuess() ? this.incorrectAnswers.push(this.returnCurrentCard().id) : null;
    this.turns++;
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    const incorrect = this.incorrectAnswers.length;
    return Math.round(incorrect / this.turns * 100);
  }

  endRound() {
   return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`
  }
}

module.exports = Round;
