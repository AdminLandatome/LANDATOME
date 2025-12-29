const questionsData = [
    {
        q: "Qu'est-ce qu'une variable aléatoire \\( X \\) ?",
        options: [
            "Une fonction qui associe un nombre réel à chaque issue", 
            "Un résultat qui change à chaque fois", 
            "Une lettre utilisée pour les équations", 
            "La probabilité d'un événement"
        ],
        correct: "Une fonction qui associe un nombre réel à chaque issue",
        expl: "Elle transforme un résultat qualitatif (ex: Pile/Face) en une valeur numérique (ex: 1€/2€)."
    },
    {
        q: "Dans un tableau de loi de probabilité, la somme des \\( P(X=x_i) \\) est toujours :",
        options: ["1", "0", "100", "L'espérance"],
        correct: "1",
        expl: "Comme pour toute loi de probabilité, le total des probabilités de toutes les issues possibles est 1."
    },
    {
        q: "L'espérance \\( E(X) \\) d'une variable aléatoire représente :",
        options: [
            "La valeur moyenne obtenue sur un grand nombre d'essais", 
            "La valeur la plus probable", 
            "Le risque de perdre", 
            "L'écart moyen entre les résultats"
        ],
        correct: "La valeur moyenne obtenue sur un grand nombre d'essais",
        expl: "C'est la moyenne pondérée des résultats par leurs probabilités respectives."
    },
    {
        q: "Quelle est la formule simplifiée de l'espérance \\( E(X) \\) ?",
        options: [
            "\\( \\sum x_i \\times p_i \\)", 
            "\\( \\sum p_i / x_i \\)", 
            "\\( (x_1 + x_2) / 2 \\)", 
            "\\( \\sqrt{p_i} \\)"
        ],
        correct: "\\( \\sum x_i \\times p_i \\)",
        expl: "On multiplie chaque valeur par sa probabilité et on additionne les résultats."
    },
    {
        q: "L'écart-type \\( \\sigma(X) \\) sert à mesurer :",
        options: [
            "La dispersion des valeurs autour de la moyenne", 
            "Le gain maximal possible", 
            "La probabilité d'erreur", 
            "Le nombre d'issues"
        ],
        correct: "La dispersion des valeurs autour de la moyenne",
        expl: "Plus l'écart-type est grand, plus les valeurs sont 'étalées' loin de l'espérance."
    },
    {
        q: "Si \\( E(X) = 0 \\) dans un jeu de hasard, on dit que le jeu est :",
        options: ["Équitable", "Gagnant", "Perdant", "Indépendant"],
        correct: "Équitable",
        expl: "À long terme, le joueur ne gagne ni ne perd d'argent en moyenne."
    },
    {
        q: "Comment obtient-on l'écart-type \\( \\sigma(X) \\) à partir de la variance \\( V(X) \\) ?",
        options: [
            "\\( \\sigma(X) = \\sqrt{V(X)} \\)", 
            "\\( \\sigma(X) = V(X)^2 \\)", 
            "\\( \\sigma(X) = 1 / V(X) \\)", 
            "\\( \\sigma(X) = E(X) + V(X) \\)"
        ],
        correct: "\\( \\sigma(X) = \\sqrt{V(X)} \\)",
        expl: "L'écart-type est la racine carrée de la variance pour revenir à l'unité de départ."
    },
    {
        q: "L'événement \\( \\{X \\le 2\\} \\) signifie que la variable prend :",
        options: [
            "Toutes les valeurs inférieures ou égales à 2", 
            "Uniquement la valeur 2", 
            "Toutes les valeurs strictement plus grandes que 2", 
            "Exactement deux valeurs"
        ],
        correct: "Toutes les valeurs inférieures ou égales à 2",
        expl: "Le symbole \\( \\le \\) inclut la valeur 2 et toutes celles qui sont en dessous."
    },
    {
        q: "Selon le cours, environ 95% des fréquences observées se situent dans l'intervalle :",
        options: [
            "\\( [p - 2\\sigma ; p + 2\\sigma] \\)", 
            "\\( [p - \\sigma ; p + \\sigma] \\)", 
            "\\( [0 ; 1] \\)", 
            "\\( [p - 3\\sigma ; p + 3\\sigma] \\)"
        ],
        correct: "\\( [p - 2\\sigma ; p + 2\\sigma] \\)",
        expl: "C'est une propriété de la loi normale (souvent appelée règle des 2 sigmas)."
    },
    {
        q: "Si on gagne 10€ avec une probabilité de 0,2 et qu'on perd 2€ avec une probabilité de 0,8, l'espérance est :",
        options: ["0,4 €", "4 €", "0 €", "8 €"],
        correct: "0,4 €",
        expl: "\\( E(X) = 10 \\times 0,2 + (-2) \\times 0,8 = 2 - 1,6 = 0,4 \\). Le jeu est légèrement gagnant."
    }
];
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