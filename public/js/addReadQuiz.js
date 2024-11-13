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

        // Stocker les informations dans le localStorage
        localStorage.setItem('quizId', data.id);
        localStorage.setItem('nbQuestions', data.nbQuestions);
        localStorage.setItem('nbrQestionsQCM', data.nbrQestionsQCM);
        localStorage.setItem('nbrQestionsVF', data.nbrQestionsVF);
        localStorage.setItem('nbrQestionsTxt', data.nbrQestionsTxt);


       console.log('quizId', data.id);
       console.log('nbQuestions', data.nbQuestions);
       console.log('nbrQestionsQCM', data.nbrQestionsQCM);
       console.log('nbrQestionsVF', data.nbrQestionsVF);
       console.log('nbrQestionsTxt', data.nbrQestionsTxt);



        // Redirige vers la page d'ajout de questions
        window.location.href = `ajouterQuestions.html`;
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de serveur: ' + error);  // Affiche l'erreur
    });
});
