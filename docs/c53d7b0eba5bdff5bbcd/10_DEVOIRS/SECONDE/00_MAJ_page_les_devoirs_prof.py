 # coding: utf-8
import os
import encodings
from tkinter.filedialog import *
from tkinter import *
import glob

code_entete = b'<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n\t    <title> Landatome  </title>\r\n\t\t<meta charset="utf-8" />\r\n\t\t<meta name="viewport"\r\n\t\t      content="width=device-width, initial-scale=1.0" />\r\n\t    <link rel= "stylesheet" type="text/css" href="../../../messtyles4.css"/>\r\n\t</head>\t\r\n\t<body>\r\n\t    <h1> <a href="../../../index.html">Landatome  </a> </h1>\r\n\t\t<h2> Les devoirs de Seconde</h2>\t\t\r\n\t\t<nav class="telephone">\r\n\t\t\t\t\t\t\r\n\t\t<label for="dm"> Les DM </label>\r\n\t\t<input type="checkbox" id="dm" role="button">\r\n\t\t<ul class="mob"> \r\n\t\t<!--DM_MOBILE_DEB  -->'
code_DM_mobile1 = b'\r\n\t\t    <li> \r\n\t\t\t    <label for="dm01"> DM01 </label>\r\n\t\t\t\t<input type="checkbox" id="dm01" role="button">\r\n\t\t\t\t<ul class="sousmob">\r\n\t\t\t\t    <li>\r\n\t\t\t\t\t    <a href="#" > Sujet </a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t    <a href="#" > Corrig\xc3\xa9 </a>\r\n\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t</ul>\t\t\t\r\n\t\t\t</li>\r\n\t\t\t<li>'
code_sep_mobile = b'\r\n\t\t<!--DM_MOBILE_FIN  -->\r\n\t\t</ul>\t\t\t\r\n\t\t<label for="ds"> Les DS</label>\r\n\t\t<input type="checkbox" id="ds" role="button">\r\n\t\t<ul class="mob">\r\n\t\t<!--DS_MOBILE_DEB  -->'
code_DS_mobile = b'\r\n\t\t    <li> \r\n\t\t\t    <label for="ds01"> DS01 </label>\r\n\t\t\t\t<input type="checkbox" id="ds01" role="button">\r\n\t\t\t\t<ul class="sousmob">\r\n\t\t\t\t    <li>\r\n\t\t\t\t\t    <a href="#" > Sujet </a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t    <a href="#" > Corrig\xc3\xa9 </a>\r\n\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t</ul>'
code_sep_mob_pc = b'\r\n\t\t\t<!--DS_MOBILE_FIN  -->\r\n\t\t</ul>\r\n\t\t</nav>\r\n\t\t<nav>\r\n\t\t    <div class="conteneur-nav">\t\t\t\t\r\n\t\t\t\t<ul>\t\t\t\t    \r\n\t\t\t\t\t<li class="deroulant"> <a href="#"> Les DM  </a>\r\n\t\t\t\t\t    <ul class="sous">\r\n\t\t\t\t\t\t<!--DM_PC_DEB -->'
code_DM_pc = b'\r\n\t\t\t\t\t\t    <li> <a href="#"> DM01 </a>\r\n\t\t\t\t\t\t\t    <span class="sousmenu"> <a href="#" >Sujet </a> </span>\r\n\t\t\t\t\t\t\t\t<span class="sousmenu"> <a href="#" >Corrig\xc3\xa9</a> </span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>'
code_sep_pc = b'\r\n\t\t\t\t\t\t<!--DM_PC_DEB -->\t\r\n\t\t\t\t\t\t</ul>\t\t\t\t\t\t\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<li class="deroulant"> <a href="#"> Les DS  </a>\r\n\t\t\t\t\t    <ul class="sous">\r\n\t\t\t\t\t\t<!--DS_PC_DEB -->'
code_DS_pc = b'\r\n\t\t\t\t\t\t     <li> <a href="#"> DS01 </a>\r\n\t\t\t\t\t\t\t    <span class="sousmenu"> <a href="#" >Sujet </a> </span>\r\n\t\t\t\t\t\t\t\t<span class="sousmenu"> <a href="#" >Corrig\xc3\xa9</a> </span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>'
code_fin = b'\r\n\t\t\t\t\t\t<!--DS_PC_FIN -->\t\r\n\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t</li>\t\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</nav>\r\n\t\t\r\n\t\t\r\n\t</body>\r\n</html>'

