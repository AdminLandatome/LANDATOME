const questionsData = [
    {
        q: "Dans l'équation de droite \\( y = mx + p \\), que représente \\( m \\) ?",
        options: ["Le coefficient directeur (la pente)", "L'ordonnée à l'origine", "L'abscisse du point", "La longueur de la droite"],
        correct: "Le coefficient directeur (la pente)",
        expl: "\\( m \\) détermine l'inclinaison de la droite."
    },
    {
        q: "Quelle est l'ordonnée à l'origine de la droite d'équation \\( y = -3x + 4 \\) ?",
        options: ["4", "-3", "0", "-4"],
        correct: "4",
        expl: "L'ordonnée à l'origine est le nombre \\( p \\) dans \\( y = mx + p \\). Ici, \\( p = 4 \\)."
    },
    {
        q: "Si une droite est horizontale, son coefficient directeur \\( m \\) est égal à :",
        options: ["0", "1", "L'infini", "-1"],
        correct: "0",
        expl: "Une droite horizontale ne monte ni ne descend, sa pente est donc nulle."
    },
    {
        q: "Quelle est la formule du coefficient directeur \\( m \\) passant par \\( A(x_A; y_A) \\) et \\( B(x_B; y_B) \\) ?",
        options: [
            "\\( \\frac{y_B - y_A}{x_B - x_A} \\)", 
            "\\( \\frac{x_B - x_A}{y_B - y_A} \\)", 
            "\\( (y_B - y_A) \\times (x_B - x_A) \\)", 
            "\\( y_B + y_A \\)"
        ],
        correct: "\\( \\frac{y_B - y_A}{x_B - x_A} \\)",
        expl: "C'est le rapport de la variation des ordonnées sur la variation des abscisses (\\( \\Delta y / \\Delta x \\))."
    },
    {
        q: "Soit \\( f(x) = 2x^2 \\). Le taux de variation entre 1 et 3 est calculé par :",
        options: [
            "\\( \\frac{f(3) - f(1)}{3 - 1} \\)", 
            "\\( f(3) - f(1) \\)", 
            "\\( \\frac{3 - 1}{f(3) - f(1)} \\)", 
            "\\( f'(1) \\)"
        ],
        correct: "\\( \\frac{f(3) - f(1)}{3 - 1} \\)",
        expl: "Le taux de variation est le coefficient directeur de la sécante passant par les points d'abscisses 1 et 3."
    },
    {
        q: "Une droite qui 'descend' de gauche à droite a un coefficient directeur :",
        options: ["Négatif", "Positif", "Nul", "Égal à 1"],
        correct: "Négatif",
        expl: "Si \\( m < 0 \\), la fonction affine associée est décroissante."
    },
    {
        q: "Le nombre dérivé \\( f'(a) \\) correspond graphiquement à :",
        options: [
            "La pente de la tangente au point d'abscisse \\( a \\)", 
            "L'image de \\( a \\) par la fonction", 
            "Le point où la courbe coupe l'axe des ordonnées", 
            "La longueur de la courbe"
        ],
        correct: "La pente de la tangente au point d'abscisse \\( a \\)",
        expl: "C'est la limite du taux de variation quand l'intervalle devient infiniment petit."
    },
    {
        q: "Dans l'exercice sur l'épidémie, si \\( f'(3) = 180 \\), cela signifie que :",
        options: [
            "La vitesse de propagation est de 180 malades/semaine", 
            "Il y a 180 malades au total", 
            "L'épidémie s'arrête dans 180 jours", 
            "Le pic est atteint au bout de 180 semaines"
        ],
        correct: "La vitesse de propagation est de 180 malades/semaine",
        expl: "Le nombre dérivé représente une vitesse de variation instantanée."
    },
    {
        q: "Pour la droite d'équation \\( y = 2 \\), quel est le coefficient directeur ?",
        options: ["0", "2", "1", "Il n'y en a pas"],
        correct: "0",
        expl: "\\( y = 2 \\) est de la forme \\( y = 0x + 2 \\). C'est une droite horizontale."
    },
    {
        q: "Si on avance de 1 unité en abscisse et qu'on monte de 3 unités en ordonnée, \\( m \\) vaut :",
        options: ["3", "1/3", "-3", "1"],
        correct: "3",
        expl: "\\( m = \\text{montée} / \\text{avance} = 3 / 1 = 3 \\)."
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