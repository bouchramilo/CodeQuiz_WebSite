
// Fonction pour récupérer et afficher les questions
function loadQuestions() {
    // Récupérer les questions depuis les trois fichiers JSON
    const files = [
        '/questions.json',
        '/questionsVF.json',
        '/questionsText.json'
    ];

    // Sélectionner le tbody du tableau pour l'affichage
    const tbody = document.querySelector('tbody#tbody');
    tbody.innerHTML = '';  // Vider le tableau avant de remplir avec les nouvelles questions

    // Parcours de chaque fichier JSON
    files.forEach(file => {
        fetch(file)  // Faire une requête pour récupérer le fichier JSON
            .then(response => response.json())  // Convertir la réponse en JSON
            .then(questions => {
                console.log(questions);  // Log les données récupérées pour vérifier
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
    });
}

// Charger les questions dès que la page est chargée
window.onload = loadQuestions;
