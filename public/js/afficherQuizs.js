
    // Fonction pour récupérer et afficher les quiz
    function loadQuizzes() {
        fetch('/quizzes')  // Envoie une requête GET à la route '/quizzes'
            .then(response => response.json())
            .then(quizzes => {
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = ''; // Vide le tableau avant de remplir avec les nouveaux quiz

                quizzes.forEach(quiz => {
                    // Crée une nouvelle ligne pour chaque quiz
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="border-2 border-black h-12 w-[10%] text-center">${quiz.id}</td>
                        <td class="border-2 border-black h-12 w-[10%] text-center">${quiz.nom}</td>
                        <td class="border-2 border-black h-12 w-[10%] text-center" id="difficulty">${quiz.difficulte}</td>
                        <td class="border-2 border-black h-12 w-[10%] text-center" id="category">${quiz.categorie}</td>
                        <td class="border-2 border-black h-12 w-[10%] text-center" id="stts">${quiz.status}</td>
                        <td class="border-2 border-black h-12 w-[10%] text-center">${quiz.nbQuestions}</td>
                        <td class="border-2 border-black h-12 w-[10%] text-center">${quiz.participants}</td>
                    `;
                    tbody.appendChild(row);  // Ajoute la ligne au tableau
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des quiz:', error);
            });
    }

    // Appeler la fonction pour charger les quiz dès que la page est chargée
    window.onload = loadQuizzes;
