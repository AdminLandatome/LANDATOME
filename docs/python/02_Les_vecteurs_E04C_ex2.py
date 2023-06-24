from math import sqrt

def distance(xA,yA,xB,yB):
    """renvoie la distance entre A(xA;yA) et B(xB;yB)"""
    resultat = sqrt((xB-xA)**2+(yB-yA)**2)
    return resultat

def DansLeDisque(xA,yA,xO,yO,R):
    """renvoie True si A(xA;yA) appartient au disque (fermé)
       de centre O(xO;yO) et de rayon R"""
    if distance(xA,yA,xO,yO) <= R :
        return True
    else:
        return False



