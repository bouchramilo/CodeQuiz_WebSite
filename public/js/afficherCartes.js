document.addEventListener('DOMContentLoaded', () => {
    // Utiliser la route correcte pour récupérer tous les quiz
    fetch('http://localhost:3000/quizzes')
        .then(response => response.json())
        .then(quizzes => {
            const quizContainer = document.querySelector('.lg\\:grid-cols-3');

            // Effacer le contenu existant du conteneur, si nécessaire
            quizContainer.innerHTML = '';

            // Créer une carte pour chaque quiz
            quizzes.forEach(quiz => {
                const quizCard = document.createElement('div');
                // quizCard.style.borderColor = quiz.difficulte === "Facile" ? "gray" : ("Moyenne" ? "blue" : "yellow");

                if( quiz.difficulte === "Facile" ){
                    quizCard.className = "w-full flex flex-col justify-center items-center gap-2 text-sm border-4 rounded-2xl p-2 border-gray-400";
                    quizCard.innerHTML = `
                    <div class="w-full h-32 bg-gray-200 flex">
                        <img src="${quiz.imagesQuiz}" alt="quizImg" class="h-full w-full object-cover rounded-t-2xl">
                    </div>
                    <div>
                        <div class="flex gap-2">
                            <h3>Titre de Quiz :</h3>
                            <h4>${quiz.nom}</h4>
                        </div>
                        <div class="flex gap-2">
                            <h3>Nombre de Questions :</h3>
                            <p>${quiz.nbQuestions}</p>
                        </div>
                        <div class="flex gap-2">
                            <h3>Temps estimé :</h3>
                            <p>${quiz.TimeQuiz}</p>
                        </div>
                        <div class="flex gap-2">
                            <h3>Niveau (F, M, D) :</h3>
                            <p class="difficulty">${quiz.difficulte}</p>
                        </div>
                    </div>
                    <button class="bg-gray-400 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-gray-400">
                        GO
                    </button>
                `;

                }
                else {
                    if( quiz.difficulte === "Moyenne" ){
                        quizCard.className = "w-full flex flex-col justify-center items-center gap-2 text-sm border-4 rounded-2xl p-2 border-blue-500";
                        quizCard.innerHTML = `
                            <div class="w-full h-32 bg-gray-200 flex">
                                <img src="${quiz.imagesQuiz}" alt="quizImg" class="h-full w-full object-cover rounded-t-2xl">
                            </div>
                            <div>
                                <div class="flex gap-2">
                                    <h3>Titre de Quiz :</h3>
                                    <h4>${quiz.nom}</h4>
                                </div>
                                <div class="flex gap-2">
                                    <h3>Nombre de Questions :</h3>
                                    <p>${quiz.nbQuestions}</p>
                                </div>
                                <div class="flex gap-2">
                                    <h3>Temps estimé :</h3>
                                    <p>${quiz.TimeQuiz}</p>
                                </div>
                                <div class="flex gap-2">
                                    <h3>Niveau (F, M, D) :</h3>
                                    <p class="difficulty">${quiz.difficulte}</p>
                                </div>
                            </div>
                            <button class="bg-blue-500 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-blue-500">
                                GO
                            </button>
                        `;
                    }
                    else {
                        quizCard.className = "w-full flex flex-col justify-center items-center gap-2 text-sm border-4 rounded-2xl p-2 border-yellow-600";
                        quizCard.innerHTML = `
                            <div class="w-full h-32 bg-gray-200 flex">
                                <img src="${quiz.imagesQuiz}" alt="quizImg" class="h-full w-full object-cover rounded-t-2xl">
                            </div>
                            <div>
                                <div class="flex gap-2">
                                    <h3>Titre de Quiz :</h3>
                                    <h4>${quiz.nom}</h4>
                                </div>
                                <div class="flex gap-2">
                                    <h3>Nombre de Questions :</h3>
                                    <p>${quiz.nbQuestions}</p>
                                </div>
                                <div class="flex gap-2">
                                    <h3>Temps estimé :</h3>
                                    <p>${quiz.TimeQuiz}</p>
                                </div>
                                <div class="flex gap-2">
                                    <h3>Niveau (F, M, D) :</h3>
                                    <p class="difficulty">${quiz.difficulte}</p>
                                </div>
                            </div>
                            <button class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600">
                                GO
                            </button>
                        `;
                    }
                }

                quizContainer.appendChild(quizCard);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des quiz:', error));
});
