const questionsData = [
    {
        q: "Quelle est la formule correcte de la probabilité conditionnelle \\( P_B(A) \\) ?",
        options: ["\\( \\frac{P(A \\cap B)}{P(B)} \\)", "\\( \\frac{P(A \\cap B)}{P(A)} \\)", "\\( P(A) \\times P(B) \\)", "\\( P(A \\cup B) \\)"],
        correct: "\\( \\frac{P(A \\cap B)}{P(B)} \\)",
        expl: "La probabilité de \\( A \\) sachant \\( B \\) est le rapport de l'intersection sur la probabilité de la condition \\( B \\)."
    },
    {
        q: "Si deux événements \\( A \\) et \\( B \\) sont indépendants, alors \\( P(A \\cap B) = \\) :",
        options: ["\\( P(A) \\times P(B) \\)", "\\( P(A) + P(B) \\)", "\\( 0 \\)", "\\( P_B(A) \\)"],
        correct: "\\( P(A) \\times P(B) \\)",
        expl: "C'est la définition mathématique de l'indépendance de deux événements."
    },
    {
        q: "Dans un arbre pondéré, la somme des probabilités des branches issues d'un même nœud est égale à :",
        options: ["1", "0,5", "\\( P(\\Omega) \\)", "La probabilité du nœud précédent"],
        correct: "1",
        expl: "C'est la loi des nœuds : les événements issus d'un nœud forment une partition de l'événement précédent."
    },
    {
        q: "Quelle formule correspond aux probabilités totales pour une partition \\( \\{A, \\overline{A}\\} \\) ?",
        options: ["\\( P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) \\)", "\\( P(A \\cup B) = P(A) + P(B) \\)", "\\( P(A) = 1 - P(\\overline{A}) \\)", "\\( P(A \\cap B) = P(A) \\times P_A(B) \\)"],
        correct: "\\( P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) \\)",
        expl: "On calcule la probabilité globale de \\( B \\) en sommant ses intersections avec chaque élément de la partition."
    },
    {
        q: "Comment calcule-t-on la probabilité d'un chemin complet dans un arbre pondéré ?",
        options: ["En multipliant les probabilités des branches", "En additionnant les probabilités des branches", "En prenant la probabilité de la dernière branche", "En divisant les probabilités"],
        correct: "En multipliant les probabilités des branches",
        expl: "La probabilité de l'intersection correspond au produit des probabilités rencontrées le long du chemin."
    },
    {
        q: "Si \\( P(A) = 0,4 \\) et \\( P_A(B) = 0,5 \\), alors \\( P(A \\cap B) = \\) :",
        options: ["0,2", "0,9", "0,1", "1,25"],
        correct: "0,2",
        expl: "\\( P(A \\cap B) = P(A) \\times P_A(B) = 0,4 \\times 0,5 = 0,2 \\)."
    },
    {
        q: "Deux événements incompatibles (disjoints) sont-ils indépendants ?",
        options: ["Généralement non", "Oui, toujours", "Seulement si \\( P(A) = 0 \\)", "Toujours si \\( P(B) = 1 \\)"],
        correct: "Généralement non",
        expl: "S'ils sont incompatibles, savoir que l'un se produit nous informe que l'autre est impossible : ils sont donc très dépendants."
    },
    {
        q: "Sur la deuxième branche d'un arbre, après l'événement \\( A \\), on lit la probabilité :",
        options: ["\\( P_A(B) \\)", "\\( P(A \\cap B) \\)", "\\( P(B) \\)", "\\( P_B(A) \\)"],
        correct: "\\( P_A(B) \\)",
        expl: "Les branches de second niveau portent toujours des probabilités conditionnelles."
    },
    {
        q: "Si \\( A \\) et \\( B \\) sont indépendants, alors \\( P_B(A) \\) est égal à :",
        options: ["\\( P(A) \\)", "\\( P(B) \\)", "\\( P(A \\cap B) \\)", "1"],
        correct: "\\( P(A) \\)",
        expl: "Par définition de l'indépendance, la réalisation de \\( B \\) ne modifie pas la probabilité de \\( A \\)."
    },
    {
        q: "Une partition de l'univers \\( \\Omega \\) est un ensemble d'événements :",
        options: ["Disjoints dont la réunion est \\( \\Omega \\)", "Indépendants", "Quelconques", "Ayant tous la même probabilité"],
        correct: "Disjoints dont la réunion est \\( \\Omega \\)",
        expl: "Une partition 'découpe' l'univers en morceaux qui ne se chevauchent pas et qui forment le tout."
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