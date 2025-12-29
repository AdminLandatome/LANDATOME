const questionsData = [
    {
        q: "Si pour passer d'un terme au suivant on ajoute toujours 3, la suite est :",
        options: ["Arithmétique", "Géométrique", "Constante", "Aléatoire"],
        correct: "Arithmétique",
        expl: "Une suite arithmétique progresse par l'addition (ou soustraction) d'un même nombre appelé raison."
    },
    {
        q: "Dans la suite d'allumettes 4 ; 7 ; 10 ; 13..., quelle est la raison ?",
        options: ["3", "4", "1", "7"],
        correct: "3",
        expl: "On passe d'un terme au suivant en ajoutant 3 (\\( 4+3=7 \\), \\( 7+3=10 \\), etc.)."
    },
    {
        q: "Soit \\( u_n \\) une suite. Que désigne le symbole \\( n \\) ?",
        options: ["Le rang (ou numéro) du terme", "La valeur du terme", "La raison", "Le premier terme"],
        correct: "Le rang (ou numéro) du terme",
        expl: "\\( n \\) est l'indice qui permet de numéroter les étapes."
    },
    {
        q: "Si \\( u_n = 5n + 2 \\), quelle est la valeur de \\( u_0 \\) ?",
        options: ["2", "5", "7", "0"],
        correct: "2",
        expl: "\\( u_0 = 5 \\times 0 + 2 = 2 \\)."
    },
    {
        q: "Une suite géométrique de raison \\( q = 2 \\) progresse par :",
        options: ["Multiplication par 2", "Addition de 2", "Division par 2", "Soustraction de 2"],
        correct: "Multiplication par 2",
        expl: "Géométrique signifie que l'on multiplie chaque terme par la raison."
    },
    {
        q: "La suite définie par \\( v_{n+1} = v_n - 4 \\) est une suite :",
        options: ["Arithmétique de raison -4", "Arithmétique de raison 4", "Géométrique de raison -4", "Décroissante par multiplication"],
        correct: "Arithmétique de raison -4",
        expl: "On retranche 4 à chaque étape, c'est donc une suite arithmétique de raison négative."
    },
    {
        q: "Si \\( u_1 = 10 \\) et la raison est \\( r = 5 \\), que vaut \\( u_2 \\) ?",
        options: ["15", "50", "5", "20"],
        correct: "15",
        expl: "\\( u_2 = u_1 + r = 10 + 5 = 15 \\)."
    },
    {
        q: "Dans un tableur, pour calculer \\( u_{n+1} \\) à partir de \\( u_n \\) situé en A2, on écrit :",
        options: ["=A2 + raison", "A2 + raison", "=A3 + raison", "Suite(A2)"],
        correct: "=A2 + raison",
        expl: "Toute formule de tableur doit commencer par le signe '='."
    },
    {
        q: "Que signifie 'conjecturer la nature d'une suite' ?",
        options: ["Faire une supposition", "Prouver par le calcul", "Tracer un graphique", "Recopier l'énoncé"],
        correct: "Faire une supposition",
        expl: "C'est proposer une hypothèse (ex: 'elle semble arithmétique') avant de la démontrer."
    },
    {
        q: "Une suite qui diminue de 10% à chaque étape est une suite :",
        options: ["Géométrique", "Arithmétique", "Constante", "Linéaire"],
        correct: "Géométrique",
        expl: "Une évolution en pourcentage correspond à une multiplication (ici par 0,90), donc une suite géométrique."
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