numeros=[b'01',b'02',b'03',b'04',b'05',b'06',b'07',b'08',
         b'09',b'10',b'11',b'12',b'13',b'14',b'15',b'16',
         b'17',b'18',b'19',b'20',b'21',b'22',b'23',b'24']

test='test'
test=test.encode('utf8')
test+=numeros[2]

#codes pour les DM mobiles
#On commence le bloc 
codeDMa = b'\r\n\t\t    <li> \r\n\t\t\t    <label for="dm'
#Ensuite il faut inserer le num du label
codeDMb = b'"> DM'
#Ensuite il faut inserer le num du DM
codeDMc = b' </label>\r\n\t\t\t\t<input type="checkbox" id="dm'
#Ensuite il faut inserer le num du id
codeDMd = b'" role="button">\r\n\t\t\t\t<ul class="sousmob">\r\n\t\t\t\t    <li>\r\n\t\t\t\t\t    <a href="'
#Ensuite il faut inserer le le lien du DM
codeDMe = b'" > Sujet </a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t    <a href="'
#Ensuite il faut inserer le lien du DM corrigé
codeDMf = b'" > Corrig\xc3\xa9 </a>\r\n\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t</ul>\t\t\t\r\n\t\t\t</li>\r\n\t\t\t<li>'
# Le bloc est fini pour les élèves

# Pour les profs, on remplace codeDMf par codeDMg et on ajoute le reste...
#Ensuite il faut inserer le le lien du DM corrigé
codeDMg = b'" > Corrig\xc3\xa9 </a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t    <a href="'
#Enfin le lien du bareme
codeDMh = b'" > bareme </a>\r\n\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t</ul>\t\t\t\r\n\t\t\t</li>\r\n\t\t\t<li>'

#codes pour les DS mobiles
#On commence le bloc
codeDSa = b'\r\n\t\t    <li> \r\n\t\t\t    <label for="ds'
#Ensuite il faut inserer le num du label
codeDSb = b'"> DS'
#Ensuite il faut inserer le num du DS
codeDSc = b' </label>\r\n\t\t\t\t<input type="checkbox" id="ds'
#Ensuite il faut inserer le num du id
codeDSd=b'" role="button">\r\n\t\t\t\t<ul class="sousmob">\r\n\t\t\t\t    <li>\r\n\t\t\t\t\t    <a href="'
#Ensuite il faut inserer le le lien du DS
codeDSe=b'" > Sujet </a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t    <a href="'
#Ensuite il faut inserer le le lien du DS corrigé
codeDSf=b'" > Corrig\xc3\xa9 </a>\r\n\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t</ul>'
# Le bloc est fini pour les élèves
# Pour les profs, on remplace codeDSf par codeDSg et on ajoute le reste...
#Ensuite il faut inserer le le lien du DS corrigé
codeDSg = b'" > Corrig\xc3\xa9 </a>\r\n\t\t\t\t\t</li>\r\n\t\t\t\t\t<li>\r\n\t\t\t\t\t    <a href="'
codeDSh = b'" > bareme </a>\r\n\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t</ul>'

#codes pour les DM PC
#On commence le bloc
pcodeDMa = b'\r\n\t\t\t\t\t\t    <li> <a href="#"> DM'
#Ensuite il faut inserer le numero du DM
pcodeDMb = b' </a>\r\n\t\t\t\t\t\t\t    <span class="sousmenu"> <a href="'
#Ensuite il faut inserer le lien du DM
pcodeDMc = b'" target="blank" >Sujet </a> </span>\r\n\t\t\t\t\t\t\t\t<span class="sousmenu"> <a href="'
#Ensuite il faut inserer le lien du DM corrigé
pcodeDMd = b'" target="blank" >Corrig\xc3\xa9</a> </span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>'
# Le bloc est fini pour les élèves

# Pour les profs, on remplace pcodeDMd par pcodeDMe et on ajoute le reste...
#Ensuite il faut inserer le le lien du DM corrigé
pcodeDMe = b'" target="blank" >Corrig\xc3\xa9 </a> </span>\r\n\t\t\t\t\t\t\t\t<span class="sousmenu"> <a href="'

