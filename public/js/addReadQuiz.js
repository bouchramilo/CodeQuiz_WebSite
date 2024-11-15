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
        alert('Quiz créé avec succès!');
        
        // alert(data.nom);
        // Stocker les informations dans le localStorage
        // localStorage.setItem('NomQuiz', data.nom);
        localStorage.setItem('quizId', data.id);
        localStorage.setItem('nbQuestions', data.nbQuestions);
        localStorage.setItem('nbrQestionsQCM', data.nbrQestionsQCM);
        localStorage.setItem('nbrQestionsVF', data.nbrQestionsVF);
        localStorage.setItem('nbrQestionsTxt', data.nbrQestionsTxt);

        window.location.href = `ajouterQuestions.html`;
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de serveur: ' + error);
    });
});
