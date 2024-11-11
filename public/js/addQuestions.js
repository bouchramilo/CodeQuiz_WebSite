document.getElementById('questionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const id_quiz = document.getElementById('id_quiz').value;
    const typeQuestion = document.getElementById('typeQuestion').value;
    const question = document.getElementById('question').value;
    const option_1 = document.getElementById('option_1').value;
    const option_2 = document.getElementById('option_2').value;
    const option_3 = document.getElementById('option_3').value;
    const option_4 = document.getElementById('option_4').value;

    // Collecte des options dans un tableau
    const options = [option_1 , option_2 , option_3 , option_4];

    // Vérification des options correctes
    const rep_option_1 = document.getElementById('rep_option_1').checked;
    const rep_option_2 = document.getElementById('rep_option_2').checked;
    const rep_option_3 = document.getElementById('rep_option_3').checked;
    const rep_option_4 = document.getElementById('rep_option_4').checked;

    // Création du tableau des réponses correctes
    const rep_options = [
        rep_option_1 ? option_1 : null,
        rep_option_2 ? option_2 : null,
        rep_option_3 ? option_3 : null,
        rep_option_4 ? option_4 : null
    ];

    const timeQuestion = document.getElementById('timeQuestion').value;
    const explication = document.getElementById('explication').value;
    const points = parseInt(document.getElementById('points').value);

    // Objet de la question
    const questionData = {
        id_quiz: parseInt(id_quiz),
        type: typeQuestion,
        questions: question,
        reponses: options,
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
