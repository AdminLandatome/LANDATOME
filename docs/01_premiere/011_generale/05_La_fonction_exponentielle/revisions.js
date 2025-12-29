const questionsData = [
    {
        q: "Quelle est la propriété fondamentale définissant la fonction exponentielle ?",
        options: [
            "\\( f'(x) = f(x) \\) et \\( f(0) = 1 \\)", 
            "\\( f'(x) = f(x) \\) et \\( f(0) = 0 \\)", 
            "Elle est toujours négative", 
            "Elle est décroissante sur \\( \\mathbb{R} \\)"
        ],
        correct: "\\( f'(x) = f(x) \\) et \\( f(0) = 1 \\)",
        expl: "C'est la définition même du cours : l'exponentielle est l'unique fonction égale à sa dérivée qui vaut 1 en 0."
    },
    {
        q: "Pour tous réels \\( a \\) et \\( b \\), \\( \\exp(a + b) \\) est égal à :",
        options: [
            "\\( \\exp(a) \\times \\exp(b) \\)", 
            "\\( \\exp(a) + \\exp(b) \\)", 
            "\\( \\exp(a \\times b) \\)", 
            "\\( \\exp(a) - \\exp(b) \\)"
        ],
        correct: "\\( \\exp(a) \\times \\exp(b) \\)",
        expl: "C'est la relation fonctionnelle de base : l'exponentielle transforme une somme en produit."
    },
    {
        q: "Que peut-on dire du signe de \\( e^x \\) pour tout réel \\( x \\) ?",
        options: [
            "\\( e^x > 0 \\)", 
            "\\( e^x \\ge 0 \\)", 
            "\\( e^x < 0 \\) si \\( x < 0 \\)", 
            "Le signe dépend de \\( x \\)"
        ],
        correct: "\\( e^x > 0 \\)",
        expl: "La fonction exponentielle est strictement positive sur tout \\( \\mathbb{R} \\) (Propriété n°6 du cours)."
    },
    {
        q: "Simplifiez l'expression : \\( (e^x)^3 \\times e^{-2x} \\)",
        options: [
            "\\( e^x \\)", 
            "\\( e^{5x} \\)", 
            "\\( e^{-6x} \\)", 
            "\\( e^{x^3} \\)"
        ],
        correct: "\\( e^x \\)",
        expl: "\\( (e^x)^3 = e^{3x} \\). Ensuite, \\( e^{3x} \\times e^{-2x} = e^{3x-2x} = e^x \\)."
    },
    {
        q: "Quelle est la valeur approchée du nombre \\( e \\) (ou \\( \\exp(1) \\)) ?",
        options: ["2,72", "3,14", "1,41", "0,54"],
        correct: "2,72",
        expl: "\\( e \\) est la constante d'Euler, environ égale à 2,718."
    },
    {
        q: "Résolvez l'équation \\( e^{2x - 4} = 1 \\) :",
        options: [
            "\\( x = 2 \\)", 
            "\\( x = 4 \\)", 
            "\\( x = 0 \\)", 
            "Pas de solution"
        ],
        correct: "\\( x = 2 \\)",
        expl: "\\( e^A = 1 \\) signifie que \\( A = 0 \\). Donc \\( 2x - 4 = 0 \\) donne \\( x = 2 \\)."
    },
    {
        q: "Quelle est la dérivée de la fonction \\( f \\) définie par \\( f(x) = e^x - x \\) ?",
        options: [
            "\\( f'(x) = e^x - 1 \\)", 
            "\\( f'(x) = e^x \\)", 
            "\\( f'(x) = xe^{x-1} - 1 \\)", 
            "\\( f'(x) = e^x + 1 \\)"
        ],
        correct: "\\( f'(x) = e^x - 1 \\)",
        expl: "La dérivée de \\( e^x \\) est \\( e^x \\) et celle de \\( -x \\) est \\( -1 \\)."
    },
    {
        q: "L'inéquation \\( e^x < 0 \\) possède combien de solutions ?",
        options: ["Aucune", "Une seule", "Une infinité", "Toutes"],
        correct: "Aucune",
        expl: "Comme \\( e^x \\) est toujours strictement positif, il ne peut jamais être inférieur à 0."
    },
    {
        q: "L'expression \\( e^{a-b} \\) est égale à :",
        options: [
            "\\( \\frac{e^a}{e^b} \\)", 
            "\\( e^a - e^b \\)", 
            "\\( \\frac{1}{e^{a+b}} \\)", 
            "\\( e^a \\times e^b \\)"
        ],
        correct: "\\( \\frac{e^a}{e^b} \\)",
        expl: "La différence à l'exposant correspond au quotient des exponentielles."
    },
    {
        q: "Si \\( a < b \\), que peut-on dire de \\( e^a \\) et \\( e^b \\) ?",
        options: [
            "\\( e^a < e^b \\)", 
            "\\( e^a > e^b \\)", 
            "\\( e^a = e^b \\)", 
            "On ne peut pas conclure"
        ],
        correct: "\\( e^a < e^b \\)",
        expl: "La fonction exponentielle est strictement croissante sur \\( \\mathbb{R} \\), elle conserve donc l'ordre."
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