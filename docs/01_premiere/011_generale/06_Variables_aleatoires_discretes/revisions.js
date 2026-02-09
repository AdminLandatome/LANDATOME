const questionsData = [
    {
        q: "Soit \\( X \\) une variable aléatoire sur \\( \\Omega \\). Mathématiquement, \\( X \\) est :",
        options: [
            "Une application de \\( \\Omega \\) vers \\( \\mathbb{R} \\)", 
            "Une probabilité", 
            "Un ensemble d'issues", 
            "Une variable inconnue dans une équation"
        ],
        correct: "Une application de \\( \\Omega \\) vers \\( \\mathbb{R} \\)",
        expl: "Par définition, \\( X \\) associe un nombre réel à chaque issue de l'univers."
    },
    {
        q: "Si \\( X \\) prend les valeurs \\( \\{x_1, x_2, ..., x_k\\} \\), que vaut \\( \\sum_{i=1}^{k} P(X = x_i) \\) ?",
        options: ["1", "0", "\\( k \\)", "\\( P(\\Omega) \\)"],
        correct: "1",
        expl: "La somme des probabilités de toutes les valeurs possibles de la variable aléatoire est égale à 1."
    },
    {
        q: "Soit la loi de probabilité de \\( X \\). Pour calculer \\( P(1 \\le X \\le 4) \\), on doit :",
        options: [
            "Sommer les probabilités \\( P(X=x_i) \\) pour toutes les valeurs \\( x_i \\) comprises entre 1 et 4 inclus", 
            "Calculer la différence \\( P(X=4) - P(X=1) \\)", 
            "Prendre la moyenne des probabilités entre 1 et 4", 
            "Multiplier les probabilités de chaque valeur entre 1 et 4"
        ],
        correct: "Sommer les probabilités \\( P(X=x_i) \\) pour toutes les valeurs \\( x_i \\) comprises entre 1 et 4 inclus",
        expl: "La probabilité d'un événement est la somme des probabilités des issues (ou valeurs) qui le composent."
    },
    {
        q: "Dans le tableau de l'exemple du cours, si \\( P(X=2) = 0,15 + 0,2 \\), cela signifie que :",
        options: [
            "Deux issues différentes ont pour image la valeur 2", 
            "La probabilité est supérieure à 1", 
            "La valeur 2 est impossible", 
            "Il y a une erreur dans le tableau"
        ],
        correct: "Deux issues différentes ont pour image la valeur 2",
        expl: "Plusieurs issues peuvent avoir la même image par \\( X \\). On additionne alors leurs probabilités individuelles."
    },
    {
        q: "Que signifie la notation \\( P(X \\in [a ; b]) \\) ?",
        options: [
            "La probabilité que \\( X \\) prenne une valeur entre \\( a \\) et \\( b \\) inclus", 
            "L'appartenance de la variable à l'intervalle", 
            "La moyenne entre \\( a \\) et \\( b \\)", 
            "Le calcul de \\( f(b) - f(a) \\)"
        ],
        correct: "La probabilité que \\( X \\) prenne une valeur entre \\( a \\) et \\( b \\) inclus",
        expl: "C'est la somme des probabilités des valeurs \\( x_i \\) du tableau situées dans cet intervalle."
    },
    {
        q: "Si \\( P(X \\le 3) = 0,7 \\), que vaut \\( P(X > 3) \\) ?",
        options: ["0,3", "0,7", "1", "Impossible à déterminer"],
        correct: "0,3",
        expl: "Il s'agit de l'événement contraire : \\( P(X > 3) = 1 - P(X \\le 3) = 1 - 0,7 = 0,3 \\)."
    },
    {
        q: "Comment définit-on la loi de probabilité d'une variable aléatoire \\( X \\) ?",
        options: [
            "En donnant chaque valeur \\( x_i \\) et sa probabilité \\( P(X=x_i) \\)", 
            "En calculant sa dérivée", 
            "En trouvant son ensemble de définition", 
            "En traçant une droite de régression"
        ],
        correct: "En donnant chaque valeur \\( x_i \\) et sa probabilité \\( P(X=x_i) \\)",
        expl: "La loi de probabilité est la distribution des probabilités sur l'ensemble des valeurs possibles de \\( X \\)."
    },
    {
        q: "Une issue \\( \\omega \\) peut-elle avoir plusieurs images par une même variable aléatoire \\( X \\) ?",
        options: [
            "Non, car \\( X \\) est une application", 
            "Oui, c'est le principe de l'aléatoire", 
            "Seulement si l'univers est infini", 
            "Seulement si \\( X \\) est constante"
        ],
        correct: "Non, car \\( X \\) est une application",
        expl: "Par définition d'une application (ou fonction), chaque élément de départ a une image UNIQUE."
    },
    {
        q: "Soit \\( P(X=x_1)=0,2 \\), \\( P(X=x_2)=0,5 \\). Quelle est la probabilité \\( P(X=x_3) \\) si ce sont les seules valeurs ?",
        options: ["0,3", "0,7", "1", "0,1"],
        correct: "0,3",
        expl: "La somme doit être 1 : \\( 1 - (0,2 + 0,5) = 0,3 \\)."
    },
    {
        q: "L'univers \\( \\Omega \\) dans ce cours est supposé :",
        options: ["Fini", "Infini", "Continu", "Vide"],
        correct: "Fini",
        expl: "Le livret précise dès l'introduction 'Soit \\( \\Omega \\) un univers fini'."
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