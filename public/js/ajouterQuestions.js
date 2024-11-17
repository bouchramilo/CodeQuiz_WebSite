
window.addEventListener("DOMContentLoaded", function () {
    const nomQuiz = JSON.parse(localStorage.getItem('NomQuiz'));
    // alert(nomQuiz);
    const id = JSON.parse(localStorage.getItem('quizId'));
    const nbQuestions = JSON.parse(localStorage.getItem('nbQuestions'));
    const nbrQestionsQCM = JSON.parse(localStorage.getItem('nbrQestionsQCM'));
    const nbrQestionsVF = JSON.parse(localStorage.getItem('nbrQestionsVF'));
    const nbrQestionsTxt = JSON.parse(localStorage.getItem('nbrQestionsTxt'));

    if (id) {
        showFormsQuestions(id, nomQuiz,   nbQuestions, nbrQestionsQCM, nbrQestionsVF, nbrQestionsTxt);//nomQuiz,
    } else {
        console.error("Quiz ID not found in localStorage.");
    }
});

function showFormsQuestions(id, nom_Quiz, nbQuestions, nbrQestionsQCM, nbrQestionsVF, nbrQestionsTxt) {// nomQuiz,
    let currentQuestionIndex = 0;
    // alert("nomQuiz : "+ nom_Quiz);

    function displayQuestion(index) {
        const formeContainer = document.getElementById("AddquestionsForme");
        if (!formeContainer) {
            console.error("L'élément AddquestionsForme est introuvable.");
            alert("L'élément AddquestionsForme est introuvable.");
            return;
        }

        formeContainer.innerHTML = "";

        if (index >= nbQuestions) {
            formeContainer.innerHTML = `
                <section class="w-full h-[600px] flex justify-center bg-red-500">
                    <div class="relative w-full overflow-hidden">
                        <img src="images/background_.jpg" alt="background" class="absolute inset-0 w-full h-full object-cover">
                        <div class="relative z-10 flex flex-col gap-10 items-center justify-center h-full">
                            <div class="bg-black text-white w-1/2 h-1/2 flex flex-col gap-10 items-center justify-center">
                                <h1 class="text-2xl text-yellow-600 text-center">All questions completed!</h1>
                                <a href="admin.html">
                                    <button class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:text-black hover:bg-white">Admin</button>
                                </a>
                                <a href="index.html">
                                    <button class="bg-gray-400 h-8 w-32 border-2 rounded-md border-white hover:text-black hover:bg-white">Home</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            return;
        }

        let formHTML = "";
        if (index < nbrQestionsQCM) {
            formHTML = createQCMForm(id, nom_Quiz, index);//nomQuiz,
        } else if (index < nbrQestionsQCM + nbrQestionsVF) {
            formHTML = createVFForm(id, nom_Quiz, index);//nomQuiz,
        } else {
            formHTML = createTextForm(id, nom_Quiz, index);//nomQuiz,
        }

        formeContainer.innerHTML = formHTML;

        const nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", async () => {
            if (index < nbrQestionsQCM) {
                await setQuestionQCM();
            } else if (index < nbrQestionsQCM + nbrQestionsVF) {
                await setQuestionVF();
            } else {
                await setQuestionText();
            }

            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        });


    }
    

    displayQuestion(currentQuestionIndex);
}

function createQCMForm(id, nomQuiz, index) {//nomQuiz, 
    return `
        <form action="" id="questionForm" class="bg-gray-200 lg:w-[90%] max-lg:w-[95%] max-md:w-full flex flex-col gap-2 p-2 border-2 rounded-md ">
                             <h1>Question ${index + 1} : QCM</h1>
                             <div class="flex lg:flex-row gap-2 max-md:flex-col">
                                 <div class="flex flex-col gap-2 p-2 w-1/2 max-md:w-full  justify-center  ">
                                     <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col  gap-1 w-full">
                                         <input type="hidden" id="id_quiz" value="${id}">
                                         <input type="hidden" id="nom_quiz" value="${nomQuiz}">

                                         <input type="hidden" id="typeQuestion" value="QCM">
                                         <label for="question" class="lg:w-1/2 max-md:w-full">Question : </label>
                                         <input type="text" placeholder="Question" id="question"
                                             class=" h-10 lg:w-1/2 max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                             required>
                                     </div>
                                     <div class="flex flex-col gap-2 w-full ">
                                         <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
                                             <label for="option 1" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 1 :
                                             </label>
                                             <input type="text" placeholder="Option 1" id="option_1"
                                                 class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                                 required>
                                         </div>
                                         <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
                                             <label for="option 2" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 2 :
                                             </label>
                                             <input type="text" placeholder="Option 2" id="option_2"
                                                 class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                                 required>
                                         </div>
                                         <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
                                             <label for="option 3" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 3 :
                                             </label>
                                             <input type="text" placeholder="Option 3" id="option_3"
                                                 class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                                 required>
                                         </div>
                                         <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col w-full">
                                             <label for="option 4" class="lg:w-1/2 max-md:w-full max-lg:w-full">Option 4 :
                                             </label>
                                             <input type="text" placeholder="Option 4" id="option_4"
                                                 class=" h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                                 required>
                                         </div>

                                     </div>
                                 </div>

                                 <div
                                     class="w-1/2 max-md:w-full flex flex-col gap-2 border-l-2 max-md:border-none border-yellow-600 max-md:border-non pl-2 ">
                                     <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col">
                                         <h3 class="lg:w-1/2 max-md:w-full max-lg:w-full">Les bonnes réponses : </h3>
                                         <div class="flex flex-col lg:w-1/2 max-md:w-full max-lg:w-full items-center ">
                                             <span><input type="radio" class="" id="rep_option_1">Option 1</span>
                                             <span><input type="radio" class="" id="rep_option_2">Option 2</span>
                                             <span><input type="radio" class="" id="rep_option_3">Option 3</span>
                                             <span><input type="radio" class="" id="rep_option_4">Option 4</span>
                                         </div>
                                     </div>
                                     <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col ">
                                         <label for="explication" class="lg:w-1/2 max-md:w-full max-lg:w-full">Explication</label>
                                         <textarea type="text" placeholder="Explication " id="explication"
                                             class="h-28 lg:w-1/2 max-md:w-full max-lg:w-full resize-none border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                             required></textarea>
                                     </div>
                                     <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col ">
                                         <label for="explication" class="lg:w-1/2 max-md:w-full max-lg:w-full">Points : </label>
                                         <input type="number" placeholder="Points" id="points"
                                             class="h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                             required>
                                     </div>
                                     <div class="flex lg:flex-row max-md:flex-col max-lg:flex-col ">
                                         <label for="explication" class="lg:w-1/2 max-md:w-full max-lg:w-full">Temps du question : </label>
                                         <input type="number" placeholder="time" id="timeQuestion"
                                             class="h-10 lg:w-1/2 max-md:w-full max-lg:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"
                                             required>
                                     </div>
                                 </div>


                             </div>
                             <div class="w-full h-10 flex flex-row justify-center pt-2">
                                 <button type="button" id="nextButton" 
                                     class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600">
                                     Suivant
                                 </button>
                             </div>
                         </form>
    `;
}

function createVFForm(id, nomQuiz, index) {//nomQuiz,
    return `
        <form action="" id="questionFormVF" class=" bg-gray-200 lg:w-[90%] max-lg:w-[95%] max-md:w-full flex flex-col gap-2 p-2 border-2 rounded-md h-[70%]">
                             <h1>Question ${index + 1} : V/F</h1>
                             <div class="flex lg:flex-row gap-2 max-md:flex-col">
                                 <div class="flex flex-col gap-2 p-2 lg:w-1/2 max-lg:w-1/2 max-md:w-full justify-center ">
                                     <div class="flex lg:flex-row max-lg:flex-col gap-1 w-full max-md:flex-col ">
                                         <input type="hidden" id="id_quizVF" value="${id}">
                                         <input type="hidden" id="nom_quiz" value="${nomQuiz}">
                                         <input type="hidden" id="typeQuestionVF" value="V/F">
                                         <label for="question" class="lg:w-1/2 max-lg:w-full max-md:w-full">Question : </label>
                                         <input type="text" id="questionVF" placeholder="Question"
                                             class=" h-10 lg:w-1/2 max-lg:w-full max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                     </div>
                                     <div class="flex lg:flex-row max-lg:flex-col max-md:flex-col gap-2 w-full ">
                                         <h3 class="lg:w-1/2 max-lg:w-full max-md:w-full">La bonne réponse : </h3>
                                         <div
                                             class="flex flex-col lg:w-1/2 max-lg:w-full max-md:w-full max-md:items-center max-lg:items-center  gap-2">
                                             <span><input type="checkbox" id="correct_option_V" class="">Vrai</span>
                                             <span><input type="checkbox" id="correct_option_F" class="">Faux</span>

                                         </div>


                                     </div>
                                 </div>

                                 <div
                                     class="lg:w-1/2 max-lg:w-1/2 max-md:w-full  flex flex-col gap-2 border-l-2 max-md:border-none border-yellow-600 pl-2 ">

                                     <div class="flex w-full lg:flex-row max-lg:flex-col max-md:flex-col ">
                                         <label for="explication" class="lg:w-1/2 max-md:w-full ">Explication</label>
                                         <textarea type="text" id="explicationVF" placeholder="Explication "
                                             class="h-28 lg:w-1/2 max-md:w-full resize-none border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"></textarea>
                                     </div>
                                     <div class="flex w-full lg:flex-row max-lg:flex-col max-md:flex-col ">
                                         <label for="explication" class="lg:w-1/2 max-md:w-full ">Points : </label>
                                         <input type="number" id="pointsVF" placeholder="Points"
                                             class="h-10 lg:w-1/2 max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                     </div>
                                     <div class="flex w-full lg:flex-row max-lg:flex-col max-md:flex-col ">
                                         <label for="explication" class="lg:w-1/2 max-md:w-full ">Temps de question : </label>
                                         <input type="number" id="timeQuestionVF" placeholder="time"
                                             class="h-10 lg:w-1/2 max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                     </div>
                                 </div>


                             </div>


                             <div class="w-full h-10 flex flex-row justify-center pt-2 ">
                                 <button type="button" id="nextButton"
                                     class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600">
                                     suivant
                                 </button>
                             </div>

                         </form>
    `;
}
//  <input type="hidden" id="nom_quiz" value="${nomQuiz}">
function createTextForm(id,nomQuiz, index) {//nomQuiz,
    return `
         <form action="" id="questionFormText"
                                     class=" bg-gray-200 lg:w-[90%] max-lg:w-[95%] max-md:w-full flex flex-col gap-2 p-2 border-2 rounded-md h-[70%]">
                                    
                                     <h1>Question ${index + 1} : Textuel</h1>

                                     <div class="flex lg:flex-row max-md:flex-col gap-2">
                                         <div class="flex flex-col gap-2 p-2 lg:w-1/2 max-lg:w-1/2 max-md:w-full justify-center ">
                                             <div class="flex lg:flex-row max-lg:flex-col max-md:flex-col gap-1 w-full">
                                                 <input type="hidden" id="id_quizText" value="${id}">
                                                 <input type="hidden" id="nom_quiz" value="${nomQuiz}">                                                

                                                 <input type="hidden" id="typeQuestionText" value="Textuel">
                                                 <label for="question" class="lg:w-1/2 max-md:w-full">Question : </label>
                                                 <input type="text" placeholder="Question" id="questionText"
                                                     class=" h-10 lg:w-1/2 max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                             </div>
                                             <div class="flex flex-col gap-2 w-full ">
                                                 <div class="lg:flex max-lg:flex-col max-md:flex-col w-full">
                                                     <label for="option 1" class="lg:w-1/2 max-lg:w-full max-md:w-full">Réponse possible
                                                         1 : </label>
                                                     <input type="text" placeholder="réponse possible 1" id="option1_Text"
                                                         class=" h-10 lg:w-1/2 max-lg:w-full max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                                 </div>
                                                 <div class="lg:flex max-lg:flex-col max-md:flex-col w-full">
                                                     <label for="option 2" class="lg:w-1/2 max-lg:w-full max-md:w-full">Réponse possible
                                                         2 : </label>
                                                     <input type="text" placeholder="réponse possible 2" id="option2_Text"
                                                         class=" h-10 lg:w-1/2 max-lg:w-full max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                                 </div>
                                                 <div class="lg:flex max-lg:flex-col max-md:flex-col w-full">
                                                     <label for="option 3" class="lg:w-1/2 max-lg:w-full max-md:w-full">Réponse possible
                                                         3 : </label>
                                                     <input type="text" placeholder="réponse possible 3" id="option3_Text"
                                                         class=" h-10 lg:w-1/2 max-lg:w-full max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                                 </div>
                                                 <div class="lg:flex max-lg:flex-col max-md:flex-col w-full">
                                                     <label for="option 4" class="lg:w-1/2 max-lg:w-full max-md:w-full">Réponse possible
                                                         4 : </label>
                                                     <input type="text" placeholder="réponse possible 4" id="option4_Text"
                                                         class=" h-10 lg:w-1/2 max-lg:w-full max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                                 </div>

                                             </div>
                                         </div>

                                         <div
                                             class="lg:w-1/2 max-lg:w-1/2 max-md:w-full flex flex-col gap-2 border-l-2 border-yellow-600 pl-2 ">

                                             <div class="flex lg:flex-row max-lg:flex-col max-md:flex-col ">
                                                 <label for="explication"
                                                     class="lg:w-1/2 max-lg:w-full max-md:w-full">Explication</label>
                                                 <textarea type="text" placeholder="Explication " id="explicationText"
                                                     class="h-28 lg:w-1/2 max-lg:w-full max-md:w-full resize-none border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4"></textarea>
                                             </div>
                                             <div class="flex lg:flex-row max-lg:flex-col max-md:flex-col ">
                                                 <label for="explication" class="lg:w-1/2 max-lg:w-full max-md:w-full">Points : </label>
                                                 <input type="number" placeholder="Points" id="pointsText"
                                                     class="h-10 lg:w-1/2 max-lg:w-full max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                             </div>
                                             <div class="flex w-full lg:flex-row max-lg:flex-col max-md:flex-col ">
                                                 <label for="explication" class="lg:w-1/2 max-md:w-full ">Temps de question : </label>
                                                 <input type="number" id="timeQuestionText" placeholder="time"
                                                     class="h-10 lg:w-1/2 max-md:w-full border-2 rounded-md border-blue-500 focus:border-yellow-600 focus:border-4">
                                             </div>
                                         </div>


                                     </div>


                                     <div class="w-full h-10 flex flex-row justify-center pt-2 ">
                                         <button type="button"  id="nextButton"
                                             class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600">
                                             suivant
                                         </button>
                                     </div>

                                 </form>
    `;
}


async function setQuestionQCM() {
    try {
        const id_quiz = document.getElementById('id_quiz').value;
        const nom_quiz = document.getElementById('nom_quiz').value;
        const typeQuestion = document.getElementById('typeQuestion').value;
        const question = document.getElementById('question').value;
        const option_1 = document.getElementById('option_1').value;
        const option_2 = document.getElementById('option_2').value;
        const option_3 = document.getElementById('option_3').value;
        const option_4 = document.getElementById('option_4').value;

        const options = [option_1, option_2, option_3, option_4];

        const rep_option_1 = document.getElementById('rep_option_1').checked;
        const rep_option_2 = document.getElementById('rep_option_2').checked;
        const rep_option_3 = document.getElementById('rep_option_3').checked;
        const rep_option_4 = document.getElementById('rep_option_4').checked;

        const rep_options = [
            rep_option_1 ? option_1 : null,
            rep_option_2 ? option_2 : null,
            rep_option_3 ? option_3 : null,
            rep_option_4 ? option_4 : null
        ].filter(opt => opt !== null);

        const timeQuestion = document.getElementById('timeQuestion').value;
        const explication = document.getElementById('explication').value;
        const points = parseInt(document.getElementById('points').value);

        const questionData = {
            id_quiz: parseInt(id_quiz),
            nom_quiz: nom_quiz,
            type: typeQuestion,
            questions: question,
            reponses: options,
            reponces_correct: rep_options,
            Explication: explication,
            points: points,
            timeQuestion: timeQuestion
        };

        const response = await fetch('/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Afficher un message de succès
        } else {
            const errorData = await response.json();
            alert(`Erreur: ${errorData.message || 'Une erreur est survenue.'}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la question:", error);
        alert("Erreur: Impossible d'ajouter la question.");
    }
}


async function setQuestionVF() {
    const id_quiz = document.getElementById('id_quizVF').value;
    // const nom_quiz = document.getElementById('nom_quiz').value;
    const typeQuestion = document.getElementById('typeQuestionVF').value;
    const question = document.getElementById('questionVF').value;
    const rep_option_V = document.getElementById('correct_option_V').checked;
    const rep_option_F = document.getElementById('correct_option_F').checked;

    if (!rep_option_V && !rep_option_F) {
        alert("Veuillez sélectionner une réponse correcte (Vrai ou Faux).");
        return;
    }
    
    const rep_options = [
         rep_option_V,
         rep_option_F
    ];

    const explication = document.getElementById('explicationVF').value;
    const points = parseInt(document.getElementById('pointsVF').value, 10);
    const timeQuestion = document.getElementById('timeQuestionVF').value;

    const questionData = {
        id_quiz: parseInt(id_quiz),
        // nom_quiz: nom_quiz,
        type: typeQuestion,
        questions: question,
        reponces_correct: rep_options,
        Explication: explication,
        points: points,
        timeQuestion: timeQuestion 
    };

    try {
        const response = await fetch('/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message || "Question ajoutée avec succès !");
            return true;
        } else {
            alert("Erreur lors de l'ajout de la question.");
            return false;
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la requête.");
        return false;
    }
}


async function setQuestionText() {

    const id_quiz = document.getElementById('id_quizText').value;
    // const nom_quiz = document.getElementById('nom_quiz').value;
    const typeQuestion = document.getElementById('typeQuestionText').value;
    const question = document.getElementById('questionText').value;

    const rep_option_1 = document.getElementById('option1_Text').value;
    const rep_option_2 = document.getElementById('option2_Text').value;
    const rep_option_3 = document.getElementById('option3_Text').value;
    const rep_option_4 = document.getElementById('option4_Text').value;

    const rep_options = [rep_option_1, rep_option_2, rep_option_3, rep_option_4];
    
    const explication = document.getElementById('explicationText').value;
    const points = parseInt(document.getElementById('pointsText').value);
    const timeQuestion = document.getElementById('timeQuestionText').value;

    const questionData = {
        id_quiz: parseInt(id_quiz),
        // nom_quiz: nom_quiz,
        type: typeQuestion,
        questions: question,
        reponces_correct: rep_options,
        Explication: explication,
        points: points,
        timeQuestion: timeQuestion 
    };

    try {
        const response = await fetch('/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
        } else {
            const result = await response.json();
            alert(`Erreur: ${result.message}`);
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite lors de l'ajout de la question.");
    }
}




