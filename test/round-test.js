const chai = require("chai");
const expect = chai.expect;
const Round = require("../src/Round");
const Deck = require("../src/Deck");
const Card = require("../src/Card");
let card1;
let card2;
let card3;
let deck;
let round2;
let round;

beforeEach(() => {
  card1 = new Card({
    id: 1,
    question: "What is Robbie's favorite animal",
    answers: ["sea otter", "pug", "capybara"],
    correctAnswer: "sea otter"
  });
  card2 = new Card({
    id: 14,
    question: "What organ is Khalid missing?",
    answers: ["spleen", "appendix", "gallbladder"],
    correctAnswer: "gallbladder"
  });
  card3 = new Card({
    id: 12,
    question: "What is Travis's favorite stress reliever?",
    answers: [
      "listening to music",
      "watching Netflix",
      "playing with bubble wrap"
    ],
    correctAnswer: "playing with bubble wrap"
  });
  deck = new Deck([card1, card2, card3]);
  round2 = new Round(deck);
  round = new Round();
});

describe("Round", function() {
  it("should be a function", function() {
    expect(Round).to.be.a("function");
  });

  it("should be an instance of Round", function() {
    expect(round).to.be.an.instanceof(Round);
  });

  it("should store an instance of deck", function() {
    expect(round2.deck).to.deep.equal(deck);
  });

  it("should return the current card being played", function() {
    expect(round2.returnCurrentCard()).to.equal(card1);
  });

  it("should take a turn", function() {
    expect(round2.takeTurn("pug")).to.equal("Incorrect!");
    expect(round2.takeTurn("gallbladder")).to.equal("Correct!");
    expect(round2.takeTurn("Lex")).to.equal("Incorrect!");
  });

  it("should calculate percentage of correct answers", function() {
    round2.takeTurn("pug");
    round2.takeTurn("gallbladder");
    round2.takeTurn("Fitzgerald");
    expect(round2.incorrectAnswers.length).to.equal(2);
    expect(round2.calculatePercentCorrect()).to.equal(33);
  });

  it("should output the percentage of correct answers at the end of the round", function() {
    round2.takeTurn("pug");
    round2.takeTurn("gallbladder");
    round2.takeTurn("Fitzgerald");
    expect(round2.endRound()).to.equal(
      "** Round over! ** You answered 33% of the questions correctly in 0 seconds!"
    );
  });
});
