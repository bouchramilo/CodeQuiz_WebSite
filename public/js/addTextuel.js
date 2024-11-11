document.getElementById('questionFormText').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const id_quiz = document.getElementById('id_quizText').value;
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
            const result = await response.json();
            alert(`Erreur: ${result.message}`); // Afficher un message d'erreur détaillé
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite lors de l'ajout de la question.");
    }
});
