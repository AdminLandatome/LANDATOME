const questionsData = [
    {
        q: "Quelle est la forme générale d'une fonction polynôme du troisième degré ?",
        options: [
            "\\( f(x) = ax^3 + bx^2 + cx + d \\)", 
            "\\( f(x) = ax^2 + bx + c \\)", 
            "\\( f(x) = ax + b \\)", 
            "\\( f(x) = a(x - \\alpha)^2 + \\beta \\)"
        ],
        correct: "\\( f(x) = ax^3 + bx^2 + cx + d \\)",
        expl: "Un polynôme de degré 3 a pour plus haut exposant 3, avec \\( a \\neq 0 \\)."
    },
    {
        q: "Quelle est la dérivée de la fonction \\( f(x) = x^3 \\) ?",
        options: ["\\( 3x^2 \\)", "\\( x^2 \\)", "\\( 3x \\)", "\\( 2x^2 \\)"],
        correct: "\\( 3x^2 \\)",
        expl: "Selon la règle de dérivation des puissances, on descend l'exposant et on diminue sa puissance de 1."
    },
    {
        q: "Si \\( x^3 = 27 \\), quelle est la valeur de \\( x \\) ?",
        options: ["3", "9", "27", "13,5"],
        correct: "3",
        expl: "\\( 3 \\times 3 \\times 3 = 27 \\). 3 est la racine cubique de 27."
    },
    {
        q: "Pour étudier les variations d'une fonction de degré 3, on étudie :",
        options: [
            "Le signe de sa dérivée", 
            "Le signe de la fonction", 
            "L'ordonnée à l'origine", 
            "La valeur de \\( d \\)"
        ],
        correct: "Le signe de sa dérivée",
        expl: "La dérivée donne le coefficient directeur de la tangente : positive = croissante, négative = décroissante."
    },
    {
        q: "La dérivée de \\( f(x) = 2x^3 - 5x + 4 \\) est :",
        options: [
            "\\( 6x^2 - 5 \\)", 
            "\\( 2x^2 - 5 \\)", 
            "\\( 6x^2 + 4 \\)", 
            "\\( 6x - 5 \\)"
        ],
        correct: "\\( 6x^2 - 5 \\)",
        expl: "\\( 2 \\times (3x^2) - 5 \\times 1 + 0 = 6x^2 - 5 \\)."
    },
    {
        q: "Si une fonction a trois racines \\( x_1, x_2, x_3 \\), sa forme factorisée est :",
        options: [
            "\\( a(x - x_1)(x - x_2)(x - x_3) \\)", 
            "\\( (x + x_1)(x + x_2)(x + x_3) \\)", 
            "\\( ax^3 + bx^2 + cx + d \\)", 
            "\\( a(x - x_1)^3 \\)"
        ],
        correct: "\\( a(x - x_1)(x - x_2)(x - x_3) \\)",
        expl: "Chaque racine \\( r \\) correspond à un facteur \\( (x - r) \\) dans l'expression."
    },
    {
        q: "La courbe représentative d'une fonction du second degré s'appelle :",
        options: [
            "Une parabole", 
            "une hyperbole", 
            "Une droite", 
            "Un cercle"
        ],
        correct: "Une parabole",
        expl: ""
    },
    {
        q: "Un cube a un volume de 125 cm³. Quelle est la longueur de son arête ?",
        options: ["5 cm", "25 cm", "10 cm", "15 cm"],
        correct: "5 cm",
        expl: "Le volume est \\( c^3 \\). \\( 5^3 = 5 \\times 5 \\times 5 = 125 \\)."
    },
    {
        q: "Dans un tableau de variations, une flèche montante indique que la dérivée est :",
        options: ["Positive", "Négative", "Nulle", "Croissante"],
        correct: "Positive",
        expl: "Le sens de variation de la fonction est donné par le SIGNE de la dérivée."
    },
    {
        q: "La fonction \\( f(x) = -x^3 \\) est :",
        options: [
            "Toujours décroissante sur \\( \\mathbb{R} \\)", 
            "Toujours croissante sur \\( \\mathbb{R} \\)", 
            "Croissante puis décroissante", 
            "Constante"
        ],
        correct: "Toujours décroissante sur \\( \\mathbb{R} \\)",
        expl: "Sa dérivée est \\( -3x^2 \\), ce qui est toujours négatif ou nul."
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