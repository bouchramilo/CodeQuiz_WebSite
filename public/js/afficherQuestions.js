
function loadQuestions() {
    const files = [
        '/questions.json',
        '/questionsVF.json',
        '/questionsText.json'
    ];

    const tbody = document.querySelector('tbody#tbody');
    tbody.innerHTML = '';  

    files.forEach(file => {
        fetch(file) 
            .then(response => response.json())  
            .then(questions => {
                console.log(questions);  
                questions.forEach(question => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="border-2 border-black h-12 text-center">${question.questions}</td>
                        <td class="border-2 border-black h-12 text-center">${question.id_quiz}</td>
                        <td class="border-2 border-black h-12 text-center">${question.type}</td>
                        <td class="border-2 border-black h-12 text-center">${question.points}</td>
                        <td class="border-2 border-black h-12 text-center">${question.timeQuestion} s</td>
                    `;
                    tbody.appendChild(row); 
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des questions:', error);
            });
    });
}

window.onload = loadQuestions;
