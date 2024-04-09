#***************Correction du TP01*************************

#Définissons la fonction f
def f(x):
    return x**3 + x**2 - 1


# 1) On trouve que f(0) = -1 et f(1) = 1
# On "se doute bien qu'alors la fonction doit passer par zéro à un moment donné" donc :
# En notant s la solution de l'équation f(x)=0 :  0 < s < 1
# Remarque : En spé, on remplace la bout de phrase entre guillemets par une utilisation du TVI

# 2) Ici on peut en déduire que f(a) et f(b) n'ont pas le même signe et donc que f(a)f(b) < 0
# Remarque : En spé, on insisterait bien sûr sur la stricte croissance de f sur [0 ; 1]
#            et on donnerait un contre exemple : (x-0.5)^2

# 3) L'amplitude vaudra (b-a)/10

# 4)
def question4(fonction,a,b):
    amplitude = (b-a)/10
    for numero in range(10):
        if fonction(amplitude*numero+a)*fonction(amplitude*(numero+1)+a)<0:
            return amplitude*numero+a , amplitude*(numero+1)+a
    return a,b

#5)
def question5(fonction,a,b,precision):
    for p in range(precision):
        a,b = question4(fonction,a,b)
    return a,b

#6)
#  >>> question5(f,0,1,6)
#  (0.754877, 0.754878)


#************************Pour aller un peu plus loin********************************

#La question : 
# Que se passe-t-il si l'utilisateur ne rentre pas a et b dans l'ordre croissant à la question4 ?
# Comment pallier à ce problème ?


# Une réponse possible
#---> on ajoute  :
#if a > b :
#    a,b = b,a
def question4_bis(fonction,a,b):
    if a > b :
        a,b = b,a 
    amplitude = (b-a)/10
    for numero in range(10):
        if fonction(amplitude*numero+a)*fonction(amplitude*(numero+1)+a)<0:
            return amplitude*numero+a , amplitude*(numero+1)+a
    return a,b

#************************Pour aller plus loin********************************

#La question : 
#on souhaite ne pas devoir definir la fonction à priori, proposez une solution
#Indice : faites une recherche sur les "lambda fonctions" en python

# Une réponse possible
#On crée donc une fonction qui "transformer" l'entrée de l'utilisateur en fonction
def cree_fonction(chaine):
    expression = ""
    for i in range(len(chaine)):
        if chaine[i].isalpha():
            expression += "x"
        else:
            expression +=chaine[i]
    return lambda x : eval(expression)

def question5_bis(fonction,a,b,precision):
    """Attention fonction est chaine chaine de caractère qui définie une fonction
       Exemple d'utilsation :  question5_bis("x**3+x**2-1",0,1,6)
       renverra (0.754877, 0.754878)
    """
    g = cree_fonction(fonction)
    for p in range(precision):
        a,b = question4(g,a,b) #Attention, on a adapté cette ligne aussi
    return a,b



#*********************D'autres approches...*********************************

#Fonction qui découpe l'intervalle [a ; b] en dix sous parties de même amplitude
def coupe_en_dix(a,b):
    decoupe = []
    pas = (b-a)/10
    for indice in range(10):
        decoupe.append(a+indice*pas)
    decoupe.append(b)
    return decoupe
        
#Fonction qui teste si la solution est dans l'intervalle [debut ; fin]        
def solution_dans_cet_intervalle(debut,fin,fonction = f):
    if fonction(debut)*fonction(fin) <= 0:
        return True
    else:
        return False

#La fonction qui réponds au problème
def encadrement_de_la_solution(fonction,a,b,precision = 2):
    """fonction est une chaine de caracteres qui définie la fonction"""
    
    borne1 = a
    borne2 = b
    for nb_tour in range(1,precision+1):
        les_dix_parties =  coupe_en_dix(borne1,borne2) # On crée la liste des 10 subdivisions
        indice = 0 # la liste "les_dix_parties" contient 11 éléments : les bornes des 10 subdivisions
        
        # On va parcourir cette liste avec "indice" et "indice+1" qui seront les bornes de la subdivision.
        #Tant que la solution n'est pas dans la subdivision, on passe à la suivante :        
        while not(solution_dans_cet_intervalle(les_dix_parties[indice],les_dix_parties[indice+1],fonction)):
            indice += 1
        # Une fois la bonne subdivision trouvée, on la rédécoupe en dix en reprenant les opérations avec
        #les nouvelles bornes :
        borne1 = les_dix_parties[indice]
        borne2 = les_dix_parties[indice+1]
    
    # Quand la précision voulue est atteinte, on renvoie ses bornes 
    return borne1,borne2


#********************************** Pour généraliser*******************************************

#On aimerait ne pas devoir définir la fonction f a priori
#On crée donc une fonction qui "transformer" l'entrée de l'utilisateur en fonction
def cree_fonction(chaine):
    expression = ""
    for i in range(len(chaine)):
        if chaine[i].isalpha():
            expression += "x"
        else:
            expression +=chaine[i]
    return lambda x : eval(expression)

#Puis on modifie légèrement 
def encadrement_de_la_solution_bis(fonction,a,b,precision = 2):
    """fonction est une chaine de caracteres qui définie la fonction
    a et b sont les bornes de l'intervalle
    """
    g = cree_fonction(fonction)
    borne1 = a
    borne2 = b
    if borne1>borne2 :
        borne1,borne2 = borne2,borne1
    for nb_tour in range(1,precision+1):
        les_dix_parties =  coupe_en_dix(borne1,borne2) # On crée la liste des 10 subdivisions
        indice = 0 # la liste "les_dix_parties" contient 11 éléments : les bornes des 10 subdivisions
        
        # On va parcourir cette liste avec "indice" et "indice+1" qui seront les bornes de la subdivision.
        #Tant que la solution n'est pas dans la subdivision, on passe à la suivante :        
        while not(solution_dans_cet_intervalle(les_dix_parties[indice],les_dix_parties[indice+1],g)):
            indice += 1
        # Une fois la bonne subdivision trouvée, on la rédécoupe en dix en reprenant les opérations avec
        #les nouvelles bornes :
        borne1 = les_dix_parties[indice]
        borne2 = les_dix_parties[indice+1]
    
    # Quand la précision voulue est atteinte, on renvoie ses bornes 
    return borne1,borne2
    
#********************************* version minimaliste********************************************
# cette fonction nécessite la définition préalable de la fonction f et ne permet pas de choisir l'intervalle de départ
def encadre(precision):
    a,b,p,i = 0,1,0,0    
    while p < precision:        
        while i < 10 and f((b-a)*i/10+a)*f((b-a)*(i+1)/10+a) > 0 :
            i = i+1
        a , b , i , p = (b-a)*i/10+a , (b-a)*(i+1)/10+a , 0 , p+1
    return a,b
        
            
    