pcodeDMf = b'" target="blank" >bareme </a> </span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>'

#codes pour les DS PC
#On commence le bloc
pcodeDSa = b'\r\n\t\t\t\t\t\t     <li> <a href="#"> DS'
#Ensuite il faut inserer le numero du DS
pcodeDSb = b' </a>\r\n\t\t\t\t\t\t\t    <span class="sousmenu"> <a href="'
#Ensuite il faut inserer le lien du DS
pcodeDSc = b'" target="blank" >Sujet </a> </span>\r\n\t\t\t\t\t\t\t\t<span class="sousmenu"> <a href="'
#Ensuite il faut inserer le lien du DS corrigé
pcodeDSd = b'" target="blank" >Corrig\xc3\xa9</a> </span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>'
# Le bloc est fini pour les élèves
pcodeDSe = b'" target="blank" >Corrig\xc3\xa9 </a> </span>\r\n\t\t\t\t\t\t\t\t<span class="sousmenu"> <a href="'
pcodeDSf = b'" target="blank" >bareme </a> </span>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</li>'


def RecupListe():
    """recupere les fichiers de devoirs dans le repertoire courant et renvoit
    une liste"""
    return glob.glob('*D*.pdf')

def CreListNumero(liste):
    """cree la liste des numeros de devoir"""
    retourNum=[]
    for i in len(liste):
        retourNum.append(numeros[i])
    return retourNum

def CreListDM(liste):
    """cree la liste des noms de fichiers DM__"""
    retourDM = []
    for ele in liste:
        if ele[0]!='n' and 'DM' in ele and not('C' in ele or 'bar' in ele):
            retourDM.append(ele.encode('utf8'))
    return retourDM

def CreLienDM(liste):
    """cree la liste des liens pour les DM"""
    retourLienDM=[]
    for ele in liste:
        lien =b'../../../10_DEVOIRS/SECONDE/'+ele        
        retourLienDM.append(lien)
    return retourLienDM

def CreListDMC(liste):
    """cree la liste des noms de fichiers DM__C"""
    retourDMC = []
    for ele in liste:
        if ele[0]!='n' and 'DM' in ele and 'C' in ele and not('bar' in ele):
            retourDMC.append(ele.encode('utf8'))
    return retourDMC

def CreLienDMC(liste):
    """cree la liste des liens pour les DM"""
    retourLienDMC=[]
    for ele in liste:
        lien =b'../../../10_DEVOIRS/SECONDE/'+ele 
        retourLienDMC.append(lien)
    return retourLienDMC

def CreListDMB(liste):
    """cree la liste des noms de fichiers DM__C_bareme"""
    retourDMB = []
    for ele in liste:
        if ele[0]!='n' and 'DM' in ele and 'bar' in ele:
            retourDMB.append(ele.encode('utf8'))
    return retourDMB

def CreLienDMB(liste):
    """cree la liste des liens pour les baremes des DM"""
    retourLienDMB = []
    for ele in liste:
        lien =b'../../../10_DEVOIRS/SECONDE/'+ele 
        retourLienDMB.append(lien)
    return retourLienDMB
 
def CreListDS(liste):
    """cree la liste des noms de fichiers DS__"""
    retourDS = []
    for ele in liste:
        if ele[0]!='n' and 'DS' in ele and not('C' in ele or 'bar' in ele):
            retourDS.append(ele.encode('utf8'))
    return retourDS

def CreLienDS(liste):
    """cree la liste des liens pour les DS"""
    retourLienDS=[]
    for ele in liste:
        lien =b'../../../10_DEVOIRS/SECONDE/'+ele
        
        retourLienDS.append(lien)
    return retourLienDS

def CreListDSC(liste):
    """cree la liste des noms de fichiers DS__C"""
    retourDSC = []
    for ele in liste:
        if ele[0]!='n' and 'DS' in ele and 'C' in ele and not('bar' in ele):
            retourDSC.append(ele.encode('utf8'))
    return retourDSC

def CreLienDSC(liste):
    """cree la liste des liens pour les DM"""
    retourLienDSC=[]
    for ele in liste:
        lien =b'../../../10_DEVOIRS/SECONDE/'+ele
        retourLienDSC.append(lien)
    return retourLienDSC

