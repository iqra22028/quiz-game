const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
    { question: "What is 5 * 3?", options: ["13", "15", "17", "18"], correctAnswer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: 2 },
    { question: "Which planet is closest to the sun?", options: ["Earth", "Mercury", "Venus", "Mars"], correctAnswer: 1 },
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3 },
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "NaCl"], correctAnswer: 1 },
    { question: "Who invented the lightbulb?", options: ["Tesla", "Edison", "Einstein", "Newton"], correctAnswer: 1 },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correctAnswer: 2 },
    { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "North America"], correctAnswer: 1 },
    { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: 1 },
    { question: "What is 7 * 8?", options: ["54", "56", "58", "60"], correctAnswer: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], correctAnswer: 0 },
    { question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], correctAnswer: 1 },
    { question: "Which gas do plants absorb for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 1 },
    { question: "What is the freezing point of water?", options: ["0°C", "100°C", "-1°C", "50°C"], correctAnswer: 0 },
  ];
  
  let currentQuestionIndex = 0;
  let tempScore = 0;  // Initialize tempScore here
  let timer;
  let timeLeft = 30;  // Set time for the quiz
  
  // Start Quiz Function
  function startQuiz() {
    document.getElementById("intro-screen").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    startTimer();
    loadQuestion();
  }
  
  // Timer Function
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }
  
  // Load Questions
  function loadQuestion() {
    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionObj.question;
  
    const answerElements = document.querySelectorAll(".answer .answer-text");
    questionObj.options.forEach((option, index) => {
      answerElements[index].textContent = option;
    });
  }
  
  // Check Answer Function
  function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const answerElements = document.querySelectorAll(".answer");
  
    if (selectedIndex === correctAnswer) {
      tempScore++;  // Increment tempScore for correct answers
      document.getElementById("score").textContent = `Score: ${tempScore}`;  // Update score on the page
    }
  
    answerElements.forEach((answer, index) => {
      if (index === selectedIndex) {
        answer.classList.add(index === correctAnswer ? "correct-answer" : "wrong-answer");
      } else if (index === correctAnswer) {
        answer.classList.add("correct-answer");
      }
    });
  
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
        resetAnswerStyles();
      } else {
        clearInterval(timer);
        endQuiz();  // Proceed to end quiz
      }
    }, 1000);
  }
  
  // Reset Answer Styles
  function resetAnswerStyles() {
    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach(answer => {
      answer.classList.remove("correct-answer", "wrong-answer");
    });
  }
  
  // End Quiz Function
  function endQuiz() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = tempScore;  // Display score at the end
    document.getElementById("total-questions").textContent = questions.length;
  
    const percentage = (tempScore / questions.length) * 100;
    document.getElementById("percentage").textContent = percentage.toFixed(2);
  
    let grade, emoji;
    if (percentage >= 90) {
      grade = "A+";
      emoji = "🎉";
    } else if (percentage >= 80) {
      grade = "A";
      emoji = "😊";
    } else if (percentage >= 70) {
      grade = "B";
      emoji = "😐";
    } else if (percentage >= 50) {
      grade = "C";
      emoji = "😐";
    } else if (percentage >= 40) {
      grade = "D";
      emoji = "😔";
    } else {
      grade = "Fail";
      emoji = "😢";
    }
  
    document.getElementById("grade").textContent = grade;
    document.getElementById("emoji").textContent = emoji;
  }
  
  // Reset Game Function
  function resetGame() {
    currentQuestionIndex = 0;
    tempScore = 0;  // Reset tempScore to 0
    timeLeft = 20;
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("intro-screen").classList.remove("hidden");
  }
  