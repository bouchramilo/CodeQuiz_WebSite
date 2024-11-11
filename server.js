const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour servir les fichiers statiques (y compris admin.html)
app.use(express.static(path.join(__dirname, 'public')));

// Fonction pour obtenir le prochain ID disponible
function getNextID() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'data', 'quizzes.json'), 'utf8', (err, data) => {
            if (err) return reject(err);
            const quizzes = JSON.parse(data);
            const maxId = quizzes.reduce((max, quiz) => Math.max(max, quiz.id), 0);
            resolve(maxId + 1); // Retourne l'ID suivant
        });
    });
}

// Route pour afficher la page d'administration (formulaire de création de quiz)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); // Serve la page admin.html depuis public
});

// Route pour récupérer tous les quiz
app.get('/quizzes', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'quizzes.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erreur lors de la lecture du fichier quizzes.json');

        const quizzes = JSON.parse(data);
        res.json(quizzes); // Renvoie les quiz en tant que JSON
    });
});


// Fonction pour lire le fichier et gérer les erreurs de JSON
function readQuizzesFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'data', 'quizzes.json'), 'utf8', (err, data) => {
            if (err) return reject(err);

            // Si le fichier est vide, retourner un tableau vide
            if (!data.trim()) {
                return resolve([]);
            }

            try {
                // Parser les données JSON
                const quizzes = JSON.parse(data);
                resolve(quizzes);
            } catch (parseError) {
                // En cas d'erreur JSON, retourner un tableau vide
                resolve([]);
            }
        });
    });
}

// Route pour gérer la soumission du formulaire de quiz
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Spécifier le répertoire où les fichiers seront stockés

// app.post('/create-quiz', upload.single('imagesQuiz'), async (req, res) => {
//     try {
//         const { nom, description, categorie, difficulte, status, nbQuestions, nbrQestionsQCM, nbrQestionsVF, nbrQestionsTxt, TimeQuiz } = req.body;
//         const imagesQuiz = req.file ? path.join('uploads', req.file.filename) : '';  // Stocker uniquement le chemin relatif

//         const newId = await getNextID();

//         const newQuiz = {
//             id: newId,
//             nom,
//             description,
//             categorie,
//             difficulte,
//             nbQuestions,
//             nbrQestionsQCM,
//             nbrQestionsVF,
//             nbrQestionsTxt,
//             TimeQuiz,
//             imagesQuiz,  // Assurez-vous que ce champ contient le bon chemin de l'image
//             status,
//             participants: 0
//         };

//         const quizzes = await readQuizzesFile();
//         quizzes.push(newQuiz);

//         fs.writeFile(path.join(__dirname, 'data', 'quizzes.json'), JSON.stringify(quizzes, null, 2), 'utf8', (err) => {
//             if (err) return res.status(500).send('Erreur lors de l\'enregistrement du quiz');
//             res.json({ message: 'Quiz créé avec succès' });
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Erreur interne du serveur' });
//     }
// });




// Démarrer le serveur

app.post('/create-quiz', upload.single('imagesQuiz'), async (req, res) => {
    try {
        const { nom, description, categorie, difficulte, status, nbQuestions, nbrQestionsQCM, nbrQestionsVF, nbrQestionsTxt, TimeQuiz } = req.body;
        const imagesQuiz = req.file ? path.join('uploads', req.file.filename) : '';  // Utiliser un chemin relatif

        const newId = await getNextID();

        const newQuiz = {
            id: newId,
            nom,
            description,
            categorie,
            difficulte,
            nbQuestions,
            nbrQestionsQCM,
            nbrQestionsVF,
            nbrQestionsTxt,
            TimeQuiz,
            imagesQuiz,  // Chemin relatif de l'image
            status,
            participants: 0
        };

        const quizzes = await readQuizzesFile();
        quizzes.push(newQuiz);

        fs.writeFile(path.join(__dirname, 'data', 'quizzes.json'), JSON.stringify(quizzes, null, 2), 'utf8', (err) => {
            if (err) return res.status(500).send('Erreur lors de l\'enregistrement du quiz');
            res.json({ message: 'Quiz créé avec succès' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// pour les questions 

// Fonction pour lire et traiter le fichier questions.json
function readQuestionsFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'data', 'questions.json'), 'utf8', (err, data) => {
            if (err) return reject(err);

            // Si le fichier est vide, retourner un tableau vide
            if (!data.trim()) {
                return resolve([]);
            }

            try {
                const questions = JSON.parse(data);
                resolve(questions);
            } catch (parseError) {
                resolve([]);
            }
        });
    });
}

// Route pour ajouter des questions pour un quiz
app.post('/add-question', async (req, res) => {
    try {
        const { id_quiz, type, questions, reponses, reponces_correct, Explication, points, timeQuestion } = req.body;

        const newQuestion = {
            id_quiz,//: newQuiz.id,
            type,
            questions,
            reponses,              // Liste des options de réponses possibles
            reponces_correct,       // Liste des réponses correctes
            Explication,            // Explication de la réponse
            points,                  // Points attribués pour la question
            timeQuestion
        };

        // Lire les questions existantes depuis questions.json
        const questionList = await readQuestionsFile();
        questionList.push(newQuestion);

        // Écrire les questions mises à jour dans questions.json
        fs.writeFile(path.join(__dirname, 'data', 'questions.json'), JSON.stringify(questionList, null, 2), 'utf8', (err) => {
            if (err) return res.status(500).send("Erreur lors de l'enregistrement de la question");
            res.json({ message: 'Question ajoutée avec succès' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

// Route pour récupérer tous les questions

app.get('/questions', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'questions.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du fichier questions.json');
        }
        const questions = JSON.parse(data);
        res.json(questions);  // Renvoie les questions en JSON
    });
});


