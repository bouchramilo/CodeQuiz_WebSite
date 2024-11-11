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


