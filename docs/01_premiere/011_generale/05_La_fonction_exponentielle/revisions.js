const questionsData = [
    {
        q: "Quelle est la propriété fondamentale définissant la fonction exponentielle ?",
        options: ["f'(x) = f(x) et f(0) = 1", "f'(x) = f(x) et f(0) = 0", "Elle est toujours négative", "Elle est décroissante"],
        correct: "f'(x) = f(x) et f(0) = 1", // On stocke le texte pour vérifier après mélange
        expl: "D'après l'introduction du cours, l'existence de l'exponentielle repose sur cette équation différentielle précise."
    },
    {
        q: "Pour tous réels a et b, exp(a + b) est égal à :",
        options: ["exp(a) + exp(b)", "exp(a) * exp(b)", "exp(a * b)", "exp(a) - exp(b)"],
        correct: "exp(a) * exp(b)",
        expl: "C'est la 'Relation Fonctionnelle'. L'exponentielle transforme une somme en produit."
    },
    {
        q: "Quel est le signe de exp(x) sur R ?",
        options: ["Toujours négatif", "Nul en 0", "Strictement positif", "Dépend de x"],
        correct: "Strictement positif",
        expl: "Le cours démontre (Propriété n°6) que pour tout x, exp(x) > 0."
    },
    {
        q: "Simplifiez (e^x)^3 * e^(-2x) :",
        options: ["e^x", "e^5x", "e^(-6x)", "e^(x^3)"],
        correct: "e^x",
        expl: "(e^x)^3 = e^(3x). Ensuite, e^(3x) * e^(-2x) = e^(3x-2x) = e^x."
    },
    {
        q: "Valeur approchée de e (exp(1)) :",
        options: ["3,14", "1,41", "2,72", "0,54"],
        correct: "2,72",
        expl: "e est la base de l'exponentielle, environ 2,718."
    },
    {
        q: "Résolution de e^(2x - 4) = 1 :",
        options: ["x = 0", "x = 4", "x = 2", "Pas de solution"],
        correct: "x = 2",
        expl: "e^A = 1 signifie A = 0. Donc 2x - 4 = 0 => x = 2."
    },
    {
        q: "Dérivée de f(x) = e^x - x :",
        options: ["e^x - 1", "e^x", "xe^(x-1)", "e^x + 1"],
        correct: "e^x - 1",
        expl: "La dérivée de e^x est e^x, et la dérivée de -x est -1."
    },
    {
        q: "Nombre de solutions de e^x < 0 :",
        options: ["Une seule", "Aucune", "Infinité", "Toutes"],
        correct: "Aucune",
        expl: "L'exponentielle étant strictement positive, elle ne peut jamais être inférieure à 0."
    },
    {
        q: "e^(a-b) est égal à :",
        options: ["e^a - e^b", "e^a / e^b", "1 / e^(a+b)", "e^a * e^(-b)"],
        correct: "e^a / e^b",
        expl: "La soustraction à l'exposant correspond à la division des puissances."
    },
    {
        q: "Si a < b, alors :",
        options: ["e^a < e^b", "e^a > e^b", "e^a = e^b", "On ne sait pas"],
        correct: "e^a < e^b",
        expl: "La fonction exponentielle est strictement croissante sur R, elle conserve donc l'ordre."
    }
];

// Fonction pour mélanger un tableau (Algorithme de Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const quizContainer = document.getElementById('quiz');

// 1. Mélanger l'ordre des questions
shuffle(questionsData);

// 2. Générer le HTML
questionsData.forEach((item, index) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    
    // Mélanger les options pour chaque question
    const mixedOptions = shuffle([...item.options]);

    qDiv.innerHTML = `<p><strong>${index + 1}. ${item.q}</strong></p>
        <ul class="options-list">
            ${mixedOptions.map((opt) => `
                <li>
                    <label>
                        <input type="radio" name="q${index}" value="${opt}"> ${opt}
                    </label>
                </li>
            `).join('')}
        </ul>`;
    quizContainer.appendChild(qDiv);
});

function calculateScore() {
    let score = 0;
    let correctionHtml = "<h3>Détails de la correction :</h3>";

    questionsData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        // On compare le texte sélectionné avec le texte de la réponse correcte
        const isCorrect = selected && selected.value === item.correct;
        
        if (isCorrect) score++;

        correctionHtml += `
            <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; text-align: left;">
                <p><strong>Question ${index + 1} :</strong> ${isCorrect ? '✅' : '❌'}</p>
                <p>Réponse attendue : <em>${item.correct}</em></p>
                <p style="font-size: 0.9em; color: #555;">${item.expl}</p>
            </div>
        `;
    });

    document.getElementById('score-display').innerText = score;
    document.getElementById('detailed-correction').innerHTML = correctionHtml;
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    window.scrollTo(0, document.body.scrollHeight);
}