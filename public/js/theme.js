const imgDark = "images/background_n.png";
const imgLight = "images/background_.jpg";
const image = document.getElementById("bg");

// Vérifiez et appliquez le thème enregistré dans le localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme);

  const imgTheme = localStorage.getItem("imgtheme") || imgLight;
  image.src = imgTheme;
});

// Fonction pour basculer entre les thèmes et sauvegarder le choix dans le localStorage
function Theme() {
  const body = document.body;
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    image.src = imgDark; // Nouvelle image
    localStorage.setItem("theme", "dark");
    localStorage.setItem("imgtheme", imgDark);
  } else {
    body.classList.replace("dark", "light");
    image.src = imgLight; // Revenir à l'image initiale
    localStorage.setItem("theme", "light");
    localStorage.setItem("imgtheme", imgLight);
  }
}
