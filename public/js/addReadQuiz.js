document.getElementById('quiz_form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(this);

    fetch('http://localhost:3000/create-quiz', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject('Erreur HTTP: ' + response.status);
        }
    })
    .then(data => {
        // alert(data.nom);
        alert('Quiz créé avec succès!');
        
        // Stocker les informations dans le localStorage
        localStorage.setItem('NomQuiz', JSON.stringify(data.nom));  // Pas besoin de JSON.stringify pour une chaîne
        localStorage.setItem('quizId', data.id);
        localStorage.setItem('nbQuestions', data.nbQuestions);
        localStorage.setItem('nbrQestionsQCM', data.nbrQestionsQCM);
        localStorage.setItem('nbrQestionsVF', data.nbrQestionsVF);
        localStorage.setItem('nbrQestionsTxt', data.nbrQestionsTxt);
        
        // Récupérer le nom du quiz depuis localStorage (pas besoin de JSON.parse pour une chaîne)
        const quizNom = JSON.parse(localStorage.getItem('NomQuiz'));
        // alert("Nom du quiz récupéré depuis localStorage:"+ quizNom);  // Vérifie que la donnée est bien récupérée

        // alert(quizNom);  // Affiche "Quiz sur la programmation"

        window.location.href = `ajouterQuestions.html`;
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de serveur: ' + error);
    });
});
