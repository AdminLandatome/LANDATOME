# coding: utf-8
import os
import encodings
from tkinter.filedialog import *
from tkinter import *
import glob

code_de_base=b'<!DOCTYPE html>\r\n\r\n<html>\r\n    <head>\r\n        \r\n        <meta charset="UTF-8">\r\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1">\r\n        <title>Landatome</title>\r\n\t\t<link rel="stylesheet" type="text/css" href="..\\..\\mes_styles.css">\r\n    </head>\r\n\r\n    <body>\r\n        <h1> <a href="..\\..\\index.html">Landatome </a> </h1>\r\n\t\t<h3> Les devoirs de Seconde</h3>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM04_2019_2020.pdf" target="blank">DM04 </a></h2>\r\n\t\t<h2> <a href="..\\..\\bientot_dispo.html" target="blank">DM04 le corrig\xc3\xa9 </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM03_2019_2020.pdf" target="blank">DM03 </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM03C_2019_2020.pdf" target="blank">DM03 le corrig\xc3\xa9 </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DS01_2019_2020.pdf" target="blank">DS01 </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DS01C_2019_2020.pdf" target="blank">DS01 le corrig\xc3\xa9 </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DS01_prep_2019_2020.pdf" target="blank">DS01 (on pr\xc3\xa9pare) </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DS01_prepC_2019_2020.pdf" target="blank">DS01 (on pr\xc3\xa9pare) le corrig\xc3\xa9 </a></h2> \r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM02_2019_2020.pdf" target="blank">DM02 </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM02C_2019_2020.pdf" target="blank">DM02 le corrig\xc3\xa9  </a></h2>\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM01_2019_2020.pdf" target="blank">DM01 </a></h2>\t\t\r\n\t\t<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/Seconde_DM01C_2019_2020.pdf" target="blank">DM01 le corrig\xc3\xa9 </a></h2>\r\n\t\t\r\n\t\t\r\n\t\t \r\n    </body>\r\n</html>'
#code_de_base=code_de_base.encode('utf8')
code_de_debut=b'<!DOCTYPE html>\r\n\r\n<html>\r\n    <head>\r\n        \r\n        <meta charset="UTF-8">\r\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1">\r\n        <title>Landatome</title>\r\n\t\t<link rel="stylesheet" type="text/css" href="..\\..\\mes_styles.css">\r\n    </head>\r\n\r\n    <body>\r\n        <h1> <a href="..\\..\\index.html">Landatome </a> </h1>\r\n\t\t<h3> Les devoirs de Seconde</h3>\r\n\t'
code_de_fin=b'    </body>\r\n</html>'

def creer_page():
    code=code_de_debut
    liste_liens=liste.get(0,'end')
    for i in liste_liens:
        code+=i
    code+=code_de_fin
    fichier=open(asksaveasfile().name,'bw')
    fichier.write(code)
    fichier.close()
    fenetre.destroy()

def creer_lien():
    liste=glob.glob('*D*.pdf')  #on recupere les noms des pdf dans le rep
    liens=[]
    #pour chaque nom de fichier
    for i in range(len(liste)):
        nom=liste[i]
        if 'C' in nom and not('prep' in nom):
            nom=nom[nom.index('D'):nom.index('D')+4]+' le corrigé'
        elif 'prep' in nom and not('C' in nom):
            nom=nom[nom.index('D'):nom.index('D')+4]+' (on prépare)'
        elif 'prepC' in nom:
            nom=nom[nom.index('D'):nom.index('D')+4]+' (on prépare) le corrigé'
        else:
            nom=nom[nom.index('D'):nom.index('D')+4]
        if not(liste[i][0]=='n'):
            liens.append('<h2> <a href="..\\..\\10_DEVOIRS/SECONDE/'+liste[i]+'" target="blank"> '+nom+' </a></h2>\n')
            liens[i]=liens[i].encode('utf8')
        else:
            liens.append('<h2> <a href="..\\..\\bientot_dispo.html" target="blank"> '+nom+' </a></h2>\n')
            liens[i]=liens[i].encode('utf8')
       
    liens.reverse()
    return liens

def ouvrir():
    try:
        os.startfile(askopenfile().name)
    except:
        pass

# cette fonction permet de choisir le fichier à modifier et de recupere
# son code en binaire

def extraire():
    try:
        nom_fichier=askopenfile().name
    except AttributError:
        pass
    f=open(nom_fichier,'br')
    text=f.read()
    f.close()
    return text

def creer_ajout():
    #on demande ce qu'il faut ajouter
    ajout=input(str('ligne à ajouter '))

    #on l'encode dans le bon format ici utf8 car la page est en utf8
    ajout=ajout.encode('utf8')
    return ajout

    #ici se trouve l'endroit avant lequel on va inserer le texte

def ou_ajouter():
    chaine=input(str('avant quoi dans le code? '))
    chaine=chaine.encode('utf8')
    return chaine

def ajout(evt):
   text = saisi.get()
   liste.insert('end', text)
   saisi.delete(0, 'end')

def remplir():
    base=creer_lien()
    for ele in base:
        liste.insert('end',ele)
      

index = -1

def selclic(evt):
   global index # pour pouvoir modifier index qui est «globale»
   index = liste.nearest(evt.y)

#    L’échanger avec celui qui est le plus proche de la souris au relâchement du clic

def selrel(evt):
   item1 = liste.get(index)
   index2 = liste.nearest(evt.y)
   if index2 == index: # rien à faire !
        return
   item2 = liste.get(index2)
   liste.delete(index) # on supprime le premier item ...
   liste.insert(index, item2) # qu'on remplace par le second
   liste.delete(index2) # et vice versa
   liste.insert(index2, item1)
   
def selrel1(evt):
    item1 = liste.get(index)
    index2 = liste.nearest(evt.y)
    if index2 == index: # rien à faire !
        return
    liste.delete(index)
    liste.insert(index2,item1)
   
fenetre=Tk()
fenetre.title('ordre des liens')

liste = Listbox(fenetre, height=20, width=200)
liste.grid()
liste.bind('<Delete>', lambda evt: liste.delete(liste.curselection()))
liste.bind('<Button-1>', selclic, '+') # '+' ? voir NOTE tout à la fin
liste.bind('<ButtonRelease-1>', selrel1)
b = Button(fenetre, text="remplir", command=remplir)
b.grid()
c = Button(fenetre, text="générer le fichier", command=creer_page)
c.grid()
fenetre.mainloop()

