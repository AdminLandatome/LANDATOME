// Petite fonction utilitaire : la bonne réponse est toujours construite à partir de "good",
// ce qui garantit qu'elle figure bien dans la liste des options (elles sont mélangées ensuite).
const Q = (q, good, bads, expl) => ({ q: q, options: [good, ...bads], correct: good, expl: expl });

// Raccourci d'écriture LaTeX : M("x^2") -> \( x^2 \)
const M = (s) => `\\( ${s} \\)`;

const questionsData = [

    // =====================================================
    // --- VOCABULAIRE : IMAGE, ANTÉCÉDENT, ENSEMBLE DE DÉFINITION ---
    // =====================================================
    Q(`Dans l'égalité ${M("f(3) = 7")}, on dit que :`,
      "7 est l'image de 3 par \\( f \\), et 3 est un antécédent de 7",
      ["3 est l'image de 7 par \\( f \\), et 7 est un antécédent de 3",
       "7 et 3 sont deux antécédents de 0",
       "3 est l'image de 7 et 7 est l'ensemble de définition"],
      "f(x) est l'image de x ; x est un antécédent de f(x)."),

    Q("Une fonction \\( f \\) définie sur \\( D \\) associe à chaque réel \\( x \\) de \\( D \\) :",
      "un unique réel noté \\( f(x) \\)",
      ["au moins un réel", "exactement deux réels", "un intervalle de réels"],
      "Définition n°1 : à chaque x correspond un unique réel f(x). C'est ce qui distingue une fonction d'une simple relation."),

    Q("L'ensemble de définition \\( D_f \\) d'une fonction \\( f \\) est :",
      "l'ensemble des réels \\( x \\) pour lesquels \\( f(x) \\) existe",
      ["l'ensemble de toutes les images",
       "l'ensemble des antécédents de 0",
       "l'ensemble des solutions de \\( f(x) = 0 \\)"],
      "D_f est l'ensemble des valeurs de x qu'on a le droit de « mettre dans » la fonction."),

    Q("La courbe représentative \\( C_f \\) de \\( f \\) est l'ensemble des points :",
      "\\( M(x\\,;\\,y) \\) tels que \\( x \\in D_f \\) et \\( y = f(x) \\)",
      ["\\( M(x\\,;\\,y) \\) tels que \\( x = f(y) \\)",
       "\\( M(x\\,;\\,y) \\) tels que \\( y = 0 \\)",
       "\\( M(x\\,;\\,y) \\) tels que \\( f(x) = 0 \\)"],
      "Définition n°2 : y = f(x) est une équation de C_f."),

    Q("Soit \\( A(a\\,;\\,b) \\) un point du plan. \\( A \\in C_f \\) si et seulement si :",
      "\\( a \\in D_f \\) et \\( b = f(a) \\)",
      ["\\( b \\in D_f \\) et \\( a = f(b) \\)", "\\( f(a) = 0 \\)", "\\( a = f(b) \\) uniquement"],
      "Propriété n°1 : pour tester l'appartenance, on remplace x par l'abscisse a et on compare f(a) à l'ordonnée b."),

    Q("Soit \\( f : x \\mapsto 2x^2 - 3x - 2 \\). Quelle est l'image de 3 ?",
      "\\( 7 \\)",
      ["\\( 25 \\)", "\\( 11 \\)", "\\( 1 \\)"],
      "f(3) = 2×3² − 3×3 − 2 = 18 − 9 − 2 = 7. Attention : 3² = 9 et non 6."),

    Q("Soit \\( f(x) = 2x^2 - 3x - 2 = (2x+1)(x-2) \\). Quels sont les antécédents de 0 ?",
      "\\( -\\dfrac{1}{2} \\) et \\( 2 \\)",
      ["\\( \\dfrac{1}{2} \\) et \\( 2 \\)", "\\( -\\dfrac{1}{2} \\) et \\( -2 \\)", "\\( 0 \\) et \\( 2 \\)"],
      "On résout (2x+1)(x−2) = 0 : équation produit nul, donc x = −1/2 ou x = 2."),

    Q("Avec \\( f(x) = 2x^2 - 3x - 2 \\), le point \\( B(-2\\,;\\,8) \\) appartient-il à \\( C_f \\) ?",
      "Non, car \\( f(-2) = 12 \\neq 8 \\)",
      ["Oui, car \\( f(-2) = 8 \\)", "Oui, car \\( f(8) = -2 \\)", "Non, car \\( f(-2) = -8 \\)"],
      "f(−2) = 2×4 + 6 − 2 = 12. Comme 12 ≠ 8, B n'est pas sur la courbe."),

    Q("Soit \\( f : x \\mapsto -3x + 5 \\). Quelle est l'image de \\( -2 \\) ?",
      "\\( 11 \\)",
      ["\\( -1 \\)", "\\( 1 \\)", "\\( -11 \\)"],
      "f(−2) = −3×(−2) + 5 = 6 + 5 = 11."),

    Q("Soit \\( g : x \\mapsto x^2 - 4 \\). Quels sont les antécédents de \\( -4 \\) par \\( g \\) ?",
      "Seulement \\( 0 \\)",
      ["\\( -2 \\) et \\( 2 \\)", "\\( -8 \\)", "Il n'y en a aucun"],
      "x² − 4 = −4 ⇔ x² = 0 ⇔ x = 0."),

    Q("Soit \\( g : x \\mapsto x^2 - 4 \\). Quels sont les antécédents de \\( -5 \\) par \\( g \\) ?",
      "Il n'y en a aucun",
      ["\\( -1 \\) et \\( 1 \\)", "\\( 1 \\) seulement", "\\( -9 \\)"],
      "x² − 4 = −5 ⇔ x² = −1, ce qui est impossible : un carré n'est jamais négatif."),

    Q("Soit \\( h(x) = \\dfrac{x-1}{x+2} \\) définie pour \\( x \\neq -2 \\). Quelle est la valeur de \\( h(-3) \\) ?",
      "\\( 4 \\)",
      ["\\( -4 \\)", "\\( \\dfrac{2}{5} \\)", "\\( \\dfrac{1}{4} \\)"],
      "h(−3) = (−3 − 1)/(−3 + 2) = (−4)/(−1) = 4."),

    Q("Soit \\( h(x) = \\dfrac{x-1}{x+2} \\) définie pour \\( x \\neq -2 \\). Quel est l'antécédent de 2 par \\( h \\) ?",
      "\\( -5 \\)",
      ["\\( 5 \\)", "\\( -3 \\)", "\\( -\\dfrac{1}{3} \\)"],
      "(x − 1)/(x + 2) = 2 ⇔ x − 1 = 2x + 4 ⇔ x = −5. Vérification : (−6)/(−3) = 2."),

    Q("Soit \\( f(x) = x^2 - 2x - 3 \\). Pour que le point \\( E(2\\,;\\,m) \\) appartienne à \\( C_f \\), il faut que \\( m \\) vaille :",
      "\\( -3 \\)",
      ["\\( 3 \\)", "\\( -7 \\)", "\\( -1 \\)"],
      "m = f(2) = 4 − 4 − 3 = −3."),

    Q("La courbe \\( C_f \\) coupe l'axe des ordonnées au point de coordonnées :",
      "\\( (0\\,;\\,f(0)) \\)",
      ["\\( (f(0)\\,;\\,0) \\)", "\\( (0\\,;\\,0) \\)", "\\( (x\\,;\\,0) \\) où \\( x \\) vérifie \\( f(x) = 0 \\)"],
      "Sur l'axe des ordonnées, l'abscisse vaut 0 ; l'ordonnée est donc f(0). La dernière proposition correspond aux points sur l'axe des abscisses."),

    Q("Soit \\( f(x) = x^2 - 2x - 3 = (x-3)(x+1) \\). Quels sont les points d'intersection de \\( C_f \\) avec l'axe des abscisses ?",
      "\\( (-1\\,;\\,0) \\) et \\( (3\\,;\\,0) \\)",
      ["\\( (1\\,;\\,0) \\) et \\( (-3\\,;\\,0) \\)", "\\( (0\\,;\\,-3) \\)", "\\( (0\\,;\\,-1) \\) et \\( (0\\,;\\,3) \\)"],
      "On résout f(x) = 0 : (x − 3)(x + 1) = 0 donne x = 3 ou x = −1. Le point (0 ; −3) est l'intersection avec l'axe des ordonnées."),

    // =====================================================
    // --- LECTURE GRAPHIQUE ---
    // =====================================================
    Q("Graphiquement, les antécédents d'un réel \\( k \\) par \\( f \\) sont :",
      "les abscisses des points d'intersection de \\( C_f \\) avec la droite d'équation \\( y = k \\)",
      ["les ordonnées des points d'intersection de \\( C_f \\) avec la droite d'équation \\( y = k \\)",
       "les abscisses des points d'intersection de \\( C_f \\) avec la droite d'équation \\( x = k \\)",
       "les ordonnées des points d'intersection de \\( C_f \\) avec la droite d'équation \\( x = k \\)"],
      "On trace la droite horizontale y = k et on lit les abscisses des points communs avec la courbe."),

    Q("Graphiquement, résoudre \\( f(x) < k \\) revient à chercher :",
      "les abscisses des points de la courbe situés strictement sous la droite \\( y = k \\)",
      ["les ordonnées des points de la courbe situés strictement sous la droite \\( y = k \\)",
       "les abscisses des points de la courbe situés strictement au-dessus de la droite \\( y = k \\)",
       "les abscisses des points d'intersection avec l'axe des abscisses"],
      "Méthode n°1 : on regarde où la courbe est sous la droite horizontale, et on lit les abscisses correspondantes."),

    Q("Graphiquement, les solutions de \\( f(x) = g(x) \\) sont :",
      "les abscisses des points d'intersection de \\( C_f \\) et \\( C_g \\)",
      ["les ordonnées des points d'intersection de \\( C_f \\) et \\( C_g \\)",
       "les abscisses des points où \\( C_f \\) coupe l'axe des abscisses",
       "les points où \\( C_f \\) est au-dessus de \\( C_g \\)"],
      "Méthode n°1 : on cherche les abscisses des points communs aux deux courbes."),

    Q("Les courbes de \\( f : x \\mapsto x^2 \\) et \\( g : x \\mapsto x + 2 \\) se coupent aux points d'abscisses \\( -1 \\) et \\( 2 \\). Quel est l'ensemble des solutions de \\( f(x) < g(x) \\) ?",
      "\\( ]-1\\,;\\,2[ \\)",
      ["\\( ]-\\infty\\,;\\,-1[ \\cup ]2\\,;\\,+\\infty[ \\)", "\\( [-1\\,;\\,2] \\)", "\\( \\{-1\\,;\\,2\\} \\)"],
      "La parabole est strictement sous la droite entre les deux points d'intersection, bornes exclues puisque l'inégalité est stricte."),

    Q("Les courbes de \\( f : x \\mapsto x^2 \\) et \\( g : x \\mapsto x + 2 \\) se coupent aux points d'abscisses \\( -1 \\) et \\( 2 \\). Quel est l'ensemble des solutions de \\( f(x) \\geq g(x) \\) ?",
      "\\( ]-\\infty\\,;\\,-1] \\cup [2\\,;\\,+\\infty[ \\)",
      ["\\( [-1\\,;\\,2] \\)", "\\( ]-1\\,;\\,2[ \\)", "\\( ]-\\infty\\,;\\,-1[ \\cup ]2\\,;\\,+\\infty[ \\)"],
      "C'est le complémentaire de ]−1 ; 2[, et les bornes sont incluses (inégalité large) : égalité en −1 et en 2."),

    Q("Pour tout réel \\( x \\), \\( x^2 - (x+2) \\) est égal à :",
      "\\( (x-2)(x+1) \\)",
      ["\\( (x+2)(x-1) \\)", "\\( (x-2)(x-1) \\)", "\\( x(x-1) \\)"],
      "(x − 2)(x + 1) = x² + x − 2x − 2 = x² − x − 2 = x² − (x + 2)."),

    // =====================================================
    // --- PUISSANCES ---
    // =====================================================
    Q("Que vaut \\( 2^{-3} \\) ?",
      "\\( \\dfrac{1}{8} \\)",
      ["\\( -8 \\)", "\\( -6 \\)", "\\( \\dfrac{1}{6} \\)"],
      "a^(−n) = 1/aⁿ, donc 2^(−3) = 1/2³ = 1/8."),

    Q("Que vaut \\( (-5{,}1)^0 \\) ?",
      "\\( 1 \\)",
      ["\\( 0 \\)", "\\( -5{,}1 \\)", "Cela n'existe pas"],
      "Par convention, a⁰ = 1 pour tout nombre a non nul."),

    Q("Que vaut \\( -7^4 \\) ?",
      "\\( -2\\,401 \\)",
      ["\\( 2\\,401 \\)", "\\( -28 \\)", "\\( 28 \\)"],
      "−7⁴ = −(7×7×7×7) = −2 401. En revanche (−7)⁴ = 2 401 car les parenthèses changent tout."),

    Q("Que vaut \\( (-2)^4 \\) ?",
      "\\( 16 \\)",
      ["\\( -16 \\)", "\\( 8 \\)", "\\( -8 \\)"],
      "(−2)⁴ = (−2)×(−2)×(−2)×(−2) = 16. L'exposant est pair : le résultat est positif."),

    Q("Quel est le signe de \\( (-3)^{-5} \\) ?",
      "Négatif",
      ["Positif", "Nul", "On ne peut pas savoir"],
      "La base est négative et l'exposant −5 est impair : le résultat est négatif."),

    Q("Pour \\( a \\neq 0 \\) et des entiers \\( m \\) et \\( n \\), \\( a^m \\times a^n \\) est égal à :",
      "\\( a^{m+n} \\)",
      ["\\( a^{m \\times n} \\)", "\\( a^{m-n} \\)", "\\( 2a^{m+n} \\)"],
      "On ajoute les exposants quand on multiplie des puissances de même base."),

    Q("Parmi ces égalités, laquelle est fausse en général ?",
      "\\( (a+b)^n = a^n + b^n \\)",
      ["\\( (a \\times b)^n = a^n \\times b^n \\)",
       "\\( (a^m)^n = a^{m \\times n} \\)",
       "\\( \\dfrac{a^m}{a^n} = a^{m-n} \\)"],
      "Attention : en général (a + b)ⁿ ≠ aⁿ + bⁿ dès que n ≥ 2. Par exemple (1 + 2)² = 9 mais 1² + 2² = 5."),

    Q("Simplifier \\( 2^5 \\times 2^{-3} \\).",
      "\\( 4 \\)",
      ["\\( \\dfrac{1}{4} \\)", "\\( 256 \\)", "\\( 8 \\)"],
      "2⁵ × 2⁻³ = 2^(5−3) = 2² = 4."),

    Q("Simplifier \\( \\dfrac{5^{-2}}{5^4} \\).",
      "\\( 5^{-6} \\)",
      ["\\( 5^{2} \\)", "\\( 5^{-8} \\)", "\\( 5^{-2} \\)"],
      "On soustrait les exposants : −2 − 4 = −6."),

    Q("Simplifier \\( (3^{-2})^3 \\).",
      "\\( 3^{-6} \\)",
      ["\\( 3^{-5} \\)", "\\( 3^{6} \\)", "\\( 3^{-8} \\)"],
      "(aᵐ)ⁿ = a^(m×n) : (−2) × 3 = −6."),

    Q("Pour \\( x \\neq 0 \\), simplifier \\( (2x^3)^2 \\times x^{-4} \\).",
      "\\( 4x^2 \\)",
      ["\\( 2x^2 \\)", "\\( 4x^{10} \\)", "\\( 4x^{-2} \\)"],
      "(2x³)² = 4x⁶ (le 2 aussi est élevé au carré), puis 4x⁶ × x⁻⁴ = 4x²."),

    Q("Laquelle de ces écritures est une écriture scientifique ?",
      "\\( 6{,}78 \\times 10^8 \\)",
      ["\\( 45{,}321 \\times 10^8 \\)", "\\( 0{,}758 \\times 10^8 \\)", "\\( 10 \\times 10^7 \\)"],
      "La mantisse doit avoir un seul chiffre non nul avant la virgule : elle est comprise entre 1 (inclus) et 10 (exclu)."),

    Q("Quelle est l'écriture scientifique de \\( 0{,}000\\,007\\,896 \\) ?",
      "\\( 7{,}896 \\times 10^{-6} \\)",
      ["\\( 7{,}896 \\times 10^{6} \\)", "\\( 7{,}896 \\times 10^{-5} \\)", "\\( 78{,}96 \\times 10^{-7} \\)"],
      "On déplace la virgule de 6 rangs vers la droite : exposant −6. La dernière proposition n'est pas une écriture scientifique."),

    Q("Quelle est la mantisse de \\( -450\\,000\\,000 \\) en écriture scientifique ?",
      "\\( -4{,}5 \\)",
      ["\\( 4{,}5 \\)", "\\( 450 \\)", "\\( 10^8 \\)"],
      "−450 000 000 = −4,5 × 10⁸. La mantisse est −4,5 et l'ordre de grandeur est 10⁸."),

    Q("La lumière se déplace à \\( 3 \\times 10^8 \\) m/s et la distance Terre-Soleil est d'environ \\( 1{,}5 \\times 10^{11} \\) m. Combien de temps met la lumière du Soleil pour atteindre la Terre ?",
      "\\( 500 \\) s, soit \\( 8 \\) min \\( 20 \\) s",
      ["\\( 50 \\) s", "\\( 5\\,000 \\) s, soit \\( 83 \\) min \\( 20 \\) s", "\\( 500 \\) s, soit \\( 5 \\) min"],
      "t = d/v = (1,5×10¹¹)/(3×10⁸) = 0,5×10³ = 500 s = 8 min + 20 s."),

    Q("Un globule rouge mesure environ \\( 7 \\times 10^{-6} \\) m de diamètre. Combien de globules alignés faut-il pour atteindre 1 cm (arrondi à l'unité) ?",
      "\\( 1\\,429 \\)",
      ["\\( 143 \\)", "\\( 14\\,286 \\)", "\\( 1\\,428 \\)"],
      "1 cm = 10⁻² m, donc 10⁻² / (7×10⁻⁶) ≈ 1 428,57, soit 1 429 une fois arrondi."),

    // =====================================================
    // --- RACINES CARRÉES ---
    // =====================================================
    Q("Pour \\( a \\geq 0 \\), la racine carrée \\( \\sqrt{a} \\) est :",
      "l'unique réel positif dont le carré vaut \\( a \\)",
      ["un réel dont le carré vaut \\( a \\)", "la moitié de \\( a \\)", "l'unique réel négatif dont le carré vaut \\( a \\)"],
      "Définition n°5 : √a ≥ 0 et (√a)² = a. Par exemple √9 = 3 (et non −3)."),

    Q("Que vaut \\( \\sqrt{(-3)^2} \\) ?",
      "\\( 3 \\)",
      ["\\( -3 \\)", "\\( 9 \\)", "Cela n'existe pas"],
      "√((−3)²) = √9 = 3 = |−3|."),

    Q("Pour tout réel \\( a \\), \\( \\sqrt{a^2} \\) est égal à :",
      "\\( |a| \\)",
      ["\\( a \\)", "\\( -a \\)", "\\( a^2 \\)"],
      "Propriété n°4 : √(a²) = |a|. C'est a si a ≥ 0 et −a si a < 0."),

    Q("Pour \\( a \\geq 0 \\) et \\( b \\geq 0 \\), laquelle de ces égalités est toujours vraie ?",
      "\\( \\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b} \\)",
      ["\\( \\sqrt{a+b} = \\sqrt{a} + \\sqrt{b} \\)", "\\( \\sqrt{a^2+b^2} = a + b \\)", "\\( \\sqrt{a^2} = a \\)"],
      "Propriété n°5. La somme ne se « distribue » pas : √(9+16) = 5 mais √9 + √16 = 7. Et √(a²) = a seulement si a ≥ 0."),

    Q("Que vaut \\( \\sqrt{9+16} \\) ?",
      "\\( 5 \\)",
      ["\\( 7 \\)", "\\( 25 \\)", "\\( 12 \\)"],
      "√(9 + 16) = √25 = 5. Ne pas confondre avec √9 + √16 = 7."),

    Q("Que vaut \\( \\sqrt{0{,}25} \\) ?",
      "\\( 0{,}5 \\)",
      ["\\( 0{,}05 \\)", "\\( 0{,}125 \\)", "\\( 5 \\)"],
      "0,5² = 0,25."),

    Q("Que vaut \\( \\sqrt{\\dfrac{49}{16}} \\) ?",
      "\\( \\dfrac{7}{4} \\)",
      ["\\( \\dfrac{49}{4} \\)", "\\( \\dfrac{7}{16} \\)", "\\( \\dfrac{7}{2} \\)"],
      "√(49/16) = √49 / √16 = 7/4."),

    Q("Écrire \\( \\sqrt{50} \\) sous la forme \\( a\\sqrt{b} \\) avec \\( b \\) le plus petit possible.",
      "\\( 5\\sqrt{2} \\)",
      ["\\( 25\\sqrt{2} \\)", "\\( 2\\sqrt{5} \\)", "\\( 10\\sqrt{5} \\)"],
      "√50 = √(25 × 2) = √25 × √2 = 5√2. On cherche le plus grand carré parfait qui divise 50."),

    Q("Écrire \\( \\sqrt{45} \\) sous la forme \\( a\\sqrt{b} \\) avec \\( b \\) le plus petit possible.",
      "\\( 3\\sqrt{5} \\)",
      ["\\( 9\\sqrt{5} \\)", "\\( 5\\sqrt{3} \\)", "\\( 15 \\)"],
      "√45 = √(9 × 5) = 3√5."),

    Q("Écrire \\( \\sqrt{98} \\) sous la forme \\( a\\sqrt{b} \\) avec \\( b \\) le plus petit possible.",
      "\\( 7\\sqrt{2} \\)",
      ["\\( 49\\sqrt{2} \\)", "\\( 14\\sqrt{7} \\)", "\\( 2\\sqrt{7} \\)"],
      "√98 = √(49 × 2) = 7√2."),

    Q("Simplifier \\( \\sqrt{18} + \\sqrt{50} - \\sqrt{8} \\).",
      "\\( 6\\sqrt{2} \\)",
      ["\\( \\sqrt{60} \\)", "\\( 10\\sqrt{2} \\)", "\\( 4\\sqrt{2} \\)"],
      "√18 = 3√2, √50 = 5√2 et √8 = 2√2. Donc 3√2 + 5√2 − 2√2 = 6√2."),

    Q("Développer \\( (3 + \\sqrt{2})^2 \\).",
      "\\( 11 + 6\\sqrt{2} \\)",
      ["\\( 11 \\)", "\\( 9 + 6\\sqrt{2} \\)", "\\( 11 + 3\\sqrt{2} \\)"],
      "(3 + √2)² = 9 + 2×3×√2 + (√2)² = 9 + 6√2 + 2 = 11 + 6√2."),

    Q("Calculer \\( (\\sqrt{5} - 2)(\\sqrt{5} + 2) \\).",
      "\\( 1 \\)",
      ["\\( 3 \\)", "\\( 9 \\)", "\\( -1 \\)"],
      "Identité remarquable (a − b)(a + b) = a² − b² : (√5)² − 2² = 5 − 4 = 1."),

    Q("Calculer \\( \\sqrt{12} \\times \\sqrt{27} \\).",
      "\\( 18 \\)",
      ["\\( 9 \\)", "\\( 36 \\)", "\\( \\sqrt{39} \\)"],
      "√12 × √27 = √324 = 18 (ou 2√3 × 3√3 = 6 × 3 = 18)."),

    Q("Calculer \\( \\dfrac{\\sqrt{45}}{\\sqrt{5}} \\).",
      "\\( 3 \\)",
      ["\\( 9 \\)", "\\( 5 \\)", "\\( \\sqrt{40} \\)"],
      "√45 / √5 = √(45/5) = √9 = 3."),

    Q("Le nombre \\( F = (3 - \\sqrt{5})^2 + 6\\sqrt{5} \\) est égal à :",
      "\\( 14 \\)",
      ["\\( 9 \\)", "\\( 14 - 12\\sqrt{5} \\)", "\\( 14 + 12\\sqrt{5} \\)"],
      "(3 − √5)² = 9 − 6√5 + 5 = 14 − 6√5. En ajoutant 6√5, il reste 14 : c'est bien un entier."),

    // =====================================================
    // --- VALEUR ABSOLUE ---
    // =====================================================
    Q("La valeur absolue d'un réel \\( a \\), notée \\( |a| \\), est :",
      "la distance de \\( a \\) à 0",
      ["le carré de \\( a \\)", "l'opposé de \\( a \\)", "toujours égale à \\( a \\)"],
      "Définition n°6 : |a| = a si a ≥ 0 et |a| = −a si a < 0. C'est toujours un nombre positif ou nul."),

    Q("Écrire \\( |\\pi - 4| \\) sans valeur absolue.",
      "\\( 4 - \\pi \\)",
      ["\\( \\pi - 4 \\)", "\\( \\pi + 4 \\)", "\\( \\pi \\)"],
      "π ≈ 3,14 < 4 donc π − 4 est négatif : |π − 4| = −(π − 4) = 4 − π."),

    Q("Écrire \\( |1 - \\sqrt{2}| \\) sans valeur absolue.",
      "\\( \\sqrt{2} - 1 \\)",
      ["\\( 1 - \\sqrt{2} \\)", "\\( 1 + \\sqrt{2} \\)", "\\( -1 - \\sqrt{2} \\)"],
      "√2 ≈ 1,41 > 1 donc 1 − √2 est négatif : |1 − √2| = √2 − 1."),

    Q("Quelle est la distance entre les réels \\( -3 \\) et \\( 5 \\) ?",
      "\\( 8 \\)",
      ["\\( 2 \\)", "\\( -8 \\)", "\\( 15 \\)"],
      "|5 − (−3)| = |8| = 8. Une distance est toujours positive."),

    Q("Soit \\( a \\) un réel et \\( r > 0 \\). \\( |x - a| \\leq r \\) équivaut à :",
      "\\( x \\in [a - r\\,;\\,a + r] \\)",
      ["\\( x \\in [r - a\\,;\\,r + a] \\)", "\\( x \\in [-r\\,;\\,r] \\)", "\\( x \\in ]-\\infty\\,;\\,a - r] \\cup [a + r\\,;\\,+\\infty[ \\)"],
      "Propriété n°6 : les réels dont la distance à a est au plus r forment l'intervalle de centre a et de rayon r."),

    Q("Traduire \\( |x - 3| \\leq 2 \\) par un intervalle.",
      "\\( [1\\,;\\,5] \\)",
      ["\\( [-1\\,;\\,5] \\)", "\\( [-5\\,;\\,-1] \\)", "\\( [1\\,;\\,3] \\)"],
      "Centre 3, rayon 2 : [3 − 2 ; 3 + 2] = [1 ; 5]."),

    Q("Traduire \\( |x + 4| \\leq 1 \\) par un intervalle.",
      "\\( [-5\\,;\\,-3] \\)",
      ["\\( [3\\,;\\,5] \\)", "\\( [-4\\,;\\,-3] \\)", "\\( [-5\\,;\\,1] \\)"],
      "|x + 4| = |x − (−4)| : le centre est −4 (et non 4), le rayon 1. Donc [−5 ; −3]."),

    Q("Écrire \\( x \\in [2\\,;\\,8] \\) sous la forme \\( |x - a| \\leq r \\).",
      "\\( |x - 5| \\leq 3 \\)",
      ["\\( |x - 3| \\leq 5 \\)", "\\( |x - 2| \\leq 8 \\)", "\\( |x - 8| \\leq 2 \\)"],
      "Le centre est le milieu (2 + 8)/2 = 5 et le rayon est la demi-longueur (8 − 2)/2 = 3."),

    Q("Une température \\( T \\) est conforme si elle diffère de 37 °C d'au plus 0,5 °C. Quelle condition traduit cela ?",
      "\\( |T - 37| \\leq 0{,}5 \\)",
      ["\\( |T + 37| \\leq 0{,}5 \\)", "\\( |T - 0{,}5| \\leq 37 \\)", "\\( |T - 37| \\geq 0{,}5 \\)"],
      "« Diffère de 37 d'au plus 0,5 » : la distance entre T et 37 est inférieure ou égale à 0,5. Soit T ∈ [36,5 ; 37,5]."),

    // =====================================================
    // --- ÉQUATIONS x² = k ET ISOLER UNE VARIABLE ---
    // =====================================================
    Q("Combien l'équation \\( x^2 = k \\) a-t-elle de solutions dans \\( \\mathbb{R} \\) ?",
      "Deux si \\( k > 0 \\), une si \\( k = 0 \\), aucune si \\( k < 0 \\)",
      ["Toujours deux", "Une seule, \\( \\sqrt{k} \\), si \\( k \\geq 0 \\)", "Deux si \\( k \\geq 0 \\), aucune sinon"],
      "Propriété n°7. Si k > 0 les solutions sont −√k et √k ; si k = 0 seule 0 convient ; si k < 0 un carré ne peut pas être négatif."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( x^2 = -9 \\).",
      "Aucune solution",
      ["\\( \\{-3\\,;\\,3\\} \\)", "\\( \\{3\\} \\)", "\\( \\{-3\\} \\)"],
      "Un carré est toujours positif ou nul : l'équation n'a pas de solution réelle."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( 5x^2 = 20 \\).",
      "\\( \\{-2\\,;\\,2\\} \\)",
      ["\\( \\{2\\} \\)", "\\( \\{-4\\,;\\,4\\} \\)", "\\( \\{-\\sqrt{20}\\,;\\,\\sqrt{20}\\} \\)"],
      "5x² = 20 ⇔ x² = 4 ⇔ x = −2 ou x = 2."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( (x - 2)^2 = 9 \\).",
      "\\( \\{-1\\,;\\,5\\} \\)",
      ["\\( \\{1\\,;\\,5\\} \\)", "\\( \\{5\\} \\)", "\\( \\{-5\\,;\\,1\\} \\)"],
      "(x − 2)² = 9 ⇔ x − 2 = 3 ou x − 2 = −3 ⇔ x = 5 ou x = −1."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( 2x^2 - 7 = 11 \\).",
      "\\( \\{-3\\,;\\,3\\} \\)",
      ["\\( \\{3\\} \\)", "\\( \\{-9\\,;\\,9\\} \\)", "\\( \\{-2\\,;\\,2\\} \\)"],
      "2x² = 18 ⇔ x² = 9 ⇔ x = ±3."),

    Q("Un disque a pour aire \\( S \\), avec \\( S = \\pi r^2 \\) et \\( r > 0 \\). Alors \\( r \\) est égal à :",
      "\\( \\sqrt{\\dfrac{S}{\\pi}} \\)",
      ["\\( \\dfrac{S}{\\pi} \\)", "\\( \\dfrac{\\sqrt{S}}{\\pi} \\)", "\\( \\sqrt{S} - \\pi \\)"],
      "S = πr² ⇔ r² = S/π, et comme r > 0 : r = √(S/π)."),

    Q("Un carré a pour aire 50 cm². Quelle est la valeur exacte simplifiée de la longueur de son côté ?",
      "\\( 5\\sqrt{2} \\) cm",
      ["\\( 25 \\) cm", "\\( 10 \\) cm", "\\( 5\\sqrt{5} \\) cm"],
      "c² = 50 donc c = √50 = 5√2 cm."),

    Q("Un carré a pour aire 50 cm². Quelle est la longueur de sa diagonale ?",
      "\\( 10 \\) cm",
      ["\\( 5\\sqrt{2} \\) cm", "\\( 50 \\) cm", "\\( 10\\sqrt{2} \\) cm"],
      "D'après Pythagore, d² = c² + c² = 100, donc d = 10 cm. (Ou : d = c√2 = 5√2 × √2 = 10.)"),

    // =====================================================
    // --- ENSEMBLE DE DÉFINITION ---
    // =====================================================
    Q("Une expression n'est définie que si :",
      "les dénominateurs sont non nuls et les expressions sous les racines carrées sont positives ou nulles",
      ["les dénominateurs sont positifs et les expressions sous les racines sont strictement positives",
       "les dénominateurs sont non nuls et les expressions sous les racines sont non nulles",
       "les dénominateurs sont strictement positifs uniquement"],
      "Méthode n°4 : on interdit la division par zéro et les racines de nombres négatifs."),

    Q("Quel est l'ensemble de définition de \\( f(x) = \\dfrac{3}{x - 2} \\) ?",
      "\\( \\mathbb{R} \\setminus \\{2\\} \\)",
      ["\\( \\mathbb{R} \\setminus \\{-2\\} \\)", "\\( \\mathbb{R} \\)", "\\( ]2\\,;\\,+\\infty[ \\)"],
      "Il faut x − 2 ≠ 0, donc x ≠ 2."),

    Q("Quel est l'ensemble de définition de \\( g(x) = \\sqrt{3x + 6} \\) ?",
      "\\( [-2\\,;\\,+\\infty[ \\)",
      ["\\( ]-2\\,;\\,+\\infty[ \\)", "\\( [2\\,;\\,+\\infty[ \\)", "\\( ]-\\infty\\,;\\,-2] \\)"],
      "Il faut 3x + 6 ≥ 0 ⇔ x ≥ −2. La borne −2 est incluse car √0 existe."),

    Q("Quel est l'ensemble de définition de \\( f(x) = \\sqrt{4 - 2x} \\) ?",
      "\\( ]-\\infty\\,;\\,2] \\)",
      ["\\( [2\\,;\\,+\\infty[ \\)", "\\( ]-\\infty\\,;\\,2[ \\)", "\\( ]-\\infty\\,;\\,-2] \\)"],
      "4 − 2x ≥ 0 ⇔ −2x ≥ −4 ⇔ x ≤ 2 (on change le sens en divisant par −2)."),

    Q("Quel est l'ensemble de définition de \\( h(x) = \\dfrac{1}{\\sqrt{x - 1}} \\) ?",
      "\\( ]1\\,;\\,+\\infty[ \\)",
      ["\\( [1\\,;\\,+\\infty[ \\)", "\\( \\mathbb{R} \\setminus \\{1\\} \\)", "\\( \\mathbb{R} \\)"],
      "Il faut x − 1 ≥ 0 pour la racine, et √(x − 1) ≠ 0 pour le dénominateur : x − 1 > 0, donc x > 1."),

    Q("Quel est l'ensemble de définition de \\( l(x) = \\sqrt{x^2 + 1} \\) ?",
      "\\( \\mathbb{R} \\)",
      ["\\( [-1\\,;\\,1] \\)", "\\( [0\\,;\\,+\\infty[ \\)", "\\( \\mathbb{R} \\setminus \\{-1\\,;\\,1\\} \\)"],
      "Pour tout x, x² + 1 ≥ 1 > 0 : on peut toujours calculer la racine."),

    Q("Quel est l'ensemble de définition de \\( h(x) = \\dfrac{1}{2x - 6} \\) ?",
      "\\( \\mathbb{R} \\setminus \\{3\\} \\)",
      ["\\( \\mathbb{R} \\setminus \\{-3\\} \\)", "\\( \\mathbb{R} \\setminus \\{6\\} \\)", "\\( \\mathbb{R} \\)"],
      "2x − 6 = 0 ⇔ x = 3."),

    Q("Quel est l'ensemble de définition de \\( m(x) = \\dfrac{x - 2}{x^2 - 9} \\) ?",
      "\\( \\mathbb{R} \\setminus \\{-3\\,;\\,3\\} \\)",
      ["\\( \\mathbb{R} \\setminus \\{3\\} \\)", "\\( \\mathbb{R} \\setminus \\{9\\} \\)", "\\( \\mathbb{R} \\setminus \\{2\\} \\)"],
      "x² − 9 = 0 ⇔ x² = 9 ⇔ x = −3 ou x = 3 : deux valeurs interdites."),

    Q("Quel est l'ensemble de définition de \\( k(x) = \\dfrac{1}{\\sqrt{x + 3}} \\) ?",
      "\\( ]-3\\,;\\,+\\infty[ \\)",
      ["\\( [-3\\,;\\,+\\infty[ \\)", "\\( ]3\\,;\\,+\\infty[ \\)", "\\( \\mathbb{R} \\setminus \\{-3\\} \\)"],
      "Il faut x + 3 > 0 (strictement, car la racine est au dénominateur), donc x > −3."),

    // =====================================================
    // --- FONCTIONS DE RÉFÉRENCE ---
    // =====================================================
    Q("Quel est l'ensemble de définition de la fonction inverse \\( x \\mapsto \\dfrac{1}{x} \\) ?",
      "\\( \\mathbb{R} \\setminus \\{0\\} \\)",
      ["\\( \\mathbb{R} \\)", "\\( [0\\,;\\,+\\infty[ \\)", "\\( ]0\\,;\\,+\\infty[ \\)"],
      "On ne peut pas diviser par 0."),

    Q("Quel est l'ensemble de définition de la fonction racine carrée ?",
      "\\( [0\\,;\\,+\\infty[ \\)",
      ["\\( \\mathbb{R} \\)", "\\( ]0\\,;\\,+\\infty[ \\)", "\\( \\mathbb{R} \\setminus \\{0\\} \\)"],
      "On peut calculer √x pour tout x ≥ 0, y compris x = 0."),

    Q("La courbe représentative de la fonction inverse s'appelle :",
      "une hyperbole",
      ["une parabole", "une demi-parabole", "une cubique"],
      "La fonction carré a une parabole, la racine carrée une demi-parabole, le cube une cubique."),

    Q("Parmi ces fonctions de référence, lesquelles ont des courbes symétriques par rapport à l'axe des ordonnées ?",
      "Le carré et la valeur absolue",
      ["Le cube et l'inverse", "Le carré et le cube", "L'inverse et la racine carrée"],
      "Deux nombres opposés ont la même image par le carré et par la valeur absolue : (−x)² = x² et |−x| = |x|."),

    Q("La courbe de la fonction cube est symétrique par rapport :",
      "à l'origine du repère",
      ["à l'axe des ordonnées", "à l'axe des abscisses", "à la droite d'équation \\( y = x \\)"],
      "Deux nombres opposés ont des images opposées : (−x)³ = −x³. Même chose pour la fonction inverse."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( \\sqrt{x} = -2 \\).",
      "Aucune solution",
      ["\\( \\{4\\} \\)", "\\( \\{-4\\} \\)", "\\( \\{2\\} \\)"],
      "Une racine carrée est toujours positive ou nulle, elle ne peut pas valoir −2."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( |x| = 3{,}5 \\).",
      "\\( \\{-3{,}5\\,;\\,3{,}5\\} \\)",
      ["\\( \\{3{,}5\\} \\)", "\\( \\{-3{,}5\\} \\)", "\\( \\{12{,}25\\} \\)"],
      "Deux nombres sont à la distance 3,5 de 0 : −3,5 et 3,5."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( x^3 = -27 \\).",
      "\\( \\{-3\\} \\)",
      ["\\( \\{3\\} \\)", "\\( \\{-3\\,;\\,3\\} \\)", "Aucune solution"],
      "La fonction cube est croissante sur ℝ : elle prend chaque valeur une seule fois. (−3)³ = −27."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( \\dfrac{1}{x} = -4 \\).",
      "\\( \\left\\{-\\dfrac{1}{4}\\right\\} \\)",
      ["\\( \\{-4\\} \\)", "\\( \\left\\{\\dfrac{1}{4}\\right\\} \\)", "Aucune solution"],
      "1/x = −4 ⇔ x = 1/(−4) = −1/4."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( x^2 < 4 \\).",
      "\\( ]-2\\,;\\,2[ \\)",
      ["\\( ]-\\infty\\,;\\,2[ \\)", "\\( ]-\\infty\\,;\\,-2[ \\cup ]2\\,;\\,+\\infty[ \\)", "\\( [-2\\,;\\,2] \\)"],
      "x² < 4 ⇔ |x| < 2 ⇔ −2 < x < 2. Attention : x = −5 donne 25, qui n'est pas inférieur à 4."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( x^2 \\geq 9 \\).",
      "\\( ]-\\infty\\,;\\,-3] \\cup [3\\,;\\,+\\infty[ \\)",
      ["\\( [3\\,;\\,+\\infty[ \\)", "\\( [-3\\,;\\,3] \\)", "\\( ]-\\infty\\,;\\,-3[ \\cup ]3\\,;\\,+\\infty[ \\)"],
      "x² ≥ 9 ⇔ x ≤ −3 ou x ≥ 3 (inégalité large : les bornes sont incluses)."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( \\sqrt{x} \\leq 3 \\).",
      "\\( [0\\,;\\,9] \\)",
      ["\\( [0\\,;\\,3] \\)", "\\( ]-\\infty\\,;\\,9] \\)", "\\( [0\\,;\\,\\sqrt{3}] \\)"],
      "√x existe pour x ≥ 0, et √x ≤ 3 ⇔ x ≤ 9 (la racine est croissante)."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( \\dfrac{1}{x} > 2 \\).",
      "\\( \\left]0\\,;\\,\\dfrac{1}{2}\\right[ \\)",
      ["\\( \\left]\\dfrac{1}{2}\\,;\\,+\\infty\\right[ \\)", "\\( \\left]-\\infty\\,;\\,\\dfrac{1}{2}\\right[ \\)", "\\( ]0\\,;\\,2[ \\)"],
      "Il faut x > 0 (sinon 1/x est négatif), et sur ]0 ; +∞[ la fonction inverse est décroissante : 1/x > 2 ⇔ x < 1/2."),

    Q("Résoudre dans \\( \\mathbb{R} \\) : \\( x^3 > -8 \\).",
      "\\( ]-2\\,;\\,+\\infty[ \\)",
      ["\\( ]-\\infty\\,;\\,-2[ \\)", "\\( ]-8\\,;\\,+\\infty[ \\)", "\\( ]-2\\,;\\,2[ \\)"],
      "(−2)³ = −8 et la fonction cube est croissante : x³ > −8 ⇔ x > −2."),

    // =====================================================
    // --- FONCTIONS AFFINES ---
    // =====================================================
    Q("Pour une fonction affine \\( f(x) = mx + p \\), la courbe représentative est :",
      "une droite d'équation \\( y = mx + p \\)",
      ["une parabole", "une hyperbole", "une demi-droite"],
      "Propriété n°9. Elle coupe l'axe des ordonnées au point (0 ; p)."),

    Q("Une fonction affine \\( f(x) = mx + p \\) est linéaire lorsque :",
      "\\( p = 0 \\)",
      ["\\( m = 0 \\)", "\\( m = 1 \\)", "\\( p = 1 \\)"],
      "Si p = 0 alors f(x) = mx (fonction linéaire). Si m = 0 la fonction est constante."),

    Q("Pour une fonction affine \\( f(x) = mx + p \\) et \\( x_1 \\neq x_2 \\), le taux d'accroissement \\( \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1} \\) est égal à :",
      "\\( m \\)",
      ["\\( p \\)", "\\( m + p \\)", "\\( -\\dfrac{p}{m} \\)"],
      "Propriété n°10 : quand x augmente de 1, f(x) varie de m (le coefficient directeur)."),

    Q("Soit \\( f \\) affine avec \\( f(0) = 2 \\) et \\( f(3) = 8 \\). Quelle est l'expression de \\( f(x) \\) ?",
      "\\( 2x + 2 \\)",
      ["\\( 6x + 2 \\)", "\\( 3x + 2 \\)", "\\( 2x + 8 \\)"],
      "m = (8 − 2)/(3 − 0) = 2 et p = f(0) = 2."),

    Q("Soit \\( g \\) affine avec \\( g(-1) = 4 \\) et \\( g(2) = -5 \\). Quelle est l'expression de \\( g(x) \\) ?",
      "\\( -3x + 1 \\)",
      ["\\( 3x + 1 \\)", "\\( -3x - 1 \\)", "\\( -3x + 4 \\)"],
      "m = (−5 − 4)/(2 − (−1)) = −3. Puis −3×(−1) + p = 4 donne p = 1."),

    Q("Quelle est l'équation réduite de la droite passant par \\( A(-2\\,;\\,1) \\) et \\( B(4\\,;\\,4) \\) ?",
      "\\( y = \\dfrac{1}{2}x + 2 \\)",
      ["\\( y = \\dfrac{1}{2}x + 1 \\)", "\\( y = 2x + 5 \\)", "\\( y = -\\dfrac{1}{2}x + 2 \\)"],
      "m = (4 − 1)/(4 − (−2)) = 3/6 = 1/2. Puis 1 = (1/2)×(−2) + p donne p = 2."),

    Q("Soit \\( \\ell \\) une fonction linéaire telle que \\( \\ell(6) = -15 \\). Quelle est son expression ?",
      "\\( \\ell(x) = -2{,}5x \\)",
      ["\\( \\ell(x) = -15x \\)", "\\( \\ell(x) = 2{,}5x \\)", "\\( \\ell(x) = -0{,}4x \\)"],
      "Une fonction linéaire s'écrit mx, avec 6m = −15, donc m = −15/6 = −2,5."),

    Q("Soit \\( f(x) = mx + p \\) avec \\( m < 0 \\). La fonction \\( f \\) est :",
      "décroissante sur \\( \\mathbb{R} \\)",
      ["croissante sur \\( \\mathbb{R} \\)", "constante", "décroissante sur \\( ]-\\infty\\,;\\,0] \\) et croissante sur \\( [0\\,;\\,+\\infty[ \\)"],
      "Propriété n°11 : le sens de variation d'une fonction affine est donné par le signe de m."),

    Q("Une fonction affine \\( f(x) = mx + p \\) avec \\( m \\neq 0 \\) s'annule en :",
      "\\( x_0 = -\\dfrac{p}{m} \\)",
      ["\\( x_0 = \\dfrac{p}{m} \\)", "\\( x_0 = -\\dfrac{m}{p} \\)", "\\( x_0 = p \\)"],
      "mx + p = 0 ⇔ mx = −p ⇔ x = −p/m."),

    Q("Soit \\( f(x) = -2x + 7 \\). Pour quelles valeurs de \\( x \\) a-t-on \\( f(x) > 0 \\) ?",
      "\\( x < \\dfrac{7}{2} \\)",
      ["\\( x > \\dfrac{7}{2} \\)", "\\( x < -\\dfrac{7}{2} \\)", "\\( x > -\\dfrac{7}{2} \\)"],
      "f s'annule en 7/2 et m = −2 < 0 : f est positive avant 7/2 et négative après."),

    Q("La compagnie de taxi A facture 4 € de prise en charge plus 1,60 € par km. Combien coûte un trajet de 25 km ?",
      "\\( 44 \\) €",
      ["\\( 40 \\) €", "\\( 55 \\) €", "\\( 104 \\) €"],
      "f(x) = 1,6x + 4, donc f(25) = 40 + 4 = 44 €."),

    Q("Avec la compagnie A (\\( f(x) = 1{,}6x + 4 \\)) et un budget de 60 €, quelle distance maximale peut-on parcourir ?",
      "\\( 35 \\) km",
      ["\\( 37{,}5 \\) km", "\\( 27{,}3 \\) km environ", "\\( 56 \\) km"],
      "1,6x + 4 ≤ 60 ⇔ 1,6x ≤ 56 ⇔ x ≤ 35. (37,5 oublie la prise en charge.)"),

    Q("La compagnie A coûte \\( f(x) = 1{,}6x + 4 \\) et la compagnie B \\( g(x) = 2{,}2x \\). La compagnie A est plus avantageuse lorsque :",
      "\\( x > \\dfrac{20}{3} \\) (environ 6,7 km)",
      ["\\( x < \\dfrac{20}{3} \\)", "\\( x > 4 \\)", "\\( x > 2{,}5 \\)"],
      "1,6x + 4 < 2,2x ⇔ 4 < 0,6x ⇔ x > 4/0,6 = 20/3 ≈ 6,67. Pour les longs trajets, la prise en charge se « rentabilise »."),

    // =====================================================
    // --- VARIATIONS ET EXTREMUMS ---
    // =====================================================
    Q("Dire que \\( f \\) est strictement croissante sur un intervalle \\( I \\) signifie que :",
      "pour tous \\( a < b \\) dans \\( I \\), \\( f(a) < f(b) \\)",
      ["pour tous \\( a < b \\) dans \\( I \\), \\( f(a) > f(b) \\)",
       "pour tous \\( a < b \\) dans \\( I \\), \\( f(a) \\leq f(b) \\)",
       "il existe \\( a < b \\) dans \\( I \\) tels que \\( f(a) < f(b) \\)"],
      "Définition n°8 : une fonction croissante conserve l'ordre. Avec ≤ on obtient simplement « croissante »."),

    Q("Dire que \\( f(a) \\) est le maximum de \\( f \\) sur \\( I \\) signifie que :",
      "pour tout \\( x \\in I \\), \\( f(x) \\leq f(a) \\)",
      ["pour tout \\( x \\in I \\), \\( f(x) \\geq f(a) \\)", "\\( a \\) est le plus grand élément de \\( I \\)", "\\( f(a) = 0 \\)"],
      "Définition n°9 : le maximum est la plus grande valeur prise par f. Il ne se trouve pas forcément à l'extrémité de l'intervalle."),

    Q("Dans un tableau de variations, une flèche descendante signifie que la fonction est :",
      "strictement décroissante",
      ["strictement croissante", "constante", "négative"],
      "Méthode n°6 : flèche montante = strictement croissante, flèche descendante = strictement décroissante."),

    Q("Pour \\( f(x) = x^3 - 3x \\) sur \\( [-2\\,;\\,2] \\), le tableau de variations donne : \\( f(-2) = -2 \\), \\( f(-1) = 2 \\), \\( f(1) = -2 \\), \\( f(2) = 2 \\) (croissante, puis décroissante, puis croissante). Que peut-on dire du maximum ?",
      "Il vaut 2 et il est atteint en \\( -1 \\) et en \\( 2 \\)",
      ["Il vaut 2 et il est atteint seulement en \\( -1 \\)", "Il vaut \\( -1 \\) et il est atteint en 2", "Il vaut 2 et il est atteint en \\( 1 \\) et en \\( -2 \\)"],
      "Un extremum est une valeur, et elle peut être atteinte plusieurs fois."),

    Q("Voici le tableau de variations de \\( h \\) sur \\( [-3\\,;\\,5] \\) : \\( h(-3) = 1 \\), puis croissante jusqu'à \\( h(-1) = 4 \\), décroissante jusqu'à \\( h(2) = -2 \\), puis croissante jusqu'à \\( h(5) = 6 \\). Quel est le maximum de \\( h \\) sur \\( [-3\\,;\\,5] \\) ?",
      "\\( 6 \\), atteint en \\( 5 \\)",
      ["\\( 4 \\), atteint en \\( -1 \\)", "\\( 6 \\), atteint en \\( 2 \\)", "\\( 5 \\), atteint en \\( 6 \\)"],
      "Le maximum est la plus grande de toutes les valeurs du tableau : 6, en x = 5. Le nombre 4 n'est qu'un maximum « local »."),

    Q("Même fonction \\( h \\) (\\( h(-3) = 1 \\), \\( h(-1) = 4 \\), \\( h(2) = -2 \\), \\( h(5) = 6 \\), avec les variations croissante, décroissante, croissante). Comment se comparent \\( h(0) \\) et \\( h(1) \\) ?",
      "\\( h(0) > h(1) \\)",
      ["\\( h(0) < h(1) \\)", "\\( h(0) = h(1) \\)", "On ne peut pas les comparer"],
      "0 et 1 sont dans [−1 ; 2] où h est décroissante. Comme 0 < 1, on a h(0) > h(1) (la fonction inverse l'ordre)."),

    Q("Même fonction \\( h \\) (croissante sur \\( [-3\\,;\\,-1] \\), décroissante sur \\( [-1\\,;\\,2] \\), croissante sur \\( [2\\,;\\,5] \\)). Peut-on comparer \\( h(-2) \\) et \\( h(4) \\) avec ces seules informations ?",
      "Non, car \\( -2 \\) et \\( 4 \\) ne sont pas dans un même intervalle où \\( h \\) est monotone",
      ["Oui, \\( h(-2) < h(4) \\) car \\( -2 < 4 \\)", "Oui, \\( h(-2) > h(4) \\) car \\( h \\) est décroissante", "Oui, car \\( h \\) est croissante"],
      "La fonction n'est pas monotone sur [−3 ; 5] tout entier. On ne peut comparer les images que de deux nombres situés dans un même intervalle de monotonie."),

    Q("La fonction carré est :",
      "décroissante sur \\( ]-\\infty\\,;\\,0] \\) et croissante sur \\( [0\\,;\\,+\\infty[ \\)",
      ["croissante sur \\( \\mathbb{R} \\)", "décroissante sur \\( \\mathbb{R} \\)", "croissante sur \\( ]-\\infty\\,;\\,0] \\) et décroissante sur \\( [0\\,;\\,+\\infty[ \\)"],
      "Propriété n°13. Son minimum est 0, atteint en 0."),

    Q("La fonction inverse est :",
      "décroissante sur \\( ]-\\infty\\,;\\,0[ \\) et sur \\( ]0\\,;\\,+\\infty[ \\)",
      ["décroissante sur \\( \\mathbb{R} \\setminus \\{0\\} \\)", "croissante sur \\( ]0\\,;\\,+\\infty[ \\)", "décroissante sur \\( ]-\\infty\\,;\\,0[ \\) et croissante sur \\( ]0\\,;\\,+\\infty[ \\)"],
      "Attention à l'intervalle : −1 < 1 mais 1/(−1) = −1 < 1/1 = 1. On ne peut donc pas dire « décroissante sur ℝ∖{0} »."),

    Q("La fonction valeur absolue est :",
      "décroissante sur \\( ]-\\infty\\,;\\,0] \\) et croissante sur \\( [0\\,;\\,+\\infty[ \\)",
      ["croissante sur \\( \\mathbb{R} \\)", "décroissante sur \\( [0\\,;\\,+\\infty[ \\)", "décroissante sur \\( \\mathbb{R} \\)"],
      "Propriété n°13 : même tableau de variations que la fonction carré. Son minimum est 0, atteint en 0."),

    Q("Comparer \\( (-5)^2 \\) et \\( (-4)^2 \\).",
      "\\( (-5)^2 > (-4)^2 \\)",
      ["\\( (-5)^2 < (-4)^2 \\)", "\\( (-5)^2 = (-4)^2 \\)", "On ne peut pas les comparer"],
      "−5 < −4 ≤ 0 et la fonction carré est décroissante sur ]−∞ ; 0] : elle inverse l'ordre. 25 > 16."),

    Q("Comparer \\( 2{,}5^3 \\) et \\( 2{,}6^3 \\).",
      "\\( 2{,}5^3 < 2{,}6^3 \\)",
      ["\\( 2{,}5^3 > 2{,}6^3 \\)", "\\( 2{,}5^3 = 2{,}6^3 \\)", "On ne peut pas les comparer"],
      "La fonction cube est croissante sur ℝ : elle conserve l'ordre."),

    Q("Comparer \\( \\sqrt{3{,}2} \\) et \\( \\sqrt{3{,}1} \\).",
      "\\( \\sqrt{3{,}2} > \\sqrt{3{,}1} \\)",
      ["\\( \\sqrt{3{,}2} < \\sqrt{3{,}1} \\)", "\\( \\sqrt{3{,}2} = \\sqrt{3{,}1} \\)", "On ne peut pas les comparer"],
      "La fonction racine carrée est croissante sur [0 ; +∞[ et 3,2 > 3,1."),

    Q("Comparer \\( \\dfrac{1}{7} \\) et \\( \\dfrac{1}{8} \\).",
      "\\( \\dfrac{1}{7} > \\dfrac{1}{8} \\)",
      ["\\( \\dfrac{1}{7} < \\dfrac{1}{8} \\)", "\\( \\dfrac{1}{7} = \\dfrac{1}{8} \\)", "On ne peut pas les comparer"],
      "7 < 8 et la fonction inverse est décroissante sur ]0 ; +∞[ : elle inverse l'ordre."),

    Q("Comparer \\( \\dfrac{1}{-0{,}3} \\) et \\( \\dfrac{1}{-0{,}2} \\).",
      "\\( \\dfrac{1}{-0{,}3} > \\dfrac{1}{-0{,}2} \\)",
      ["\\( \\dfrac{1}{-0{,}3} < \\dfrac{1}{-0{,}2} \\)", "\\( \\dfrac{1}{-0{,}3} = \\dfrac{1}{-0{,}2} \\)", "On ne peut pas les comparer"],
      "−0,3 < −0,2 < 0 et la fonction inverse est décroissante sur ]−∞ ; 0[. Vérification : −3,33… > −5."),

    Q("Comparer \\( \\dfrac{1}{-2} \\) et \\( \\dfrac{1}{3} \\).",
      "\\( \\dfrac{1}{-2} < \\dfrac{1}{3} \\), car l'un est négatif et l'autre positif",
      ["\\( \\dfrac{1}{-2} > \\dfrac{1}{3} \\), car l'inverse est décroissante", "\\( \\dfrac{1}{-2} = \\dfrac{1}{3} \\)", "On ne peut pas les comparer"],
      "−2 et 3 ne sont pas dans le même intervalle de monotonie. On compare les signes : 1/(−2) = −0,5 < 0 < 1/3."),

    Q("Si \\( -3 \\leq x \\leq -1 \\), quel est l'encadrement de \\( x^2 \\) ?",
      "\\( 1 \\leq x^2 \\leq 9 \\)",
      ["\\( -9 \\leq x^2 \\leq -1 \\)", "\\( 0 \\leq x^2 \\leq 9 \\)", "\\( 1 \\leq x^2 \\leq 3 \\)"],
      "Sur ]−∞ ; 0] la fonction carré est décroissante : l'ordre est inversé. (−1)² = 1 est la plus petite valeur, (−3)² = 9 la plus grande."),

    Q("Si \\( 2 \\leq x \\leq 5 \\), quel est l'encadrement de \\( \\dfrac{1}{x} \\) ?",
      "\\( \\dfrac{1}{5} \\leq \\dfrac{1}{x} \\leq \\dfrac{1}{2} \\)",
      ["\\( \\dfrac{1}{2} \\leq \\dfrac{1}{x} \\leq \\dfrac{1}{5} \\)", "\\( 2 \\leq \\dfrac{1}{x} \\leq 5 \\)", "\\( -5 \\leq \\dfrac{1}{x} \\leq -2 \\)"],
      "La fonction inverse est décroissante sur ]0 ; +∞[ : elle inverse l'ordre. 1/5 est la plus petite valeur, 1/2 la plus grande."),

    Q("Pour \\( x \\in ]0\\,;\\,1[ \\), quelle comparaison est vraie entre \\( x \\) et \\( x^2 \\) ?",
      "\\( x > x^2 \\)",
      ["\\( x < x^2 \\)", "\\( x = x^2 \\)", "Cela dépend de \\( x \\) dans \\( ]0\\,;\\,1[ \\)"],
      "Propriété n°14. Par exemple 0,5 > 0,25. On le démontre avec x² − x = x(x − 1) < 0."),

    Q("Pour \\( x \\in ]1\\,;\\,+\\infty[ \\), quelle comparaison est vraie entre \\( x \\) et \\( x^2 \\) ?",
      "\\( x < x^2 \\)",
      ["\\( x > x^2 \\)", "\\( x = x^2 \\)", "Cela dépend de \\( x \\) dans \\( ]1\\,;\\,+\\infty[ \\)"],
      "Propriété n°14. Par exemple 3 < 9. Les deux courbes se croisent en 0 et en 1."),

    // =====================================================
    // --- SITUATIONS CONCRÈTES ET PYTHON ---
    // =====================================================
    Q("Un rectangle a un périmètre de 20 cm et une longueur \\( x \\) (en cm). Quelle est sa largeur ?",
      "\\( 10 - x \\)",
      ["\\( 20 - x \\)", "\\( 20 - 2x \\)", "\\( 10 - 2x \\)"],
      "Le demi-périmètre vaut 10 = longueur + largeur, donc largeur = 10 − x. L'aire est alors A(x) = x(10 − x)."),

    Q("Un rectangle a un périmètre de 20 cm. Son aire s'écrit \\( A(x) = 25 - (x - 5)^2 \\). Que peut-on en déduire ?",
      "L'aire maximale est 25 cm², atteinte uniquement pour \\( x = 5 \\)",
      ["L'aire maximale est 5 cm², atteinte pour \\( x = 25 \\)", "L'aire maximale est 25 cm², atteinte pour \\( x = 10 \\)", "L'aire n'a pas de maximum"],
      "(x − 5)² ≥ 0, donc A(x) ≤ 25, avec égalité si et seulement si x = 5 : le rectangle est alors un carré de côté 5 cm."),

    Q("Dans le vide, la distance de chute est \\( d(t) = \\dfrac{1}{2}gt^2 \\) avec \\( g \\approx 9{,}8 \\) m/s². Si la durée de chute double, la distance est multipliée par :",
      "\\( 4 \\)",
      ["\\( 2 \\)", "\\( 8 \\)", "\\( \\dfrac{1}{4} \\)"],
      "d(2t) = ½g(2t)² = ½g × 4t² = 4 d(t)."),

    Q("Avec \\( d(t) = \\dfrac{1}{2}gt^2 \\) et \\( g \\approx 9{,}8 \\) m/s², quelle est la distance parcourue en 3 secondes ?",
      "\\( 44{,}1 \\) m",
      ["\\( 14{,}7 \\) m", "\\( 29{,}4 \\) m", "\\( 88{,}2 \\) m"],
      "d(3) = 0,5 × 9,8 × 3² = 4,9 × 9 = 44,1 m."),

    Q("Avec \\( d(t) = \\dfrac{1}{2}gt^2 \\) et \\( g \\approx 9{,}8 \\) m/s², quelle est la durée de chute d'un objet lâché de 20 m de hauteur ?",
      "environ \\( 2{,}02 \\) s",
      ["environ \\( 4{,}08 \\) s", "environ \\( 1{,}43 \\) s", "environ \\( 0{,}49 \\) s"],
      "t = √(2d/g) = √(40/9,8) ≈ 2,02 s."),

    Q("Un générateur impose \\( U = 12 \\) V aux bornes d'un conducteur de résistance \\( R > 0 \\). L'intensité est \\( I(R) = \\dfrac{12}{R} \\). Que devient \\( I \\) quand \\( R \\) double ?",
      "Elle est divisée par 2",
      ["Elle double", "Elle est divisée par 4", "Elle reste constante"],
      "I(2R) = 12/(2R) = (1/2) × 12/R : la fonction inverse est décroissante, et ici proportionnelle à 1/R."),

    Q("Avec \\( I(R) = \\dfrac{12}{R} \\), pour quelle résistance l'intensité vaut-elle \\( 0{,}2 \\) A ?",
      "\\( 60 \\) Ω",
      ["\\( 2{,}4 \\) Ω", "\\( 12{,}2 \\) Ω", "\\( 0{,}017 \\) Ω environ"],
      "12/R = 0,2 ⇔ R = 12/0,2 = 60 Ω."),

    Q("En Python, on définit <code>def aire(x): return x * (10 - x)</code>. Combien vaut <code>aire(3)</code> ?",
      "<code>21</code>",
      ["<code>7</code>", "<code>30</code>", "<code>-21</code>"],
      "aire(3) = 3 × (10 − 3) = 3 × 7 = 21."),

    Q("Quelle fonction Python renvoie <code>True</code> si \\( x \\) appartient à l'ensemble de définition de \\( g(x) = \\dfrac{x - 1}{x + 2} \\) ?",
      "<code>def est_defini(x): return x != -2</code>",
      ["<code>def est_defini(x): return x == -2</code>", "<code>def est_defini(x): return x != 2</code>", "<code>def est_defini(x): return x > -2</code>"],
      "g est définie si et seulement si x + 2 ≠ 0, c'est-à-dire x ≠ −2 (en Python, != signifie « différent de »)."),

    Q("Dans <code>encadrement(a, n)</code>, la boucle <code>while (k / 10**n) ** 2 <= a</code> avec <code>k = k + 1</code> sert à :",
      "trouver le premier entier \\( k \\) tel que \\( (k / 10^n)^2 > a \\)",
      ["calculer le carré de \\( a \\)", "s'arrêter dès que \\( k = a \\)", "afficher directement la valeur de \\( \\sqrt{a} \\)"],
      "On augmente k tant que (k/10ⁿ)² ≤ a. À la sortie, (k−1)/10ⁿ est par défaut et k/10ⁿ est par excès : c'est un encadrement de √a d'amplitude 10⁻ⁿ."),

    Q("Que renvoie <code>encadrement(2, 2)</code> ? (programme qui encadre \\( \\sqrt{a} \\) par balayage avec un pas de \\( 10^{-n} \\))",
      "<code>(1.41, 1.42)</code>",
      ["<code>(1.4, 1.5)</code>", "<code>(1.42, 1.43)</code>", "<code>(1.41, 1.41)</code>"],
      "1,41² = 1,9881 ≤ 2 mais 1,42² = 2,0164 > 2. On a donc 1,41 ≤ √2 ≤ 1,42."),

    Q("En utilisant <code>encadrement(5, 3)</code>, quel encadrement de \\( \\sqrt{5} \\) d'amplitude \\( 10^{-3} \\) obtient-on ?",
      "\\( 2{,}236 \\leq \\sqrt{5} \\leq 2{,}237 \\)",
      ["\\( 2{,}235 \\leq \\sqrt{5} \\leq 2{,}236 \\)", "\\( 2{,}23 \\leq \\sqrt{5} \\leq 2{,}24 \\)", "\\( 2{,}237 \\leq \\sqrt{5} \\leq 2{,}238 \\)"],
      "2,236² = 4,999696 ≤ 5 et 2,237² = 5,004169 > 5. La troisième proposition est un encadrement d'amplitude 10⁻², pas 10⁻³.")
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
