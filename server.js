
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: 'uploads/' });

const quizzesFilePath = path.join(__dirname, 'data', 'quizzes.json');
const questionsFilePath = path.join(__dirname, 'data', 'questions.json');
const questionsVFFilePath = path.join(__dirname, 'data', 'questionsVF.json');
const questionsTextFilePath = path.join(__dirname, 'data', 'questionsText.json');

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                const parsedData = data.trim() ? JSON.parse(data) : [];
                resolve(parsedData);
            } catch (parseError) {
                reject('Erreur lors de la lecture du fichier JSON');
            }
        });
    });
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) return reject('Erreur lors de l\'écriture du fichier JSON');
            resolve();
        });
    });
}

function getNextID() {
    return readFile(quizzesFilePath).then(quizzes => {
        const maxId = quizzes.reduce((max, quiz) => Math.max(max, quiz.id), 0);
        return maxId + 1;
    });
}

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/quizzes', (req, res) => {
    readFile(quizzesFilePath)
        .then(quizzes => res.json(quizzes))
        .catch(err => res.status(500).send(err));
});

app.post('/create-quiz', upload.single('imagesQuiz'), async (req, res) => {
    try {
        const { nom, description, categorie, difficulte, status, TimeQuiz } = req.body;

        // Convertir les champs numériques en entier
        const nbQuestions = parseInt(req.body.nbQuestions, 10);
        const nbrQestionsQCM = parseInt(req.body.nbrQestionsQCM, 10);
        const nbrQestionsVF = parseInt(req.body.nbrQestionsVF, 10);
        const nbrQestionsTxt = parseInt(req.body.nbrQestionsTxt, 10);
        
        const imagesQuiz = req.file ? path.join('uploads', req.file.filename) : ''; // Utilisation du chemin relatif

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
            imagesQuiz,
            status,
            participants: 0
        };

        const quizzes = await readFile(quizzesFilePath);
        quizzes.push(newQuiz);
        await writeFile(quizzesFilePath, quizzes);

        res.json({ message: 'Quiz créé avec succès', id: newId, nbQuestions, nbrQestionsQCM, nbrQestionsVF, nbrQestionsTxt });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});



app.get('/questions', (req, res) => {
    readFile(questionsFilePath)
        .then(questions => res.json(questions))
        .catch(err => res.status(500).send(err));
});

app.post('/add-question', (req, res) => {
    console.log("Requête reçue avec les données : ", req.body);

    const newQuestion = req.body;

    let filePath;
    if (newQuestion.type === "QCM") {
        filePath = path.join(__dirname, 'data', 'questions.json'); // Ou un autre fichier dédié aux QCM
    } else if (newQuestion.type === "V/F") {
        filePath = questionsVFFilePath;
    } else if (newQuestion.type === "Textuel") {
        filePath = questionsTextFilePath;
    } else {
        return res.status(400).json({ message: "Type de question non pris en charge." });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: "Erreur de lecture du fichier." });

        let questions = [];
        if (data) {
            questions = JSON.parse(data); // Parser les données existantes si le fichier n'est pas vide
        }

        questions.push(newQuestion);

        fs.writeFile(filePath, JSON.stringify(questions, null, 2), 'utf8', (err) => {
            if (err) return res.status(500).json({ message: "Erreur lors de l'enregistrement de la question." });
            
            res.json({ message: "Question ajoutée avec succès !" });
        });
    });
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.use('/data', express.static(path.join(__dirname, 'data')));


app.get('/questions.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'questions.json'));
});
app.get('/questionsVF.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'questionsVF.json'));
});
app.get('/questionsText.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'questionsText.json'));
})



// ===========================================================

const paths = {
    qcm: path.join(__dirname, "data/questions.json"),
    vf: path.join(__dirname, "data/QuestionsVF.json"),
    textuel: path.join(__dirname, "data/questionsText.json"),
};

app.post("/add-question/:type", (req, res) => {
    const { type } = req.params;
    const question = req.body;

    if (!["qcm", "vf", "textuel"].includes(type)) {
        return res.status(400).json({ error: "Type de question invalide." });
    }

    const filePath = paths[type];

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la lecture du fichier." });
        }

        let questions = [];
        if (data.trim()) {
            questions = JSON.parse(data);
        }

        questions.push(question);

        fs.writeFile(filePath, JSON.stringify(questions, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de l'écriture du fichier." });
            }

            res.status(200).json({ message: "Question ajoutée avec succès !" });
        });
    });
});

