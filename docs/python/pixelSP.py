from pixel import *

def ouverture_fenetre() :
    initialiser(40, 30, 20)

def dessine_pixel(x,y):
    marquer(x, y, 1)
    afficher(0.1)
    
def dessine_pixel_rapide(x,y):
    marquer(x, y, 1)
    afficher(0)

def fin():
    afficher()  

def rouge():
    couleur(1,0,0.2)

def vert():
    couleur(0.2,0.7,0.35)

def violet():
    couleur(0.85,0.25,0.65)

def turquoise():
    couleur(0,0.8,0.8)
    
def vertjaune():
    couleur(0.6,0.8,0.3)
    
def jaune():
    couleur(1,0.8,0)
    
def orange():
    couleur(1,0.3,0)
    
def bleu():
    couleur(0.15,0.27,0.5)

def rose():
    couleur(0.9,0.05,0.5)

