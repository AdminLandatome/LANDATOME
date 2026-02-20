const questionsData = [
    {
        q: "Quelle est la relation exacte entre le radian et le degré ?",
        options: [
            "\\( \\pi \\) rad = 180°", 
            "\\( 2\\pi \\) rad = 180°", 
            "1 rad = 1°", 
            "\\( \\pi \\) rad = 360°"
        ],
        correct: "\\( \\pi \\) rad = 180°",
        expl: "Par définition, un demi-tour de cercle correspond à un angle plat de 180° ou une longueur d'arc de \\( \\pi \\) sur le cercle trigonométrique[cite: 75]."
    },
    {
        q: "Sur le cercle trigonométrique, à quoi correspond le cosinus d'un réel \\( x \\) ?",
        options: [
            "L'abscisse du point M associé à \\( x \\)", 
            "L'ordonnée du point M associé à \\( x \\)", 
            "Le rayon du cercle", 
            "La tangente à l'origine"
        ],
        correct: "L'abscisse du point M associé à \\( x \\)",
        expl: "Dans un repère orthonormé, le point M associé au réel \\( x \\) a pour coordonnées \\( (cos(x) ; sin(x)) \\)[cite: 77]."
    },
    {
        q: "Quelle égalité est toujours vraie pour tout réel \\( x \\) ?",
        options: [
            "\\( cos^2(x) + sin^2(x) = 1 \\)", 
            "\\( cos(x) + sin(x) = 1 \\)", 
            "\\( cos^2(x) - sin^2(x) = 1 \\)", 
            "\\( cos(x) \\times sin(x) = 1 \\)"
        ],
        correct: "\\( cos^2(x) + sin^2(x) = 1 \\)",
        expl: "D'après le théorème de Pythagore appliqué dans le cercle trigonométrique de rayon 1, on a toujours \\( cos^2(x) + sin^2(x) = 1 \\)[cite: 78]."
    },
    {
        q: "Quelle est la valeur de \\( cos(\\frac{\\pi}{3}) \\) ?",
        options: ["1/2", "\\( \\frac{\\sqrt{2}}{2} \\)", "\\( \\frac{\\sqrt{3}}{2} \\)", "0"],
        correct: "1/2",
        expl: "\\( \\frac{\\pi}{3} \\) correspond à 60°. Son cosinus est l'une des valeurs remarquables à connaître par cœur : 0,5 ou 1/2[cite: 78]."
    },
    {
        q: "Que vaut \\( sin(\\frac{\\pi}{4}) \\) ?",
        options: ["\\( \\frac{\\sqrt{2}}{2} \\)", "1/2", "\\( \\frac{\\sqrt{3}}{2} \\)", "1"],
        correct: "\\( \\frac{\\sqrt{2}}{2} \\)",
        expl: "\\( \\frac{\\pi}{4} \\) (ou 45°) est la valeur où le sinus et le cosinus sont égaux à \\( \\frac{\\sqrt{2}}{2} \\)[cite: 78]."
    },
    {
        q: "Parmi ces propriétés de symétrie, laquelle est correcte ?",
        options: [
            "\\( cos(-x) = cos(x) \\)", 
            "\\( sin(-x) = sin(x) \\)", 
            "\\( cos(\\pi - x) = cos(x) \\)", 
            "\\( sin(\\pi + x) = sin(x) \\)"
        ],
        correct: "\\( cos(-x) = cos(x) \\)",
        expl: "La fonction cosinus est paire, ce qui signifie que deux angles opposés ont la même abscisse sur le cercle[cite: 79, 83]."
    },
    {
        q: "Que peut-on dire de la fonction sinus ?",
        options: [
            "Elle est impaire", 
            "Elle est paire", 
            "Elle est strictement croissante sur \\( \\mathbb{R} \\)", 
            "Elle n'est pas périodique"
        ],
        correct: "Elle est impaire",
        expl: "La fonction sinus est impaire car \\( sin(-x) = -sin(x) \\), ce qui correspond à une symétrie par rapport à l'origine[cite: 81]."
    },
    {
        q: "Quelle est la période des fonctions sinus et cosinus ?",
        options: ["\\( 2\\pi \\)", "\\( \\pi \\)", "\\( \\pi/2 \\)", "\\( 1 \\)"],
        correct: "\\( 2\\pi \\)",
        expl: "Faire un tour complet du cercle (soit \\( 2\\pi \\) radians) revient au même point, donc les valeurs se répètent tous les \\( 2\\pi \\)[cite: 80, 82]."
    },
    {
        q: "Quelle est la valeur maximale que peut prendre la fonction cosinus ?",
        options: ["1", "0", "\\( \\pi \\)", "2"],
        correct: "1",
        expl: "Le point M appartenant au cercle de rayon 1, son abscisse (cosinus) est comprise entre -1 et 1[cite: 78]."
    },
    {
        q: "La fonction cosinus est décroissante sur quel intervalle ?",
        options: ["\\( [0 ; \\pi] \\)", "\\( [-\\pi ; 0] \\)", "\\( [-\\pi/2 ; \\pi/2] \\)", "\\( [0 ; 2\\pi] \\)"],
        correct: "\\( [0 ; \\pi] \\)",
        expl: "Sur la moitié supérieure du cercle (de 0 à \\( \\pi \\)), l'abscisse du point M diminue de 1 vers -1[cite: 84]."
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