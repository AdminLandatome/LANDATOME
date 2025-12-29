const questionsData = [
    {
        q: "Si \\( f(a) = b \\), on dit que \\( b \\) est :",
        options: ["L'image de \\( a \\) par \\( f \\)", "L'antécédent de \\( a \\) par \\( f \\)", "Le domaine de définition", "La courbe"],
        correct: "L'image de \\( a \\) par \\( f \\)",
        expl: "Par définition, le résultat du calcul \\( f(a) \\) est l'image de \\( a \\)."
    },
    {
        q: "Sur le graphique d'une fonction, les images se lisent sur :",
        options: ["L'axe des ordonnées (vertical)", "L'axe des abscisses (horizontal)", "L'origine du repère", "La légende"],
        correct: "L'axe des ordonnées (vertical)",
        expl: "L'image correspond à la valeur de \\( y \\) associée à un point de la courbe."
    },
    {
        q: "Soit \\( f(x) = 2x - 5 \\). Quelle est l'image de 3 ?",
        options: ["1", "3", "-1", "11"],
        correct: "1",
        expl: "\\( f(3) = 2 \\times 3 - 5 = 6 - 5 = 1 \\)."
    },
    {
        q: "Un nombre peut-il avoir plusieurs images par une même fonction ?",
        options: ["Non, jamais", "Oui, toujours", "Seulement si la fonction est constante", "Seulement pour les fonctions carrées"],
        correct: "Non, jamais",
        expl: "Par définition, à chaque valeur de \\( x \\) correspond au maximum UNE seule image."
    },
    {
        q: "Qu'est-ce que le domaine de définition \\( D_f \\) ?",
        options: [
            "L'ensemble des réels pour lesquels \\( f(x) \\) existe", 
            "L'ensemble de toutes les images", 
            "Le nom de la courbe représentative", 
            "Le point d'intersection avec l'axe des ordonnées"
        ],
        correct: "L'ensemble des réels pour lesquels \\( f(x) \\) existe",
        expl: "C'est l'ensemble des valeurs de \\( x \\) que l'on a le droit d'utiliser dans la fonction."
    },
    {
        q: "Sur une courbe, un antécédent de \\( k \\) est :",
        options: [
            "L'abscisse d'un point d'ordonnée \\( k \\)", 
            "L'ordonnée d'un point d'abscisse \\( k \\)", 
            "Le point le plus haut de la courbe", 
            "La pente de la courbe"
        ],
        correct: "L'abscisse d'un point d'ordonnée \\( k \\)",
        expl: "Chercher un antécédent revient à chercher \\( x \\) quand on connaît \\( y = k \\)."
    },
    {
        q: "Si la courbe \\( C_f \\) passe par le point \\( A(2 ; -4) \\), alors :",
        options: ["\\( f(2) = -4 \\)", "\\( f(-4) = 2 \\)", "\\( f(2) = 4 \\)", "\\( f(x) = 2x - 4 \\)"],
        correct: "\\( f(2) = -4 \\)",
        expl: "Le premier nombre est l'abscisse (\\( x \\)) et le second est l'image (\\( f(x) \\))."
    },
    {
        q: "Pour trouver graphiquement les antécédents de 2, on trace :",
        options: [
            "La droite horizontale \\( y = 2 \\)", 
            "La droite verticale \\( x = 2 \\)", 
            "Un point à l'origine", 
            "On regarde où la courbe s'arrête"
        ],
        correct: "La droite horizontale \\( y = 2 \\)",
        expl: "On cherche tous les points de la courbe qui ont pour ordonnée 2."
    },
    {
        q: "L'ensemble des points de coordonnées \\( (x ; f(x)) \\) s'appelle :",
        options: ["La courbe représentative", "Le tableau de signes", "L'image de la fonction", "L'antécédent"],
        correct: "La courbe représentative",
        expl: "C'est la 'trace' visuelle de la fonction dans un repère."
    },
    {
        q: "Soit \\( g(x) = x^2 + 1 \\). Quelle est l'image de \\( -2 \\) ?",
        options: ["5", "-3", "3", "-5"],
        correct: "5",
        expl: "\\( g(-2) = (-2)^2 + 1 = 4 + 1 = 5 \\). Attention, le carré d'un nombre négatif est positif."
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