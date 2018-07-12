var trivia = [
  {
    question: "question1",
    options: ["Q1option1", "Q1option2", "Q1option3", "Q1option4"],
    answer: "option1"
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

var count = 0;

$("#start").on("click", function() {
  $("#triviaquestion").text(trivia[0].question);
  $("#customCheck1label").text(trivia[0].options[0]);
  $("#customCheck2label").text(trivia[0].options[1]);
  $("#customCheck3label").text(trivia[0].options[2]);
  $("#customCheck4label").text(trivia[0].options[3]);
});

// function displayquestion() {
//   if (count === trivia.length) {
//     $("#questioncontainer").text("THe ENd");
//   }

//   for (i = o; i < trivia.length; i++) {
//     $("#triviaquestiom").html(trivia[i].question);
//     $("#customCheck1label").html(trivia[i].option[0]);
//     $("#customCheck2label").html(trivia[i].option[1]);
//     $("#customCheck3label").html(trivia[i].option[2]);
//     $("#customCheck4label").html(trivia[i].option[3]);
//   }

//   count++;
// }

// function startquestions() {
//   triviainterval = setInterval(displayquestion, 2000);
// }

// startquestions();
