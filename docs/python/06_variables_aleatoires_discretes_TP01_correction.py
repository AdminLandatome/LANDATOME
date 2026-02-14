tailles = [10, 15, 20]
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

# Résultats pour X
print("X (en cm) : E(X) =", esperance(tailles, probabilites))
print("X (en cm) : V(X) =", variance(tailles, probabilites))