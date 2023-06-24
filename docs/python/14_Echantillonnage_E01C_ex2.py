from random import random
def de_pair():
    nombre = 0
    for compteur in range(5000):
        if random() < 0.5 :
            nombre = nombre + 1
    return nombre/5000
        
