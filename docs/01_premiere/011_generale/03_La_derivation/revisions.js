const questionsData = [
    {
        q: "Quelle est la dérivée de la fonction \\( f(x) = x^n \\) ?",
        options: ["\\( n x^{n-1} \\)", "\\( \\frac{x^{n+1}}{n+1} \\)", "\\( n x^n \\)", "\\( n x \\)"],
        correct: "\\( n x^{n-1} \\)",
        expl: "C'est la règle de puissance de base pour tout entier \\( n \\)."
    },
    {
        q: "Quelle est la dérivée de \\( f(x) = \\frac{1}{x} \\) ?",
        options: ["\\( -\\frac{1}{x^2} \\)", "\\( \\frac{1}{x^2} \\)", "\\( \\ln(x) \\)", "\\( -\\frac{1}{x} \\)"],
        correct: "\\( -\\frac{1}{x^2} \\)",
        expl: "La dérivée de l'inverse est l'opposé de l'inverse du carré."
    },
    {
        q: "La fonction \\( f(x) = \\sqrt{x} \\) est dérivable sur :",
        options: ["\\( ]0 ; +\\infty[ \\)", "\\( [0 ; +\\infty[ \\)", "\\( \\mathbb{R} \\)", "\\( \\mathbb{R}^* \\)"],
        correct: "\\( ]0 ; +\\infty[ \\)",
        expl: "La fonction racine n'est pas dérivable en 0 car sa tangente y est verticale."
    },
    {
        q: "Quelle est la formule de la dérivée d'un produit \\( (u \\times v) \\) ?",
        options: ["\\( u'v + uv' \\)", "\\( u'v - uv' \\)", "\\( u' \\times v' \\)", "\\( \\frac{u'v - uv'}{v^2} \\)"],
        correct: "\\( u'v + uv' \\)",
        expl: "C'est la règle de Leibniz pour le produit de deux fonctions."
    },
    {
        q: "Si \\( f'(a) = 0 \\), que peut-on dire de la tangente à la courbe en \\( a \\) ?",
        options: ["Elle est horizontale", "Elle est verticale", "Elle passe par l'origine", "Elle n'existe pas"],
        correct: "Elle est horizontale",
        expl: "Un coefficient directeur nul correspond à une droite parallèle à l'axe des abscisses."
    },
    {
        q: "Quelle est la dérivée de \\( f(x) = 3x^2 - 5x + 2 \\) ?",
        options: ["\\( 6x - 5 \\)", "\\( 3x - 5 \\)", "\\( 6x \\)", "\\( 6x^2 - 5 \\)"],
        correct: "\\( 6x - 5 \\)",
        expl: "On dérive terme à terme : \\( (3x^2)' = 6x \\) et \\( (-5x)' = -5 \\)."
    },
    {
        q: "Si \\( f'(x) > 0 \\) sur un intervalle \\( I \\), alors \\( f \\) est :",
        options: ["Strictement croissante", "Strictement décroissante", "Positive", "Négative"],
        correct: "Strictement croissante",
        expl: "Le signe de la dérivée détermine le sens de variation de la fonction."
    },
    {
        q: "L'équation de la tangente au point d'abscisse \\( a \\) est :",
        options: ["\\( y = f'(a)(x - a) + f(a) \\)", "\\( y = f(a)(x - a) + f'(a) \\)", "\\( y = f'(a)x + f(a) \\)", "\\( y = f'(x)(x - a) + f(a) \\)"],
        correct: "\\( y = f'(a)(x - a) + f(a) \\)",
        expl: "C'est la formule fondamentale de la droite tangente."
    },
    {
        q: "Quelle est la dérivée de \\( f(x) = (2x + 1)^3 \\) ?",
        options: ["\\( 6(2x + 1)^2 \\)", "\\( 3(2x + 1)^2 \\)", "\\( 2(2x + 1)^2 \\)", "\\( 6x^2 \\)"],
        correct: "\\( 6(2x + 1)^2 \\)",
        expl: "On utilise la dérivée d'une composée : \\( n \\cdot u' \\cdot u^{n-1} \\). Ici \\( 3 \\times 2 \\times (2x+1)^2 \\)."
    },
    {
        q: "La fonction \\( f(x) = |x| \\) est-elle dérivable en 0 ?",
        options: ["Non", "Oui, \\( f'(0) = 0 \\)", "Oui, \\( f'(0) = 1 \\)", "Oui, \\( f'(0) = -1 \\)"],
        correct: "Non",
        expl: "Il y a un point anguleux en 0, la limite du taux d'accroissement n'est pas unique."
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
if (window.MathJax) {
    MathJax.typesetPromise();
}

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
	if (window.MathJax) {
    MathJax.typesetPromise();
}
}