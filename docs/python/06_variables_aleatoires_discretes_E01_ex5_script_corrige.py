import random

def simulation_gain():
    de = random.randint(1, 6) # On lance un dé à 6 faces
    
    if de == 1:
        return -5 # Perte de 5 euros
    elif de % 2 == 0:  #Si le résultat est pair
        return 2 # Gain de 2 euros
    elif de == 3 or de == 5:
        return 1 # Gain de 1 euro
    else:
        return 0 # Pas de gain ni de perte

# Calcul de la moyenne sur 10 000 parties
nb_parties = 10000
somme_gains = 0

for i in range(nb_parties):
    somme_gains = somme_gains + simulation_gain()

moyenne = somme_gains / nb_parties
print("Le gain moyen sur 10 000 parties est :", moyenne)