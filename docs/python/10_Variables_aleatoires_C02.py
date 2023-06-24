import random

""" On rappelle que toutes les lignes commençant par # sont des commentaires
et que par conséquent, elles n'ont aucune incidence sur le programme. Elles
ne sont là que pour vous faciliter la compréhension des différentes fonctions"""

def Bernoulli(p):
    """ epreuve de Bernoulli, p
        est la probabilité de succés
        on renvoie alors 1
        (sinon on renvoie 0)."""
    #de la bibliothque random on appelle la fonction random() et on
    #compare le resultat à p.
    if random.random() <= p:
        #Si (if) le résultat est inférieur ou égal à p, alors on considère
        #que c'est un succès et on retourne (return) 1
        return 1
    else:
        #sinon  (else) on retourne (return) 0
        return 0

def un_echantillon(n,p=0.5):
    """echantillon de taille n
       associé à une épreuve de
       Bernoulli de parametre p
       qui vaut de base 0.5"""
    #On crée une liste (result) vide ( [] ) 
    result = []
    #Pour i  variant de 0 à n-1 (soit n "tours de boucle")
    for _ in range(n):
        #On ajoute le resultat de Bernoulli(p) à la liste result
        #"result = result + [Bernoulli(p)] " est une syntaxe possible
        #mais la méthode append est beaucoup plus rapide (environ 100 fois)
        result.append(Bernoulli(p))
    return result

def frequence_des_uns(echantillon):
    """renvoie la frequence des 1
       dans l'echantillon (liste) donné"""
    numerateur = 0
    denominateur = len(echantillon)
    for i in range(denominateur):
        #"numerateur = numerateur + echantillon[i]" est une autre syntaxe
        #possible, mais là aussi on a choisi un peu d'efficacité
        numerateur += echantillon[i]
    return numerateur/denominateur

