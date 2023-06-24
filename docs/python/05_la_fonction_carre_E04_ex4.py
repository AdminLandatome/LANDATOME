def mystere(n):
    a = 1
    for k in range(1,n+1):
        p = 10**(-k)
        while a*2 < 2:
            a = a + p
        a = a - p
    return a,a+p

