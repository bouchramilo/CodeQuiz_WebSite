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

// filter 1 input

let filter1 = document.getElementById("difficulte");
    let quizsList_f1 = document.getElementById("cards");

    filter1.addEventListener("change", () => {
        let query = filter1.value.toLowerCase();

        Array.from(quizsList_f1.children).forEach(quiz => {
            let titleElement = quiz.querySelector('.difficulty'); 
            if (titleElement) {
                let title = titleElement.textContent.toLowerCase();
                quiz.style.display = title.includes(query) || query === "" ? "" : "none";
            }
        });
    });


// filter 2 input

    let filter2 = document.getElementById("categorie");
    let quizsList_f2 = document.getElementById("cards");

    filter2.addEventListener("change", () => {
        let query = filter2.value.toLowerCase();

        Array.from(quizsList_f2.children).forEach(quiz => {
            let titleElement = quiz.querySelector('.category'); 
            if (titleElement) {
                let title = titleElement.textContent.toLowerCase();
                quiz.style.display = title.includes(query) || query === "" ? "" : "none";
            }
        });
    });


    let filter3 = document.getElementById("status");
    let quizsList_f3 = document.getElementById("cards");

    filter3.addEventListener("change", () => {
        let query = filter3.value.toLowerCase();

        Array.from(quizsList_f3.children).forEach(quiz => {
            let titleElement = quiz.querySelector('.stts'); 
            if (titleElement) {
                let title = titleElement.textContent.toLowerCase();
                quiz.style.display = title.includes(query) || query === "" ? "" : "none";
            }
        });
    });