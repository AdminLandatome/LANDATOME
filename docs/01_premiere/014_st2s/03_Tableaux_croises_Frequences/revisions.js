const questionsData = [
    {
        q: "Dans un tableau croisé, comment appelle-t-on les totaux situés sur la dernière ligne ou la dernière colonne ?",
        options: ["Les effectifs marginaux", "Les effectifs conditionnels", "Les fréquences relatives", "Les variables"],
        correct: "Les effectifs marginaux",
        expl: "Ils représentent le total pour une seule variable, sans tenir compte de la seconde."
    },
    {
        q: "Pour calculer la proportion de femmes parmi les cadres, on divise l'effectif des femmes cadres par :",
        options: ["L'effectif total des cadres", "L'effectif total des femmes", "L'effectif total du groupe", "Le nombre de catégories"],
        correct: "L'effectif total des cadres",
        expl: "Le mot 'parmi' indique la population de référence (le dénominateur)."
    },
    {
        q: "Quelle est la formule correcte pour une fréquence \\( f \\) ?",
        options: ["\\( f = \\frac{n}{N} \\)", "\\( f = n \\times N \\)", "\\( f = N - n \\)", "\\( f = \\frac{N}{n} \\)"],
        correct: "\\( f = \\frac{n}{N} \\)",
        expl: "La fréquence est le rapport de l'effectif de la catégorie (n) sur l'effectif total (N)."
    },
    {
        q: "Dans un tableur, quelle formule permet d'additionner les cellules B2, B3 et B4 ?",
        options: ["=SOMME(B2:B4)", "SOMME(B2:B4)", "=B2+B4", "=ADDITION(B2:B4)"],
        correct: "=SOMME(B2:B4)",
        expl: "La fonction SOMME avec le signe ':' permet d'additionner toute une plage de cellules."
    },
    {
        q: "Si une fréquence est de 0,15, cela correspond à un pourcentage de :",
        options: ["15 %", "1,5 %", "0,15 %", "150 %"],
        correct: "15 %",
        expl: "Pour passer de la fréquence au pourcentage, on multiplie par 100."
    },
    {
        q: "Un tableau croisé étudie simultanément combien de variables ?",
        options: ["2", "1", "3", "Une infinité"],
        correct: "2",
        expl: "On croise deux caractères (ex: le sexe et la catégorie professionnelle)."
    },
    {
        q: "Pour calculer la fréquence marginale des hommes, on utilise :",
        options: ["Le total des hommes / Effectif total", "Le nombre d'hommes / Total des femmes", "Le total des hommes / Nombre de colonnes", "L'effectif total / Nombre d'hommes"],
        correct: "Le total des hommes / Effectif total",
        expl: "Une fréquence marginale se rapporte toujours à l'ensemble de la population étudiée."
    },
    {
        q: "Que signifie 'interpréter un nombre' dans un tableau de fréquences ?",
        options: ["Faire une phrase avec le contexte", "Donner sa définition mathématique", "Recopier le chiffre", "Le multiplier par 2"],
        correct: "Faire une phrase avec le contexte",
        expl: "Il faut préciser de quoi on parle (ex: '15 % des salariés sont des femmes cadres')."
    },
    {
        q: "Si on veut calculer la proportion de sportifs pratiquant le judo, la population de référence est :",
        options: ["L'ensemble des sportifs", "L'ensemble des judokas", "L'ensemble des non-sportifs", "Une seule personne"],
        correct: "L'ensemble des sportifs",
        expl: "On cherche la part que représentent les judokas au sein du groupe global des sportifs."
    },
    {
        q: "La somme de toutes les fréquences d'un tableau est toujours égale à :",
        options: ["1 (ou 100 %)", "0", "L'effectif total", "La moyenne"],
        correct: "1 (ou 100 %)",
        expl: "Le total des parts doit toujours reformer l'unité (le tout)."
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