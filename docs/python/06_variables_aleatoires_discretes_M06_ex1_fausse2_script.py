from matplotlib import pyplot as plt  #On import un module qui servira pour faire les graphiques

from random  import randint # du module random qui permet d'utiliser des fonctions "créant" du hasard, on importe une fonction : randint

#randint(debut,fin) avec debut et fin des nombres entiers renvoie un nombre entier tiré au hasard entre debut et fin (les deux inclus)

#***********************************************************************************
#       On commence avec le script qui représente réellement la situation
#***********************************************************************************

# Les contantes
taille_echantillon = 250


# 1) il nous faut une fonction qui représente le début de l'énoncé 
def tirage():
    
    un_entier_au_hasard = randint(1,100)
    
    #(ICI est la 1e faute, on met 30 au lieu de 20)
    if 1 <= un_entier_au_hasard <= 30:    #si le nombre de la machine est compris entre 1 et 20
        return "20cL"                     # alors la fonction tirage renvoie "20cL" : le serveur sert 20cL.
    
    #(ICI est la 2e faute, on met 80 au lieu de 70)
    
    elif 21 <= un_entier_au_hasard <= 80: #si le nombre de la machine est compris entre 21 et 70  
        return "30cL"                     # alors la fonction tirage renvoie "30cL" : le serveur sert 30cL.
    
    else :                                #sinon
        return "40cL"                     #la fonction tirage renvoie "40cL" : le serveur sert 40cL.

# 2) On crée notre échantillon de 1000 personnes

# Première façon de faire : avec la méthode append (je mets des """ au début de la fonction et à la fin car on ne va pas l'utiliser)
"""
echantillon_1 = []  #On crée une liste vide
for numero_de_client in range(taille_echantillon):    #On va répéter "taille_echantillon" fois ce qui suit, il serait mieux de remplacer "numero_de_client" par "_" pour insister sur le fait que l'indice de boucle n'est pas utilisé
    echantillon.append(tirage())  #On ajoute à la liste le résultat du tirage pour le client 
"""
# Seconde façon de faire : avec une liste en compréhension

echantillon_1 = [tirage() for _ in range(taille_echantillon)]
#Les remarque :
#à la place de "_" on peut mettre ce que l'on veut, "_" signifie que l'indice de boucle ne sert pas.

#On crée les listes de fréquences:
freq_des_20cL = []
compteur_de_20cL = 0
freq_des_30cL = []
compteur_de_30cL = 0
freq_des_40cL = []
compteur_de_40cL = 0

for numero in range(taille_echantillon):
    nombre_d_echantillons = numero + 1
    if echantillon_1[numero] == "20cL":
        compteur_de_20cL = compteur_de_20cL +1
    elif echantillon_1[numero] == "30cL":
        compteur_de_30cL = compteur_de_30cL +1
    else :
        compteur_de_40cL = compteur_de_40cL +1
    freq_des_20cL.append(compteur_de_20cL/nombre_d_echantillons)
    freq_des_30cL.append(compteur_de_30cL/nombre_d_echantillons)
    freq_des_40cL.append(compteur_de_40cL/nombre_d_echantillons)

# 3) On crée l'image n°3 de l'exercice (enfin une version de l'image puis que les veleurs sont aléatoires)
les_x = [i for i in range(1,taille_echantillon+1)]  # liste en compréhension : cette fois  "i" est utilisé.
les_y_20cL = freq_des_20cL[:]   # pas très utile mais cela vous permettra de mieux comprendre la suite
les_y_30cL = freq_des_30cL[:]
les_y_40cL = freq_des_40cL[:]


plt.plot(les_x,les_y_20cL,marker="+",color="red",linestyle="")
plt.plot(les_x,les_y_30cL,marker="*",color="blue",linestyle="")
plt.plot(les_x,les_y_40cL,marker=".",color="green",linestyle="")
plt.grid(axis='y')
plt.xlabel("numéro d'échantillon")
plt.ylabel("Fréquence")
plt.legend(["20 cL","30 cL", "40cL"],bbox_to_anchor=(1.05, 1), loc='upper left')
plt.show()
        
        

    

