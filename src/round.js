const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectAnswers = [];
    this.startTime = new Date();
    this.currentRound = 1;
  }

  returnCurrentCard() {
    return this.deck.cards[this.turns];
  }

  takeTurn(guess) {
    const turn = new Turn(guess, this.returnCurrentCard());
    if (!turn.evaluateGuess()) {
      this.incorrectAnswers.push(this.returnCurrentCard().id)
    }
    this.turns++;
    console.log(`You are on turn ${this.turns} / 30`)

    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    const incorrect = this.incorrectAnswers.length;
    return 100 - (Math.round((incorrect / this.turns) * 100));
  }

  endRound() {
    const endTime = new Date();
    const totalTime = Math.round((endTime - this.startTime) / 1000);
    if (totalTime < 60) {
      return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly in ${totalTime} seconds!`;
    }  else {
      const totalMinutes = Math.round(totalTime / 60);
      const s = totalMinutes === 1 ? '' : 's';
      return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly in ${totalMinutes} minute${s}!`;
    }
  }

  morePractice() {
    if(this.calculatePercentCorrect() < 90) {
      this.currentRound ++;
      console.log('~~~~~~~~~~~')
      console.log('It looks like you might need some more practice, you are now on try:',this.currentRound);
      this.turns = 0;
      this.incorrectAnswers = [];
      this.startTime = new Date();
    } else {
      endRound();
    }
  }
}






module.exports = Round;
