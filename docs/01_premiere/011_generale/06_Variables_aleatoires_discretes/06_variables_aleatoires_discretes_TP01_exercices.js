const exercices = [
    {
        id: 1,
        titre: "",
	consigne:"<b>1)</b> Complétez les fonctions ci-dessous.<br><b>2)</b> Notez les valeurs obtenues pour E(X) et V(X) sur votre cahier ou votre livret.",
	codeDepart: `tailles = [10, 15, 20]
probabilites = [0.6, 0.3, 0.1]

def esperance(L_valeurs, L_probabilites):
    e = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Formule de l'espérance
        ...
    return e

def variance(L_valeurs, L_probabilites):
    e = esperance(L_valeurs, L_probabilites)
    v = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Moyenne des carrés des écarts
        ...
    return v
	
ESPERANCE = esperance(tailles, probabilites)
VARIANCE = variance(tailles, probabilites)
# Résultats pour X
print("X (en cm) : E(X) =",ESPERANCE )
print("X (en cm) : V(X) =", VARIANCE)`,
    test:"ESPERANCE==12.5 and VARIANCE==11.25 "
    },
    {
        id: 2,
        titre: "",
	consigne:"<b>3a)</b> Créez une liste tailles_mm = [100, 150, 200].<br><b>3b)</b> Utilisez vos fonctions pour calculer E(Y) et V(Y).<br>(Notez-les sur votre cahier ou votre livret.)<br><b>3c)</b> Comment E (10 X ) et V (10 X ) sont-elles liées à E ( X ) et V ( X ) ?<br>(Répondez sur votre cahier ou votre livret)",
	codeDepart: `tailles = [10, 15, 20]
tailles_mn = ...
probabilites = [0.6, 0.3, 0.1]

def esperance(L_valeurs, L_probabilites):
    e = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Formule de l'espérance
        e = e + L_valeurs[i] * L_probabilites[i]
    return e

def variance(L_valeurs, L_probabilites):
    e = esperance(L_valeurs, L_probabilites)
    v = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Moyenne des carrés des écarts
        v = v + L_probabilites[i] * (L_valeurs[i] - e)**2
    return v
	
ESPERANCE = esperance(tailles, probabilites)
VARIANCE = variance(tailles, probabilites)
# Résultats pour X
print("X (en cm) : E(X) =",ESPERANCE )
print("X (en cm) : V(X) =", VARIANCE)`,
    test:"ESPERANCE==125 and VARIANCE==1125 "
    },
	{
    id: 3,
    titre: "",
	consigne:"<b>4a)</b> Créez une tailles_boost = [15, 20, 25].<br><b>4b)</b> Utilisez vos fonctions pour calculer E(Y) et V(Y).<br>(Notez-les sur votre cahier ou votre livret)<br><b>4c)</b> Comment E ( X +5) et V ( X +5) sont-elles liées à E ( X ) et V ( X ) ?<br>(Répondez sur votre cahier ou votre livret)<br><b>5)</b> Complétez la question 5) du livret.",
	codeDepart: `tailles = [10, 15, 20]
tailles_mn = [100,150,200]
tailles_boost = ...
probabilites = [0.6, 0.3, 0.1]

def esperance(L_valeurs, L_probabilites):
    e = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Formule de l'espérance
        e = e + L_valeurs[i] * L_probabilites[i]
    return e

def variance(L_valeurs, L_probabilites):
    e = esperance(L_valeurs, L_probabilites)
    v = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Moyenne des carrés des écarts
        v = v + L_probabilites[i] * (L_valeurs[i] - e)**2
    return v
	
ESPERANCE = esperance(tailles, probabilites)
VARIANCE = variance(tailles, probabilites)
# Résultats pour X
print("X (en cm) : E(X) =",ESPERANCE )
print("X (en cm) : V(X) =", VARIANCE)`,
    test:"ESPERANCE==17.5 and VARIANCE==11.25 "
    }
	
	
];