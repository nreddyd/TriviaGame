var audioElement = document.createElement("audio");
var resultaudio = document.createElement("audio");

// object to store question, options, answer and image
var trivia = [
  {
    question:
      "Who decides to whiten his teeth before going out on a first date with a girl he's had a crush on for some time?",
    options: ["Joey", "Ross", "Chandler", "Gunther"],
    answer: "Ross",
    image: "assets/images/Ross.gif"
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
    image: "assets/images/phoebe.gif"
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
    image: "assets/images/chandler.gif"
  },
  {
    question: "What was the name of Chandler's annoying ex-girlfriend?",
    options: ["Emmely", "Janice", "Susan", "Monica"],
    answer: "Janice",
    image: "assets/images/janice.gif"
  },
  {
    question: "Who gave birth to a child named Emma?",
    options: ["Carol", "Rachel", "Monica", "Phoebe"],
    answer: "Rachel",
    image: "assets/images/Emma.gif"
  },
  {
    question: "What is the name of Ross's son?",
    options: ["Adam", "Eden", "Den", "Ben"],
    answer: "Ben",
    image: "assets/images/Ben.gif"
  },
  {
    question: "Monica is a _______ freak",
    options: ["Mean", "Loud", "Neat", "Cool"],
    answer: "Neat",
    image: "assets/images/Monica.gif"
  },
  {
    question: "What is the name of the coffee house where the gang hangs out?",
    options: ["Central Perk", "Central Park", "Coffee Hut", "Coffee Perk"],
    answer: "Central Perk",
    image: "assets/images/CentralPerk.gif"
  },
  {
    question: "Which friend directed the episode 'Since You've Been Gone'?",
    options: [
      "Matt LeBlanc",
      "David Schwimmer",
      "Matthew Perry",
      "Joshua Jackson"
    ],
    answer: "David Schwimmer",
    image: "assets/images/David.gif"
  },
  {
    question: "Finally, Chandler and Joey worry that they ____ too much.",
    options: ["Play fooseball", "watch TV", "drink", "Hug"],
    answer: "Hug",
    image: "assets/images/hug.gif"
  }
];

var game = {
  count: 10,
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
    var option1 = $("<input type='checkbox' name='option' value='option1'>");
    option1.addClass("answercheckbox");
    $("#container").append(option1);
    var option1label = $("<label>");
    option1label.text(trivia[game.triviaindex].options[0]);
    $("#container").append(option1label);
    $("#container").append("<br>");

    var option2 = $("<input type='checkbox' name='option' value='option2'>");
    option2.addClass("answercheckbox");
    $("#container").append(option2);
    var option2label = $("<label>");
    option2label.text(trivia[game.triviaindex].options[1]);
    $("#container").append(option2label);
    $("#container").append("<br>");

    var option3 = $("<input type='checkbox' name='option' value='option3'>");
    option3.addClass("answercheckbox");
    $("#container").append(option3);
    var option3label = $("<label>");
    option3label.text(trivia[game.triviaindex].options[2]);
    $("#container").append(option3label);
    $("#container").append("<br>");

    var option4 = $("<input type='checkbox' name='option' value='option4'>");
    option4.addClass("answercheckbox");
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
    game.count = 10;
    $("#counter").text(game.count);
    game.triviaindex++;
    game.displayquestion();
  },

  timeup: function() {
    clearInterval(TriviaID);
    $("#counter").text(game.count);
    var timeout = $("<div>");
    var result = $("<h2>");
    result.text("Timeout");
    timeout.append(result);
    timeout.append(
      "<p> Answer is : " + trivia[game.triviaindex].answer + "</p>"
    );
    timeout.append("<img src=" + trivia[game.triviaindex].image + ">");
    $("#container").html(timeout);

    if (game.triviaindex < trivia.length - 1) {
      setTimeout(game.nextquestion, 3000);
    } else {
      setTimeout(game.displayresult, 3000);
    }
  },
  displayresult: function() {
    clearInterval(TriviaID);
    game.count = 0;
    $("#counter").text(game.count);

    var gameover = $("<div>");
    var results = $("<h2>");
    if (game.correctanswers >= 8) {
      results.text("You Won");
      audioElement.pause();
      resultaudio.setAttribute("src", "assets/music/win.mp3");
      resultaudio.play();
    } else {
      results.text("You Loose");
      audioElement.pause();
      resultaudio.setAttribute("src", "assets/music/loose.mp3");
      resultaudio.play();
    }
    gameover.append(results);
    gameover.append("<p>Correct Answers : " + game.correctanswers + "</p>");
    gameover.append("<p>Wrong Answers : " + game.wronganswers + "</p>");
    gameover.append(
      "<p>Unanswerd : " + (trivia.length - game.answered) + "</p>"
    );
    gameover.append("<br>");
    $("#container").html(gameover);

    var restart = $("<button>");
    restart.addClass("btn btn-success restart");
    restart.text("Start Over");
    $("#container").append(restart);

    $(".restart").on("click", function() {
      game.restart();
    });
  },

  clicked: function() {
    clearInterval(TriviaID);
    $("#counter").text(game.count);

    game.answered++;

    $("#option1").prop("checked", false);
    $("#option2").prop("checked", false);
    $("#option3").prop("checked", false);
    $("#option4").prop("checked", false);

    if (game.currentanswer === trivia[game.triviaindex].answer) {
      game.correctanswers++;
      var output = $("<div>");
      var result = $("<h2>");
      result.text("Correct Answer");
      output.append(result);
      output.append(
        "<p> Answer is : " + trivia[game.triviaindex].answer + "</p>"
      );
      output.append("<img src=" + trivia[game.triviaindex].image + ">");
      $("#container").html(output);

      if (game.triviaindex < trivia.length - 1) {
        setTimeout(game.nextquestion, 3000);
      } else {
        setTimeout(game.displayresult, 3000);
      }
    } else {
      game.wronganswers++;
      var output = $("<div>");
      var result = $("<h2>");
      result.text("Wrong Answer");
      output.append(result);
      output.append(
        "<p> Answer is : " + trivia[game.triviaindex].answer + "</p>"
      );
      output.append("<img src=" + trivia[game.triviaindex].image + ">");
      $("#container").html(output);

      if (game.triviaindex < trivia.length - 1) {
        setTimeout(game.nextquestion, 3000);
      } else {
        setTimeout(game.displayresult, 3000);
      }
    }
  },

  restart: function() {
    console.log("inside restart");
    game.count = 10;
    game.triviaindex = 0;
    game.currentanswer = "";
    game.correctanswers = 0;
    game.wronganswers = 0;
    game.answered = 0;
    audioElement.setAttribute("src", "assets/music/Friends.mp3");
    audioElement.loop = true;
    audioElement.play();
    game.displayquestion();
  }
};

$("#start").on("click", function() {
  $("#time").css("visibility", "visible");
  audioElement.setAttribute("src", "assets/music/Friends.mp3");
  audioElement.loop = true;
  audioElement.play();
  game.displayquestion();
});
