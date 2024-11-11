document.getElementById('quiz_form').addEventListener('submit', function(e) {
    e.preventDefault();  // Empêche l'envoi par défaut du formulaire

    const formData = new FormData(this);

    fetch('http://localhost:3000/create-quiz', {
        method: 'POST',
        body: formData
    })    
    .then(response => {
        if (response.ok) {
            return response.json();  // Retourner la réponse sous forme de JSON
        } else {
            return Promise.reject('Erreur HTTP: ' + response.status);  // Capture l'erreur HTTP
        }
    })
    .then(data => {
        alert('Quiz créé avec succès!');
        window.location.reload();  // Recharge la page
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de serveur: ' + error);  // Affiche l'erreur
    });
});


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
                        <td class="border-2 border-black h-4 w-1/6 text-center">${quiz.id}</td>
                        <td class="border-2 border-black h-4 w-1/6 text-center">${quiz.nom}</td>
                        <td class="border-2 border-black h-4 w-1/6 text-center">${quiz.categorie}</td>
                        <td class="border-2 border-black h-4 w-1/6 text-center">${quiz.status}</td>
                        <td class="border-2 border-black h-4 w-1/6 text-center">${quiz.nbQuestions}</td>
                        <td class="border-2 border-black h-4 w-1/6 text-center">${quiz.participants}</td>
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
