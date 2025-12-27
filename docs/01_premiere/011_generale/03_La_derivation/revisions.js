const questionsData = [
    {
        q: "Quelle est la dérivée de la fonction \\(f(x) = x^n\\) ?",
        options: ["\\(n \\times x^{n-1}\\)", "\\(\\frac{x^{n+1}}{n+1}\\)", "\\(n \\times x^n\\)", "\\(n \\times x\\)"],
        correct: "\\(n \\times x^{n-1}\\)",
        expl: "C'est la règle de puissance de base pour tout entier n."
    },
    {
        q: "Quelle est la dérivée de f(x) = 1/x ?",
        options: ["-1 / x²", "1 / x²", "ln(x)", "-1 / x"],
        correct: "-1 / x²",
        expl: "La dérivée de l'inverse est l'opposé de l'inverse du carré."
    },
    {
        q: "La fonction f(x) = √x est dérivable sur :",
        options: ["]0 ; +∞[", "[0 ; +∞[", "R", "R*"],
        correct: "]0 ; +∞[",
        expl: "La fonction racine n'est pas dérivable en 0 car sa tangente y est verticale."
    },
    {
        q: "Quelle est la formule de la dérivée d'un produit (u * v) ?",
        options: ["u'v + uv'", "u'v - uv'", "u' * v'", "(u'v + uv') / v²"],
        correct: "u'v + uv'",
        expl: "C'est la règle de Leibniz pour le produit de deux fonctions."
    },
    {
        q: "Si f'(a) = 0, que peut-on dire de la tangente à la courbe en a ?",
        options: ["Elle est horizontale", "Elle est verticale", "Elle passe par l'origine", "Elle n'existe pas"],
        correct: "Elle est horizontale",
        expl: "Un coefficient directeur nul correspond à une droite parallèle à l'axe des abscisses."
    },
    {
        q: "Quelle est la dérivée de f(x) = 3x² - 5x + 2 ?",
        options: ["6x - 5", "3x - 5", "6x", "6x² - 5"],
        correct: "6x - 5",
        expl: "On dérive terme à terme : (3x²)' = 6x et (-5x)' = -5."
    },
    {
        q: "Si f'(x) est strictement positive sur un intervalle I, alors f est :",
        options: ["Strictement croissante", "Strictement décroissante", "Positive", "Négative"],
        correct: "Strictement croissante",
        expl: "Le signe de la dérivée détermine le sens de variation."
    },
    {
        q: "L'équation de la tangente au point d'abscisse 'a' est :",
        options: ["y = f'(a)(x - a) + f(a)", "y = f(a)(x - a) + f'(a)", "y = f'(a)x + f(a)", "y = f'(x)(x - a) + f(a)"],
        correct: "y = f'(a)(x - a) + f(a)",
        expl: "C'est la formule fondamentale de la droite tangente."
    },
    {
        q: "Quelle est la dérivée de f(x) = (2x + 1)³ ?",
        options: ["6(2x + 1)²", "3(2x + 1)²", "2(2x + 1)²", "6x²"],
        correct: "6(2x + 1)²",
        expl: "On utilise la dérivée d'une composée : a * u'(ax+b). Ici 3 * 2 * (2x+1)²."
    },
    {
        q: "La fonction f(x) = |x| est-elle dérivable en 0 ?",
        options: ["Non", "Oui, f'(0) = 0", "Oui, f'(0) = 1", "Oui, f'(0) = -1"],
        correct: "Non",
        expl: "Il y a un point anguleux en 0, les limites à gauche et à droite du taux d'accroissement sont différentes."
    }
];

// Utilisez les fonctions shuffle() et calculateScore() fournies précédemment.

// Utiliser la même fonction shuffle et calculateScore que précédemment
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