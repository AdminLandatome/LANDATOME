const questionsData = [
    {
        q: "Quelle est l'expression du produit scalaire \\( \\vec{u} \\cdot \\vec{v} \\) avec l'angle \\( \\theta \\) ?",
        options: ["\\( \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos \\theta \\)", "\\( \\|\\vec{u}\\| \\|\\vec{v}\\| \\sin \\theta \\)", "\\( \\|\\vec{u}\\| + \\|\\vec{v}\\| + \\cos \\theta \\)", "\\( \\|\\vec{u}\\| \\|\\vec{v}\\| \\)"],
        correct: "\\( \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos \\theta \\)",
        expl: "C'est la définition fondamentale du produit scalaire utilisant le cosinus de l'angle entre les vecteurs."
    },
    {
        q: "Dans un repère orthonormé, si \\( \\vec{u}(x;y) \\) et \\( \\vec{v}(x';y') \\), alors \\( \\vec{u} \\cdot \\vec{v} = \\) ?",
        options: ["\\( xx' + yy' \\)", "\\( xy' + yx' \\)", "\\( xx' - yy' \\)", "\\( \\sqrt{x^2 + y^2} \\)"],
        correct: "\\( xx' + yy' \\)",
        expl: "Il s'agit de la formule analytique du produit scalaire dans une base orthonormée."
    },
    {
        q: "Deux vecteurs non nuls sont orthogonaux si et seulement si :",
        options: ["Leur produit scalaire est nul", "Leur produit scalaire est égal à 1", "Ils sont colinéaires", "Leurs normes sont égales"],
        correct: "Leur produit scalaire est nul",
        expl: "L'orthogonalité correspond à un angle de 90°, et \\( \\cos(90^\\circ) = 0 \\)."
    },
    {
        q: "Si \\( \\vec{u} \\) et \\( \\vec{v} \\) sont colinéaires et de sens contraire, alors \\( \\vec{u} \\cdot \\vec{v} = \\) ?",
        options: ["\\( -\\|\\vec{u}\\| \\|\\vec{v}\\| \\)", "\\( \\|\\vec{u}\\| \\|\\vec{v}\\| \\)", "0", "1"],
        correct: "\\( -\\|\\vec{u}\\| \\|\\vec{v}\\| \\)",
        expl: "L'angle entre eux est de \\( \\pi \\) radians (180°), et \\( \\cos(\\pi) = -1 \\)."
    },
    {
        q: "Le carré scalaire \\( \\vec{u}^2 \\) est égal à :",
        options: ["\\( \\|\\vec{u}\\|^2 \\)", "\\( 2\\|\\vec{u}\\| \\)", "0", "\\( \\vec{u} \\)"],
        correct: "\\( \\|\\vec{u}\\|^2 \\)",
        expl: "Par définition, \\( \\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\| \\times \\|\\vec{u}\\| \\times \\cos(0) = \\|\\vec{u}\\|^2 \\)."
    },
    {
        q: "Soit H le projeté orthogonal de C sur (AB). Si \\( \\vec{AB} \\) et \\( \\vec{AH} \\) sont de même sens, alors \\( \\vec{AB} \\cdot \\vec{AC} = \\) ?",
        options: ["\\( AB \\times AH \\)", "\\( -AB \\times AH \\)", "0", "\\( AB + AH \\)"],
        correct: "\\( AB \\times AH \\)",
        expl: "C'est la définition du produit scalaire par projection orthogonale."
    },
    {
        q: "Dans un triangle ABC, le théorème d'Al-Kashi énonce que \\( BC^2 = \\) ?",
        options: ["\\( AB^2 + AC^2 - 2 AB \\cdot AC \\cos \\hat{A} \\)", "\\( AB^2 + AC^2 \\)", "\\( AB^2 + AC^2 + 2 AB \\cdot AC \\cos \\hat{A} \\)", "\\( (AB+AC)^2 \\)"],
        correct: "\\( AB^2 + AC^2 - 2 AB \\cdot AC \\cos \\hat{A} \\)",
        expl: "Al-Kashi est une généralisation du théorème de Pythagore pour n'importe quel triangle."
    },
    {
        q: "L'ensemble des points M tels que \\( \\vec{MA} \\cdot \\vec{MB} = 0 \\) est :",
        options: ["Le cercle de diamètre [AB]", "La médiatrice de [AB]", "Le milieu de [AB]", "Une droite perpendiculaire à (AB)"],
        correct: "Le cercle de diamètre [AB]",
        expl: "Cela signifie que le triangle AMB est rectangle en M, donc M appartient au cercle de diamètre [AB]."
    },
    {
        q: "Si I est le milieu de [AB], alors \\( \\vec{MA} \\cdot \\vec{MB} = \\) ?",
        options: ["\\( MI^2 - \\frac{1}{4}AB^2 \\)", "\\( MI^2 + \\frac{1}{4}AB^2 \\)", "\\( MI^2 - AB^2 \\)", "\\( MA^2 + MB^2 \\)"],
        correct: "\\( MI^2 - \\frac{1}{4}AB^2 \\)",
        expl: "C'est le théorème de la médiane appliqué au produit scalaire."
    },
    {
        q: "L'équation d'un cercle de centre \\( I(x_I; y_I) \\) et de rayon \\( r \\) est :",
        options: ["\\( (x-x_I)^2 + (y-y_I)^2 = r^2 \\)", "\\( (x+x_I)^2 + (y+y_I)^2 = r^2 \\)", "\\( x^2 + y^2 = r^2 \\)", "\\( (x-x_I) + (y-y_I) = r \\)"],
        correct: "\\( (x-x_I)^2 + (y-y_I)^2 = r^2 \\)",
        expl: "C'est la traduction analytique de la distance \\( IM = r \\)."
    },
    {
        q: "Calculer \\( \\vec{u} \\cdot \\vec{v} \\) avec \\( \\vec{u}(1; 2) \\) et \\( \\vec{v}(3; -1) \\) :",
        options: ["1", "5", "7", "-1"],
        correct: "1",
        expl: "\\( 1 \\times 3 + 2 \\times (-1) = 3 - 2 = 1 \\)."
    },
    {
        q: "Dans un triangle ABC, \\( \\vec{AB} \\cdot \\vec{AC} \\) est aussi égal à :",
        options: ["\\( \\frac{1}{2}(AB^2 + AC^2 - BC^2) \\)", "\\( AB^2 + AC^2 - BC^2 \\)", "\\( AB \\times AC \\)", "\\( \\frac{1}{2}(AB^2 + AC^2 + BC^2) \\)"],
        correct: "\\( \\frac{1}{2}(AB^2 + AC^2 - BC^2) \\)",
        expl: "C'est la forme polaire du produit scalaire utilisant les longueurs des côtés du triangle."
    },
    {
        q: "Le produit scalaire est-il distributif par rapport à l'addition ?",
        options: ["Oui, \\( \\vec{u} \\cdot (\\vec{v}+\\vec{w}) = \\vec{u}\\cdot\\vec{v} + \\vec{u}\\cdot\\vec{w} \\)", "Non", "Seulement si les vecteurs sont orthogonaux", "Seulement dans un repère orthonormé"],
        correct: "Oui, \\( \\vec{u} \\cdot (\\vec{v}+\\vec{w}) = \\vec{u}\\cdot\\vec{v} + \\vec{u}\\cdot\\vec{w} \\)",
        expl: "Le produit scalaire est bilinéaire, donc distributif."
    },
    {
        q: "Un vecteur normal à la droite d'équation \\( 3x - 4y + 5 = 0 \\) est :",
        options: ["\\( \\vec{n}(3; -4) \\)", "\\( \\vec{n}(4; 3) \\)", "\\( \\vec{n}(-4; 3) \\)", "\\( \\vec{n}(3; 4) \\)"],
        correct: "\\( \\vec{n}(3; -4) \\)",
        expl: "Pour une droite \\( ax+by+c=0 \\), le vecteur \\( \\vec{n}(a;b) \\) est normal à la droite."
    },
    {
        q: "Deux droites de coefficients directeurs \\( m \\) et \\( m' \\) sont perpendiculaires si :",
        options: ["\\( m \\times m' = -1 \\)", "\\( m = m' \\)", "\\( m \\times m' = 1 \\)", "\\( m + m' = 0 \\)"],
        correct: "\\( m \\times m' = -1 \\)",
        expl: "C'est la condition de perpendicularité liée aux pentes des droites."
    },
    {
        q: "Développez \\( (\\vec{u} + \\vec{v})^2 \\) :",
        options: ["\\( \\|\\vec{u}\\|^2 + 2\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2 \\)", "\\( \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 \\)", "\\( \\vec{u}^2 + \\vec{v}^2 \\)", "\\( \\|\\vec{u}\\|^2 + \\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2 \\)"],
        correct: "\\( \\|\\vec{u}\\|^2 + 2\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2 \\)",
        expl: "C'est l'identité remarquable appliquée aux vecteurs."
    },
    {
        q: "En physique, le travail \\( W \\) d'une force \\( \\vec{F} \\) constante sur un trajet [AB] est :",
        options: ["\\( \\vec{F} \\cdot \\vec{AB} \\)", "\\( \\|\\vec{F}\\| / AB \\)", "\\( \\vec{F} + \\vec{AB} \\)", "\\( \\|\\vec{F}\\| \\times AB \\)"],
        correct: "\\( \\vec{F} \\cdot \\vec{AB} \\)",
        expl: "Le travail est le produit scalaire de la force par le vecteur déplacement."
    },
    {
        q: "Si \\( \\vec{u} \\cdot \\vec{v} = 5 \\), alors \\( (2\\vec{u}) \\cdot (3\\vec{v}) = \\) ?",
        options: ["30", "10", "15", "5"],
        correct: "30",
        expl: "On utilise la bilinéarité : \\( 2 \\times 3 \\times (\\vec{u} \\cdot \\vec{v}) = 6 \\times 5 = 30 \\)."
    },
    {
        q: "Que vaut \\( \\vec{u} \\cdot \\vec{v} \\) si \\( \\|\\vec{u}\\|=5 \\), \\( \\|\\vec{v}\\|=2 \\) et l'angle est 60° ?",
        options: ["5", "10", "\\( 5\\sqrt{3} \\)", "0"],
        correct: "5",
        expl: "\\( 5 \\times 2 \\times \\cos(60^\\circ) = 10 \\times 0,5 = 5 \\)."
    },
    {
        q: "Si ABCD est un rectangle, le produit scalaire \\( \\vec{AB} \\cdot \\vec{AD} \\) est :",
        options: ["0", "\\( AB \\times AD \\)", "1", "Inconnu"],
        correct: "0",
        expl: "Dans un rectangle, les côtés adjacents sont perpendiculaires."
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