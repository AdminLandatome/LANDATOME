# creation d'une fonction factorielle
# fact(n) renvoie le produit des n premiers entiers naturels non nuls
#et fact(0)=1

def fact(n):
    if n==0:
        return 1
    elif n==1:
        return 1
    else:
        retour =1
        for i in range(1,n+1):
            retour *= i
    return retour

#création de la fonction qui calcule le coefficient binomial (n,k)


def Cnk(n,k):
    retour=fact(n)/(fact(k)*fact(n-k))
    return retour


#creation de la fonction qui calcule P(X=k)
def P(k,n,p):
    """calcule P(X=k) pour B(n,p)"""
    retour = Cnk(n,k)*p**k*(1-p)**(n-k)
    
    return retour

#creation de la fonction principale
def P1(k,n,p,symbole):
    if symbole == '<':
        retour = 0
        for i in range(k):
            retour += P(i,n,p)
        return retour
    elif symbole == '<=':
        retour = 0
        for i in range(k+1):
            retour += P(i,n,p)
        return retour
    elif symbole == '>':
        retour = 0
        for i in range(k+1,n+1):
            retour += P(i,n,p)
        return retour
    elif symbole == '>=':
        retour = 0
        for i in range(k,n+1):
            retour += P(i,n,p)
        return retour
    elif symbole == '=':
        return P(k,n,p)
    else:
        return '...on ne peut pas savoir...'


if __name__ == "__main__":
    print("On calcule P(X symbole k) avec B(n,p) (symbole peut être : = , < , > , <= , >= )")
    n = int(input("n = "))
    p = float(input("p = "))
    k = int(input("k = "))
    symbole = input("le symbole (= , < , > , <=  ou >= ) : ")
    reponse  = 'P(X '+symbole+' '+str(k)+') vaut environ'
    print('********************************************************')
    print(reponse,P1(k,n,p,symbole))
    print('********************************************************')
    input("appuyez sur une touche pour finir le programme")    

