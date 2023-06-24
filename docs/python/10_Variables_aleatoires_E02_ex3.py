
from random import randint
#La ligne précédente permet d'utiliser la fonction randint
#exemple : randint(5,9) retourne un nombre entier au hasard entre 5 et 9

def simulation():
    L=[]
    for i in range(1,101):
        X=0
        for i in range(1,51):
            X=X+randint(0,1)
        L.append(X)
    return L
print(simulation())

        
