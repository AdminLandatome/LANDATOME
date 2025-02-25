def horner(coef_poly,alpha):
    """coef_poly = [A,B,C,D] pour Ax^3+Bx^2+Cx+D"""
    coef_facteur = [coef_poly[0]]
    for place in range(1,4):
        coef_facteur.append(alpha*coef_facteur[-1]+coef_poly[place])
    return coef_facteur
        
"""
Pour un exemple :
Q(x)=2(x-3)(x-4)(x-5)
Q(x)=2x^3-24x^2+94x-120

choisissons 3 comme racine évidente

dans la console :
horner([2,-24,94,-120],3)

dans l'editeur :
print(horner([2,-24,94,-120],3))
"""

def horner_generale(coef_poly,alpha):
    """A(n) x^n + A(n-1) x^(n-1)+...+ A(0) ==> [A(n),A(n-1),...,A(0)]"""
    coef_facteur = [coef_poly[0]]
    taille = len(coef_poly)
    for place in range(1,taille):
        coef_facteur.append(alpha*coef_facteur[-1]+coef_poly[place])
    return coef_facteur
Q=[5,-7,-4,-3,3,-10]
racine = 2
print(horner_generale(Q,racine))