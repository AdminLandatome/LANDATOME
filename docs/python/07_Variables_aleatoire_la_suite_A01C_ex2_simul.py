from random import randint

nb_simul = 100000

somme_des_gains = 0
listes_tickets = [50,100]+[0 for _ in range(198)]

def un_gain(liste):
    liste = listes_tickets[:]
    gain = -4       #on dépense 4 euros
    num_ticket1 = randint(0,199)
    gain += liste[num_ticket1]
    liste.pop(num_ticket1)
    num_ticket2 = randint(0,198)
    gain += liste[num_ticket2]
    return gain

for num_simul in range(nb_simul):
    somme_des_gains += un_gain(listes_tickets)
print(somme_des_gains/nb_simul)
    
    



        
        
