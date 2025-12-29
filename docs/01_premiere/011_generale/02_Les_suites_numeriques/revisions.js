const questionsData = [
    {
        q: "Quelle est la notation correcte pour désigner la suite dans son ensemble ?",
        options: ["\\( (u_n) \\) ou \\(u\\)", "\\( u_n \\)", "\\( u(n) \\)", "\\( u_n \\in \\mathbb{R} \\)"],
        correct: "\\( (u_n) \\)",
        expl: "\\( u_n \\) désigne un terme précis (un nombre), alors que \\( (u_n) \\) (ou plutôt \\( u \\) ) désigne la suite en tant qu'objet mathématique."
    },
    {
        q: "Une suite définie par \\( u_{n+1} = 2u_n + 3 \\) est une suite :",
        options: ["Définie par récurrence", "Définie de façon explicite", "Arithmétique", "Constante"],
        correct: "Définie par récurrence",
        expl: "On calcule un terme à partir du terme précédent, c'est le principe de la récurrence."
    },
    {
        q: "Si \\( (u_n) \\) est une suite arithmétique de raison \\( r \\), alors \\( u_n = \\) :",
        options: ["\\( u_0 + n \\times r \\)", "\\( u_0 \\times r^n \\)", "\\( u_0 + r \\)", "\\( u_0 \\times n \\)"],
        correct: "\\( u_0 + n \\times r \\)",
        expl: "On ajoute \\( n \\) fois la raison pour passer de \\( u_0 \\) à \\( u_n \\)."
    },
    {
        q: "Comment passe-t-on d'un terme au suivant dans une suite géométrique ?",
        options: ["En multipliant par la raison \\( q \\)", "En ajoutant la raison \\( r \\)", "En élevant au carré", "En prenant l'inverse"],
        correct: "En multipliant par la raison \\( q \\)",
        expl: "C'est la définition même d'une progression géométrique."
    },
    {
        q: "Quelle est la somme des entiers \\( 1 + 2 + 3 + \\dots + n \\) ?",
        options: ["\\( \\frac{n(n+1)}{2} \\)", "\\( \\frac{n(n-1)}{2} \\)", "\\( n^2 \\)", "\\( (n+1)^2 \\)"],
        correct: "\\( \\frac{n(n+1)}{2} \\)",
        expl: "C'est la formule de la somme des termes d'une suite arithmétique appliquée aux entiers."
    },
    {
        q: "Soit \\( u_n = 3 \\times 2^n \\). Quelle est la valeur de \\( u_2 \\) ?",
        options: ["12", "6", "18", "36"],
        correct: "12",
        expl: "\\( u_2 = 3 \\times 2^2 = 3 \\times 4 = 12 \\)."
    },
    {
        q: "Si la raison \\( q \\) d'une suite géométrique est égale à 1, la suite est :",
        options: ["Constante", "Strictement croissante", "Strictement décroissante", "Nulle"],
        correct: "Constante",
        expl: "Multiplier par 1 à chaque étape ne modifie pas la valeur des termes."
    },
    {
        q: "Que signifie la condition \\( u_{n+1} - u_n > 0 \\) ?",
        options: ["La suite est strictement croissante", "La suite est strictement décroissante", "La suite est positive", "La suite est arithmétique"],
        correct: "La suite est strictement croissante",
        expl: "Si la différence est positive, chaque terme est supérieur au précédent."
    },
    {
        q: "La suite \\( u_n = 5n - 2 \\) est une suite :",
        options: ["Arithmétique de raison 5", "Géométrique de raison 5", "Arithmétique de raison -2", "Constante"],
        correct: "Arithmétique de raison 5",
        expl: "Elle est de la forme \\( u_n = u_0 + nr \\) avec \\( r = 5 \\)."
    },
    {
        q: "Sur un graphique, la représentation d'une suite est :",
        options: ["Un nuage de points isolés", "Une droite continue", "Une courbe continue", "Des segments reliés"],
        correct: "Un nuage de points isolés",
        expl: "Une suite est définie sur \\( \\mathbb{N} \\) (nombres entiers), les points ne sont donc pas reliés."
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