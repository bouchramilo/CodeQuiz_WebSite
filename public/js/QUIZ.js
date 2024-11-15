window.addEventListener("DOMContentLoaded", function () {
  const quizId = localStorage.getItem("IDquiz");

  if (quizId) {
    loadQuestions(quizId);
  } else {
    console.error("Quiz ID not found in localStorage.");
  }
});

function loadQuestions(quizId) {
  Promise.all([
    fetch("/data/questions.json"),
    fetch("/data/questionsVF.json"),
    fetch("/data/questionsText.json"),
  ])
    .then((responses) => {
      if (!responses[0].ok || !responses[1].ok || !responses[2].ok) {
        throw new Error("One or more files not found");
      }
      return Promise.all(responses.map((response) => response.json()));
    })
    .then(([qcmQuestions, vfQuestions, textQuestions]) => {
      const qcmForQuiz = qcmQuestions.filter(
        (question) => question.id_quiz == quizId
      );
      const vfForQuiz = vfQuestions.filter(
        (question) => question.id_quiz == quizId
      );
      const textForQuiz = textQuestions.filter(
        (question) => question.id_quiz == quizId
      );

      const questions = [...qcmForQuiz, ...vfForQuiz, ...textForQuiz];
      let currentQuestionIndex = 0;

      let score = 0;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let TimeTotal = 0;

      function timeQuestion() {
        // secondes écoulées
        let secondes = 15;

        // élément où afficher le décompte
        let para = document.getElementById("timeQuestion");

        // lance l'exécution de la fonction à toutes les secondes
        let chrono = window.setInterval(tictictic, 1000);

        // ---------------------------------------------------------
        // Incrément le nombre de secondes, affiche cette quantité
        // et arrête automatiquement après une minute.
        // ---------------------------------------------------------
        function tictictic() {
          secondes--;
          para.innerHTML = secondes;
          if (secondes == 0) {
            // arrête l'exécution lancée par setInterval()
            window.clearTimeout(chrono);
          }
        }
      }

      timeQuestion();

      function displayQuestion(index) {
        const questionContainer = document.getElementById("questionsForme");
        questionContainer.innerHTML = ""; 

        if (index >= questions.length) {
          questionContainer.innerHTML = "";
          questionContainer.innerHTML = `
            <section class=" w-full h-[600px] justify-center  flex">
              <div class="relative w-full  overflow-hidden">
                <img src="images/background_.jpg" alt="background home" class="absolute inset-0 w-full h-full object-cover ">
                <div class="relative z-10 flex flex-col gap-10 items-center justify-center h-full bg-transparent bg-opacity-100">
                  <div class="w-4/5 h-full bg-blue-300 flex flex-col justify-around items-center py-2 gap-2 max-md:w-full">
                    <div>
                      <h1 class="text-2xl text-yellow-600 text-center">
                          Soyez bienveillant envers vous-même, et continuez à vous entraîner !
                      </h1>
                    </div>
                    <div>
                      <h3>Temps total : ${TimeTotal} s</h3>
                      <h3 class="score">Score : ${score} pts </h3>
                      <h3>Record : ${score} pts </h3>
                      <h3 class="text-green-700">Correct : ${correctAnswers}/${
            questions.length
          }</h3>
                      <h3 class="text-red-600">Incorrect : ${incorrectAnswers}/${
            questions.length
          }</h3>
                      <h3>Pourcentage de réussite : ${(
                        (100 * correctAnswers) /
                        questions.length
                      ).toFixed(2)}% </h3>
                    </div>
                    <div class="w-[90%] flex justify-end gap-6 max-md:gap-2 max-md:flex-col max-md:justify-center max-md:items-center  text-sm">
                      <a href="index.html"><button class="bg-gray-400 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-gray-300">Accueil</button></a>
                      <a href="quiz.html"><button class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600">Refaire</button></a>
                      <a href="index.html"><button class="bg-blue-500 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-blue-500">Partager</button></a>
                    </div>
                  </div>
                </div>
            </section>
          `;
          return;
        }

        const question = questions[index];
        const questionElement = document.createElement("div");
        questionElement.classList.add(
          "w-4/5",
          "h-[100%]",
          "max-lg:w-[95%]",
          "flex",
          "flex-col",
          "py-2",
          "gap-2",
          "max-md:w-full"
        );

        questionElement.innerHTML = `
            <div class="bg-transparent h-[10%] grid lg:grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2  border-2 rounded-md border-yellow-600 shadow-gray-400 shadow-md">
                  <div class=" flex justify-center items-center "><input type="range" min="0" max="100" value="${
                    (100 * index) / questions.length
                  }" class="w-64 h-2 bg-gray-300 rounded-lg cursor-pointer disabled:bg-gray-400" disabled></div>
                  <div class=" flex justify-center items-center ">${
                    index + 1
                  }/${questions.length}</div>
                  <div class=" flex justify-center items-center "><h3 class="score">Score : ${score}pts</h3></div>
                  <div id="timeQuestion" class=" flex justify-center items-center ">${
                    question.timeQuestion
                  }</div>
            </div>
            <div class="bg-blue-500 h-[80%] border-2 rounded-md border-yellow-600">
                  <form action="quiz.html" class=" h-full flex flex-col gap-4 px-4 py-4">
                        <div class="flex h-[45%] items-center gap-6">
                              <img src="${IMGtypeQuestion(
                                question
                              )}" alt="Type de question">
                              <p>${question.questions}</p>
                        </div>
                        <div class="lg:w-full lg:h-[45%] flex lg:flex-row gap-4 justify-center max-md:gap-2  max-md:flex-col max-md:h-3/5">${renderOptions(
                          question
                        )}</div>
                        <div class="h-[10%] flex justify-end items-center ">
                              <button id="nextButton" class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600" style="display:none ;">suivant</button>
                        </div>
                  </form>
            </div>
            <div id="expl" class="explication bg-transparent h-[10%] border-2 rounded-md border-yellow-600 shadow-gray-400 shadow-lg " style="display:none ;">
                  <h1>Explication : ${question.Explication}</h1>
            </div>
        `;

        questionContainer.appendChild(questionElement);
        timeQuestion(question.timeQuestion);

        document.querySelectorAll(".option-button").forEach((button) => {
          button.addEventListener("click", () => handleAnswerSelection(button));
        });
        document.querySelectorAll(".vf-button").forEach((button) => {
          button.addEventListener("click", () => handleAnswerSelection(button));
        });
        document.querySelectorAll(".response-textarea").forEach((button) => {
          button.addEventListener("input", () => handleAnswerSelection(button));
        });
        document
          .querySelector("#nextButton")
          .addEventListener("click", (event) => {
            event.preventDefault();
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
          });
      }

      function renderOptions(question) {
        if (question.type === "QCM") {
          return question.reponses
            .map(
              (answer) => `
                  <button data-answer="${answer}" class="option-button w-full border-2 rounded-md border-white hover:border-yellow-600 flex justify-center items-center max-md:h-1/4 hover:shadow-gray-700 hover:shadow-lg">${answer}</button>
              `
            )
            .join("");
        } else if (question.type === "V/F") {
          return `
              <button type="button" class="vf-button w-full border-2 rounded-md border-white hover:border-yellow-600 flex justify-center items-center max-md:h-1/3 hover:shadow-gray-700 hover:shadow-lg" data-answer="Vrai">Vrai</button>
              <button type="button" class="vf-button w-full border-2 rounded-md border-white hover:border-yellow-600 flex justify-center items-center max-md:h-1/3 hover:shadow-gray-700 hover:shadow-lg" data-answer="Faux">Faux</button>
          `;
        } else if (question.type === "Textuel") {
          return `<input type="text" class="response-textarea bg-emerald-100 w-full border-2 resize-none rounded-md border-white hover:border-yellow-600 max-md:h-full hover:shadow-gray-700 hover:shadow-lg">
                <div class="suggestions-container"></div>`;
        }
      }

      function handleTextualInput() {
        const question = questions[currentQuestionIndex];
        const correctAnswers = question.reponces_correct;
        const textarea = document.querySelector(".response-textarea");

        textarea.addEventListener("input", () => {
          const userAnswer = textarea.value.trim().toLowerCase();
          const isCorrect = correctAnswers.some(
            (correctAnswer) => userAnswer === correctAnswer.trim().toLowerCase()
          );

          textarea.style.backgroundColor = isCorrect ? "green" : "red";
          showExplication();
          isCorrect
            ? updateScores(true, question.points || 1)
            : updateScores(false, question.points || 1);
        });
      }

      function handleAnswerSelection(button) {
        const question = questions[currentQuestionIndex];
        const correctAnswers = question.reponces_correct;
        const questionType = question.type;
    
        if (questionType === "Textuel") {
            handleTextualInput();
        } else {
            const selectedAnswer = button?.dataset.answer;
            if (selectedAnswer) {
                disableInputs(questionType);
                let isCorrect = false;
    
                if (questionType === "QCM") {
                    isCorrect = correctAnswers.includes(selectedAnswer);
                } else if (questionType === "V/F") {
                    isCorrect =
                        (selectedAnswer === "Vrai" && correctAnswers[0] === true) ||
                        (selectedAnswer === "Faux" && correctAnswers[1] === true);
                }
    
                applyVisualFeedback(button, isCorrect, questionType, correctAnswers);
    
                showExplication();
                updateScores(isCorrect, question.points || 1);
            }
        }
    }
    
    function applyVisualFeedback(button, isCorrect, questionType, correctAnswers) {
        const options = document.querySelectorAll(
            questionType === "V/F" ? ".vf-button" : ".option-button"
        );
    
        // Parcourir toutes les options pour appliquer le style approprié
        options.forEach((option) => {
            const answer = option.dataset.answer;
    
            if (questionType === "QCM") {
                if (correctAnswers.includes(answer)) {
                    // Bonne réponse en vert
                    option.style.backgroundColor = "green";
                } else if (button.dataset.answer === answer && !isCorrect) {
                    // Réponse incorrecte sélectionnée en rouge
                    option.style.backgroundColor = "red";
                } else {
                    // Options non sélectionnées en gris
                    option.style.backgroundColor = "gray";
                }
            } else if (questionType === "V/F") {
                if (correctAnswers[0] && answer === "Vrai") {
                    option.style.backgroundColor = "green"; // Bonne réponse (Vrai)
                } else if (correctAnswers[1] && answer === "Faux") {
                    option.style.backgroundColor = "green"; // Bonne réponse (Faux)
                } else if (button.dataset.answer === answer && !isCorrect) {
                    option.style.backgroundColor = "red"; // Mauvaise réponse sélectionnée
                } else {
                    option.style.backgroundColor = "gray"; // Non sélectionnée
                }
            }
        });
    }
    
    function showExplication() {
        const explanationElement = document.getElementById("expl");
        if (explanationElement) {
            explanationElement.style.display = "block";
        }
    
        const btnNext = document.getElementById("nextButton");
        if (btnNext) {
            btnNext.style.display = "block";
        }
    }
    
      function showExplication() {
        const explanationElement = document.getElementById("expl");
        if (explanationElement) {
          explanationElement.style.display = "block";
        }

        const btnNext = document.getElementById("nextButton");
        if (btnNext) {
          btnNext.style.display = "block";
        }
      }

      function disableInputs(questionType) {
        document
          .querySelectorAll(".option-button, .vf-button")
          .forEach((btn) => (btn.disabled = true));
        if (questionType === "Textuel") {
          document.querySelector(".response-textarea").disabled = true;
        }
      }

      function updateScores(isCorrect, points) {
        TimeTotal += parseInt(
          document.getElementById("timeQuestion").textContent
        );
        score += isCorrect ? points : 0;
        correctAnswers += isCorrect ? 1 : 0;
        incorrectAnswers += isCorrect ? 0 : 1;
      }

      function timeQuestion(timeQuestion) {
        let secondes = timeQuestion || 10;
        let para = document.getElementById("timeQuestion");

        let chrono = window.setInterval(tictictic, 1000);

        function tictictic() {
          if (secondes <= 0) {
            window.clearInterval(chrono);
            para.textContent = 0;
          } else {
            para.textContent = secondes;
            secondes--;
          }
          para.appendChild;
        }
      }

      function IMGtypeQuestion(question) {
        if (question.type === "QCM") {
          return "images/icones/questionQCM.png";
        } else if (question.type === "V/F") {
          return "images/icones/questionVF.png";
        }
        return "images/icones/questionText.png";
      }

      displayQuestion(currentQuestionIndex);
    })
    .catch((error) => {
      console.error("Error loading questions:", error);
    });
}
