const questionsData = [
    // --- TRANSLATIONS ET VECTEURS ---
    {
        q: "Une translation qui transforme A en B est entièrement définie par la donnée de :",
        options: ["3 informations : direction, sens, longueur", "2 informations : direction et sens", "1 information : la longueur AB", "4 informations : origine, extrémité, direction, sens"],
        correct: "3 informations : direction, sens, longueur",
        expl: "Une translation se caractérise par une direction (parallèle à (AB)), un sens (de A vers B) et une longueur (celle de AB)."
    },
    {
        q: "Le vecteur \\( \\vec{AB} \\) est :",
        options: [
            "la donnée des 3 informations qui caractérisent la translation qui transforme A en B",
            "la distance entre A et B uniquement",
            "le milieu du segment [AB]",
            "un nombre réel positif"
        ],
        correct: "la donnée des 3 informations qui caractérisent la translation qui transforme A en B",
        expl: "Le vecteur AB regroupe direction, sens et longueur associés à la translation qui transforme A en B."
    },
    {
        q: "Dans le vecteur \\( \\vec{AB} \\), le point A est :",
        options: ["l'origine du vecteur", "l'extrémité du vecteur", "le milieu du vecteur", "la norme du vecteur"],
        correct: "l'origine du vecteur",
        expl: "Par convention, la première lettre est l'origine et la seconde l'extrémité du vecteur."
    },
    {
        q: "Deux vecteurs sont dits égaux si :",
        options: ["ils définissent la même translation", "ils ont la même origine", "ils ont la même extrémité", "ils sont perpendiculaires"],
        correct: "ils définissent la même translation",
        expl: "L'égalité de deux vecteurs correspond à l'égalité des translations qu'ils caractérisent."
    },

    // --- PARALLÉLOGRAMME ET CHASLES ---
    {
        q: "Soient A, B, C et D quatre points. La propriété du cours indique que :",
        options: [
            "\\( \\vec{AB} = \\vec{CD} \\Leftrightarrow \\) ABDC est un parallélogramme",
            "\\( \\vec{AB} = \\vec{CD} \\Leftrightarrow \\) ABCD est un parallélogramme",
            "\\( \\vec{AB} = \\vec{BC} \\Leftrightarrow \\) ABDC est un parallélogramme",
            "\\( \\vec{AB} = \\vec{CD} \\Leftrightarrow \\) ACBD est un parallélogramme"
        ],
        correct: "\\( \\vec{AB} = \\vec{CD} \\Leftrightarrow \\) ABDC est un parallélogramme",
        expl: "Attention à l'ordre des lettres : c'est bien ABDC (et non ABCD) qui est un parallélogramme."
    },
    {
        q: "La relation de Chasles s'écrit, pour trois points A, B et C :",
        options: [
            "\\( \\vec{AB} + \\vec{BC} = \\vec{AC} \\)",
            "\\( \\vec{AB} + \\vec{AC} = \\vec{BC} \\)",
            "\\( \\vec{AB} - \\vec{BC} = \\vec{AC} \\)",
            "\\( \\vec{AB} + \\vec{CB} = \\vec{AC} \\)"
        ],
        correct: "\\( \\vec{AB} + \\vec{BC} = \\vec{AC} \\)",
        expl: "C'est la relation de Chasles : parcourir A→B puis B→C revient à parcourir directement A→C."
    },
    {
        q: "La règle du parallélogramme énonce que, pour A, B, C et D tel que ABDC soit un parallélogramme :",
        options: [
            "\\( \\vec{AB} + \\vec{AC} = \\vec{AD} \\)",
            "\\( \\vec{AB} + \\vec{AC} = \\vec{BC} \\)",
            "\\( \\vec{AB} - \\vec{AC} = \\vec{AD} \\)",
            "\\( \\vec{AB} + \\vec{DC} = \\vec{AD} \\)"
        ],
        correct: "\\( \\vec{AB} + \\vec{AC} = \\vec{AD} \\)",
        expl: "La somme de deux vecteurs de même origine A donne le vecteur AD, D étant le sommet du parallélogramme ABDC."
    },
    {
        q: "Simplifier \\( \\vec{BD} + \\vec{DA} \\) :",
        options: ["\\( \\vec{BA} \\)", "\\( \\vec{BD} \\)", "\\( \\vec{DA} \\)", "\\( \\vec{0} \\)"],
        correct: "\\( \\vec{BA} \\)",
        expl: "D'après la relation de Chasles, B→D puis D→A revient à B→A."
    },
    {
        q: "Simplifier \\( \\vec{BD} + \\vec{AA} \\) :",
        options: ["\\( \\vec{BD} \\)", "\\( \\vec{0} \\)", "\\( \\vec{AB} \\)", "\\( \\vec{DA} \\)"],
        correct: "\\( \\vec{BD} \\)",
        expl: "AA est le vecteur nul, l'ajouter à BD ne change rien : le résultat est BD."
    },
    {
        q: "Simplifier \\( \\vec{BD} + \\vec{DB} \\) :",
        options: ["\\( \\vec{0} \\)", "\\( \\vec{BD} \\)", "\\( 2\\vec{BD} \\)", "\\( \\vec{DD} \\)"],
        correct: "\\( \\vec{0} \\)",
        expl: "D'après Chasles, B→D puis D→B revient à B→B, ce qui est le vecteur nul."
    },
    {
        q: "Simplifier \\( \\vec{BD} - \\vec{BA} \\) :",
        options: ["\\( \\vec{AD} \\)", "\\( \\vec{DA} \\)", "\\( \\vec{AB} \\)", "\\( \\vec{0} \\)"],
        correct: "\\( \\vec{AD} \\)",
        expl: "BD − BA = BD + AB = AB + BD, qui vaut AD par la relation de Chasles."
    },

    // --- VECTEUR OPPOSÉ, NUL, SOUSTRACTION ---
    {
        q: "Le vecteur opposé à \\( \\vec{u} \\), noté \\( -\\vec{u} \\), a :",
        options: [
            "la même direction, la même longueur, mais un sens opposé",
            "la même direction, un sens opposé, et une longueur double",
            "une direction perpendiculaire à celle de u",
            "la même direction et le même sens, mais une longueur nulle"
        ],
        correct: "la même direction, la même longueur, mais un sens opposé",
        expl: "Le vecteur opposé conserve la direction et la norme, seul le sens change."
    },
    {
        q: "Que vaut \\( \\vec{u} + (-\\vec{u}) \\) ?",
        options: ["\\( \\vec{0} \\)", "\\( 2\\vec{u} \\)", "\\( \\vec{u} \\)", "impossible à déterminer"],
        correct: "\\( \\vec{0} \\)",
        expl: "Un vecteur et son opposé s'annulent : leur somme est le vecteur nul."
    },
    {
        q: "Que vaut \\( -\\vec{AB} \\) ?",
        options: ["\\( \\vec{BA} \\)", "\\( \\vec{AB} \\)", "\\( \\vec{0} \\)", "\\( \\vec{BB} \\)"],
        correct: "\\( \\vec{BA} \\)",
        expl: "L'opposé de AB est le vecteur de même direction et longueur, mais de sens contraire : BA."
    },
    {
        q: "Comment note-t-on le vecteur nul, en utilisant un point A quelconque ?",
        options: ["\\( \\vec{AA} \\)", "\\( \\vec{A0} \\)", "\\( 0 \\cdot \\vec{A} \\)", "\\( \\vec{OA} \\)"],
        correct: "\\( \\vec{AA} \\)",
        expl: "Le vecteur qui va d'un point à lui-même a une longueur nulle : c'est le vecteur nul, noté aussi 0."
    },
    {
        q: "Pour soustraire un vecteur, on :",
        options: ["ajoute son opposé", "multiplie par -1 le vecteur de départ", "inverse origine et extrémité du résultat", "change uniquement la direction"],
        correct: "ajoute son opposé",
        expl: "Par définition, u − v = u + (−v)."
    },
    {
        q: "Simplifier \\( \\vec{AB} - \\vec{AB} \\) :",
        options: ["\\( \\vec{0} \\)", "\\( \\vec{AB} \\)", "\\( 2\\vec{AB} \\)", "\\( \\vec{BA} \\)"],
        correct: "\\( \\vec{0} \\)",
        expl: "AB − AB = AB + BA = AA, qui est le vecteur nul."
    },

    // --- VECTEURS ET MILIEU ---
    {
        q: "Soient A, I et B trois points. On a \\( \\vec{AI} = \\vec{IB} \\) si et seulement si :",
        options: ["I est le milieu de [AB]", "I appartient à la droite (AB) sans autre condition", "A, I, B sont alignés dans n'importe quel ordre", "I est un point quelconque du plan"],
        correct: "I est le milieu de [AB]",
        expl: "Cette égalité vectorielle caractérise exactement le milieu du segment [AB]."
    },
    {
        q: "Soient A, I et B trois points. On a \\( \\vec{IA} + \\vec{IB} = \\vec{0} \\) si et seulement si :",
        options: ["I est le milieu de [AB]", "I est un point extérieur au segment [AB]", "A et B sont confondus", "I appartient à [AB] sans condition supplémentaire"],
        correct: "I est le milieu de [AB]",
        expl: "C'est une autre caractérisation vectorielle équivalente du milieu de [AB]."
    },

    // --- MULTIPLICATION PAR UN SCALAIRE ---
    {
        q: "Multiplier un vecteur \\( \\vec{u} \\) par un nombre réel k donne un vecteur qui a :",
        options: [
            "la même direction que u, un sens dépendant du signe de k, et une norme multipliée par |k|",
            "une direction toujours différente de celle de u",
            "le même sens que u quel que soit le signe de k",
            "une norme divisée par k"
        ],
        correct: "la même direction que u, un sens dépendant du signe de k, et une norme multipliée par |k|",
        expl: "C'est la définition du produit d'un vecteur par un scalaire."
    },
    {
        q: "Si k < 0, le vecteur \\( k \\cdot \\vec{u} \\) a, par rapport à \\( \\vec{u} \\) :",
        options: ["le sens contraire", "le même sens", "une direction perpendiculaire", "une norme nulle"],
        correct: "le sens contraire",
        expl: "Le sens de k·u est le même que celui de u seulement si k>0 ; il est contraire si k<0."
    },
    {
        q: "\\( \\vec{GH} = -0{,}5 \\cdot \\vec{FE} \\) signifie que :",
        options: [
            "GH a un sens contraire à FE et une norme moitié de celle de FE",
            "GH a le même sens que FE et une norme double",
            "GH est perpendiculaire à FE",
            "GH et FE sont deux vecteurs nuls"
        ],
        correct: "GH a un sens contraire à FE et une norme moitié de celle de FE",
        expl: "Le coefficient -0,5 est négatif (sens contraire) et sa valeur absolue est 0,5 (norme divisée par 2)."
    },
    {
        q: "Peut-il exister un nombre k tel que \\( \\vec{AB} = k \\cdot \\vec{EF} \\) si AB et EF n'ont pas la même direction ?",
        options: ["Non, c'est impossible", "Oui, toujours", "Oui, si k est négatif", "Oui, si k = 0"],
        correct: "Non, c'est impossible",
        expl: "Un multiple d'un vecteur garde toujours la même direction que ce vecteur, donc si les directions diffèrent, aucun k ne convient."
    },

    // --- COORDONNÉES DE VECTEURS ---
    {
        q: "Dans une base \\( (\\vec{e_1}, \\vec{e_2}) \\), les coordonnées (x ; y) d'un vecteur \\( \\vec{u} \\) sont telles que :",
        options: [
            "\\( \\vec{u} = x \\cdot \\vec{e_1} + y \\cdot \\vec{e_2} \\)",
            "\\( \\vec{u} = x \\cdot \\vec{e_2} + y \\cdot \\vec{e_1} \\)",
            "\\( \\vec{u} = x + y \\)",
            "\\( \\vec{u} = (x + y) \\cdot \\vec{e_1} \\)"
        ],
        correct: "\\( \\vec{u} = x \\cdot \\vec{e_1} + y \\cdot \\vec{e_2} \\)",
        expl: "x est l'abscisse (coefficient de e1) et y l'ordonnée (coefficient de e2) du vecteur u."
    },
    {
        q: "Dans un repère (O ; I ; J), avec A(xA ; yA) et B(xB ; yB), les coordonnées de \\( \\vec{AB} \\) sont :",
        options: [
            "\\( (x_B - x_A \\; ; \\; y_B - y_A) \\)",
            "\\( (x_A - x_B \\; ; \\; y_A - y_B) \\)",
            "\\( (x_B + x_A \\; ; \\; y_B + y_A) \\)",
            "\\( (x_A \\; ; \\; y_B) \\)"
        ],
        correct: "\\( (x_B - x_A \\; ; \\; y_B - y_A) \\)",
        expl: "On soustrait toujours les coordonnées de l'origine à celles de l'extrémité."
    },
    {
        q: "Avec A(−1 ; 3) et B(5 ; −1), quelles sont les coordonnées de \\( \\vec{AB} \\) ?",
        options: ["(6 ; −4)", "(4 ; 2)", "(−6 ; 4)", "(6 ; 4)"],
        correct: "(6 ; −4)",
        expl: "xB−xA = 5−(−1) = 6 et yB−yA = −1−3 = −4."
    },
    {
        q: "Les coordonnées du milieu K du segment [AB], avec A(xA;yA) et B(xB;yB), sont :",
        options: [
            "\\( \\left( \\dfrac{x_A+x_B}{2} \\; ; \\; \\dfrac{y_A+y_B}{2} \\right) \\)",
            "\\( \\left( \\dfrac{x_A-x_B}{2} \\; ; \\; \\dfrac{y_A-y_B}{2} \\right) \\)",
            "\\( (x_A + x_B \\; ; \\; y_A + y_B) \\)",
            "\\( \\left( \\dfrac{x_B}{x_A} \\; ; \\; \\dfrac{y_B}{y_A} \\right) \\)"
        ],
        correct: "\\( \\left( \\dfrac{x_A+x_B}{2} \\; ; \\; \\dfrac{y_A+y_B}{2} \\right) \\)",
        expl: "Le milieu a pour coordonnées la demi-somme des coordonnées des deux extrémités."
    },
    {
        q: "Quel est le milieu K du segment [AB] avec A(1 ; −2) et B(5 ; 4) ?",
        options: ["K(3 ; 1)", "K(6 ; 2)", "K(2 ; 3)", "K(4 ; 1)"],
        correct: "K(3 ; 1)",
        expl: "xK = (1+5)/2 = 3 et yK = (−2+4)/2 = 1."
    },
    {
        q: "Si \\( \\vec{u}(a;b) \\) et \\( \\vec{v}(c;d) \\), quelles sont les coordonnées de \\( \\vec{u} + \\vec{v} \\) ?",
        options: ["\\( (a+c \\; ; \\; b+d) \\)", "\\( (a-c \\; ; \\; b-d) \\)", "\\( (ac \\; ; \\; bd) \\)", "\\( (a+b \\; ; \\; c+d) \\)"],
        correct: "\\( (a+c \\; ; \\; b+d) \\)",
        expl: "On additionne les abscisses entre elles, et les ordonnées entre elles."
    },
    {
        q: "Si \\( \\vec{u}(a;b) \\), quelles sont les coordonnées de \\( -\\vec{u} \\) ?",
        options: ["\\( (-a \\; ; \\; -b) \\)", "\\( (a \\; ; \\; b) \\)", "\\( (-a \\; ; \\; b) \\)", "\\( (b \\; ; \\; a) \\)"],
        correct: "\\( (-a \\; ; \\; -b) \\)",
        expl: "Le vecteur opposé a des coordonnées opposées."
    },
    {
        q: "Si \\( \\vec{u}(a;b) \\) et k est un réel, quelles sont les coordonnées de \\( k \\cdot \\vec{u} \\) ?",
        options: ["\\( (ka \\; ; \\; kb) \\)", "\\( (k+a \\; ; \\; k+b) \\)", "\\( (a/k \\; ; \\; b/k) \\)", "\\( (a \\; ; \\; kb) \\)"],
        correct: "\\( (ka \\; ; \\; kb) \\)",
        expl: "On multiplie chaque coordonnée du vecteur par le scalaire k."
    },
    {
        q: "Quelles sont les coordonnées du vecteur nul \\( \\vec{0} \\) ?",
        options: ["(0 ; 0)", "(1 ; 1)", "indéfinies", "(0 ; 1)"],
        correct: "(0 ; 0)",
        expl: "Le vecteur nul a une longueur nulle dans toutes les directions : ses deux coordonnées sont nulles."
    },
    {
        q: "Avec \\( \\vec{u}(-2{,}1 \\; ; \\; 2{,}3) \\) et \\( \\vec{v}(3 \\; ; \\; 1{,}5) \\), que valent les coordonnées de \\( 3\\vec{u} - 2\\vec{v} \\) ?",
        options: ["(−12,3 ; 3,9)", "(−0,3 ; 5,9)", "(12,3 ; −3,9)", "(−9,3 ; 3,9)"],
        correct: "(−12,3 ; 3,9)",
        expl: "Abscisse : 3×(−2,1) − 2×3 = −6,3−6 = −12,3. Ordonnée : 3×2,3 − 2×1,5 = 6,9−3 = 3,9."
    },

    // --- NORME ---
    {
        q: "Dans un repère ORTHONORMÉ, si \\( \\vec{u}(a;b) \\), la norme de u, notée \\( \\|\\vec{u}\\| \\), vaut :",
        options: ["\\( \\sqrt{a^2+b^2} \\)", "\\( a^2+b^2 \\)", "\\( a+b \\)", "\\( \\sqrt{a+b} \\)"],
        correct: "\\( \\sqrt{a^2+b^2} \\)",
        expl: "C'est une application directe du théorème de Pythagore dans un repère orthonormé."
    },
    {
        q: "La formule \\( \\|\\vec{u}\\| = \\sqrt{a^2+b^2} \\) est valable :",
        options: ["uniquement dans un repère orthonormé", "dans n'importe quel repère", "seulement si a=b", "seulement pour des vecteurs colinéaires à l'axe des abscisses"],
        correct: "uniquement dans un repère orthonormé",
        expl: "Le calcul repose sur le théorème de Pythagore, qui nécessite un repère orthonormé."
    },

    // --- COLINÉARITÉ ET DÉTERMINANT ---
    {
        q: "Deux vecteurs \\( \\vec{u} \\) et \\( \\vec{v} \\) sont colinéaires si et seulement si :",
        options: [
            "il existe un nombre k tel que \\( \\vec{u} = k \\cdot \\vec{v} \\)",
            "ils ont la même norme",
            "ils sont perpendiculaires",
            "leur somme est le vecteur nul"
        ],
        correct: "il existe un nombre k tel que \\( \\vec{u} = k \\cdot \\vec{v} \\)",
        expl: "C'est la définition de la colinéarité : l'un est un multiple scalaire de l'autre."
    },
    {
        q: "Le vecteur nul est-il colinéaire à tous les vecteurs ?",
        options: ["Oui", "Non, seulement au vecteur nul", "Non, jamais", "Oui, mais uniquement dans un repère orthonormé"],
        correct: "Oui",
        expl: "Par convention, le vecteur nul est colinéaire à n'importe quel vecteur."
    },
    {
        q: "Si \\( \\vec{u}(a;b) \\) et \\( \\vec{v}(c;d) \\), le déterminant de u et v est défini par :",
        options: ["\\( ad - bc \\)", "\\( ac - bd \\)", "\\( ad + bc \\)", "\\( ab - cd \\)"],
        correct: "\\( ad - bc \\)",
        expl: "C'est la formule du déterminant de deux vecteurs dans une base orthonormée."
    },
    {
        q: "Deux vecteurs \\( \\vec{u} \\) et \\( \\vec{v} \\) sont colinéaires si et seulement si :",
        options: ["\\( \\det(\\vec{u}, \\vec{v}) = 0 \\)", "\\( \\det(\\vec{u}, \\vec{v}) = 1 \\)", "\\( \\det(\\vec{u}, \\vec{v}) > 0 \\)", "\\( \\det(\\vec{u}, \\vec{v}) < 0 \\)"],
        correct: "\\( \\det(\\vec{u}, \\vec{v}) = 0 \\)",
        expl: "Le déterminant nul est le critère qui caractérise la colinéarité de deux vecteurs."
    },
    {
        q: "Pour \\( \\vec{u}(4;-2) \\) et \\( \\vec{v}(3;5) \\), que vaut \\( \\det(\\vec{u},\\vec{v}) \\) ?",
        options: ["26", "14", "6", "−26"],
        correct: "26",
        expl: "det(u,v) = 4×5 − (−2)×3 = 20+6 = 26."
    },
    {
        q: "Pour \\( \\vec{u}(2;6) \\) et \\( \\vec{v}(-6;-18) \\), que vaut \\( \\det(\\vec{u},\\vec{v}) \\), et qu'en déduit-on ?",
        options: [
            "0, donc u et v sont colinéaires",
            "0, donc u et v ne sont pas colinéaires",
            "24, donc u et v ne sont pas colinéaires",
            "−24, donc u et v sont colinéaires"
        ],
        correct: "0, donc u et v sont colinéaires",
        expl: "det(u,v) = 2×(−18) − 6×(−6) = −36+36 = 0, ce qui signifie que u et v sont colinéaires."
    },
    {
        q: "Pour \\( \\vec{w}(-5;3) \\) et \\( \\vec{z}(12;-7) \\), que vaut \\( \\det(\\vec{w},\\vec{z}) \\), et qu'en déduit-on ?",
        options: [
            "−1, donc w et z ne sont pas colinéaires",
            "0, donc w et z sont colinéaires",
            "1, donc w et z sont colinéaires",
            "−1, donc w et z sont colinéaires"
        ],
        correct: "−1, donc w et z ne sont pas colinéaires",
        expl: "det(w,z) = (−5)×(−7) − 3×12 = 35−36 = −1, qui est non nul : w et z ne sont donc pas colinéaires."
    },
    {
        q: "Si des vecteurs u et v non nuls sont colinéaires, on peut affirmer qu'ils ont :",
        options: ["la même direction", "la même norme obligatoirement", "le même sens obligatoirement", "des coordonnées opposées"],
        correct: "la même direction",
        expl: "La colinéarité de deux vecteurs non nuls signifie qu'ils ont la même direction (mais pas forcément le même sens ni la même norme)."
    },

    // --- QUESTIONS DE SYNTHÈSE / CONTEXTE ---
    {
        q: "ABCD est un parallélogramme. On construit S et V tels que \\( \\vec{AV} = 2\\vec{AB} \\) et \\( \\vec{CS} = 2\\vec{CD} \\). Que peut-on dire des segments [VS] et [AC] ?",
        options: ["Ils ont le même milieu", "Ils sont parallèles sans se couper", "Ils sont perpendiculaires", "Ils ont la même longueur mais des milieux différents"],
        correct: "Ils ont le même milieu",
        expl: "En utilisant les propriétés du parallélogramme et de Chasles, on montre que le milieu de [VS] coïncide avec celui de [AC]."
    },
    {
        q: "Pour montrer que quatre points A, B, C, D forment un parallélogramme à l'aide des vecteurs, la méthode la plus directe est de vérifier que :",
        options: [
            "\\( \\vec{AB} = \\vec{DC} \\) (côtés opposés égaux comme vecteurs)",
            "AB = CD uniquement en longueur",
            "les diagonales sont perpendiculaires",
            "les quatre côtés ont la même longueur"
        ],
        correct: "\\( \\vec{AB} = \\vec{DC} \\) (côtés opposés égaux comme vecteurs)",
        expl: "L'égalité vectorielle AB=DC traduit à la fois le parallélisme et l'égalité des longueurs des côtés opposés, ce qui suffit à prouver un parallélogramme ABCD."
    },
    {
        q: "Pour démontrer qu'un triangle ABC est rectangle en A à l'aide des coordonnées, on peut utiliser :",
        options: [
            "le calcul de \\( AB^2 + AC^2 \\) et \\( BC^2 \\) via les normes de vecteurs (Pythagore)",
            "uniquement le calcul du déterminant de AB et AC",
            "uniquement la colinéarité de AB et AC",
            "le calcul des coordonnées du milieu de [BC]"
        ],
        correct: "le calcul de \\( AB^2 + AC^2 \\) et \\( BC^2 \\) via les normes de vecteurs (Pythagore)",
        expl: "On calcule les normes des vecteurs AB, AC et BC (avec la formule √(a²+b²)) puis on vérifie la relation de Pythagore."
    },
    {
        q: "Pour démontrer qu'un quadrilatère IJKL est un losange à l'aide des coordonnées, il faut en particulier vérifier que :",
        options: [
            "c'est un parallélogramme (côtés opposés égaux comme vecteurs) ET que deux côtés consécutifs ont la même longueur",
            "les diagonales sont parallèles",
            "seulement que c'est un parallélogramme",
            "seulement que deux côtés ont la même longueur"
        ],
        correct: "c'est un parallélogramme (côtés opposés égaux comme vecteurs) ET que deux côtés consécutifs ont la même longueur",
        expl: "Un losange est un parallélogramme particulier dont tous les côtés ont la même longueur ; il suffit de vérifier l'égalité de deux côtés consécutifs en plus du parallélogramme."
    },
    {
        q: "Pour montrer que deux vecteurs donnés en fonction d'un paramètre x sont colinéaires pour toute valeur de x, la méthode la plus efficace est de :",
        options: [
            "calculer leur déterminant et montrer qu'il est toujours nul",
            "calculer leur norme pour chaque valeur de x",
            "tester quelques valeurs numériques de x uniquement",
            "vérifier qu'ils ont la même origine"
        ],
        correct: "calculer leur déterminant et montrer qu'il est toujours nul",
        expl: "Le déterminant, calculé littéralement en fonction de x, permet de prouver la colinéarité pour toute valeur du paramètre s'il se simplifie en 0."
    },
    {
        q: "Existe-t-il un réel x tel que \\( \\vec{u}\\begin{pmatrix}5\\\\11\\end{pmatrix} \\) soit colinéaire à \\( \\vec{v}\\begin{pmatrix}3\\\\x-2\\end{pmatrix} \\) ?",
        options: [
            "Oui, en résolvant \\( 5(x-2) - 11 \\times 3 = 0 \\)",
            "Non, car u et v ne sont jamais colinéaires",
            "Oui, pour toute valeur de x",
            "Non, car le déterminant ne peut pas s'annuler ici"
        ],
        correct: "Oui, en résolvant \\( 5(x-2) - 11 \\times 3 = 0 \\)",
        expl: "On pose det(u,v)=0, soit 5(x−2)−33=0, ce qui donne une unique valeur de x pour laquelle les vecteurs sont colinéaires."
    },
    {
        q: "Dans un repère (O ; I ; J), les vecteurs de base sont notés :",
        options: ["\\( \\vec{e_1} = \\vec{OI} \\) et \\( \\vec{e_2} = \\vec{OJ} \\)", "\\( \\vec{e_1} = \\vec{IJ} \\) et \\( \\vec{e_2} = \\vec{OI} \\)", "\\( \\vec{e_1} = \\vec{OJ} \\) et \\( \\vec{e_2} = \\vec{OI} \\)", "\\( \\vec{e_1} = \\vec{IO} \\) et \\( \\vec{e_2} = \\vec{JO} \\)"],
        correct: "\\( \\vec{e_1} = \\vec{OI} \\) et \\( \\vec{e_2} = \\vec{OJ} \\)",
        expl: "Ce sont les deux vecteurs de base associés aux axes du repère (O;I;J)."
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
