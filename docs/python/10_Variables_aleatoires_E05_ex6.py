from random import randint

alphabet = ['A','E','Z']



def tirage_lettre():
    """tire une lettre au hasard"""
    numero = randint(0,2)
    return alphabet[numero]


def simulation(mot):
    """ mot est une chaine de caractere donc à mettre entre guillemets"""
    lemot=mot.upper()
    tirage=""
    
    while not(lemot in tirage):
        tirage += tirage_lettre()
    return len(tirage)
               
def moyenne_sur(nb_simulations,mot):
    """nb_simulations est un entier non nul et mot une chaine de cararacteres"""
    moyenne = 0
    for i in range(nb_simulations):
        moyenne += simulation(mot)/nb_simulations
    return moyenne

        
               