def CreListDSB(liste):
    """cree la liste des noms de fichiers DS__C_bareme"""
    retourDSB = []
    for ele in liste:
        if ele[0]!='n' and 'DS' in ele and 'bar' in ele:
            retourDSB.append(ele.encode('utf8'))
    return retourDSB

def CreLienDSB(liste):
    """cree la liste des liens pour les baremes DS"""
    retourLienDSB=[]
    for ele in liste:
        lien =b'../../../10_DEVOIRS/SECONDE/'+ele
        retourLienDSB.append(lien)
    return retourLienDSB

def CreMenuDM_Mobile_eleve():
    liste = RecupListe()
    listeDM = CreListDM(liste)
    listeLienDM = CreLienDM(listeDM)
    listeDMC = CreListDMC(liste)
    listeLienDMC = CreLienDMC(listeDMC)
    
    ld, lc = listeLienDM[:], listeLienDMC[:]
    Lmenu=[]
    if len(listeLienDM)>len(listeLienDMC):
        for i in range(len(listeLienDMC),len(listeLienDM)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDM)):
        code=codeDMa+numeros[i]+codeDMb+numeros[i]+codeDMc+numeros[i]+codeDMd+ld[i]+codeDMe+lc[i]+codeDMf
        Lmenu.append(code)
    
    codeDM=b''
    for i in range(len(Lmenu)):
        codeDM = codeDM + b'\n'+Lmenu[-1-i]
    return codeDM

def CreMenuDM_mobile_prof():
    liste = RecupListe()
    listeDM = CreListDM(liste)
    listeLienDM = CreLienDM(listeDM)
    listeDMC = CreListDMC(liste)
    listeLienDMC = CreLienDMC(listeDMC)
    listeDMB = CreListDMB(liste)
    listeLienDMB=CreLienDMB(listeDMB)
    ld, lc, lb = listeLienDM[:], listeLienDMC[:], listeLienDMB[:]
    Lmenu=[]
    if len(listeLienDM)>len(listeLienDMC):
        for i in range(len(listeLienDMC),len(listeLienDM)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDM)):
        code=codeDMa+numeros[i]+codeDMb+numeros[i]+codeDMc+numeros[i]+codeDMd+ld[i]+codeDMe+lc[i]+codeDMg+lb[i]+codeDMh
        Lmenu.append(code)
    codeDM=b''
    for i in range(len(Lmenu)):
        codeDM = codeDM + b'\n'+Lmenu[-1-i]
    return codeDM
    

def CreMenuDS_Mobile_eleve():
    liste = RecupListe()
    listeDS = CreListDS(liste)
    listeLienDS = CreLienDS(listeDS)
    listeDSC = CreListDSC(liste)
    listeLienDSC = CreLienDSC(listeDSC)
    
    ld, lc = listeLienDS[:], listeLienDSC[:]
    Lmenu=[]
    if len(listeLienDS)>len(listeLienDSC):
        for i in range(len(listeLienDSC),len(listeLienDS)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDS)):
        code=codeDSa+numeros[i]+codeDSb+numeros[i]+codeDSc+numeros[i]+codeDSd+ld[i]+codeDSe+lc[i]+codeDSf
        Lmenu.append(code)
    
    codeDS=b''
    for i in range(len(Lmenu)):
        codeDS = codeDS + b'\n'+Lmenu[-1-i]
    return codeDS

def CreMenuDS_Mobile_prof():
    liste = RecupListe()
    listeDS = CreListDS(liste)
    listeLienDS = CreLienDS(listeDS)
    listeDSC = CreListDSC(liste)
    listeLienDSC = CreLienDSC(listeDSC)
    listeDSB = CreListDSB(liste)
    listeLienDSB = CreLienDSB(listeDSB)
    ld, lc, lb = listeLienDS[:], listeLienDSC[:], listeLienDSB[:]
    Lmenu=[]
    if len(listeLienDS)>len(listeLienDSC):
        for i in range(len(listeLienDSC),len(listeLienDS)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDS)):
        code=codeDSa+numeros[i]+codeDSb+numeros[i]+codeDSc+numeros[i]+codeDSd+ld[i]+codeDSe+lc[i]+codeDSg+lb[i]+codeDSh
        Lmenu.append(code)
    
    codeDS=b''
    for i in range(len(Lmenu)):
        codeDS = codeDS + b'\n'+Lmenu[-1-i]
    return codeDS

