def f(x):
    return 4*x**3-28*x**2+19*x+105

def recherche(f):
    solutions=[]
    for n in range(-100,101):
        if f(n/2) == 0:
            solutions+= [n/2]
    return solutions

"""
remarques :
1) Commencer par définir f en premier rend notre programme plus
facilement réutilisable
2) dans l'exemple présent le test f(n/2)==0 est pertinent, ce n'est malheureusement
pas toujour le cas, il faut alors se contenter de :
abs(f(n/2))<10**(-9)
qui signifie que l'on teste si la valeur absolue de f(n/2) est plus petite que
0.000000001
On décide alors que f(n/2) = 0 ...
"""
