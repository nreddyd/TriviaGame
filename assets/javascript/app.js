// object to store question, options, answer and image
var trivia = [
  {
    question:
      "Who decides to whiten his teeth before going out on a first date with a girl he's had a crush on for some time?",
    options: ["Joey", "Ross", "Chandler", "Gunther"],
    answer: "Ross",
    image: "assets/images/Ross.png"
  },
  {
    question:
      "Fill in the blanks for Phoebe's song: '_________ ______, _________ ______, what are they feeding you?'",
    options: [
      "Smelly Dog, smelly Dog",
      "Smelly Snake, smelly Snake",
      "Smelly Pet, smelly Pet",
      "Smelly Cat, smelly cat"
    ],
    answer: "Smelly Cat, smelly cat",
    image: "assets/images/phoebe.jpg"
  },
  {
    question: "Who plays Chandler?",
    options: [
      "Matt LeBlanc",
      "David Schwimmer",
      "Matthew Perry",
      "Joshua Jackson"
    ],
    answer: "Matthew Perry",
    image: "assets/images/chandler.png"
  },
  {
    question: "What was the name of Chandler's annoying ex-girlfriend?",
    options: ["Emmely", "Janice", "Susan", "Q4option4"],
    answer: "Janice",
    image: "assets/images/girlfriend.jpg"
  },
  {
    question: "Who gave birth to a child named Emma?",
    options: ["Carol", "Rachel", "Monica", "Phoebe"],
    answer: "Rachel",
    image: "assets/images/emma.jpg"
  }
];

var game = {
  count: 20,
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
    TriviaID = setInterval(this.timer, 1000);
    var question = $("<div></div>");
    question.text(trivia[game.triviaindex].question);
    $("#container").html(question);
    var option1 = $(
      "<input class='answercheckbox' id='option1' type='checkbox' name='option' value='option1'>"
    );
    $("#container").append(option1);
    var option1label = $("<label id='option1label'></label>");
    option1label.text(trivia[game.triviaindex].options[0]);
    $("#container").append(option1label);
    $("#container").append("<br>");

    var option2 = $(
      "<input class='answercheckbox' id='option2' type='checkbox' name='option' value='option2'>"
    );
    $("#container").append(option2);
    var option2label = $("<label id='option2label'></label>");
    option2label.text(trivia[game.triviaindex].options[1]);
    $("#container").append(option2label);
    $("#container").append("<br>");

    var option3 = $(
      "<input class='answercheckbox' id='option3' type='checkbox' name='option' value='option3'>"
    );
    $("#container").append(option3);
    var option3label = $("<label id='option3label'></label>");
    option3label.text(trivia[game.triviaindex].options[2]);
    $("#container").append(option3label);
    $("#container").append("<br>");

    var option4 = $(
      "<input class='answercheckbox' id='option4' type='checkbox' name='option' value='option4'>"
    );
    $("#container").append(option4);
    var option4label = $("<label id='option4label'></label>");
    option4label.text(trivia[game.triviaindex].options[3]);
    $("#container").append(option4label);
    $("#container").append("<br>");

    $(".answercheckbox").on("click", function() {
      game.currentanswer = $(this)
        .next("label")
        .text();

      game.clicked();
    });
  },
  nextquestion: function() {
    game.count = 20;
    $("#counter").text(game.count);
    game.triviaindex++;
    game.displayquestion();
  },

  timeup: function() {
    clearInterval(TriviaID);
    $("#counter").text(game.count);
    $("#container").html("<h1> Timeout </h1>");
    $("#container").append(
      "<br><p>" + trivia[game.triviaindex].answer + "</p>"
    );

    $("#container").append(
      "<br><img src=" + trivia[game.triviaindex].image + ">"
    );

    if (game.triviaindex < trivia.length - 1) {
      setInterval(game.nextquestion, 3000);
    } else {
      setInterval(game.displayresult, 3000);
    }
  },
  displayresult: function() {
    game.count = 0;
    $("#counter").text(game.count);

    $("#container").html("<p>correct answers " + game.correctanswers + "<p>");
    $("#container").append("<p>wrong answer " + game.wronganswers + "<p>");
    $("#container").append("<p>unanswerd " + (5 - game.answered) + "<p>");
    // var restart = $("<button type="button" class="btn btn-success" id="start">Start</button>");
    var restart = $("<button id='restart'>");
    restart.id;
    restart.addClass("btn btn-success restart");
    restart.text("Retake the quize");
    $("#container").append(restart);

    $(".restart").on("click", function() {
      game.restart();
    });
  },
  clicked: function() {
    console.log("clicked");
    clearInterval(TriviaID);
    $("#counter").text(game.count);

    game.answered++;

    $("#option1").prop("checked", false);
    $("#option2").prop("checked", false);
    $("#option3").prop("checked", false);
    $("#option4").prop("checked", false);

    if (game.currentanswer === trivia[game.triviaindex].answer) {
      game.correctanswers++;
      console.log("before display answer");

      $("#container").html("<h1>Correct Answer</h1>");
      $("#container").append(
        "<br><p>" + trivia[game.triviaindex].answer + "</p>"
      );
      $("#container").append(
        "<br><img src=" + trivia[game.triviaindex].image + ">"
      );
      console.log("after display answer");
      if (game.triviaindex < trivia.length - 1) {
        setTimeout(game.nextquestion, 3000);
      } else {
        setTimeout(game.displayresult, 3000);
      }
    } else {
      game.wronganswers++;
      $("#container").html("<h1>Wrong Answer</h1>");
      $("#container").append(
        "<br><p>" + trivia[game.triviaindex].answer + "</p>"
      );

      $("#container").append(
        "<br><img src=" + trivia[game.triviaindex].image + ">"
      );

      if (game.triviaindex < trivia.length - 1) {
        setTimeout(game.nextquestion, 3000);
      } else {
        setTimeout(game.displayresult, 3000);
      }
    }
  },
  restart: function() {
    console.log("inside restart");
    game.count = 20;
    game.triviaindex = 0;
    game.currentanswer = "";
    game.correctanswers = 0;
    game.wronganswers = 0;
    game.answered = 0;
    game.displayquestion();
  }
};
$("#start").on("click", function() {
  game.displayquestion();
});
