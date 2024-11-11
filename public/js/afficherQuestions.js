 

// Fonction pour récupérer et afficher les questions
function loadQuestions() {
    fetch('/questions')  // Requête pour obtenir les questions depuis la route /questions
        .then(response => response.json())
        .then(questions => {
            const tbody = document.querySelector('tbody#tbody');
            tbody.innerHTML = ''; // Vider le tableau avant de remplir avec les nouvelles questions

            questions.forEach(question => {
                // Crée une nouvelle ligne pour chaque question
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="border-2 border-black text-center">${question.questions}</td>
                    <td class="border-2 border-black text-center">${question.id_quiz}</td>
                    <td class="border-2 border-black text-center">${question.type}</td>
                    <td class="border-2 border-black text-center">${question.points}</td>
                    <td class="border-2 border-black text-center">${question.timeQuestion} min</td>
                `;
                tbody.appendChild(row);  // Ajoute la ligne au tableau
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des questions:', error);
        });
}

// Charger les questions dès que la page est chargée
window.onload = loadQuestions;
