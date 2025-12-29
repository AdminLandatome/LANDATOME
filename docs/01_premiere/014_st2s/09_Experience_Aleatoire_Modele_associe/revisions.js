const questionsData = [
    {
        q: "Que signifie le terme 'épreuves indépendantes' ?",
        options: [
            "Le résultat d'une épreuve ne modifie pas les probabilités de la suivante", 
            "Les deux épreuves se passent en même temps", 
            "Les probabilités sont toutes égales (équiprobabilité)", 
            "On ne peut pas faire d'arbre"
        ],
        correct: "Le résultat d'une épreuve ne modifie pas les probabilités de la suivante",
        expl: "C'est le cas typique du tirage avec remise : l'urne revient à son état initial à chaque fois."
    },
    {
        q: "Dans un arbre pondéré, la somme des probabilités des branches issues d'un même nœud est égale à :",
        options: ["1", "0", "0,5", "Le nombre de branches"],
        correct: "1",
        expl: "C'est une règle d'or : toutes les issues possibles à partir d'un point doivent totaliser 100% (soit 1)."
    },
    {
        q: "Pour calculer la probabilité d'une issue au bout d'un chemin, on doit :",
        options: [
            "Multiplier les probabilités des branches du chemin", 
            "Additionner les probabilités des branches du chemin", 
            "Soustraire les probabilités", 
            "Prendre la moyenne"
        ],
        correct: "Multiplier les probabilités des branches du chemin",
        expl: "On applique la règle de multiplication le long des branches pour les épreuves successives."
    },
    {
        q: "On lance deux fois une pièce équilibrée. Quelle est la probabilité d'obtenir deux fois Pile (P,P) ?",
        options: ["\\( 1/4 \\)", "\\( 1/2 \\)", "\\( 1/8 \\)", "\\( 1 \\)"],
        correct: "\\( 1/4 \\)",
        expl: "\\( P(P) \\times P(P) = 1/2 \\times 1/2 = 1/4 \\)."
    },
    {
        q: "Dans un lot, 97% des plats sont conformes. On prélève 3 plats avec remise. La probabilité que les 3 soient conformes est :",
        options: ["\\( 0,97^3 \\)", "\\( 0,97 \\times 3 \\)", "\\( 0,97 + 0,97 + 0,97 \\)", "\\( 1 - 0,97 \\)"],
        correct: "\\( 0,97^3 \\)",
        expl: "L'événement est (Conforme, Conforme, Conforme), soit \\( 0,97 \\times 0,97 \\times 0,97 \\)."
    },
    {
        q: "Si un arbre possède 3 épreuves à 2 issues chacune, combien y a-t-il de chemins au total ?",
        options: ["8", "6", "5", "9"],
        correct: "8",
        expl: "\\( 2 \\times 2 \\times 2 = 2^3 = 8 \\) chemins possibles."
    },
    {
        q: "La probabilité d'avoir un garçon est 0,515. Quelle est celle d'avoir une fille ?",
        options: ["0,485", "0,515", "0,500", "1,515"],
        correct: "0,485",
        expl: "\\( 1 - 0,515 = 0,485 \\). C'est l'événement contraire."
    },
    {
        q: "Si plusieurs chemins de l'arbre réalisent un événement E, la probabilité de E est :",
        options: [
            "La somme des probabilités de ces chemins", 
            "Le produit des probabilités de ces chemins", 
            "La plus grande probabilité parmi ces chemins", 
            "Toujours égale à 1"
        ],
        correct: "La somme des probabilités de ces chemins",
        expl: "On additionne les probabilités des différentes routes qui mènent au succès de l'événement."
    },
    {
        q: "Un tirage 'sans remise' est-il une succession d'épreuves indépendantes ?",
        options: [
            "Non, car la composition de l'urne change", 
            "Oui, car c'est du hasard", 
            "Seulement s'il y a beaucoup de boules", 
            "On ne peut pas savoir"
        ],
        correct: "Non, car la composition de l'urne change",
        expl: "Sans remise, la probabilité du second tirage dépend de ce qui a été tiré au premier."
    },
    {
        q: "Dans l'exercice 1, la probabilité de tirer une boule Noire est 5/10. Si on fait 3 tirages, la probabilité (N, N, N) est :",
        options: ["0,125", "0,5", "1,5", "0,15"],
        correct: "0,125",
        expl: "\\( 0,5 \\times 0,5 \\times 0,5 = 0,125 \\) (ou \\( 1/8 \\))."
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