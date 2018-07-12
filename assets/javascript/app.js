var trivia = [
  {
    question: "question1",
    options: ["Q1option1", "Q1option2", "Q1option3", "Q1option4"],
    answer: "Q1option1"
  },
  {
    question: "question2",
    options: ["Q2option1", "Q2option2", "Q2option3", "Q2option4"],
    answer: "Q2option1"
  },
  {
    question: "question3",
    options: ["Q3option1", "Q3option2", "Q3option3", "Q3option4"],
    answer: "Q3option1"
  },
  {
    question: "question4",
    options: ["Q4option1", "Q4option2", "Q4option3", "Q4option4"],
    answer: "Q4option1"
  },
  {
    question: "question5",
    options: ["Q5option1", "Q5option2", "Q5option3", "Q5option4"],
    answer: "Q5option1"
  }
];

var game = {
  count: 2,
  triviaindex: 0,
  currentanswer: "",
  correctanswers: 0,
  wronganswers: 0,
  answered: 0,
  timer: function() {
    console.log(game.count);
    game.count--;
    $("#counter").text(game.count);
    if (game.count === 0) {
      game.timeup();
    }
  },
  displayquestion: function() {
    TriviaID = setInterval(this.timer, 2000);
    $("#triviaquestion").text(trivia[this.triviaindex].question);
    $("#option1label").text(trivia[this.triviaindex].options[0]);
    $("#option2label").text(trivia[this.triviaindex].options[1]);
    $("#option3label").text(trivia[this.triviaindex].options[2]);
    $("#option4label").text(trivia[this.triviaindex].options[3]);
  },
  nextquestion: function() {
    this.count = 2;
    $("#counter").text(this.count);
    this.triviaindex++;
    this.displayquestion();
  },
  timeup: function() {
    clearInterval(TriviaID);
    $("#counter").text(game.count);
    if (game.triviaindex < trivia.length - 1) {
      game.nextquestion();
    } else {
      game.displayresult();
    }
  },
  displayresult: function() {
    $("#container").html("<p>correct answers " + this.correctanswers + "<p>");
    $("#container").append("<p>wrong answer " + this.wronganswers + "<p>");
    $("#container").append("<p>unanswerd " + (5 - this.answered) + "<p>");
  },
  clicked: function() {
    clearInterval(TriviaID);
    this.answered++;

    $("#option1").prop("checked", false);
    $("#option2").prop("checked", false);
    $("#option3").prop("checked", false);
    $("#option4").prop("checked", false);

    console.log("inside clicked");
    if (this.currentanswer === trivia[this.triviaindex].answer) {
      this.correctanswers++;
      if (this.triviaindex < trivia.length - 1) {
        this.nextquestion();
      } else {
        this.displayresult();
      }
    } else {
      this.wronganswers++;
      if (this.triviaindex < trivia.length - 1) {
        this.nextquestion();
      } else {
        this.displayresult();
      }
    }
  }
};
$("#start").on("click", function() {
  game.displayquestion();
});
$(".answercheckbox").on("click", function() {
  game.currentanswer = $(this)
    .next("label")
    .text();

  game.clicked();
});

// $('#type1').click(function() {
//     $('#type2').not('#type1').removeAttr('checked');
// });
