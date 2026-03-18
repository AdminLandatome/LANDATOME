const exercices = [
    {
        id: 1,
        titre: "Premier pas",
        consigne: "Créez une variable <b>message</b> contenant le texte <b>\"Hello World\"</b>.",
        codeDepart: "message = ",
        test: "message == 'Hello World'" // Ce qui doit être vrai en Python
    },
    {
        id: 2,
        titre: "Calculateur",
        consigne: "Créez une variable <b>calcul</b> qui multiplie 7 par 6.",
        codeDepart: "calcul = ",
        test: "calcul == 42"
    },
	{
    id: 3,
    titre: "Arithmétique E01",
    consigne: "Creer une fonction qui renvoie le reste de la division euclidienne de a par b.",
    codeDepart: `def ma_fonction(a, b):
    resultat = 0
    # ton code ici
	#encore du code
    return resultat
`,
    test: "division(28,7)==28%7"
    }
];