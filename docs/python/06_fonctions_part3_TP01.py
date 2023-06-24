def f(x):
    return x**3+x**2-1

# réponse à la question 4) : la fonction question4
#a = 0 et b = 1

def question4(f,a,b):
    """ f est une fonction, a<b sont des réels tels qu'une
        solution de f(x)= 0 est entre a et b.
        retourne a' et b' tels que [a' ; b'] soit 10 fois
        plus petit que [a ; b]"""
    pas= (b-a)/10
    for i in range(10):
        if f(a)*f(a+pas) < 0:
            return a,a+pas
        a=a+pas
    return 'a et b sont mal choisis au départ'

# réponse à la question 5) : la fonction question5
#a = 0 et b = 1

def question5(f,a,b):
    for i in range(6):
        a,b=question4(f,a,b)
    return a,b

