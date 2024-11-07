// Vérifiez et appliquez le thème enregistré dans le localStorage au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme);
});

// Fonction pour basculer entre les thèmes et sauvegarder le choix dans le localStorage
function Theme() {
    const body = document.body;
    if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// const body =document.querySelector("body");
// const button = document.querySelector("theme");

// if( localStorage.getItem("theme")){
//     body.className += localStorage.getItem("theme");
// }

// button.addEventListener("click" , () => {
//     if(localStorage.getItem("theme") === "dark" ){
//         localStorage.removeItem("theme");
//         body.classList = "" ;

//     }
//     else{
//         localStorage.setItem("theme" , "dark");
//         body.className = "dark" ;
//     }
// })