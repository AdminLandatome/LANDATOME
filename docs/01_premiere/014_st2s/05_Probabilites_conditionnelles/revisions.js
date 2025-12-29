const questionsData = [
    {
        q: "Que représente l'événement \\( A \\cap B \\) ?",
        options: [
            "Les événements qui sont dans A ET dans B", 
            "Les événements qui sont dans A OU dans B", 
            "Les événements qui ne sont pas dans A", 
            "La probabilité totale"
        ],
        correct: "Les événements qui sont dans A ET dans B",
        expl: "L'intersection (\\( \\cap \\)) correspond à la réalisation simultanée des deux événements."
    },
    {
        q: "Si \\( P(A) = 0,3 \\), quelle est la probabilité de l'événement contraire \\( \\overline{A} \\) ?",
        options: ["0,7", "0,3", "-0,3", "1,3"],
        correct: "0,7",
        expl: "\\( P(\\overline{A}) = 1 - P(A) \\). Ici : \\( 1 - 0,3 = 0,7 \\)."
    },
    {
        q: "Dans un tableau croisé d'effectifs, la probabilité \\( P_A(B) \\) se calcule par :",
        options: [
            "\\( \\frac{\\text{Effectif de } A \\cap B}{\\text{Effectif total de } A} \\)", 
            "\\( \\frac{\\text{Effectif de } A \\cap B}{\\text{Effectif total}} \\)", 
            "\\( \\frac{\\text{Effectif de } A}{\\text{Effectif de } B} \\)", 
            "\\( P(A) \\times P(B) \\)"
        ],
        correct: "\\( \\frac{\\text{Effectif de } A \\cap B}{\\text{Effectif total de } A} \\)",
        expl: "Pour une probabilité conditionnelle 'sachant A', on divise par le total de la ligne ou colonne A."
    },
    {
        q: "Deux événements sont dits indépendants si :",
        options: [
            "\\( P(A \\cap B) = P(A) \\times P(B) \\)", 
            "\\( P(A \\cap B) = 0 \\)", 
            "\\( P(A \\cup B) = 1 \\)", 
            "\\( P(A) = P(B) \\)"
        ],
        correct: "\\( P(A \\cap B) = P(A) \\times P(B) \\)",
        expl: "C'est la définition : la réalisation de l'un ne change pas la probabilité de l'autre."
    },
    {
        q: "Sur 50 sportifs, 10 sont dopés. Si 90 % des dopés sont positifs, combien y a-t-il de positifs dopés ?",
        options: ["9", "10", "5", "19"],
        correct: "9",
        expl: "On calcule 90 % de 10 : \\( 10 \\times 0,9 = 9 \\)."
    },
    {
        q: "L'événement \\( A \\cup B \\) (A union B) correspond à :",
        options: [
            "A ou B (au moins l'un des deux)", 
            "A et B en même temps", 
            "Ni A ni B", 
            "Seulement A"
        ],
        correct: "A ou B (au moins l'un des deux)",
        expl: "L'union regroupe tous les éléments appartenant à au moins l'un des ensembles."
    },
    {
        q: "Si deux événements sont incompatibles (disjoints), alors \\( P(A \\cap B) \\) vaut :",
        options: ["0", "1", "0,5", "\\( P(A) \\times P(B) \\)"],
        correct: "0",
        expl: "Incompatible signifie qu'ils ne peuvent pas se produire en même temps."
    },
    {
        q: "Dans l'exercice des serres, si la fréquence des tulipes est 0,72, quelle est celle des narcisses ?",
        options: ["0,28", "0,72", "1", "0,38"],
        correct: "0,28",
        expl: "Il n'y a que deux types de fleurs, donc \\( 1 - 0,72 = 0,28 \\)."
    },
    {
        q: "La notation \\( P_B(A) \\) se lit :",
        options: [
            "Probabilité de A sachant B", 
            "Probabilité de B sachant A", 
            "Probabilité de A inter B", 
            "Probabilité de A ou B"
        ],
        correct: "Probabilité de A sachant B",
        expl: "La lettre en indice (en bas à droite) représente la condition connue."
    },
    {
        q: "Si \\( P(A \\cap B) = 0,1 \\), \\( P(A) = 0,2 \\) et \\( P(B) = 0,5 \\), les événements sont-ils indépendants ?",
        options: [
            "Oui, car \\( 0,2 \\times 0,5 = 0,1 \\)", 
            "Non, car ils ne sont pas égaux", 
            "Oui, car la somme fait 0,8", 
            "On ne peut pas savoir"
        ],
        correct: "Oui, car \\( 0,2 \\times 0,5 = 0,1 \\)",
        expl: "Comme \\( P(A) \\times P(B) \\) est égal à \\( P(A \\cap B) \\), le test d'indépendance est positif."
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