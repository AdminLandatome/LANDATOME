// Petite fonction utilitaire : la bonne réponse est toujours construite à partir de "good",
// ce qui garantit qu'elle figure bien dans la liste des options (elles sont mélangées ensuite).
const Q = (q, good, bads, expl) => ({ q: q, options: [good, ...bads], correct: good, expl: expl });

const questionsData = [

    // =====================================================
    // --- DÉFINITIONS ET RECONNAISSANCE ---
    // =====================================================
    Q("Une suite est dite arithmétique lorsque :",
      "on passe d'un terme au suivant en ajoutant toujours la même valeur",
      ["on passe d'un terme au suivant en multipliant toujours par la même valeur",
       "tous les termes sont égaux",
       "les termes sont tous des nombres entiers"],
      "Le nombre ajouté à chaque étape s'appelle la raison de la suite."),

    Q("Une suite est dite géométrique lorsque :",
      "on passe d'un terme au suivant en multipliant toujours par la même valeur",
      ["on passe d'un terme au suivant en ajoutant toujours la même valeur",
       "les termes sont tous positifs",
       "les termes sont des carrés parfaits"],
      "Le nombre par lequel on multiplie à chaque étape s'appelle la raison de la suite, notée \\( q \\)."),

    Q("La suite \\( (v_n) \\) est arithmétique de terme initial \\( v_0 = 5 \\) et de raison \\( r = -3 \\). Quelle est la valeur de \\( v_3 \\) ?",
      "\\( -4 \\)",
      ["\\( -1 \\)", "\\( -7 \\)", "\\( 14 \\)"],
      "v₁ = 5 + (−3) = 2, v₂ = 2 + (−3) = −1, puis v₃ = −1 + (−3) = −4."),

    Q("La suite \\( (v_n) \\) est géométrique de terme initial \\( v_0 = 10 \\) et de raison \\( q = 0{,}5 \\). Quelle est la valeur de \\( v_3 \\) ?",
      "\\( 1{,}25 \\)",
      ["\\( 8{,}5 \\)", "\\( 2{,}5 \\)", "\\( 15 \\)"],
      "v₁ = 10×0,5 = 5, v₂ = 5×0,5 = 2,5, puis v₃ = 2,5×0,5 = 1,25."),

    Q("Si \\( u \\) est une suite arithmétique de raison \\( r \\) et de terme initial \\( u_0 = k \\), sa relation de récurrence est :",
      "\\( u_0 = k \\) et \\( u_{n+1} = u_n + r \\)",
      ["\\( u_0 = k \\) et \\( u_{n+1} = u_n \\times r \\)",
       "\\( u_0 = k \\) et \\( u_{n+1} = u_n + n \\)",
       "\\( u_0 = r \\) et \\( u_{n+1} = u_n + k \\)"],
      "Pour une suite arithmétique, on ajoute la raison r pour passer d'un terme au suivant."),

    Q("Si \\( u \\) est une suite géométrique de raison \\( q \\) et de terme initial \\( u_0 = k \\), sa relation de récurrence est :",
      "\\( u_0 = k \\) et \\( u_{n+1} = u_n \\times q \\)",
      ["\\( u_0 = k \\) et \\( u_{n+1} = u_n + q \\)",
       "\\( u_0 = k \\) et \\( u_{n+1} = u_n^q \\)",
       "\\( u_0 = q \\) et \\( u_{n+1} = u_n \\times k \\)"],
      "Pour une suite géométrique, on multiplie par la raison q pour passer d'un terme au suivant."),

    Q("Comment est représentée graphiquement une suite arithmétique ?",
      "Par un nuage de points alignés",
      ["Par un nuage de points formant une courbe exponentielle",
       "Par un nuage de points formant une parabole",
       "Par un seul point"],
      "Les points (n ; uₙ) d'une suite arithmétique sont alignés, et réciproquement."),

    Q("Comment est représentée graphiquement une suite géométrique (de raison positive et différente de 1) ?",
      "Par un nuage de points « exponentiel »",
      ["Par un nuage de points alignés",
       "Par un nuage de points formant une parabole",
       "Par un nuage de points tous situés sur l'axe des abscisses"],
      "Les points d'une suite géométrique suivent une allure exponentielle, et réciproquement."),

    Q("On représente une suite par un nuage de points alignés. Que peut-on en conclure ?",
      "La suite est arithmétique",
      ["La suite est géométrique",
       "La suite est constante",
       "On ne peut rien conclure"],
      "La propriété est une équivalence : suite arithmétique ⇔ nuage de points alignés."),

    Q("Pour une suite arithmétique de raison \\( r < 0 \\), la suite est :",
      "strictement décroissante",
      ["strictement croissante", "constante", "ni croissante ni décroissante"],
      "Si r < 0, on ajoute un nombre négatif à chaque étape : les termes diminuent."),

    Q("Pour une suite arithmétique de raison \\( r = 0 \\), la suite est :",
      "constante",
      ["strictement croissante", "strictement décroissante", "géométrique de raison 0 uniquement"],
      "Si r = 0, on ajoute 0 à chaque étape : tous les termes sont égaux."),

    Q("Une suite géométrique de premier terme strictement positif et de raison \\( q \\) telle que \\( 0 < q < 1 \\) est :",
      "strictement décroissante",
      ["strictement croissante", "constante", "alternée (un terme positif, un terme négatif)"],
      "Multiplier un nombre positif par q avec 0 < q < 1 le diminue."),

    Q("Une suite géométrique de premier terme strictement positif et de raison \\( q > 1 \\) est :",
      "strictement croissante",
      ["strictement décroissante", "constante", "alternée"],
      "Multiplier un nombre positif par q > 1 l'augmente."),

    Q("Une suite géométrique de premier terme strictement positif et de raison \\( q = 1 \\) est :",
      "constante",
      ["strictement croissante", "strictement décroissante", "nulle"],
      "Multiplier par 1 ne change rien : tous les termes sont égaux au premier."),

    Q("Attention au signe ! La suite géométrique de premier terme \\( u_0 = -2 \\) et de raison \\( q = 3 \\) est :",
      "décroissante",
      ["croissante", "constante", "alternée"],
      "u₀ = −2, u₁ = −6, u₂ = −18… Les termes diminuent. La propriété sur le sens de variation suppose un premier terme strictement positif."),

    Q("Pour tout entier \\( n \\), on a \\( u_{n+1} - u_n = 5 \\). Que peut-on dire de la suite \\( (u_n) \\) ?",
      "Elle est arithmétique de raison 5",
      ["Elle est géométrique de raison 5", "Elle est arithmétique de raison 1", "Elle est constante"],
      "Une différence constante entre deux termes consécutifs caractérise une suite arithmétique."),

    Q("Pour tout entier \\( n \\), on a \\( u_n \\neq 0 \\) et \\( \\dfrac{u_{n+1}}{u_n} = 2 \\). Que peut-on dire de la suite \\( (u_n) \\) ?",
      "Elle est géométrique de raison 2",
      ["Elle est arithmétique de raison 2", "Elle est géométrique de raison 0,5", "Elle est arithmétique de raison 0,5"],
      "Un quotient constant entre deux termes consécutifs caractérise une suite géométrique."),

    Q("La suite définie par \\( u_n = 3n + 2 \\) est :",
      "arithmétique de raison 3",
      ["arithmétique de raison 2", "géométrique de raison 3", "géométrique de raison 2"],
      "uₙ₊₁ − uₙ = 3(n+1) + 2 − (3n + 2) = 3, constante : la suite est arithmétique de raison 3."),

    Q("La suite définie par \\( u_n = 3 \\times 2^n \\) est :",
      "géométrique de raison 2 et de premier terme 3",
      ["géométrique de raison 3 et de premier terme 2",
       "arithmétique de raison 2",
       "arithmétique de raison 3"],
      "uₙ₊₁ / uₙ = 2 pour tout n et u₀ = 3×2⁰ = 3."),

    Q("Quelle est la raison de la suite arithmétique définie par \\( v_n = 7 - 3n \\) ?",
      "\\( -3 \\)",
      ["\\( 7 \\)", "\\( 3 \\)", "\\( 4 \\)"],
      "vₙ₊₁ − vₙ = 7 − 3(n+1) − (7 − 3n) = −3."),

    // =====================================================
    // --- MOYENNES ---
    // =====================================================
    Q("Quelle est la moyenne arithmétique de 12 et 20 ?",
      "\\( 16 \\)",
      ["\\( 15{,}5 \\)", "\\( 240 \\)", "\\( \\sqrt{240} \\)"],
      "La moyenne arithmétique de a et b vaut (a+b)/2 = (12+20)/2 = 16."),

    Q("Un automobiliste roule une heure à \\( 90 \\) km/h puis une heure à \\( 120 \\) km/h. À quelle vitesse constante aurait-il dû rouler pendant les deux heures pour parcourir la même distance ?",
      "\\( 105 \\) km/h",
      ["\\( 100 \\) km/h", "\\( 210 \\) km/h", "\\( 104{,}4 \\) km/h"],
      "Les durées étant égales, il s'agit de la moyenne arithmétique : (90+120)/2 = 105 km/h."),

    Q("Un élève a eu 17 au premier contrôle et sa moyenne sur deux contrôles est 15. Quelle est sa seconde note ?",
      "\\( 13 \\)",
      ["\\( 16 \\)", "\\( 15 \\)", "\\( 12 \\)"],
      "(17 + x)/2 = 15 donc 17 + x = 30 et x = 13."),

    Q("Quelle est la moyenne géométrique de \\( 4{,}8 \\) et \\( 30 \\) ?",
      "\\( 12 \\)",
      ["\\( 17{,}4 \\)", "\\( 144 \\)", "\\( 34{,}8 \\)"],
      "√(4,8×30) = √144 = 12."),

    Q("Quelle est la moyenne géométrique de \\( -4{,}8 \\) et \\( -30 \\) ?",
      "\\( 12 \\)",
      ["\\( -12 \\)", "\\( -17{,}4 \\)", "Elle n'existe pas"],
      "Les deux nombres ont le même signe : √((−4,8)×(−30)) = √144 = 12."),

    Q("Que dire de la moyenne géométrique de \\( -4{,}8 \\) et \\( 30 \\) ?",
      "On ne la calcule pas : les deux nombres ne sont pas de même signe",
      ["Elle vaut 12", "Elle vaut −12", "Elle vaut 12,6"],
      "Le produit −4,8×30 est négatif et on ne peut pas en extraire la racine carrée."),

    Q("Dans un pays, les prix augmentent de \\( 0{,}9\\,\\% \\) en janvier puis de \\( 1{,}2\\,\\% \\) en février. Quelle est l'augmentation globale sur les deux mois (arrondie au centième de pourcent) ?",
      "environ \\( 2{,}11\\,\\% \\)",
      ["\\( 2{,}10\\,\\% \\)", "environ \\( 1{,}05\\,\\% \\)", "\\( 1{,}08\\,\\% \\)"],
      "Les augmentations successives se traduisent par des multiplications : 1,009 × 1,012 = 1,021108, soit environ +2,11 %. Attention : on n'additionne pas les pourcentages."),

    Q("Avec les mêmes données (+0,9 % puis +1,2 %), quelle augmentation mensuelle constante aurait donné le même résultat sur les deux mois ?",
      "environ \\( 1{,}05\\,\\% \\) (moyenne géométrique des coefficients multiplicateurs)",
      ["exactement \\( 1{,}5\\,\\% \\)", "environ \\( 2{,}11\\,\\% \\)", "\\( 0{,}9\\,\\% \\)"],
      "Le coefficient mensuel constant c vérifie c² = 1,009×1,012, donc c = √(1,009×1,012) ≈ 1,0105, soit environ +1,05 %."),

    // =====================================================
    // --- TERME DE RANG n ---
    // =====================================================
    Q("Si \\( (u_n) \\) est arithmétique de raison \\( r \\), la formule valable pour tous entiers \\( n \\) et \\( p \\) est :",
      "\\( u_n = u_p + (n-p) \\times r \\)",
      ["\\( u_n = u_p \\times (n-p) \\times r \\)",
       "\\( u_n = u_p + (n+p) \\times r \\)",
       "\\( u_n = u_p \\times r^{(n-p)} \\)"],
      "On ajoute (n−p) fois la raison pour passer du terme de rang p au terme de rang n."),

    Q("Si \\( (u_n) \\) est géométrique de raison \\( q \\), la formule valable pour tous entiers \\( n \\) et \\( p \\) est :",
      "\\( u_n = u_p \\times q^{(n-p)} \\)",
      ["\\( u_n = u_p + (n-p) \\times q \\)",
       "\\( u_n = u_p \\times (n-p) \\times q \\)",
       "\\( u_n = u_p \\times q^{(n+p)} \\)"],
      "On multiplie (n−p) fois par la raison pour passer du terme de rang p au terme de rang n."),

    Q("Si \\( (u_n) \\) est une suite arithmétique de raison \\( r \\) et de premier terme \\( u_1 \\), alors :",
      "\\( u_n = u_1 + (n-1) \\times r \\)",
      ["\\( u_n = u_1 + n \\times r \\)", "\\( u_n = u_1 \\times r^{n-1} \\)", "\\( u_n = u_1 + (n+1) \\times r \\)"],
      "Quand on commence à l'indice 1, il faut ajouter (n−1) fois la raison."),

    Q("Si \\( (u_n) \\) est une suite géométrique de raison \\( q \\) et de premier terme \\( u_1 \\), alors :",
      "\\( u_n = u_1 \\times q^{(n-1)} \\)",
      ["\\( u_n = u_1 \\times q^{n} \\)", "\\( u_n = u_1 + (n-1) \\times q \\)", "\\( u_n = u_1 \\times q^{(n+1)} \\)"],
      "Quand on commence à l'indice 1, il faut multiplier (n−1) fois par la raison."),

    Q("\\( (u_n) \\) est arithmétique de premier terme \\( u_0 = 4 \\) et de raison \\( r = 2 \\). Quelle est la valeur de \\( u_{17} \\) ?",
      "\\( 38 \\)",
      ["\\( 36 \\)", "\\( 40 \\)", "\\( 34 \\)"],
      "uₙ = 4 + 2n donc u₁₇ = 4 + 2×17 = 38."),

    Q("\\( (u_n) \\) est arithmétique de premier terme \\( u_1 = -80 \\) et de raison \\( r = 10 \\). Pour tout entier \\( n \\geqslant 1 \\), \\( u_n \\) vaut :",
      "\\( 10n - 90 \\)",
      ["\\( 10n - 80 \\)", "\\( -80 + 10n \\)", "\\( 10n - 100 \\)"],
      "uₙ = u₁ + (n−1)×r = −80 + 10(n−1) = 10n − 90."),

    Q("\\( (u_n) \\) est arithmétique de premier terme \\( u_1 = -80 \\) et de raison \\( r = 10 \\). Quel est le rang du terme égal à \\( 80 \\) ?",
      "\\( 17 \\)",
      ["\\( 16 \\)", "\\( 18 \\)", "\\( 16{,}1 \\)"],
      "10n − 90 = 80 donne n = 17."),

    Q("\\( (u_n) \\) est arithmétique avec \\( u_3 = 7 \\) et \\( u_8 = 22 \\). Quelle est sa raison ?",
      "\\( 3 \\)",
      ["\\( 5 \\)", "\\( 15 \\)", "\\( 2{,}75 \\)"],
      "u₈ = u₃ + 5r donc 22 = 7 + 5r et r = 3."),

    Q("\\( (w_n) \\) est arithmétique de premier terme \\( w_1 = 2 \\) et de raison \\( r = 1{,}5 \\). Quelle est la valeur de \\( w_{11} \\) ?",
      "\\( 17 \\)",
      ["\\( 18{,}5 \\)", "\\( 15{,}5 \\)", "\\( 16 \\)"],
      "w₁₁ = w₁ + (11−1)×1,5 = 2 + 15 = 17."),

    Q("\\( (t_n) \\) est arithmétique de premier terme \\( t_0 = 10 \\) et de raison \\( r = -2 \\). Quelle est la valeur de \\( t_{50} \\) ?",
      "\\( -90 \\)",
      ["\\( -88 \\)", "\\( -100 \\)", "\\( 90 \\)"],
      "t₅₀ = t₀ + 50×(−2) = 10 − 100 = −90."),

    Q("\\( (u_n) \\) est arithmétique de premier terme \\( u_0 = 2 \\) et de raison \\( r = 3 \\). Quelle est la valeur de \\( u_{20} \\) ?",
      "\\( 62 \\)",
      ["\\( 65 \\)", "\\( 59 \\)", "\\( 60 \\)"],
      "u₂₀ = 2 + 20×3 = 62."),

    Q("\\( (u_n) \\) est géométrique de premier terme \\( u_0 = 3 \\) et de raison \\( q = 2 \\). Quelle est la valeur de \\( u_7 \\) ?",
      "\\( 384 \\)",
      ["\\( 17 \\)", "\\( 768 \\)", "\\( 42 \\)"],
      "u₇ = 3×2⁷ = 3×128 = 384."),

    Q("\\( (u_n) \\) est géométrique de premier terme \\( u_0 = 3 \\) et de raison \\( q = 2 \\). Quelle est l'expression de \\( u_n \\) en fonction de \\( n \\) ?",
      "\\( u_n = 3 \\times 2^n \\)",
      ["\\( u_n = 2 \\times 3^n \\)", "\\( u_n = 3 + 2n \\)", "\\( u_n = (3 \\times 2)^n \\)"],
      "uₙ = u₀ × qⁿ = 3 × 2ⁿ."),

    Q("\\( (w_n) \\) est géométrique de premier terme \\( w_1 = 2 \\) et de raison \\( q = 1{,}5 \\). Quelle est la valeur de \\( w_5 \\) ?",
      "\\( 10{,}125 \\)",
      ["\\( 15{,}1875 \\)", "\\( 9 \\)", "\\( 7{,}59375 \\)"],
      "w₅ = w₁ × q⁽⁵⁻¹⁾ = 2 × 1,5⁴ = 2 × 5,0625 = 10,125."),

    Q("\\( (v_n) \\) est géométrique de premier terme \\( v_0 = -5 \\) et de raison \\( q = 3 \\). Quelle est la valeur de \\( v_9 \\) ?",
      "\\( -98\\,415 \\)",
      ["\\( 98\\,415 \\)", "\\( -19\\,683 \\)", "\\( -295\\,245 \\)"],
      "v₉ = −5 × 3⁹ = −5 × 19 683 = −98 415."),

    // =====================================================
    // --- SOMMES ---
    // =====================================================
    Q("La somme des \\( n \\) premiers termes d'une suite arithmétique vaut :",
      "nombre de termes \\( \\times \\dfrac{\\text{premier terme} + \\text{dernier terme}}{2} \\)",
      ["nombre de termes \\( \\times (\\text{premier terme} + \\text{dernier terme}) \\)",
       "premier terme \\( \\times \\dfrac{1 - q^{n}}{1 - q} \\)",
       "\\( \\dfrac{\\text{premier terme} + \\text{dernier terme}}{2} \\)"],
      "Il s'agit de la moyenne du premier et du dernier terme, multipliée par le nombre de termes."),

    Q("Si une suite arithmétique commence à l'indice 0, quel est son 10ᵉ terme ?",
      "\\( u_9 \\)",
      ["\\( u_{10} \\)", "\\( u_{11} \\)", "\\( u_0 + 10r \\)"],
      "En partant de l'indice 0, les dix premiers termes sont u₀, u₁, …, u₉ : le 10ᵉ terme est u₉."),

    Q("Si une suite arithmétique commence à l'indice 1, quel est son 10ᵉ terme ?",
      "\\( w_{10} \\)",
      ["\\( w_9 \\)", "\\( w_{11} \\)", "\\( w_1 + 10r \\)"],
      "En partant de l'indice 1, les dix premiers termes sont w₁, …, w₁₀ : le 10ᵉ terme est w₁₀."),

    Q("\\( (u_n) \\) est arithmétique de premier terme \\( u_0 = 2 \\) et de raison \\( r = 3 \\). Quelle est la somme \\( S \\) de ses 21 premiers termes ?",
      "\\( 672 \\)",
      ["\\( 651 \\)", "\\( 64 \\)", "\\( 1\\,344 \\)"],
      "Le dernier terme est u₂₀ = 62. S = 21 × (2 + 62)/2 = 21 × 32 = 672."),

    Q("\\( (v_n) \\) est arithmétique de premier terme \\( v_0 = -5 \\) et de raison \\( r = 3 \\). Quelle est la somme \\( v_0 + v_1 + \\dots + v_9 \\) ?",
      "\\( 85 \\)",
      ["\\( 17 \\)", "\\( 170 \\)", "\\( 75 \\)"],
      "v₉ = −5 + 9×3 = 22 puis A = 10 × (−5 + 22)/2 = 85."),

    Q("\\( (w_n) \\) est arithmétique de premier terme \\( w_1 = 2 \\) et de raison \\( r = 1{,}5 \\). Quelle est la somme \\( w_1 + w_2 + \\dots + w_{10} \\) ?",
      "\\( 87{,}5 \\)",
      ["\\( 175 \\)", "\\( 92{,}5 \\)", "\\( 17{,}5 \\)"],
      "w₁₀ = 2 + 9×1,5 = 15,5 puis B = 10 × (2 + 15,5)/2 = 87,5."),

    Q("Soit \\( v_n = 7 - 3n \\). Quelle est la somme des 51 premiers termes \\( v_0 + v_1 + \\dots + v_{50} \\) ?",
      "\\( -3\\,468 \\)",
      ["\\( -3\\,400 \\)", "\\( -3\\,544{,}5 \\)", "\\( -6\\,936 \\)"],
      "v₅₀ = 7 − 150 = −143. La somme vaut 51 × (7 + (−143))/2 = 51 × (−68) = −3 468."),

    Q("\\( (u_n) \\) est arithmétique de premier terme \\( u_0 \\) et de raison \\( r \\). Que vaut \\( u_0 + u_1 + \\dots + u_7 \\) ?",
      "\\( 4(2u_0 + 7r) \\)",
      ["\\( 4(2u_0 + 8r) \\)", "\\( 8(2u_0 + 7r) \\)", "\\( 4(u_0 + 7r) \\)"],
      "Il y a 8 termes et u₇ = u₀ + 7r. La somme vaut 8 × (u₀ + u₀ + 7r)/2 = 4(2u₀ + 7r)."),

    Q("La somme des \\( n \\) premiers termes d'une suite géométrique de raison \\( q \\neq 1 \\) vaut :",
      "premier terme \\( \\times \\dfrac{1 - q^{n}}{1 - q} \\)",
      ["premier terme \\( \\times \\dfrac{1 - q}{1 - q^{n}} \\)",
       "nombre de termes \\( \\times \\dfrac{\\text{premier terme} + \\text{dernier terme}}{2} \\)",
       "premier terme \\( \\times \\dfrac{q^{n} - 1}{q + 1} \\)"],
      "C'est la formule à connaître : S = premier terme × (1 − qⁿ)/(1 − q), avec n le nombre de termes."),

    Q("\\( (v_n) \\) est géométrique de premier terme \\( v_0 = -5 \\) et de raison \\( q = 3 \\). Quelle est la somme \\( v_0 + v_1 + \\dots + v_9 \\) ?",
      "\\( -147\\,620 \\)",
      ["\\( 147\\,620 \\)", "\\( -49\\,205 \\)", "\\( -98\\,415 \\)"],
      "Il y a 10 termes : A = −5 × (1 − 3¹⁰)/(1 − 3) = −5 × 29 524 = −147 620."),

    Q("\\( (w_n) \\) est géométrique de premier terme \\( w_1 = 2 \\) et de raison \\( q = 1{,}5 \\). Quelle est la somme \\( w_1 + w_2 + w_3 + w_4 + w_5 \\) ?",
      "\\( 26{,}375 \\)",
      ["\\( 10{,}125 \\)", "\\( 13{,}1875 \\)", "\\( 17{,}5 \\)"],
      "Il y a 5 termes : B = 2 × (1 − 1,5⁵)/(1 − 1,5) = 26,375."),

    Q("Quelle est la somme des \\( n \\) premiers termes d'une suite géométrique de raison \\( q = 1 \\) ?",
      "\\( n \\times \\) premier terme",
      ["\\( 0 \\)", "\\( \\dfrac{n}{2} \\times \\) premier terme", "On ne peut pas la calculer"],
      "La suite est constante : on additionne n fois le premier terme. (La formule générale est interdite car elle divise par 1 − q = 0.)"),

    Q("\\( (u_n) \\) est géométrique de premier terme \\( u_0 = \\dfrac{1}{9} \\) et de raison \\( q = 3 \\). Que vaut \\( S_8 = \\displaystyle\\sum_{k=0}^{8} u_k \\) ?",
      "\\( \\dfrac{9841}{9} \\)",
      ["\\( \\dfrac{3280}{9} \\)", "\\( \\dfrac{19682}{9} \\)", "\\( 9841 \\)"],
      "De k = 0 à 8, il y a 9 termes : S₈ = (1/9) × (1 − 3⁹)/(1 − 3) = (1/9) × 9841 = 9841/9."),

    // =====================================================
    // --- PROBLÈMES : SUITES ARITHMÉTIQUES ---
    // =====================================================
    Q("Un loyer annuel de 6 500 € en 2018 augmente de 150 € chaque année. Si \\( u_n \\) est le loyer de l'année \\( 2018 + n \\), quelle est la valeur du loyer en 2025 ?",
      "\\( 7\\,550 \\) €",
      ["\\( 7\\,700 \\) €", "\\( 7\\,400 \\) €", "\\( 7\\,250 \\) €"],
      "uₙ = 6 500 + 150n et 2025 correspond à n = 7 : u₇ = 6 500 + 1 050 = 7 550 €."),

    Q("Avec ce même loyer (6 500 € en 2018, puis +150 € par an), quelle est la somme des 11 premiers loyers (de 2018 à 2028) ?",
      "\\( 79\\,750 \\) €",
      ["\\( 87\\,900 \\) €", "\\( 159\\,500 \\) €", "\\( 71\\,500 \\) €"],
      "u₁₀ = 8 000 donc la somme vaut 11 × (6 500 + 8 000)/2 = 11 × 7 250 = 79 750 €."),

    Q("Alice place 3 000 € à 6 % par an à intérêts simples (les intérêts ne sont pas capitalisés). Le capital \\( C_n \\) après \\( n \\) années est :",
      "une suite arithmétique de raison 180",
      ["une suite géométrique de raison 1,06", "une suite arithmétique de raison 0,06", "une suite géométrique de raison 180"],
      "Chaque année, on ajoute 6 % du capital initial : 0,06 × 3 000 = 180 €. D'où Cₙ₊₁ = Cₙ + 180."),

    Q("Avec ce placement à intérêts simples (3 000 €, +180 € par an), quel est le capital au bout de 10 ans ?",
      "\\( 4\\,800 \\) €",
      ["\\( 4\\,980 \\) €", "\\( 3\\,180 \\) €", "\\( 1\\,800 \\) €"],
      "Cₙ = 3 000 + 180n donc C₁₀ = 3 000 + 1 800 = 4 800 €."),

    Q("Rémy fume 140 cigarettes par semaine et réduit sa consommation de 4 cigarettes chaque semaine. Combien en fume-t-il après 5 semaines d'efforts ?",
      "\\( 120 \\)",
      ["\\( 116 \\)", "\\( 124 \\)", "\\( 135 \\)"],
      "uₙ = 140 − 4n (suite arithmétique de raison −4) et u₅ = 140 − 20 = 120."),

    Q("Avec la même situation (140 cigarettes par semaine, −4 chaque semaine), au bout de combien de semaines Rémy aura-t-il complètement arrêté de fumer ?",
      "\\( 35 \\) semaines",
      ["\\( 34 \\) semaines", "\\( 36 \\) semaines", "\\( 40 \\) semaines"],
      "uₙ = 0 ⇔ 140 − 4n = 0 ⇔ n = 35."),

    Q("Un étudiant loue une chambre : 200 € le premier mois, puis +5 € par mois. Quel est le loyer du 36ᵉ mois ?",
      "\\( 375 \\) €",
      ["\\( 380 \\) €", "\\( 370 \\) €", "\\( 380{,}25 \\) €"],
      "Suite arithmétique de premier terme 200 et de raison 5 : le 36ᵉ terme est 200 + 35×5 = 375 €."),

    // =====================================================
    // --- PROBLÈMES : SUITES GÉOMÉTRIQUES ---
    // =====================================================
    Q("Une grandeur augmente de \\( 4\\,\\% \\) chaque année. La suite des valeurs annuelles est :",
      "géométrique de raison 1,04",
      ["arithmétique de raison 4", "arithmétique de raison 0,04", "géométrique de raison 0,04"],
      "Augmenter de 4 % revient à multiplier par 1 + 4/100 = 1,04 : c'est une suite géométrique."),

    Q("Une grandeur diminue de \\( 20\\,\\% \\) chaque année. La suite des valeurs annuelles est géométrique de raison :",
      "\\( 0{,}8 \\)",
      ["\\( 0{,}2 \\)", "\\( 1{,}2 \\)", "\\( -0{,}2 \\)"],
      "Diminuer de 20 % revient à multiplier par 1 − 20/100 = 0,8."),

    Q("Un capital est placé à intérêts composés au taux de \\( 3\\,\\% \\) par an. La suite des capitaux annuels est :",
      "géométrique de raison 1,03",
      ["arithmétique de raison 3", "arithmétique de raison 0,03", "géométrique de raison 3"],
      "À intérêts composés, les intérêts sont capitalisés : on multiplie chaque année par 1,03."),

    Q("La population mondiale était de 6,9 milliards en 2010 et augmente de 1 % par an. Si \\( u_n \\) est la population en \\( 2010 + n \\), alors :",
      "\\( u_n = 6{,}9 \\times 1{,}01^n \\)",
      ["\\( u_n = 6{,}9 + 0{,}01n \\)", "\\( u_n = 6{,}9 \\times 0{,}01^n \\)", "\\( u_n = 6{,}9 \\times 1{,}1^n \\)"],
      "La suite est géométrique de premier terme u₀ = 6,9 et de raison q = 1,01."),

    Q("Avec ce modèle (\\( u_n = 6{,}9 \\times 1{,}01^n \\)), quelle population estime-t-on en 2025 ?",
      "environ \\( 8{,}01 \\) milliards",
      ["environ \\( 7{,}94 \\) milliards", "environ \\( 8{,}71 \\) milliards", "environ \\( 10{,}35 \\) milliards"],
      "2025 correspond à n = 15 : u₁₅ = 6,9 × 1,01¹⁵ ≈ 8,01 milliards."),

    Q("Avec ce modèle (\\( u_n = 6{,}9 \\times 1{,}01^n \\)), en quelle année dépassera-t-on 9 milliards d'habitants ?",
      "\\( 2037 \\)",
      ["\\( 2036 \\)", "\\( 2038 \\)", "\\( 2050 \\)"],
      "À la calculatrice : u₂₆ ≈ 8,94 < 9 et u₂₇ ≈ 9,03 > 9. Le rang 27 correspond à l'année 2010 + 27 = 2037."),

    Q("Chaque personne a 2 parents, 4 grands-parents, 8 arrière-grands-parents, etc. En comptant « nous » comme la génération 1, combien d'ancêtres y a-t-il à la génération 10 ?",
      "\\( 2^9 = 512 \\)",
      ["\\( 2^{10} = 1\\,024 \\)", "\\( 2^8 = 256 \\)", "\\( 20 \\)"],
      "Génération 1 : 1 personne (2⁰), génération 2 : 2 (2¹)… La génération n compte 2ⁿ⁻¹ personnes, donc 2⁹ = 512 à la génération 10."),

    Q("Avec ce même arbre généalogique, combien d'individus figurent au total de la génération 1 à la génération 40 comprise ?",
      "\\( 2^{40} - 1 \\)",
      ["\\( 2^{40} \\)", "\\( 2^{39} \\)", "\\( 40 \\times 2 \\)"],
      "On additionne 1 + 2 + 2² + … + 2³⁹ = (1 − 2⁴⁰)/(1 − 2) = 2⁴⁰ − 1, soit plus de mille milliards : plus que la population de l'époque, car beaucoup d'ancêtres sont communs."),

    Q("La masse de déchets plastiques dans les océans (300 millions de tonnes en 2017) augmente de \\( 5{,}4\\,\\% \\) par an. Quelle est la valeur de \\( u_1 \\) ?",
      "\\( 316{,}2 \\)",
      ["\\( 305{,}4 \\)", "\\( 354 \\)", "\\( 300{,}054 \\)"],
      "u₁ = 300 × 1,054 = 316,2 millions de tonnes."),

    Q("Pour déterminer l'année où la masse de déchets plastiques (300 en 2017) aura augmenté de 50 % par rapport à 2017, on complète l'algorithme : « Tant que \\( U < \\dots \\) ». Par quelle valeur ?",
      "\\( 450 \\)",
      ["\\( 150 \\)", "\\( 300 \\)", "\\( 1{,}5 \\)"],
      "Augmenter de 50 % revient à multiplier par 1,5 : 300 × 1,5 = 450."),

    Q("La concentration d'un médicament diminue de 3 % par minute. La suite \\( (C_n) \\) des concentrations est :",
      "géométrique de raison 0,97",
      ["géométrique de raison 0,03", "arithmétique de raison −0,03", "arithmétique de raison 0,97"],
      "Diminuer de 3 % revient à multiplier par 1 − 0,03 = 0,97. Avec C₀ = 1, on a Cₙ = 0,97ⁿ."),

    Q("Avec \\( C_n = 0{,}97^n \\) (diminution de 3 % par minute), à partir de quelle valeur de \\( n \\) la concentration est-elle passée sous la moitié de sa valeur initiale ?",
      "\\( n = 23 \\)",
      ["\\( n = 22 \\)", "\\( n = 15 \\)", "\\( n = 33 \\)"],
      "C₂₂ ≈ 0,5115 > 0,5 alors que C₂₃ ≈ 0,4964 < 0,5."),

    Q("On exécute en Python : k = 1 puis « for i in range(5): k = 0.97*k ». Quelle est la valeur de k affichée (arrondie à 0,0001) ?",
      "\\( 0{,}8587 \\)",
      ["\\( 0{,}8500 \\)", "\\( 0{,}1413 \\)", "\\( 0{,}9700 \\)"],
      "La boucle multiplie 5 fois par 0,97 : k = 0,97⁵ ≈ 0,8587. La concentration a donc diminué d'environ 14 % en 5 minutes (et non de 15 %)."),

    Q("En 2019, 20 000 mégots ont été ramassés. On prévoit une baisse de 15 % par an. La suite \\( (u_n) \\) du nombre de mégots est :",
      "géométrique de raison 0,85",
      ["arithmétique de raison −0,15", "géométrique de raison 0,15", "arithmétique de raison −3 000"],
      "Diminuer de 15 % revient à multiplier par 0,85. On vérifie : u₁ = 20 000 × 0,85 = 17 000."),

    Q("Avec \\( u_n = 20\\,000 \\times 0{,}85^n \\), combien de mégots seront jetés en 2028 (arrondi à l'unité) ?",
      "\\( 4\\,632 \\)",
      ["\\( 3\\,937 \\)", "\\( 5\\,450 \\)", "\\( 2\\,000 \\)"],
      "2028 correspond à n = 9 : u₉ = 20 000 × 0,85⁹ ≈ 4 632."),

    Q("Un loyer de 200 € le premier mois augmente de 2 % par mois. Quel est le loyer du troisième mois ?",
      "\\( 208{,}08 \\) €",
      ["\\( 208 \\) €", "\\( 204 \\) €", "\\( 210 \\) €"],
      "Deuxième mois : 200 × 1,02 = 204 €. Troisième mois : 204 × 1,02 = 208,08 €."),

    Q("Mathilde place 80 000 € à 8 % et retire 4 000 € par an pour les impôts. Quelle relation vérifie \\( C_n \\) (capital après \\( n \\) années) ?",
      "\\( C_{n+1} = 1{,}08 \\times C_n - 4\\,000 \\)",
      ["\\( C_{n+1} = 1{,}08 \\times (C_n - 4\\,000) \\)", "\\( C_{n+1} = C_n + 0{,}08 - 4\\,000 \\)", "\\( C_{n+1} = 0{,}08 \\times C_n - 4\\,000 \\)"],
      "Chaque année, le capital est multiplié par 1,08 (augmentation de 8 %) puis on retire 4 000 €."),

    Q("Avec \\( C_{n+1} = 1{,}08\\,C_n - 4\\,000 \\) et \\( C_0 = 80\\,000 \\), on pose \\( U_n = C_n - 50\\,000 \\). La suite \\( (U_n) \\) est :",
      "géométrique de raison 1,08 et de premier terme 30 000",
      ["arithmétique de raison −4 000",
       "géométrique de raison 1,08 et de premier terme 80 000",
       "géométrique de raison 0,08 et de premier terme 30 000"],
      "Uₙ₊₁ = 1,08Cₙ − 54 000 = 1,08(Cₙ − 50 000) = 1,08Uₙ et U₀ = 80 000 − 50 000 = 30 000."),

    Q("Avec \\( U_n = 30\\,000 \\times 1{,}08^n \\) et \\( C_n = U_n + 50\\,000 \\), quel capital Mathilde possède-t-elle au bout de 5 ans (arrondi à l'euro) ?",
      "\\( 94\\,080 \\) €",
      ["\\( 144\\,080 \\) €", "\\( 44\\,080 \\) €", "\\( 80\\,000 \\) €"],
      "C₅ = 50 000 + 30 000 × 1,08⁵ ≈ 50 000 + 44 080 = 94 080 €."),

    // =====================================================
    // --- TAUX ET NATURE D'UNE SUITE ---
    // =====================================================
    Q("La masse d'emballages plastiques recyclés passe de 229 (en 2011) à 282 (en 2016). Quel est le taux d'évolution global arrondi à l'unité ?",
      "\\( 23\\,\\% \\)",
      ["\\( 19\\,\\% \\)", "\\( 53\\,\\% \\)", "\\( 4{,}6\\,\\% \\)"],
      "(282 − 229)/229 ≈ 0,231, soit environ +23 %."),

    Q("Le taux d'évolution global entre 2011 et 2016 est d'environ 23 %, soit 5 années d'évolution. Quel est le taux d'évolution annuel moyen ?",
      "environ \\( 4{,}2\\,\\% \\)",
      ["\\( 4{,}6\\,\\% \\)", "\\( 23\\,\\% \\)", "\\( 2{,}3\\,\\% \\)"],
      "Le coefficient annuel moyen vaut 1,23^(1/5) ≈ 1,042, soit +4,2 %. Attention : on ne divise pas 23 % par 5 (ce qui donnerait 4,6 %)."),

    Q("Les nombres 229, 243 et 250 sont-ils les premiers termes d'une suite arithmétique ou géométrique ?",
      "Ni l'une ni l'autre",
      ["Arithmétique seulement", "Géométrique seulement", "Arithmétique et géométrique"],
      "243 − 229 = 14 mais 250 − 243 = 7 (pas arithmétique). 243/229 ≈ 1,061 mais 250/243 ≈ 1,029 (pas géométrique)."),

    Q("La masse recyclée en 2016 est 282 (millier de tonnes) et augmente de 4,2 % par an. Quelle est la masse estimée en 2019 (arrondie au millier de tonnes) ?",
      "\\( 319 \\)",
      ["\\( 318 \\)", "\\( 317 \\)", "\\( 335 \\)"],
      "2019 correspond à n = 3 : u₃ = 282 × 1,042³ ≈ 319."),

    Q("Un abonnement coûte 20 € le premier mois, puis augmente de 5 € chaque mois. Quelle est la nature de la suite des prix mensuels ?",
      "arithmétique de raison 5",
      ["géométrique de raison 5", "géométrique de raison 1,05", "arithmétique de raison 1,05"],
      "On ajoute toujours la même valeur (5 €) : c'est une suite arithmétique."),

    Q("Quelle est la différence essentielle entre une augmentation de 5 € par an et une augmentation de 5 % par an ?",
      "La première donne une suite arithmétique, la seconde une suite géométrique",
      ["La première donne une suite géométrique, la seconde une suite arithmétique",
       "Les deux donnent une suite arithmétique",
       "Les deux donnent une suite géométrique"],
      "Ajouter une valeur fixe donne une suite arithmétique ; multiplier par un coefficient fixe (1,05) donne une suite géométrique.")
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
