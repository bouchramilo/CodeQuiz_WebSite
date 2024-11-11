document.getElementById('questionFormVF').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const id_quiz = document.getElementById('id_quizVF').value;
    const typeQuestion = document.getElementById('typeQuestionVF').value;
    const question = document.getElementById('questionVF').value;

    const rep_option_V = document.getElementById('correct_option_V').checked;
    const rep_option_F = document.getElementById('correct_option_F').checked;

    const rep_options = [rep_option_V, rep_option_F];
    
    const explication = document.getElementById('explicationVF').value;
    const points = parseInt(document.getElementById('pointsVF').value);
    const timeQuestion = document.getElementById('timeQuestionVF').value;

    // Objet de la question
    const questionData = {
        id_quiz: parseInt(id_quiz),
        type: typeQuestion,
        questions: question,
        reponces_correct: rep_options,
        Explication: explication,
        points: points,
        timeQuestion: timeQuestion 
    };

    // Envoi de la requête POST
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
            alert(result.message); // Afficher un message de succès
        } else {
            alert("Erreur lors de l'ajout de la question");
        }
    } catch (error) {
        console.error("Erreur:", error);
    }
});
