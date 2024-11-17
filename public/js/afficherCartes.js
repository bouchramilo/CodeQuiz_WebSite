document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/quizzes')
        .then(response => response.json())
        .then(quizzes => {
            const quizContainer = document.querySelector('.lg\\:grid-cols-3');

            quizContainer.innerHTML = '';

            quizzes.forEach(quiz => {
                const quizCard = document.createElement('div');

                if( quiz.difficulte === "Facile" ){
                    quizCard.className = "w-full flex flex-col justify-center items-center gap-2 text-sm border-4 rounded-2xl p-2 border-gray-400 shadow-gray-700 shadow-xl";
                    quizCard.innerHTML = `
                    <div class="w-full h-32  flex">
                        <img src="images/background__.jpg" alt="quizImg" class="h-full w-full object-cover rounded-2xl">
                    </div>
                    <div>
                        <div class="gap-2 hidden">
                            <h3>Status :</h3>
                            <p class="stts">${quiz.status}</p>
                        </div>
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
                        <div class="flex gap-2">
                            <h3>Catégorie : </h3>
                            <p class="category">${quiz.categorie}</p>
                        </div>
                    </div>
                    <button class="bg-gray-400 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-gray-400" onclick="storeQuizData(${quiz.id})">
                        GO
                    </button>
                `;

                }
                else {
                    if( quiz.difficulte === "Moyenne" ){
                        quizCard.className = "w-full flex flex-col justify-center items-center gap-2 text-sm border-4 rounded-2xl p-2 border-blue-500 shadow-gray-700 shadow-xl";
                        quizCard.innerHTML = `
                            <div class="w-full h-32  flex">
                                <img src="images/background.jpg" alt="quizImg" class="h-full w-full object-cover rounded-2xl">
                            </div>
                            <div>
                                <div class="gap-2 hidden">
                                    <h3>Status :</h3>
                                    <p class="stts">${quiz.status}</p>
                                </div>
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
                                <div class="flex gap-2">
                                    <h3>Catégorie : </h3>
                                    <p class="category">${quiz.categorie}</p>
                                </div>
                            </div>
                            <button class="bg-blue-500 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-blue-500" onclick="storeQuizData(${quiz.id})">
                                GO
                            </button>
                        `;
                    }
                    else {
                        quizCard.className = "w-full flex flex-col justify-center items-center gap-2 text-sm border-4 rounded-2xl p-2 border-yellow-600 shadow-gray-700 shadow-xl";
                        quizCard.innerHTML = `
                            <div class="w-full h-32  flex">
                                <img src="images/bgQuiz.jpg" alt="quizImg" class="h-full w-full object-cover rounded-2xl">
                            </div>
                            <div>
                                <div class="gap-2 hidden">
                                    <h3>Status :</h3>
                                    <p class="stts">${quiz.status}</p>
                                </div>
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
                                <div class="flex gap-2">
                                    <h3>Catégorie : </h3>
                                    <p class="category">${quiz.categorie}</p>
                                </div>
                            </div>
                            <button class="bg-yellow-600 h-8 w-32 border-2 rounded-md border-white hover:bg-white hover:border-yellow-600" onclick="storeQuizData(${quiz.id})">
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
