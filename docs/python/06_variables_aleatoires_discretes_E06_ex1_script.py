from matplotlib import pyplot as plt
from random import random

taille = 250
nombre = 50

def tirage():
    le_tirage = random()
    if le_tirage <= 0.12:
        return "v"
    elif le_tirage <=0.5:
        return "r"
    elif le_tirage <=1: #Ici un "else serait mieux d'un point de vue informatique mais pas d'un point de vue pédagogique
        return "b"
    


def echantillon() :
    return [tirage() for _ in range(taille)]  #Voici un exemple de liste en compréhension, le "_" est utilisé pour signifier que ne se sert pas de l'indice de la boucle.

def comptage(un_echantillon):
    vert, rouge, bleu = 0 , 0 , 0
    for ele in un_echantillon:
        if ele == "v" :
            vert += 1
        elif ele == "r":
            rouge += 1
        else :
            bleu += 1
    return (vert/taille, rouge/taille, bleu/taille)

# Cette partie sert à créer l'image que vous voyez dans l'exercice
# Elle fournit un exemple de construction de liste par ajout avec ce qu'on appelle la méthode "append"
def creation_des_listes_de_points():
    les_x = [i for i in range(1,nombre+1)]
    les_v = []  # On crée une liste vide...
    les_r = []
    les_b = []
    for _ in les_x:
        ordonnees = comptage(echantillon()) 
        les_v.append(ordonnees[0])      #Puis on lui ajoute un élément 
        les_r.append(ordonnees[1])
        les_b.append(ordonnees[2])
    
    plt.plot(les_x,les_v, marker="o", linestyle = "" , color="green")
    plt.plot(les_x,les_r, marker="x", linestyle = "" , color="red")
    plt.plot(les_x,les_b, marker="+", linestyle = "" , color="blue")
    plt.xlabel("numéro d'échantillon")
    plt.ylabel("Fréquences")
    plt.legend(["verts","rouges", "bleu"],bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.grid(True)
    plt.show()

creation_des_listes_de_points()




        
        
   
    

