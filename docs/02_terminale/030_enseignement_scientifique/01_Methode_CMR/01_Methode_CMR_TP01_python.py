# Pensez à enregistrer ce fichier python dans votre repertoire personnel

#=============================Quelques import======================================
from random import random
#Du module random on importe la fonction random qui renvoie
#un nombre aléatoire compris entre 0 et 1.
#>>>random()
#0.1254832583
from random import randint
#Du module random on importe la fonction random qui renvoie
#un nombre entier aléatoire compris entre deux bornes.
#>>>randint(1,14)
#12
from math import sqrt

#==========================Choix des constantes====================================
#Proportion de poissons sombres : p
p = 0.08
# taille de la population :
N = 30000
# taille de l'échantillon : n
n = 5000

#=========================Création de la population================================

def choix(p):
    """p est une probabilite
       et choix renvoie 1 avec la probabilité p
       >>>choix()
       1
       >>>choix()
       1
       >>>choix()
       0
       """
    if ... :
        return 1
    else:
        return 0
   
#On crée notre population : une liste de longueur N qui contiendra des 0 ou des 1.
#Chaque élément a la probabilité p  de valoir 1.

POPULATION = [choix(p) for _ in range(N)]

#==============================Création d'un échantillon===========================
#Création d'une fonction d'échantillonage
def creer_echantillon(taille,liste_donnee):
    """prélèvement de taille individus dans la dans la liste_donnee
    >>>echantillon(10,une_certaine_liste)
    [0,1,1,0,1,0,0,1,0,1]
    """
    liste_retour = []
    for indice in range(taille):
        liste_retour.append(liste_donnee[randint(0,len(liste_donnee)-1)])
    return liste_retour

#On crée notre échantillon de taille n...
ECHANTILLON = creer_echantillon(n,POPULATION)

def compter_les_un(une_liste):
    """renvoie le nombre 1 contenus dans une_liste"""
    compteur_de_un = 0
    for element in une_liste:
        if element == 1 :
            ...
    return compteur_de_un

#On compte le nombre de 1
NOMBRE_DE_POISSONS_SOMBRES = compter_les_un(ECHANTILLON)

#===Création de la fréquence observée (f_obs) et de l'intervalle de confiance (IC)===

def calculer_frequence(numerateur,denominateur):
    """renvoie le quotient numerateur/denominateur"""
    return numerateur/denominateur

#On calcule la fréquence observée
f_obs = calculer_frequence(NOMBRE_DE_POISSONS_SOMBRES,len(ECHANTILLON))

marge_d_erreur = 1.96*sqrt(f_obs*(1-f_obs)/len(ECHANTILLON))

#On crée l'intervalle de confiance IC 
IC = f"[ {str(f_obs-marge_d_erreur)} ; {f_obs+marge_d_erreur} ]"

print('Fréquence_observée : ', f_obs)
print('Intervalle de confiance : ',IC)