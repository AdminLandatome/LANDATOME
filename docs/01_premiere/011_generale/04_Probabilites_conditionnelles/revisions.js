const questionsData = [
    {
        q: "Quelle est la formule correcte de la probabilité conditionnelle P_B(A) ?",
        options: ["P(A ∩ B) / P(B)", "P(A ∩ B) / P(A)", "P(A) * P(B)", "P(A ∪ B) / P(B)"],
        correct: "P(A ∩ B) / P(B)",
        expl: "La probabilité de A sachant B est le rapport de l'intersection sur la probabilité de la condition (B)."
    },
    {
        q: "Si deux événements A et B sont indépendants, alors P(A ∩ B) est égal à :",
        options: ["P(A) * P(B)", "P(A) + P(B)", "0", "P_B(A)"],
        correct: "P(A) * P(B)",
        expl: "C'est la définition mathématique de l'indépendance."
    },
    {
        q: "Dans un arbre pondéré, la somme des probabilités des branches issues d'un même nœud est égale à :",
        options: ["1", "0,5", "P(Ω)", "La probabilité du nœud précédent"],
        correct: "1",
        expl: "C'est la loi des nœuds : les événements issus d'un nœud forment une partition de l'événement précédent."
    },
    {
        q: "Que signifie la formule des probabilités totales ?",
        options: ["P(B) = P(A ∩ B) + P(Ā ∩ B)", "P(A ∪ B) = P(A) + P(B)", "P(A) = 1 - P(Ā)", "P(A ∩ B) = P(A) * P(B)"],
        correct: "P(B) = P(A ∩ B) + P(Ā ∩ B)",
        expl: "Elle permet de calculer la probabilité d'un événement en sommant ses intersections avec une partition de l'univers."
    },
    {
        q: "Deux événements incompatibles (disjoints) sont-ils forcément indépendants ?",
        options: ["Non, c'est souvent le contraire", "Oui, toujours", "Seulement si l'un est impossible", "Seulement si P(A) = 0,5"],
        correct: "Non, c'est souvent le contraire",
        expl: "S'ils sont incompatibles, savoir que l'un se produit donne une information majeure (l'autre ne peut pas se produire), donc ils ne sont pas indépendants."
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
}