tailles = [10, 15, 20]
tailles_mn = [100, 150, 200]  #cette ligne a été ajoutée
tailles_boost = [15, 20, 25]  #cette ligne a été ajoutée
probabilites = [0.6, 0.3, 0.1]

def esperance(L_valeurs, L_probabilites):
    e = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Formule de l'espérance
        e = e + L_valeurs[i] * L_probabilites[i]  #cette ligne a été complétée
    return e

def variance(L_valeurs, L_probabilites):
    e = esperance(L_valeurs, L_probabilites)
    v = 0
    for i in range(len(L_valeurs)):
        # À COMPLÉTER : Moyenne des carrés des écarts
        v = v + L_probabilites[i] * (L_valeurs[i] - e)**2  #cette ligne a été complétée
    return v

# Résultats pour X
print("X (en cm) : E(X) =", esperance(tailles_boost, probabilites))   #par exemple, ici tailles est devenue tailles_boost
print("X (en cm) : V(X) =", variance(tailles_boost, probabilites))    #par exemple, ici tailles est devenue tailles_boost

