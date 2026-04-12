const questionsData = [
    {
        q: "Un vecteur \\( \\vec{n} \\) est dit normal à une droite (d) si :",
        options: [
            "Il est orthogonal à tout vecteur directeur de (d)", 
            "Il est colinéaire à un vecteur directeur de (d)", 
            "Sa norme est égale à 1", 
            "Il passe par l'origine du repère"
        ],
        correct: "Il est orthogonal à tout vecteur directeur de (d)",
        expl: "Par définition, un vecteur normal est perpendiculaire à la direction de la droite[cite: 84, 86]."
    },
    {
        q: "Si une droite a pour équation cartésienne \\( ax + by + c = 0 \\), un vecteur normal est :",
        options: ["\\( \\vec{n}(a; b) \\)", "\\( \\vec{n}(-b; a) \\)", "\\( \\vec{n}(b; -a) \\)", "\\( \\vec{n}(-a; -c) \\)"],
        correct: "\\( \\vec{n}(a; b) \\)",
        expl: "Les coefficients 'a' et 'b' de l'équation cartésienne correspondent directement aux coordonnées d'un vecteur normal[cite: 6]."
    },
    {
        q: "Déterminer un vecteur normal à la droite d'équation \\( -2x + 7y = 0 \\) :",
        options: ["\\( \\vec{n}(-2; 7) \\)", "\\( \\vec{n}(7; 2) \\)", "\\( \\vec{n}(2; 7) \\)", "\\( \\vec{n}(7; -2) \\)"],
        correct: "\\( \\vec{n}(-2; 7) \\)",
        expl: "On lit les coefficients de x et y : a = -2 et b = 7[cite: 381]."
    },
    {
        q: "Pour la droite d'équation réduite \\( y = -5x + 2 \\), un vecteur normal est :",
        options: ["\\( \\vec{n}(5; 1) \\)", "\\( \\vec{n}(-5; 2) \\)", "\\( \\vec{n}(1; -5) \\)", "\\( \\vec{n}(5; -2) \\)"],
        correct: "\\( \\vec{n}(5; 1) \\)",
        expl: "L'équation se réécrit \\( 5x + y - 2 = 0 \\), donc un vecteur normal est (5; 1)[cite: 382]."
    },
    {
        q: "Quel est un vecteur normal à la droite d'équation \\( x = 3 \\) ?",
        options: ["\\( \\vec{n}(1; 0) \\)", "\\( \\vec{n}(0; 1) \\)", "\\( \\vec{n}(3; 0) \\)", "\\( \\vec{n}(1; 3) \\)"],
        correct: "\\( \\vec{n}(1; 0) \\)",
        expl: "L'équation est \\( 1x + 0y - 3 = 0 \\), d'où le vecteur (1; 0)[cite: 382]."
    },
    {
        q: "Soient \\( C(-2;2) \\) et \\( D(-3;5) \\). Un vecteur normal à la droite (CD) est :",
        options: ["\\( \\vec{n}(3; 1) \\)", "\\( \\vec{n}(-1; 3) \\)", "\\( \\vec{n}(3; -1) \\)", "\\( \\vec{n}(1; 3) \\)"],
        correct: "\\( \\vec{n}(3; 1) \\)",
        expl: "Le vecteur directeur \\( \\vec{CD} \\) a pour coordonnées (-1; 3). Un vecteur orthogonal est donc (3; 1) car \\( -1\\times3 + 3\\times1 = 0 \\)[cite: 383]."
    },
    {
        q: "L'équation cartésienne de la droite passant par \\( K(-3;1) \\) avec \\( \\vec{n}(7;2) \\) est :",
        options: [
            "\\( 7x + 2y + 19 = 0 \\)", 
            "\\( 7x + 2y - 19 = 0 \\)", 
            "\\( 2x - 7y + 13 = 0 \\)", 
            "\\( 7x + 2y + 5 = 0 \\)"
        ],
        correct: "\\( 7x + 2y + 19 = 0 \\)",
        expl: "On utilise \\( 7(x - (-3)) + 2(y - 1) = 0 \\), ce qui donne \\( 7x + 21 + 2y - 2 = 0 \\)[cite: 376]."
    },
    {
        q: "L'équation du cercle de centre \\( C(-2;3) \\) et de rayon \\( \\sqrt{7} \\) est :",
        options: [
            "\\( (x+2)^2 + (y-3)^2 = 7 \\)", 
            "\\( (x-2)^2 + (y+3)^2 = 7 \\)", 
            "\\( (x+2)^2 + (y-3)^2 = \\sqrt{7} \\)", 
            "\\( x^2 + y^2 = 7 \\)"
        ],
        correct: "\\( (x+2)^2 + (y-3)^2 = 7 \\)",
        expl: "La formule est \\( (x-x_C)^2 + (y-y_C)^2 = R^2 \\)[cite: 572]."
    },
    {
        q: "Le centre du cercle d'équation \\( x^2 + 8x + y^2 + 2y + 7 = 0 \\) est :",
        options: ["\\( I(-4; -1) \\)", "\\( I(4; 1) \\)", "\\( I(-8; -2) \\)", "\\( I(4; -1) \\)"],
        correct: "\\( I(-4; -1) \\)",
        expl: "En complétant les carrés : \\( (x+4)^2 - 16 + (y+1)^2 - 1 + 7 = 0 \\), soit \\( (x+4)^2 + (y+1)^2 = 10 \\)[cite: 562]."
    },
    {
        q: "Quel est le rayon du cercle d'équation \\( (x+7)^2 + (y-2)^2 = 16 \\) ?",
        options: ["4", "16", "\\( \\sqrt{7} \\)", "2"],
        correct: "4",
        expl: "Le membre de droite est \\( R^2 \\), donc \\( R = \\sqrt{16} = 4 \\)[cite: 568]."
    },
    {
        q: "Le point \\( M(-11; 2) \\) appartient-il au cercle \\( (x+7)^2 + (y-2)^2 = 16 \\) ?",
        options: ["Oui", "Non", "Seulement si x > 0", "On ne peut pas savoir"],
        correct: "Oui",
        expl: "\\( (-11+7)^2 + (2-2)^2 = (-4)^2 + 0 = 16 \\). L'égalité est vérifiée[cite: 569]."
    },
    {
        q: "L'ensemble des points M tels que \\( \\vec{MA} \\cdot \\vec{MB} = 0 \\) est :",
        options: [
            "Le cercle de diamètre [AB]", 
            "La médiatrice de [AB]", 
            "Le milieu de [AB]", 
            "Une droite passant par A"
        ],
        correct: "Le cercle de diamètre [AB]",
        expl: "C'est la caractérisation du cercle par le produit scalaire[cite: 560]."
    },
    {
        q: "Si deux droites sont perpendiculaires, leurs vecteurs normaux respectifs sont :",
        options: ["Orthogonaux", "Colinéaires", "Égaux", "De même norme"],
        correct: "Orthogonaux",
        expl: "La perpendicularité des droites implique celle de leurs vecteurs normaux[cite: 807]."
    },
    {
        q: "Pour trouver le projeté orthogonal H d'un point A sur une droite (d), on cherche :",
        options: [
            "L'intersection de (d) et de la perpendiculaire à (d) passant par A", 
            "Le milieu du segment entre A et la droite", 
            "Le point de (d) le plus éloigné de A", 
            "L'intersection de (d) avec l'axe des abscisses"
        ],
        correct: "L'intersection de (d) et de la perpendiculaire à (d) passant par A",
        expl: "H est le point de la droite (d) tel que (AH) est perpendiculaire à (d)[cite: 739, 743]."
    },
    {
        q: "Un vecteur normal à la droite \\( y = 3 \\) est :",
        options: ["\\( \\vec{n}(0; 1) \\)", "\\( \\vec{n}(1; 0) \\)", "\\( \\vec{n}(0; 3) \\)", "\\( \\vec{n}(3; 1) \\)"],
        correct: "\\( \\vec{n}(0; 1) \\)",
        expl: "L'équation est \\( 0x + 1y - 3 = 0 \\). Le vecteur normal est donc (0; 1)[cite: 13]."
    },
    {
        q: "Si \\( x^2 + 14x + y^2 - 6y + 58 = 0 \\), l'ensemble est :",
        options: ["Un point unique", "Un cercle de rayon 58", "Une droite", "L'ensemble vide"],
        correct: "Un point unique",
        expl: "L'équation se réduit à \\( (x+7)^2 + (y-3)^2 = 0 \\), ce qui n'est possible que pour le point (-7; 3)[cite: 617]."
    },
    {
        q: "La distance d'un point A à une droite (d) est égale à :",
        options: ["La longueur AH, où H est le projeté orthogonal de A sur (d)", "La longueur de n'importe quel segment reliant A à (d)", "La valeur du coefficient 'c' de la droite", "La norme du vecteur normal"],
        correct: "La longueur AH, où H est le projeté orthogonal de A sur (d)",
        expl: "C'est la plus courte distance entre le point et la droite[cite: 740, 809]."
    },
    {
        q: "Dans un repère orthonormé, la distance entre \\( A(x_A; y_A) \\) et \\( B(x_B; y_B) \\) est :",
        options: ["\\( \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2} \\)", "\\( (x_B-x_A) + (y_B-y_A) \\)", "\\( (x_B+x_A)^2 + (y_B+y_A)^2 \\)", "\\( \\sqrt{x_B^2 + y_B^2} \\)"],
        correct: "\\( \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2} \\)",
        expl: "C'est la formule classique de la distance entre deux points[cite: 735]."
    },
    {
        q: "L'intersection d'un cercle et d'une droite peut contenir au maximum :",
        options: ["2 points", "1 point", "Une infinité de points", "Aucun point"],
        correct: "2 points",
        expl: "Une droite peut être sécante (2 points), tangente (1 point) ou extérieure (0 point) au cercle."
    },
    {
        q: "Si un vecteur directeur est \\( \\vec{u}(-b; a) \\), un vecteur normal est \\( \\vec{n}(a; b) \\) car :",
        options: ["Leur produit scalaire est nul", "Ils sont colinéaires", "Leurs normes sont égales à 1", "Ils ont la même direction"],
        correct: "Leur produit scalaire est nul",
        expl: "\\( (-b)\\times a + a\\times b = -ab + ab = 0 \\)[cite: 9]."
    }
];

// --- LOGIQUE DE TIRAGE ALÉATOIRE ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// On mélange les 20 questions et on en prend 10
const selectedQuestions = shuffleArray([...questionsData]).slice(0, 10);

// --- AFFICHAGE ---

const quizContainer = document.getElementById('quiz');

selectedQuestions.forEach((item, index) => {
    // ON MÉLANGE AUSSI LES OPTIONS POUR CETTE QUESTION
    const shuffledOptions = shuffleArray([...item.options]);
    
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    qDiv.innerHTML = `
        <p><strong>Question ${index + 1} :</strong> ${item.q}</p>
        <ul class="options-list">
            ${shuffledOptions.map(opt => `
                <li>
                    <label>
                        <input type="radio" name="q${index}" value="${opt.replace(/"/g, '&quot;')}"> ${opt}
                    </label>
                </li>
            `).join('')}
        </ul>`;
    quizContainer.appendChild(qDiv);
});

if (window.MathJax) {
    MathJax.typesetPromise();
}

// --- SCORE ---

function calculateScore() {
    let score = 0;
    let correctionHtml = "<h3>Détails de la correction :</h3>";

    selectedQuestions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
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
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}