def CreMenuDM_PC_eleve():
    liste = RecupListe()
    listeDM = CreListDM(liste)
    listeLienDM = CreLienDM(listeDM)
    listeDMC = CreListDMC(liste)
    listeLienDMC = CreLienDMC(listeDMC)
    
    ld, lc = listeLienDM[:], listeLienDMC[:]
    Lmenu=[]
    if len(listeLienDM)>len(listeLienDMC):
        for i in range(len(listeLienDMC),len(listeLienDM)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDM)):
        code=pcodeDMa+numeros[i]+pcodeDMb+ld[i]+pcodeDMc+lc[i]+pcodeDMd
        Lmenu.append(code)
    
    codeDM=b''
    for i in range(len(Lmenu)):
        codeDM = codeDM + b'\n'+Lmenu[-1-i]
    return codeDM
	
def CreMenuDS_PC_eleve():
    liste = RecupListe()
    listeDS = CreListDS(liste)
    listeLienDS = CreLienDS(listeDS)
    listeDSC = CreListDSC(liste)
    listeLienDSC = CreLienDSC(listeDSC)
    
    ld, lc = listeLienDS[:], listeLienDSC[:]
    Lmenu=[]
    if len(listeLienDS)>len(listeLienDSC):
        for i in range(len(listeLienDSC),len(listeLienDS)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDS)):
        code=pcodeDSa+numeros[i]+pcodeDSb+ld[i]+pcodeDSc+lc[i]+pcodeDSd
        Lmenu.append(code)
    
    codeDS=b''
    for i in range(len(Lmenu)):
        codeDS = codeDS + b'\n'+Lmenu[-1-i]
    return codeDS

def CreMenuDS_PC_prof():
    liste = RecupListe()
    listeDS = CreListDS(liste)
    listeLienDS = CreLienDS(listeDS)
    listeDSC = CreListDSC(liste)
    listeLienDSC = CreLienDSC(listeDSC)
    listeDSB = CreListDSB(liste)
    listeLienDSB=CreLienDSB(listeDSB)
    ld, lc, lb = listeLienDS[:], listeLienDSC[:], listeLienDSB[:]
    Lmenu=[]
    if len(listeLienDS)>len(listeLienDSC):
        for i in range(len(listeLienDSC),len(listeLienDS)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDS)):
        code=pcodeDSa+numeros[i]+pcodeDSb+ld[i]+pcodeDSc+lc[i]+pcodeDSe+lb[i]+pcodeDSf
        Lmenu.append(code)
    
    codeDS=b''
    for i in range(len(Lmenu)):
        codeDS = codeDS + b'\n'+Lmenu[-1-i]
    return codeDS

def CreMenuDM_PC_prof():
    liste = RecupListe()
    listeDM = CreListDM(liste)
    listeLienDM = CreLienDM(listeDM)
    listeDMC = CreListDMC(liste)
    listeLienDMC = CreLienDMC(listeDMC)
    listeDMB = CreListDMB(liste)
    listeLienDMB=CreLienDMB(listeDMB)
    ld, lc, lb = listeLienDM[:], listeLienDMC[:], listeLienDMB[:]
    Lmenu=[]
    if len(listeLienDM)>len(listeLienDMC):
        for i in range(len(listeLienDMC),len(listeLienDM)):
            lc.append(b'../../bientot_dispo.html')
    for i in range(len(listeLienDM)):
        code=pcodeDMa+numeros[i]+pcodeDMb+ld[i]+pcodeDMc+lc[i]+pcodeDMe+lb[i]+pcodeDMf
        
        Lmenu.append(code)
    
    codeDM=b''
    for i in range(len(Lmenu)):
        codeDM = codeDM + b'\n'+Lmenu[-1-i]
    return codeDM




def creer_page(a,b,c,d,e,f,g,h,i):
    code=a+b+c+d+e+f+g+h+i
    
    fichier=open(asksaveasfile().name,'bw')
    fichier.write(code)
    fichier.close()

   

creer_page(code_entete,CreMenuDM_mobile_prof(),code_sep_mobile,CreMenuDS_Mobile_prof(),
           code_sep_mob_pc,CreMenuDM_PC_prof(),code_sep_pc,CreMenuDS_PC_prof(),code_fin)

