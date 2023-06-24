
from random import random
#La ligne précédente permet d'utiliser la fonction random
#exemple : random() retourne un nombre ("décimal") au hasard entre 0 et 1

def echantillon():
    X = 0
    for i in range(1,81):
        Y = random()
        if Y <= 0.3:
            X = X +1
    return X

print(echantillon())

        
