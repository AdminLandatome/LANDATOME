import random
from math import sqrt
import matplotlib.pyplot as plt
import pylab as pyl

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

def echantillon(n,p=0.5):
    """echantillon de taille n
       associé à une épreuve de
       Bernoulli de parametre p
       qui vaut de base 0.5"""
    #On crée une liste (result) vide ( [] ) 
    result = []
    #Pour i  variant de 0 à n-1 (soit n "tours de boucle")
    for i in range(n):
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


def ecart_type(serie):
    variance = 0
    denominateur = len(serie)
    m = frequence_des_uns(serie)
    for i in range(denominateur):
        variance += ((serie[i]-m)**2)/denominateur
    return sqrt(variance)
    


def fluctuation(n,p,nbechan):
    """ Affiche la fluctuation de nbechan echantillons de taille n
        associés à une loi de Bernoulli de parametre p"""
    listefrequences = []
    for i in range(nbechan):
        listefrequences.append(frequence_des_uns(echantillon(n,p)))

    return listefrequences

def afficheur(listefrequences,p,normalise=0,mini=0,maxi=1,s1=0,s2=0,s3=0):
    """affiche une liste de frequences (obtenue avec la fonction
       fluctuation, les seuls arguments nécessaires sont les deux premiers,
       les autres peuvent être omis.
       On rappelle p pour les "tubes ecart_type".
       Si normalise = 1 on cree la fenetre avec les ordonnees comprises
       entre mini et maxi
       Si s1=1 on affiche le "tube 1 ecart-type"
       Si s2=1 idem avec 2 ecart-type etc..."""
    s= ecart_type(listefrequences)
    plt.plot(list(range(1,len(listefrequences)+1)),listefrequences,'b.',color='black')
    if s1 == 1:
        
        plt.plot([0,len(listefrequences)],[p+s,p+s], color = 'green')
        plt.plot([0,len(listefrequences)],[p-s,p-s], color = 'green')
        pyl.annotate(r'$p + \sigma$',xy=(len(listefrequences),p+s),color='green')
        pyl.annotate(r'$p - \sigma$',xy=(len(listefrequences),p-s),color='green')
    if s2 == 1:
        
        plt.plot([0,len(listefrequences)],[p+2*s,p+2*s], color = 'blue')
        plt.plot([0,len(listefrequences)],[p-2*s,p-2*s], color = 'blue')
        pyl.annotate(r'$p +2 \sigma$',xy=(len(listefrequences),p+2*s),color='blue')
        pyl.annotate(r'$p -2 \sigma$',xy=(len(listefrequences),p-2*s),color='blue')
    if s3 == 1:
        
        plt.plot([0,len(listefrequences)],[p+3*s,p+3*s], color = 'red')
        plt.plot([0,len(listefrequences)],[p-3*s,p-3*s], color = 'red')
        pyl.annotate(r'$p +3 \sigma$',xy=(len(listefrequences),p+3*s),color='red')
        pyl.annotate(r'$p -3 \sigma$',xy=(len(listefrequences),p-3*s),color='red')
        
    if normalise == 1:
        pyl.xlim(0.0,float(len(listefrequences)))
        pyl.ylim(float(mini),float(maxi))
    plt.grid()
    plt.show()
    
    
    n1,n2,n3 = 0,0,0
    for ele in listefrequences:
        if ele >= p-s and ele <= p+s :
            n1 += 1
        if ele >= p-2*s and ele <= p+2*s :
            n2 += 1
        if ele >= p-3*s and ele <= p+3*s :
            n3 += 1
    print("l'écart-type valait : ",s)
    print("nombre de fréquences dans [p-s,p+s] : ",n1)
    print("nombre de fréquences dans [p-2s,p+2s] : ",n2)
    print("nombre de fréquences dans [p-3s,p+3s] : ",n3)

#  Utilisations de l'afficheur
#afficheur(fluctuation(100,0.4,10),0.4,s1=1,s2=1,s3=1)
#--> affiche le nuage de points et les trois tubes
#afficheur(fluctuation(100,0.4,10),0.4,1,0.1,0.7,s1=1,s3=1)
#--> affiche le nuage, normalisé avec ord comprises entre 0.1 et 0.7, avec les tubes
#    1 et 3
