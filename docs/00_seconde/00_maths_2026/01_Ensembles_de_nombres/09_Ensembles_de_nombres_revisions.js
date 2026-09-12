const questionsData = [
    // --- NOTATIONS DE BASE ---
    {
        q: "Comment note-t-on l'ensemble des nombres entiers naturels ?",
        options: ["\\( \\mathbb{N} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{R} \\)"],
        correct: "\\( \\mathbb{N} \\)",
        expl: "L'ensemble des entiers naturels {0 ; 1 ; 2 ; 3 ; ...} se note ℕ."
    },
    {
        q: "Comment note-t-on l'ensemble des nombres entiers relatifs ?",
        options: ["\\( \\mathbb{Z} \\)", "\\( \\mathbb{N} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{Q} \\)"],
        correct: "\\( \\mathbb{Z} \\)",
        expl: "L'ensemble {...;−2;−1;0;1;2;...} se note ℤ (de l'allemand « zahl »)."
    },
    {
        q: "Comment note-t-on l'ensemble des nombres décimaux ?",
        options: ["\\( \\mathbb{D} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{R} \\)"],
        correct: "\\( \\mathbb{D} \\)",
        expl: "Les nombres décimaux, qui s'écrivent avec un nombre fini de chiffres après la virgule, forment l'ensemble 𝔻."
    },
    {
        q: "Comment note-t-on l'ensemble des nombres rationnels ?",
        options: ["\\( \\mathbb{Q} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{R} \\)", "\\( \\mathbb{N} \\)"],
        correct: "\\( \\mathbb{Q} \\)",
        expl: "ℚ vient du mot italien « quoziente » qui signifie « quotient »."
    },
    {
        q: "Comment note-t-on l'ensemble des nombres réels ?",
        options: ["\\( \\mathbb{R} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{C} \\)", "\\( \\mathbb{D} \\)"],
        correct: "\\( \\mathbb{R} \\)",
        expl: "L'ensemble des réels, qui contient tous les rationnels et les irrationnels, se note ℝ."
    },
    {
        q: "Comment note-t-on l'ensemble des nombres complexes ?",
        options: ["\\( \\mathbb{C} \\)", "\\( \\mathbb{R} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{Z} \\)"],
        correct: "\\( \\mathbb{C} \\)",
        expl: "L'ensemble des nombres complexes, contenant notamment le nombre i, se note ℂ."
    },
    {
        q: "Un nombre décimal peut toujours s'écrire sous la forme :",
        options: [
            "\\( \\dfrac{a}{10^n} \\) avec \\( a \\in \\mathbb{Z} \\) et \\( n \\in \\mathbb{N} \\)",
            "\\( \\dfrac{a}{b} \\) avec \\( a \\in \\mathbb{Z} \\) et \\( b \\in \\mathbb{Z}^* \\)",
            "\\( a + n \\) avec \\( a, n \\in \\mathbb{Z} \\)",
            "\\( \\sqrt{a} \\) avec \\( a \\in \\mathbb{N} \\)"
        ],
        correct: "\\( \\dfrac{a}{10^n} \\) avec \\( a \\in \\mathbb{Z} \\) et \\( n \\in \\mathbb{N} \\)",
        expl: "C'est la définition d'un nombre décimal : un quotient d'un entier relatif par une puissance de 10."
    },
    {
        q: "Un nombre rationnel peut toujours s'écrire sous la forme :",
        options: [
            "\\( \\dfrac{a}{b} \\) avec \\( a \\in \\mathbb{Z} \\) et \\( b \\in \\mathbb{Z}^* \\)",
            "\\( \\dfrac{a}{10^n} \\) avec \\( a \\in \\mathbb{Z} \\) et \\( n \\in \\mathbb{N} \\)",
            "\\( a \\times b \\) avec \\( a, b \\in \\mathbb{N} \\)",
            "\\( a^2 \\) avec \\( a \\in \\mathbb{Q} \\)"
        ],
        correct: "\\( \\dfrac{a}{b} \\) avec \\( a \\in \\mathbb{Z} \\) et \\( b \\in \\mathbb{Z}^* \\)",
        expl: "C'est la définition d'un nombre rationnel : un quotient de deux entiers relatifs, le dénominateur étant non nul."
    },
    {
        q: "\\( b \\in \\mathbb{Z}^* \\) signifie que :",
        options: [
            "b est un entier relatif non nul",
            "b est un entier naturel non nul",
            "b est un rationnel positif",
            "b est un décimal quelconque"
        ],
        correct: "b est un entier relatif non nul",
        expl: "L'étoile signale que l'on exclut 0 de l'ensemble concerné, ici ℤ."
    },

    // --- INCLUSIONS ---
    {
        q: "Quelle est la chaîne d'inclusions correcte entre ces ensembles de nombres ?",
        options: [
            "\\( \\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C} \\)",
            "\\( \\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{R} \\subset \\mathbb{C} \\)",
            "\\( \\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C} \\)",
            "\\( \\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{D} \\subset \\mathbb{R} \\subset \\mathbb{C} \\)"
        ],
        correct: "\\( \\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C} \\)",
        expl: "C'est la hiérarchie à connaître : chaque ensemble contient le précédent."
    },
    {
        q: "L'ensemble ℕ est-il inclus dans l'ensemble ℤ ?",
        options: ["Oui, tout entier naturel est un entier relatif", "Non, ce sont deux ensembles disjoints", "Non, c'est ℤ qui est inclus dans ℕ", "Seulement pour les nombres pairs"],
        correct: "Oui, tout entier naturel est un entier relatif",
        expl: "Tout entier naturel n peut aussi être vu comme un entier relatif, donc ℕ⊂ℤ."
    },
    {
        q: "Tout entier relatif est-il un nombre décimal ?",
        options: ["Oui, car n s'écrit n/1", "Non, jamais", "Oui, mais seulement les entiers positifs", "Non, sauf 0"],
        correct: "Oui, car n s'écrit n/1",
        expl: "Un entier relatif n s'écrit n/10⁰, c'est donc bien un décimal : ℤ⊂𝔻."
    },
    {
        q: "Tout nombre décimal est-il un nombre rationnel ?",
        options: ["Oui, un décimal est un cas particulier de rationnel", "Non, ce sont des ensembles disjoints", "Non, seuls les entiers le sont", "Oui, mais l'inverse aussi"],
        correct: "Oui, un décimal est un cas particulier de rationnel",
        expl: "Un décimal a/10ⁿ est bien un quotient de deux entiers, donc un rationnel : 𝔻⊂ℚ."
    },
    {
        q: "Tout nombre rationnel est-il un nombre réel ?",
        options: ["Oui", "Non", "Seulement les rationnels positifs", "Seulement les entiers"],
        correct: "Oui",
        expl: "ℝ a été construit pour contenir tous les rationnels (et les irrationnels) : ℚ⊂ℝ."
    },
    {
        q: "√2 appartient-il à l'ensemble ℚ des rationnels ?",
        options: ["Non, c'est un nombre irrationnel", "Oui, c'est un rationnel", "Oui, car c'est un décimal", "Non, ce n'est pas un réel"],
        correct: "Non, c'est un nombre irrationnel",
        expl: "√2 ne peut pas s'écrire comme un quotient de deux entiers : il appartient à ℝ mais pas à ℚ."
    },
    {
        q: "Le nombre π appartient-il à ℚ ?",
        options: ["Non, π est irrationnel", "Oui, π est rationnel", "Oui, car π est décimal", "Non, π n'est même pas réel"],
        correct: "Non, π est irrationnel",
        expl: "π est un nombre réel qui n'est pas un quotient de deux entiers : il appartient à ℝ mais pas à ℚ."
    },
    {
        q: "L'ensemble des nombres complexes ℂ contient-il l'ensemble ℝ ?",
        options: ["Oui, ℝ⊂ℂ", "Non, ils sont disjoints", "Non, c'est l'inverse", "Seulement les réels positifs"],
        correct: "Oui, ℝ⊂ℂ",
        expl: "ℂ a été construit en ajoutant le nombre i pour résoudre des équations que ℝ ne pouvait pas résoudre, il contient donc ℝ."
    },

    // --- APPARTENANCE : PLUS PETIT ENSEMBLE ---
    {
        q: "Quel est le plus petit ensemble de référence (parmi ℕ, ℤ, 𝔻, ℚ, ℝ) auquel appartient \\( -\\dfrac{7}{3} \\) ?",
        options: ["\\( \\mathbb{Q} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{N} \\)"],
        correct: "\\( \\mathbb{Q} \\)",
        expl: "-7/3 n'a pas un nombre fini de décimales, ce n'est donc ni un entier ni un décimal, mais c'est un rationnel."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( \\dfrac{77}{10} \\) ?",
        options: ["\\( \\mathbb{D} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{N} \\)", "\\( \\mathbb{R} \\setminus \\mathbb{Q} \\)"],
        correct: "\\( \\mathbb{D} \\)",
        expl: "77/10 = 7,7, qui a un nombre fini de chiffres après la virgule : c'est un décimal."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( -19\\pi \\) ?",
        options: ["\\( \\mathbb{R} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{Z} \\)"],
        correct: "\\( \\mathbb{R} \\)",
        expl: "π est irrationnel, donc -19π est irrationnel : c'est un réel qui n'appartient pas à ℚ."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( \\sqrt{51} \\) ?",
        options: ["\\( \\mathbb{R} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{N} \\)"],
        correct: "\\( \\mathbb{R} \\)",
        expl: "51 n'est pas un carré parfait, donc √51 est irrationnel : il appartient à ℝ mais pas à ℚ."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( \\sqrt{36} \\) ?",
        options: ["\\( \\mathbb{N} \\)", "\\( \\mathbb{R} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{Q} \\)"],
        correct: "\\( \\mathbb{N} \\)",
        expl: "√36 = 6, qui est un entier naturel."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( -63 \\) ?",
        options: ["\\( \\mathbb{Z} \\)", "\\( \\mathbb{N} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{Q} \\)"],
        correct: "\\( \\mathbb{Z} \\)",
        expl: "-63 est négatif donc n'appartient pas à ℕ, mais c'est bien un entier relatif."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( 2,95 \\) ?",
        options: ["\\( \\mathbb{D} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{N} \\)", "\\( \\mathbb{R} \\setminus \\mathbb{Q} \\)"],
        correct: "\\( \\mathbb{D} \\)",
        expl: "2,95 a un nombre fini de décimales : c'est un nombre décimal."
    },
    {
        q: "Quel est le plus petit ensemble auquel appartient \\( -\\dfrac{65}{13} \\) ?",
        options: ["\\( \\mathbb{Z} \\)", "\\( \\mathbb{N} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{D} \\)"],
        correct: "\\( \\mathbb{Z} \\)",
        expl: "-65/13 = -5, qui est un entier relatif."
    },
    {
        q: "Le nombre d'or \\( \\varphi = \\dfrac{1+\\sqrt{5}}{2} \\) appartient au plus petit ensemble :",
        options: ["\\( \\mathbb{R} \\)", "\\( \\mathbb{Q} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{Z} \\)"],
        correct: "\\( \\mathbb{R} \\)",
        expl: "√5 est irrationnel, donc φ est irrationnel : il appartient à ℝ sans appartenir à ℚ."
    },
    {
        q: "Le résultat de la division 100/7 appartient au plus petit ensemble :",
        options: ["\\( \\mathbb{Q} \\)", "\\( \\mathbb{D} \\)", "\\( \\mathbb{Z} \\)", "\\( \\mathbb{N} \\)"],
        correct: "\\( \\mathbb{Q} \\)",
        expl: "100/7 a un développement décimal infini périodique (non fini) : ce n'est pas un décimal, mais c'est un rationnel."
    },

    // --- ENSEMBLES : NOTATIONS ET SYMBOLES ---
    {
        q: "Comment note-t-on l'ensemble vide ?",
        options: ["\\( \\emptyset \\)", "\\( \\{0\\} \\)", "\\( \\{\\} \\)", "\\( \\mathbb{N} \\)"],
        correct: "\\( \\emptyset \\)",
        expl: "L'ensemble qui ne contient aucun élément se note ∅ (attention, ce n'est pas {0})."
    },
    {
        q: "Le symbole ∈ signifie :",
        options: ["appartient à", "est inclus dans", "n'appartient pas à", "n'est pas inclus dans"],
        correct: "appartient à",
        expl: "∈ relie un élément à un ensemble auquel il appartient."
    },
    {
        q: "Le symbole ⊂ signifie :",
        options: ["est inclus dans", "appartient à", "n'est pas inclus dans", "n'appartient pas à"],
        correct: "est inclus dans",
        expl: "⊂ relie deux ensembles : le premier est un sous-ensemble du second."
    },
    {
        q: "Complète : 7 … {5 ; 7 ; 8 ; 45}",
        options: ["∈", "∉", "⊂", "⊄"],
        correct: "∈",
        expl: "7 est un élément qui figure dans l'ensemble, donc on utilise ∈."
    },
    {
        q: "Complète : 9 … {5 ; 7 ; 8 ; 45}",
        options: ["∉", "∈", "⊂", "⊄"],
        correct: "∉",
        expl: "9 ne figure pas dans l'ensemble, donc on utilise ∉."
    },
    {
        q: "Complète : {7 ; 8} … {5 ; 7 ; 8 ; 45}",
        options: ["⊂", "∈", "⊄", "∉"],
        correct: "⊂",
        expl: "{7;8} est un ensemble dont tous les éléments sont dans l'ensemble de droite : on utilise ⊂ (et non ∈, réservé aux éléments)."
    },
    {
        q: "Complète : {6 ; 8} … {5 ; 7 ; 8 ; 45}",
        options: ["⊄", "⊂", "∈", "∉"],
        correct: "⊄",
        expl: "6 n'appartient pas à l'ensemble de droite, donc {6;8} n'est pas inclus dedans : on utilise ⊄."
    },
    {
        q: "Peut-on écrire 1 ∈ P si P désigne l'ensemble des nombres premiers ?",
        options: ["Non, 1 n'est pas premier", "Oui, 1 est premier", "Seulement si 1 est impair", "Oui, car 1 divise tout"],
        correct: "Non, 1 n'est pas premier",
        expl: "Par définition, un nombre premier a exactement deux diviseurs distincts (1 et lui-même), ce qui exclut 1."
    },
    {
        q: "L'ensemble ℕ est-il inclus dans l'ensemble ℤ des entiers relatifs ?",
        options: ["Oui, ℕ ⊂ ℤ", "Non, ℕ ⊄ ℤ", "Non, c'est ℤ ⊂ ℕ", "Impossible à dire"],
        correct: "Oui, ℕ ⊂ ℤ",
        expl: "Tout entier naturel est un entier relatif, donc N est inclus dans Z."
    },

    // --- INTERVALLES ---
    {
        q: "Un intervalle fermé [a ; b] correspond aux réels x tels que :",
        options: ["\\( a \\leqslant x \\leqslant b \\)", "\\( a < x < b \\)", "\\( a \\leqslant x < b \\)", "\\( a < x \\leqslant b \\)"],
        correct: "\\( a \\leqslant x \\leqslant b \\)",
        expl: "Un crochet fermé (tourné vers l'intérieur) signifie que la borne est incluse, d'où les deux inégalités larges."
    },
    {
        q: "Un intervalle ouvert ]a ; b[ correspond aux réels x tels que :",
        options: ["\\( a < x < b \\)", "\\( a \\leqslant x \\leqslant b \\)", "\\( a \\leqslant x < b \\)", "\\( a < x \\leqslant b \\)"],
        correct: "\\( a < x < b \\)",
        expl: "Un crochet ouvert (tourné vers l'extérieur) signifie que la borne est exclue, d'où les inégalités strictes."
    },
    {
        q: "L'intervalle [a ; b[ correspond aux réels x tels que :",
        options: ["\\( a \\leqslant x < b \\)", "\\( a < x \\leqslant b \\)", "\\( a \\leqslant x \\leqslant b \\)", "\\( a < x < b \\)"],
        correct: "\\( a \\leqslant x < b \\)",
        expl: "La borne a est incluse (crochet fermé) et la borne b est exclue (crochet ouvert)."
    },
    {
        q: "Quelle est l'amplitude de l'intervalle [a ; b] ?",
        options: ["\\( b - a \\)", "\\( a - b \\)", "\\( a + b \\)", "\\( \\dfrac{a+b}{2} \\)"],
        correct: "\\( b - a \\)",
        expl: "L'amplitude d'un intervalle borné est la différence entre la plus grande et la plus petite borne."
    },
    {
        q: "Comment s'écrit ℝ sous forme d'intervalle ?",
        options: ["\\( ]-\\infty ; +\\infty[ \\)", "\\( [-\\infty ; +\\infty] \\)", "\\( ]0 ; +\\infty[ \\)", "\\( [0 ; +\\infty[ \\)"],
        correct: "\\( ]-\\infty ; +\\infty[ \\)",
        expl: "ℝ contient tous les réels, sans borne : on note ℝ = ]−∞ ; +∞[."
    },
    {
        q: "L'intervalle [a ; +∞[ représente les réels x tels que :",
        options: ["\\( x \\geqslant a \\)", "\\( x > a \\)", "\\( x \\leqslant a \\)", "\\( x < a \\)"],
        correct: "\\( x \\geqslant a \\)",
        expl: "Le crochet fermé en a inclut la borne, donc x ⩾ a."
    },
    {
        q: "L'intervalle ]−∞ ; b[ représente les réels x tels que :",
        options: ["\\( x < b \\)", "\\( x \\leqslant b \\)", "\\( x > b \\)", "\\( x \\geqslant b \\)"],
        correct: "\\( x < b \\)",
        expl: "Le crochet ouvert en b exclut la borne, donc x < b strictement."
    },
    {
        q: "Un intervalle [a ; b] est dit :",
        options: ["fermé", "ouvert", "semi-ouvert", "vide"],
        correct: "fermé",
        expl: "Les deux bornes étant incluses, l'intervalle [a ; b] est fermé."
    },
    {
        q: "Les intervalles [7,1 ; 10], ]7,1 ; 10[, [7,1 ; 10[ et ]7,1 ; 10] ont-ils la même amplitude ?",
        options: ["Oui, tous égaux à 2,9", "Non, ils sont différents", "Oui, mais seulement les deux premiers", "Non, seul le premier a une amplitude définie"],
        correct: "Oui, tous égaux à 2,9",
        expl: "L'amplitude ne dépend que des bornes (b−a=2,9), pas du fait qu'elles soient incluses ou exclues."
    },

    // --- OPÉRATIONS SUR LES ENSEMBLES ---
    {
        q: "Comment note-t-on l'intersection de deux ensembles A et B ?",
        options: ["\\( A \\cap B \\)", "\\( A \\cup B \\)", "\\( A \\setminus B \\)", "\\( A \\times B \\)"],
        correct: "\\( A \\cap B \\)",
        expl: "L'intersection, notée ∩, regroupe les éléments communs aux deux ensembles."
    },
    {
        q: "Comment note-t-on l'union de deux ensembles A et B ?",
        options: ["\\( A \\cup B \\)", "\\( A \\cap B \\)", "\\( A \\setminus B \\)", "\\( A \\times B \\)"],
        correct: "\\( A \\cup B \\)",
        expl: "L'union, notée ∪, regroupe tous les éléments appartenant à A ou à B (ou aux deux)."
    },
    {
        q: "L'intersection A ∩ B contient les éléments qui appartiennent :",
        options: ["à A ET à B", "à A OU à B", "seulement à A", "ni à A ni à B"],
        correct: "à A ET à B",
        expl: "Par définition, l'intersection regroupe les éléments communs aux deux ensembles."
    },
    {
        q: "L'union A ∪ B contient les éléments qui appartiennent :",
        options: ["à A OU à B (au moins l'un des deux)", "à A ET à B uniquement", "ni à A ni à B", "seulement à B"],
        correct: "à A OU à B (au moins l'un des deux)",
        expl: "Le « OU » de l'union est inclusif : un élément peut être dans A, dans B, ou dans les deux."
    },
    {
        q: "Comment note-t-on « A privé de B » ?",
        options: ["\\( A \\setminus B \\)", "\\( B \\setminus A \\)", "\\( A \\cap B \\)", "\\( A \\cup B \\)"],
        correct: "\\( A \\setminus B \\)",
        expl: "A∖B désigne les éléments de A qui n'appartiennent pas à B."
    },
    {
        q: "En général, a-t-on A ∖ B = B ∖ A ?",
        options: ["Non, en général c'est faux", "Oui, toujours", "Oui, mais seulement pour les intervalles", "Oui, si A et B sont disjoints"],
        correct: "Non, en général c'est faux",
        expl: "A∖B et B∖A désignent des différences dans des sens opposés, elles ne coïncident pas en général."
    },
    {
        q: "Que vaut A ∖ A, pour n'importe quel ensemble A ?",
        options: ["\\( \\emptyset \\)", "\\( A \\)", "\\( \\mathbb{R} \\)", "impossible à déterminer"],
        correct: "\\( \\emptyset \\)",
        expl: "En retirant à A tous ses propres éléments, il ne reste plus rien : le résultat est l'ensemble vide."
    },
    {
        q: "Que vaut A ∖ ∅, pour n'importe quel ensemble A ?",
        options: ["\\( A \\)", "\\( \\emptyset \\)", "\\( \\mathbb{R} \\)", "0"],
        correct: "\\( A \\)",
        expl: "Retirer à A les éléments de l'ensemble vide (il n'y en a aucun) ne change rien : on retrouve A."
    },
    {
        q: "Que vaut ∅ ∖ A, pour n'importe quel ensemble A ?",
        options: ["\\( \\emptyset \\)", "\\( A \\)", "\\( \\mathbb{R} \\)", "impossible à déterminer"],
        correct: "\\( \\emptyset \\)",
        expl: "L'ensemble vide n'a aucun élément à retirer : le résultat reste l'ensemble vide."
    },
    {
        q: "Soit A = [−3 ; 10] et D = [20 ; 26]. Que vaut A ∩ D ?",
        options: ["\\( \\emptyset \\)", "\\( [-3 ; 26] \\)", "\\( [20 ; 10] \\)", "\\( [-3 ; 10] \\)"],
        correct: "\\( \\emptyset \\)",
        expl: "Les deux intervalles ne se chevauchent pas (10 < 20), leur intersection est donc vide."
    },
    {
        q: "Soit A = [−3 ; 10] et C = [−2 ; 3,95] (avec C ⊂ A). Que vaut A ∪ C ?",
        options: ["\\( [-3 ; 10] \\) (soit A)", "\\( [-2 ; 3{,}95] \\) (soit C)", "\\( \\emptyset \\)", "\\( [-3 ; 3{,}95] \\)"],
        correct: "\\( [-3 ; 10] \\) (soit A)",
        expl: "Puisque C est déjà entièrement inclus dans A, l'union des deux ne donne rien de plus que A."
    },
    {
        q: "Si A = {−9 ; −4 ; −1 ; 3 ; 8 ; 14} et B = {−6 ; −4 ; 0 ; 3 ; 14 ; 22}, que vaut A ∩ B ?",
        options: ["{−4 ; 3 ; 14}", "{−9 ; −6 ; −1 ; 0 ; 8 ; 22}", "{−4}", "\\( \\emptyset \\)"],
        correct: "{−4 ; 3 ; 14}",
        expl: "Ce sont les éléments communs aux deux listes : −4, 3 et 14 apparaissent dans A et dans B."
    },

    // --- PRODUIT CARTÉSIEN ---
    {
        q: "Le produit cartésien A×B est l'ensemble :",
        options: [
            "des couples (a ; b) avec a ∈ A et b ∈ B",
            "des éléments communs à A et B",
            "des éléments de A ou de B",
            "des éléments de A qui ne sont pas dans B"
        ],
        correct: "des couples (a ; b) avec a ∈ A et b ∈ B",
        expl: "C'est la définition du produit cartésien : chaque première coordonnée vient de A, chaque seconde de B."
    },
    {
        q: "A-t-on en général A × B = B × A ?",
        options: ["Non, l'ordre des coordonnées compte", "Oui, toujours", "Oui, si A et B sont des intervalles", "Oui, seulement si A = ℝ"],
        correct: "Non, l'ordre des coordonnées compte",
        expl: "Dans un couple (a;b), l'ordre est important : A×B et B×A ne contiennent en général pas les mêmes couples."
    },
    {
        q: "Si A = {0 ; 1} et B = {2 ; 3}, combien d'éléments contient A × B ?",
        options: ["4", "2", "3", "6"],
        correct: "4",
        expl: "A×B contient tous les couples (a;b) possibles : (0;2), (0;3), (1;2), (1;3), soit 2×2 = 4 éléments."
    },
    {
        q: "Si E = ℝ et F = ℝ, comment peut-on interpréter géométriquement E × F ?",
        options: [
            "Comme l'ensemble des coordonnées des points d'un plan muni d'un repère",
            "Comme une droite graduée",
            "Comme un intervalle de ℝ",
            "Comme l'ensemble vide"
        ],
        correct: "Comme l'ensemble des coordonnées des points d'un plan muni d'un repère",
        expl: "ℝ×ℝ = ℝ² correspond exactement aux coordonnées (x;y) de tous les points du plan."
    },
    {
        q: "L'ensemble {(x ; y) | y = 2x} est-il inclus dans ℝ² ?",
        options: ["Oui, c'est une droite du plan", "Non, ce n'est pas un sous-ensemble de ℝ²", "Oui, mais seulement pour x positif", "Non, c'est un ensemble de ℕ²"],
        correct: "Oui, c'est une droite du plan",
        expl: "Chaque couple (x;2x) est bien un couple de réels, donc un élément de ℝ², et l'ensemble décrit une droite."
    },

    // --- NOTION DE FONCTION ---
    {
        q: "Une fonction de E vers F est une partie C de E × F telle que :",
        options: [
            "pour tout x ∈ E, il existe au plus un y ∈ F tel que (x;y) ∈ C",
            "pour tout x ∈ E, il existe au moins deux y ∈ F tels que (x;y) ∈ C",
            "E et F doivent être égaux",
            "tous les couples de E × F appartiennent à C"
        ],
        correct: "pour tout x ∈ E, il existe au plus un y ∈ F tel que (x;y) ∈ C",
        expl: "C'est la définition d'une fonction : à chaque antécédent correspond au plus une image."
    },
    {
        q: "Si (x ; y) ∈ C, le graphe d'une fonction f, on note :",
        options: ["\\( y = f(x) \\)", "\\( x = f(y) \\)", "\\( y = C(x) \\)", "\\( x + y = f \\)"],
        correct: "\\( y = f(x) \\)",
        expl: "Par convention, si le couple (x;y) appartient au graphe de f, on écrit y = f(x)."
    },
    {
        q: "Dans y = f(x), on dit que y est :",
        options: ["l'image de x par f", "un antécédent de x par f", "le graphe de f", "l'ensemble de définition de f"],
        correct: "l'image de x par f",
        expl: "y est le résultat obtenu en appliquant f à x : c'est donc l'image de x."
    },
    {
        q: "Dans y = f(x), on dit que x est :",
        options: ["un antécédent de y par f", "l'image de y par f", "le graphe de f", "un intervalle"],
        correct: "un antécédent de y par f",
        expl: "x est la valeur de départ qui donne y comme résultat : x est donc un antécédent de y."
    },
    {
        q: "L'ensemble de définition \\( D_f \\) d'une fonction f de E vers F est :",
        options: [
            "{x ∈ E | il existe y ∈ F tel que (x;y) ∈ C}",
            "{y ∈ F | il existe x ∈ E tel que (x;y) ∈ C}",
            "E × F tout entier",
            "l'ensemble vide"
        ],
        correct: "{x ∈ E | il existe y ∈ F tel que (x;y) ∈ C}",
        expl: "Le domaine de définition regroupe tous les x qui possèdent effectivement une image par f."
    },
    {
        q: "Pour f : x ↦ 3x+2, quelle est l'image de 1 par f ?",
        options: ["5", "3", "2", "1"],
        correct: "5",
        expl: "f(1) = 3×1+2 = 5."
    },
    {
        q: "Pour g : x ↦ x², quels sont les antécédents de 9 par g ?",
        options: ["−3 et 3", "seulement 3", "seulement −3", "9 et −9"],
        correct: "−3 et 3",
        expl: "g(−3) = (−3)² = 9 et g(3) = 3² = 9 : les deux valeurs sont bien des antécédents de 9."
    },
    {
        q: "Si une fonction f transforme l'intervalle [−3 ; 9] en [−3 ; 3], on note ce résultat :",
        options: ["\\( f([-3 ; 9]) = [-3 ; 3] \\)", "\\( f(-3;9) = -3;3 \\)", "\\( D_f = [-3 ; 3] \\)", "\\( C_f = [-3 ; 9] \\)"],
        correct: "\\( f([-3 ; 9]) = [-3 ; 3] \\)",
        expl: "On note ainsi l'image d'un intervalle tout entier par une fonction f."
    },
    {
        q: "Le graphe d'une fonction f, souvent noté \\( C_f \\), est constitué des points de coordonnées :",
        options: ["\\( (x ; f(x)) \\)", "\\( (f(x) ; x) \\)", "\\( (x ; x) \\)", "\\( (0 ; f(x)) \\)"],
        correct: "\\( (x ; f(x)) \\)",
        expl: "Chaque point du graphe associe un antécédent x en abscisse à son image f(x) en ordonnée."
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

// On mélange toutes les questions et on en prend 10
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
