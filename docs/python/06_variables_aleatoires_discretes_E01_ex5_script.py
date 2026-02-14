import random

def simulation_gain():
    de = random.randint(1, 6) # On lance un dé à 6 faces
    
    if de == 1:
        return -5 # Perte de 5 euros
    
    elif de % 2 == 0:  #Si le résultat est pair
        return ...... # Gain de 2 euros
    
    else :
        return ...... # Gain de 1 euro
   
# Calcul de la moyenne sur 10 000 parties
nb_parties = 10000
somme_gains = 0

for i in range(nb_parties):
    somme_gains = somme_gains + simulation_gain()

moyenne = somme_gains / nb_parties
print("Le gain moyen sur 10 000 parties est :", moyenne)