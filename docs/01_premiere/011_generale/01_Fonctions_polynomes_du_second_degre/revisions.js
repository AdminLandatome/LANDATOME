const questionsData = [
    {
        q: "Quelle est la forme développée d'une fonction polynomiale du second degré ?",
        options: [
            "\\( f(x) = ax^2 + bx + c \\)", 
            "\\( f(x) = a(x - \\alpha)^2 + \\beta \\)", 
            "\\( f(x) = a(x - x_1)(x - x_2) \\)", 
            "\\( f(x) = mx + p \\)"
        ],
        correct: "\\( f(x) = ax^2 + bx + c \\)",
        expl: "C'est la forme standard où \\( a, b, c \\) sont des réels avec \\( a \\neq 0 \\)."
    },
    {
        q: "Comment calcule-t-on le discriminant \\( \\Delta \\) du trinôme \\( ax^2 + bx + c \\) ?",
        options: [
            "\\( \\Delta = b^2 - 4ac \\)", 
            "\\( \\Delta = b^2 + 4ac \\)", 
            "\\( \\Delta = \\sqrt{b^2 - 4ac} \\)", 
            "\\( \\Delta = \\frac{-b}{2a} \\)"
        ],
        correct: "\\( \\Delta = b^2 - 4ac \\)",
        expl: "Le discriminant permet de déterminer le nombre de racines réelles du trinôme."
    },
    {
        q: "Si \\( \\Delta > 0 \\), combien de racines distinctes possède le trinôme ?",
        options: ["Deux", "Une seule", "Aucune", "Une infinité"],
        correct: "Deux",
        expl: "Les racines sont alors données par \\( x_1 = \\frac{-b-\\sqrt{\\Delta}}{2a} \\) et \\( x_2 = \\frac{-b+\\sqrt{\\Delta}}{2a} \\)."
    },
    {
        q: "Quelles sont les coordonnées du sommet \\( S \\) de la parabole \\( y = a(x - \\alpha)^2 + \\beta \\) ?",
        options: [
            "\\( S(\\alpha ; \\beta) \\)", 
            "\\( S(-\\alpha ; \\beta) \\)", 
            "\\( S(\\beta ; \\alpha) \\)", 
            "\\( S(0 ; 0) \\)"
        ],
        correct: "\\( S(\\alpha ; \\beta) \\)",
        expl: "Dans la forme canonique, \\( \\alpha \\) est l'abscisse du sommet et \\( \\beta \\) son ordonnée."
    },
    {
        q: "Si le coefficient \\( a \\) est strictement positif (\\( a > 0 \\)), la parabole est orientée :",
        options: ["Vers le haut (en forme de U)", "Vers le bas (en forme de pont)", "Vers la droite", "Vers la gauche"],
        correct: "Vers le haut (en forme de U)",
        expl: "Quand \\( a > 0 \\), la fonction admet un minimum en son sommet."
    },
    {
        q: "Quelle est la valeur de \\( \\alpha \\) en fonction de \\( a \\) et \\( b \\) ?",
        options: [
            "\\( \\alpha = -\\frac{b}{2a} \\)", 
            "\\( \\alpha = \\frac{b}{2a} \\)", 
            "\\( \\alpha = \\frac{-b}{a} \\)", 
            "\\( \\alpha = \\sqrt{\\Delta} \\)"
        ],
        correct: "\\( \\alpha = -\\frac{b}{2a} \\)",
        expl: "C'est l'abscisse de l'axe de symétrie de la parabole."
    },
    {
        q: "Si \\( \\Delta < 0 \\), quel est le signe de \\( f(x) = ax^2 + bx + c \\) ?",
        options: [
            "Toujours du signe de \\( a \\)", 
            "Toujours positif", 
            "Toujours négatif", 
            "Il change de signe"
        ],
        correct: "Toujours du signe de \\( a \\)",
        expl: "Comme il n'y a pas de racine, la courbe ne traverse jamais l'axe des abscisses."
    },
    {
        q: "La forme factorisée de \\( f(x) \\) quand \\( \\Delta > 0 \\) est :",
        options: [
            "\\( a(x - x_1)(x - x_2) \\)", 
            "\\( (x - x_1)(x - x_2) \\)", 
            "\\( a(x + x_1)(x + x_2) \\)", 
            "\\( ax^2 + bx + c \\)"
        ],
        correct: "\\( a(x - x_1)(x - x_2) \\)",
        expl: "N'oubliez pas de multiplier par le coefficient \\( a \\) devant les parenthèses."
    },
    {
        q: "Si \\( \\Delta = 0 \\), la racine unique (dite double) est :",
        options: [
            "\\( x_0 = -\\frac{b}{2a} \\)", 
            "\\( x_0 = \\frac{b}{2a} \\)", 
            "\\( x_0 = 0 \\)", 
            "\\( x_0 = \\frac{-c}{a} \\)"
        ],
        correct: "\\( x_0 = -\\frac{b}{2a} \\)",
        expl: "Dans ce cas, le sommet de la parabole est situé exactement sur l'axe des abscisses."
    },
    {
        q: "Le produit des racines \\( x_1 \\times x_2 \\) est égal à :",
        options: [
            "\\( \\frac{c}{a} \\)", 
            "\\( -\\frac{b}{a} \\)", 
            "\\( \\frac{b}{a} \\)", 
            "\\( \\frac{-c}{a} \\)"
        ],
        correct: "\\( \\frac{c}{a} \\)",
        expl: "C'est une propriété utile pour vérifier ses calculs de racines rapidement."
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