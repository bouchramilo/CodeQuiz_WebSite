document.getElementById('questionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const id_quiz = document.getElementById('id_quiz').value;
    const typeQuestion = document.getElementById('typeQuestion').value;
    const question = document.getElementById('question').value;
    const option_1 = document.getElementById('option_1').value;//.split(',').map(rep => rep.trim()); // Array des réponses
    const option_2 = document.getElementById('option_2').value;//.split(',').map(rep => rep.trim()); // Array des réponses
    const option_3 = document.getElementById('option_3').value;//.split(',').map(rep => rep.trim()); // Array des réponses
    const option_4 = document.getElementById('option_4').value;//.split(',').map(rep => rep.trim()); // Array des réponses

    const options = [option_1 , option_2 , option_3 , option_4];

    const rep_option_1 = document.getElementById('rep_option_1').checked;//.split(',').map(rep => rep.trim()); // Array des bonnes réponses
    const rep_option_2 = document.getElementById('rep_option_2').checked;//.split(',').map(rep => rep.trim()); // Array des bonnes réponses
    const rep_option_3 = document.getElementById('rep_option_3').checked;//.split(',').map(rep => rep.trim()); // Array des bonnes réponses
    const rep_option_4 = document.getElementById('rep_option_4').checked;//.split(',').map(rep => rep.trim()); // Array des bonnes réponses

    const timeQuestion = document.getElementById('timeQuestion').value;


    const rep_options = [rep_option_1 , rep_option_2 , rep_option_3 , rep_option_4];

    const explication = document.getElementById('explication').value;
    const points = parseInt(document.getElementById('points').value);

    // Objet de la question
    const questionData = {
        id_quiz: parseInt(id_quiz),
        type:typeQuestion,
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


