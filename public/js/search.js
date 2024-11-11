// search input 

let searchInput = document.getElementById("search");
let quizsList = document.getElementById("cards");

searchInput.addEventListener("keyup", () => {
    let query = searchInput.value.toLowerCase();
    
    Array.from(quizsList.children).forEach(quiz => {
        let titleElement = quiz.querySelector('h4'); 
        if (titleElement) {
            let title = titleElement.textContent.toLowerCase();
            quiz.style.display = title.includes(query) ? "" : "none";
        }
    });
});


let filter1 = document.getElementById("difficulte");
    let quizsList_f1 = document.getElementById("cards");

    // Applique le filtre lorsque la difficulté est sélectionnée
    filter1.addEventListener("change", () => {
        let query = filter1.value.toLowerCase();

        Array.from(quizsList_f1.children).forEach(quiz => {
            let titleElement = quiz.querySelector('.difficulty'); // Assurez-vous d'avoir une classe "difficulty" sur les éléments affichant la difficulté
            if (titleElement) {
                let title = titleElement.textContent.toLowerCase();
                quiz.style.display = title.includes(query) || query === "" ? "" : "none";
            }
        });
    });
