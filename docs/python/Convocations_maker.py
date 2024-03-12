
def main():
    import tkinter as tk
    #from PIL import ImageTk
    
    #validation sert à valider les étapes, elle est modifiée par effet de bord
    #dans les fonctions etape_XX 
    validation = [False,False,False,False]
    couleur = ["#AAAAAA","#DDDDDD"]
    
    code_html_debut = """<!DOCTYPE html>
<html>
    <head>
        <title> Landatome </title>
        <meta charset="utf-8">
        <link media="print" rel="stylesheet" type="text/css" href="../fichiers_internes/styles_CCF_print.css">
        <link rel="stylesheet" type="text/css" href="../fichiers_internes/styles_CCF_html.css">
        
    </head>
    <body>
        """
    code_html_fin = """ </body>
</html>"""
    
    
    
    
    def recup_press_papier():
        try:
            return(fenetre.clipboard_get())
            
        except:
            
            return'vide'
        finally:
            pass
    
    def preparation_pour_lecture(bdd_maison):
        """on identifie, si elles existent, les colonnes : eleve, ne le, opt1, opt2 opt3"""
        dico_lecture = {}
        taille = len(bdd_maison[0])
        for num in range(taille):
            if  bdd_maison[0][num] == 'Élève':
                dico_lecture["nom"] = num
            elif bdd_maison[0][num] == 'Né(e) le':
                dico_lecture["date_naissance"] = num
            elif bdd_maison[0][num] == 'Option 1':
                dico_lecture["Option_1"] = num
            elif bdd_maison[0][num] == 'Option 2':
                dico_lecture["Option_2"] = num
            elif bdd_maison[0][num] == 'Option 3':
                dico_lecture["Option_3"] = num
            elif bdd_maison[0][num] == 'Option 4':
                dico_lecture["Option_4"] = num
            elif bdd_maison[0][num] == 'Option 5':
                dico_lecture["Option_5"] = num
            elif bdd_maison[0][num] == 'Option 6': 
                dico_lecture["Option_6"] = num
            elif bdd_maison[0][num] == 'Option 7':
                dico_lecture["Option_7"] = num
            elif bdd_maison[0][num] == 'Option 8':
                dico_lecture["Option_8"] = num
            elif bdd_maison[0][num] == 'Option 9':
                dico_lecture["Option_9"] = num
            elif bdd_maison[0][num] == 'Option 10':
                dico_lecture["Option_10"] = num
            elif bdd_maison[0][num] == "Projet d'accompagnement":
                dico_lecture["PAP"] = num
            elif bdd_maison[0][num] == "Sortie":
                dico_lecture["sortie"] = num
            else:
                print(bdd_maison[0][num]," n'est pas pris pas en compte")
            dico_lecture['choisi'] = taille-1
            dico_lecture['ordre_de_passage'] = taille -2
        
        return  dico_lecture
    
    def cree_bdd_eleves(chaine):
        donnees = chaine.split('\n')
        bdd = []
        for ele in donnees:
            bdd.append(ele.split('\t'))
        
        for ligne in bdd:
            for numero in range(len(ligne)):
                ligne[numero] = ligne[numero].replace('"','').replace('--',' ').replace('-',' ')
            ligne.append(0)
            ligne.append('vide')
        descripteurs = preparation_pour_lecture(bdd)      
        
        return bdd, descripteurs
    
    def heure_depuis_minuit(nb_minutes):
        heure, minute = divmod(nb_minutes,60)
        HH = str(heure)
        if minute == 0 :
            MN = "00"
        else:
            MN = str(minute)
        return HH+"h"+MN

    def nb_minutes_depuis_minuit(heure):
        heure1 = list(map(int,heure.split("h")))
    
        return heure1[0]*60+heure1[1]

    def heure_de_convoc(debut1, duree1, numero):
        """debut1 est une str du type "10h30" , duree1 est en minutes, numero est le p dans la creation des convoc (etape03)"""
        return heure_depuis_minuit(nb_minutes_depuis_minuit(debut1)+(numero-1)*int(duree1))
    
    
    def etape_01():
        
        global ma_bdd,mes_desc
        
        ma_bdd = cree_bdd_eleves(recup_press_papier())[0]
        mes_desc = cree_bdd_eleves(recup_press_papier())[1]
        
        try :
            if ma_bdd[0][mes_desc["nom"]] == 'Élève' and ma_bdd[0][mes_desc["sortie"]] == 'Sortie' and ma_bdd[0][mes_desc["date_naissance"]] == 'Né(e) le':
                etape_01_e['text']="Bravo, passez à l'étape n°2"
                validation[0] = True
               
        except :
            etape_01_e['text']="Vous n'avez copié pas correctement votre liste.\n Vous devez avoir au minimum les colonnes\n-'Élève'\n-'Né(e) le'\n-'Sortie'."
            
        ma_bdd = ma_bdd[1:-1]
        
              
    
    def etape_02():
        if validation[1]:
            return None
        if validation[0]:
            try :
                etape_01_e.pack_forget()
            except :
                pass
            etape_01_a.pack_forget()
            etape_01_b.pack_forget()
            etape_01_c.pack_forget()
            etape_01_d.pack_forget()
            etape_01_e.pack_forget()
            etape_01_f.pack_forget()
            
            etape_02_a = tk.Label(fenetre,text='Renseignez le nom de la CLASSE ci-dessous')
            etape_02_a_nom_classe = tk.Entry(fenetre,textvariable = nom_de_la_classe,width=50)
            etape_02_a.pack()
            etape_02_a_nom_classe.pack()
            etape_02_b = tk.Label(fenetre,text='Renseignez la SESSION ci-dessous')
            etape_02_b_nom_session = tk.Entry(fenetre,textvariable = nom_de_la_session,width=50)
            etape_02_b.pack()
            etape_02_b_nom_session.pack()
            etape_02_c = tk.Label(fenetre,text='Renseignez la DISCIPLINE ci-dessous')
            etape_02_c_nom_discipline = tk.Entry(fenetre,textvariable = nom_de_la_discipline,width=50)
            etape_02_c.pack()
            etape_02_c_nom_discipline.pack()
            etape_02_d = tk.Label(fenetre,text='Renseignez la SALLE/LIEU ci-dessous')
            etape_02_d_nom_salle = tk.Entry(fenetre,textvariable = nom_de_la_salle,width=50)
            etape_02_d.pack()
            etape_02_d_nom_salle.pack()
            etape_02_e = tk.Label(fenetre,text="Renseignez la DATE de L'épreuve ci-dessous")
            etape_02_e_date_epreuve = tk.Entry(fenetre,textvariable = date_de_l_epreuve,width=50)
            etape_02_e.pack()
            etape_02_e_date_epreuve.pack()
            
            etape_02_h = tk.Label(fenetre,text="Renseignez l' HEURE DE DEBUT de L'épreuve ci-dessous")
            etape_02_h_heure_epreuve = tk.Entry(fenetre,textvariable = heure_de_debut,width=50)
            etape_02_h.pack()
            etape_02_h_heure_epreuve.pack()
            
            etape_02_i = tk.Label(fenetre,text="Renseignez le Nom de la FORMATION ci-dessous")
            etape_02_i_nom_formation = tk.Entry(fenetre,textvariable = nom_de_la_formation,width=50)
            etape_02_i.pack()
            etape_02_i_nom_formation.pack()
            
            etape_02_f = tk.Label(fenetre,text="Renseignez la DUREE, EN MINUTES, de L'épreuve ci-dessous")
            etape_02_f_date_epreuve = tk.Entry(fenetre,textvariable = duree_de_l_epreuve,width=50)
            etape_02_f.pack()
            etape_02_f_date_epreuve.pack()
            
            etape_02_h = tk.Label(fenetre,text="Vous pouvez convoquer les toutes XX minutes (laissez à 0, si pas utile)")
            etape_02_h_heure_decalee = tk.Entry(fenetre,textvariable = duree_decalage,width=50)
            etape_02_h.pack()
            etape_02_h_heure_decalee.pack()
            etape_02_k = tk.Label(fenetre,text="Renseignez le nom du chef d'établissement ci-dessous")
            etape_02_k_nom_chef = tk.Entry(fenetre,textvariable = nom_du_chef,width=50)
            etape_02_k.pack()
            etape_02_k_nom_chef.pack()
            
            
            
            etape_02_g = tk.Label(fenetre,text="Si vous avez bien tout vérifié alors passez à l'étape n°3")
            etape_02_g.pack()
            validation[1] = True
        else :
            etape_01_e['text'] = "Vous devez d'abord effectuer l'étape n°1 correctement..."
    
    def etape_03():
        import subprocess as sp
        if validation[1]:
            #print('ok')
            code_html = code_html_debut
            #On recupere les données
            nom_formation = nom_de_la_formation.get()
            nom_classe = nom_de_la_classe.get()
            nom_salle = nom_de_la_salle.get()
            date_epreuve = date_de_l_epreuve.get()
            duree_epreuve = duree_de_l_epreuve.get()
            debut_epreuve = heure_de_debut.get()
            duree_de_decalage = duree_decalage.get()
            discipline = nom_de_la_discipline.get()
            session = nom_de_la_session.get()
            chef = nom_du_chef.get()
            
            ma_bdd_provisoire_sans_ordre =[]
            for ele in ma_bdd:
                if ele[mes_desc["sortie"]] == '' and (ele[mes_desc["choisi"]] == 'vide' or ele[mes_desc["choisi"]].get()):
                    ma_bdd_provisoire_sans_ordre.append(ele)
            ma_bdd_provisoire_avec_ordre = sorted(ma_bdd_provisoire_sans_ordre,key = lambda x : int(x[mes_desc["ordre_de_passage"]]))
            
            
            p = 0
            for ele in ma_bdd_provisoire_avec_ordre:
                
                   
                if ele[mes_desc["sortie"]] == '' and (ele[mes_desc["choisi"]] == 'vide' or ele[mes_desc["choisi"]].get()):
                    
                    p += 1  
                    nom_eleve = ele[mes_desc["nom"]]
                    date_de_naissance = ele[mes_desc["date_naissance"]]
                    if p == 1:
                        code_html += """<div class="page">
            <table class='en_tete'>
                <tr>
                    <td>
                        <img src='../fichiers_internes/logo_acad_bordeaux_1.jpg' width="50%">
                    </td>
                    <td>
                        <img src='../fichiers_internes/logo_educ_nat.jpg' width="50%" >
                    </td>
                    <td >
                        
                            <button style="background-color:#66ffff;" onclick="style='display:none;';alert('1) Vérifiez que vous êtes bien en Portrait\\n2) Dans plus de paramêtres\\n  a) Pensez à vérifier le format de page : A4\\n  b) Décochez les deux cases :\\n    En tête et \\n    graphique de fond (ou arrière plan)\\n 3) Après cette impression, passez à l\\'étape n°4\\n  pour imprimer la liste d\\'émargement.');window.print();"> Pour Imprimer <br>cliquez moi ! </button>
                        
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='../fichiers_internes/logo_tazieff_1.jpg' width="50%" /><br> <img src='../fichiers_internes/logo_tazieff_2.jpg' width="50%" />
                    </td>
                    <td>
                      
                    </td>
                    <td>
                        <script type="text/javascript">
                            var ladate=new Date()
                            
                            document.write("Le  "+ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear())
                        </script>
                    </td>
                </tr>
                <tr>
                    <td>
                        
                    </td>
                    <td>
                        Le proviseur du Lycée Haroun Tazieff<br>
                        à<br>
                        Madame,Mademoiselle,Monsieur<br>"""
                        code_html +="\n"
                        code_html += nom_eleve+"<br>"+"\n"
                        code_html += date_de_naissance+"<br>"+"\n"
                        code_html += nom_classe+"<br>"+"\n"
                        code_html += """                    </td>
                    <td>
                        
                    </td>
                </tr>
                
                  
            </table>
            <div class="cadre1">
                
                <div class='CCF'>Contrôle en Cours de Formation</div>
                """
                        code_html +="\n"
                        code_html += "              <div class='matiere'>"+discipline+"</div>"+"\n"
                        code_html += "              <div class='classe'>"+nom_classe+"</div>"+"\n"
                        code_html += "              <div class='session'>"+session+"</div>"+"\n"
                        code_html +="""         </div>
            <p> Vous êtes convoqué(e) au lycée à l'adresse : </p>
            <div class="cadre1">
                <div class='adresse'>
                    LPO HAROUN TAZIEFF<br>
                    Boulevard Saint Vincent de Paul<br>
                    40993 SAINT PAUL-LES-DAX<br>
                    
                </div>"""
                        code_html += '\n'
                        code_html += "          <div class='matiere'>Le "+date_epreuve+" à "+heure_de_convoc(debut_epreuve,duree_de_decalage,p)+"</div>"+"\n"
                        code_html +="               <p> Les évaluations se dérouleront en Salle: <strong><u>"+nom_salle+"</u></strong></p>"+"\n"
                        code_html +="               <p> Pour les épreuves (cf. planning) <strong>"+discipline+"</strong> du Diplôme</p>"+"\n"
                        code_html +="""         </div>
            <p> 
                Vous voudrez bien vous présenter 15 minutes à l'avance, muni(e) de la présente convocation et d'une pièce d'identité.
            </p>
            <div class="notabene">
                Nota bene : en cas d'absence injustifiée, la note zéro est attribuée au candidat à l'épreuve ou à la sous-épreuve.
            </div>
            <div class="signature">
                        
                Le chef d'établissement<br>"""
                        code_html += chef
                        code_html +="""
            </div>
            
        </div>"""
                
                        code_html +='\n'
                
                    else:
                
                        code_html += """<div class="page">
            <table class='en_tete'>
                <tr>
                    <td>
                        <img src='../fichiers_internes/logo_acad_bordeaux_1.jpg' width="50%"/>
                    </td>
                    <td>
                        <img src='../fichiers_internes/logo_educ_nat.jpg' width="50%" />
                    </td>
                    <td >
                        
                            
                        
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='../fichiers_internes/logo_tazieff_1.jpg' width="50%" /><br> <img src='../fichiers_internes/logo_tazieff_2.jpg' width="50%" />
                    </td>
                    <td>
                      
                    </td>
                    <td>
                        <script type="text/javascript">
                            var ladate=new Date()
                            
                            document.write("Le  "+ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear())
                        </script>
                    </td>
                </tr>
                <tr>
                    <td>
                        
                    </td>
                    <td>
                        Le proviseur du Lycée Haroun Tazieff<br>
                        à<br>
                        Madame,Mademoiselle,Monsieur<br>"""
                        code_html +="\n"
                        code_html += nom_eleve+"<br>"+"\n"
                        code_html += date_de_naissance+"<br>"+"\n"
                        code_html += nom_classe+"<br>"+"\n"
                        code_html += """                    </td>
                    <td>
                        
                    </td>
                </tr>
                
                  
            </table>
            <div class="cadre1">
                
                <div class='CCF'>Contrôle en Cours de Formation</div>
                """
                        code_html +="\n"
                        code_html += "              <div class='matiere'>"+discipline+"</div>"+"\n"
                        code_html += "              <div class='classe'>"+nom_classe+"</div>"+"\n"
                        code_html += "              <div class='session'>"+session+"</div>"+"\n"
                        code_html +="""         </div>
            <p> Vous êtes convoqué(e) au lycée à l'adresse : </p>
            <div class="cadre1">
                <div class='adresse'>
                    LPO HAROUN TAZIEFF<br>
                    Boulevard Saint Vincent de Paul<br>
                    40993 SAINT PAUL-LES-DAX<br>
                    
                </div>"""
                        code_html += '\n'
                        code_html += "          <div class='matiere'>Le "+date_epreuve+" à "+heure_de_convoc(debut_epreuve,duree_de_decalage,p)+"</div>"+"\n"
                        code_html +="               <p> Les évaluations se dérouleront en Salle: <strong><u>"+nom_salle+"</u></strong></p>"+"\n"
                        code_html +="               <p> Pour les épreuves (cf. planning) <strong>"+discipline+"</strong> du Diplôme</p>"+"\n"
                        code_html +="""         </div>
            <p> 
                Vous voudrez bien vous présenter 15 minutes à l'avance, muni(e) de la présente convocation et d'une pièce d'identité.
            </p>
            <div class="notabene">
                Nota bene : en cas d'absence injustifiée, la note zéro est attribuée au candidat à l'épreuve ou à la sous-épreuve.
            </div>
            <div class="signature">
                Le chef d'établissement<br>"""
                
                        code_html += chef
                        code_html +="""
            </div>
            
        </div>"""
                         
                        code_html +='\n'
                        
            code_html +=code_html_fin
                
            validation[2] = True
            with open("Convocations/Vos_convocations.html","w",encoding='utf-8') as fichier:
                fichier.write(code_html)

            with open("Convocations/Vos_convocations.html","w",encoding='utf-8') as fichier:
                fichier.write(code_html)
            sp.call('Convocations\Vos_convocations.html',shell=True)
            etape_01_e['text'] = "N'oubliez pas l'étape n°4 pour la liste d'émargement!"
            etape_01_e.pack()
            
            
        else :
            etape_01_e['text'] = "Vous devez d'abord effectuer l'étape n°2 correctement..."
            etape_01_e.pack()
        
        

    ##################LISTE EMARGEMENT#########################################"
        
    code_html_emarge_debut = """<!DOCTYPE html>
<html>
    <head>
        <title> Landatome </title>
        <meta charset='utf-8'>
        
        <link rel="stylesheet" type="text/css" href="../fichiers_internes/styles_emargement_html.css">
        
    </head>
    <body>
    <div class="page">"""
    
    code_html_emarge_fin = """  </div>      
    </body>
</html>"""
    
    code_html_enregistrement_vide = """                     <tr>
                            <td class="cellule_vide">
                                Nom et Prénom de l'étudiant(e)
                            </td>
                            <td class="cellule_vide">
                                99/99/2222
                            </td>
                            <td class="cellule_vide">
                                une signature0
                            </td>
                            <td class="cellule_vide">
                                une signature1
                            </td>
                            <td class="cellule_vide">
                                une signature2
                            </td>
                            <td class="cellule_vide">
                                99/99/2222
                            </td>
                            <td class="cellule_vide">
                                25h65  
                            </td>
                            <td class="cellule_vide">
                                Machin
                            </td>
                            <td class="cellule_vide">
                                Jury <br>prof 1
                            </td>
                            <td class="cellule_vide">
                                Jury <br>prof 2
                            </td>
                            <td class="cellule_vide">
                               Jury<br> professionnel
                            </td>
                            <td class="cellule_vide">
                                Entreprise <br>Jury <br>professionnel
                            </td>
                            
                        </tr>"""
    def conversion_duree_et_tiers_temps(duree):
        duree_en_minutes = int(duree)
        h,min = divmod(duree_en_minutes,60)
        if min != 0:
            duree_en_heure =  str(h)+" h "+str(min)+" min"
        else:
            duree_en_heure =  str(h)+" h"
        duree_tiers_temps_en_minutes = duree_en_minutes + duree_en_minutes//3
        h_tiers,min_tiers = divmod(duree_tiers_temps_en_minutes,60)
        if min_tiers != 0:
            duree_tiers_temps_en_heure =  str(h_tiers)+" h "+str(min_tiers)+" min"
        else:
            duree_tiers_temps_en_heure =  str(h_tiers)+" h"
        return duree_en_minutes, duree_en_heure, duree_tiers_temps_en_minutes, duree_tiers_temps_en_heure 
        
    def en_tete_de_la_liste_emargement(formation,classe,session,discipline,duree):
        duree_mn, duree_hm,duree_t_mn,duree_t_hm = conversion_duree_et_tiers_temps(duree)
        code_entete = """<div class="formation">"""
        code_entete += formation +"""</div>
        <div class="formation"> CCF</div>
        <table class="en_tete">
            <tr>
                <td>
                    <img src='../fichiers_internes/logo_tazieff_1.jpg' width="100%" />
                </td>
                <td class="adresse">
                    ACADEMIE DE BORDEAUX<br>
                    LPO HAROUN TAZIEFF<br>
                    Boulevard Saint Vincent de Paul<br>
                    40993 SAINT PAUL-LES-DAX CEDEX<br>
                    Tél. : 05.58.91.33.40<br>
                    Mail : ce.0401002x@ac-bordeaux.fr
                </td>
                
                <td>
                    <table>
                        <tr>
                            <td class="encadre">"""
        code_entete += classe +"""
                            </td>
                            <td>
                                 
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Epreuve :
                            </td>
                            <td>
                                """
        code_entete += discipline +""" 
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                Session  
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                <div class="encadre">"""
        
        code_entete += session + """</div> 
                            </td>
                            <td>
                                <button style="background-color:#66ffff;" onclick="style='display:none;';alert('1) Vérifiez que vous êtes bien en Paysage\\n2) Dans plus de paramêtres\\n  a) Pensez à vérifier le format de page : A3\\n  b) Décochez les deux cases :\\n    En tête et \\n    graphique de fond (ou arrière plan)');window.print();"> Pour Imprimer <br>cliquez moi ! </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Durée de l'évaluation
                            </td>
                            <td class="encadre">
                                """
        code_entete += str(duree_mn) +"""
                            </td>
                            <td>
                                 minutes 
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                soit :  
                            </td>
                            <td class="encadre">"""
        code_entete += duree_hm + """   
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                Durée du 1/3 temps  
                            </td>
                            <td class="encadre">
                                """
        code_entete += str(duree_t_mn) + """   
                            </td>
                            <td>
                                minutes   
                            </td>
                            <td>
                                  
                            </td>
                            <td>
                                soit 
                            </td>
                            <td class="encadre">"""
        
        code_entete += duree_t_hm + """   
                            </td>
                            
                            
                        </tr>

                        
                    </table>
                   
                </td>
                
            </tr>
        </table>  
        <table class="tableau">
            <tr>
            <!--///////////////////////////////colonne de gauche/////////////////////-->
                <td class="gauche">
                    <table class="colonne">
                        <!--///////////////////////////////ligne des descripteurs/////////////////////-->  
        """
        return code_entete
        
        
        
        
    def creer_code_html_ligne_enregistrement(ligne_de_ma_bdd,p):
        nom_eleve = ligne_de_ma_bdd[mes_desc["nom"]]
        
        date_de_naissance = ligne_de_ma_bdd[mes_desc["date_naissance"]]
        date_epreuve = date_de_l_epreuve.get()
        heure_debut = heure_de_convoc(heure_de_debut.get(),duree_decalage.get(),p+1)
        #heure_debut = heure_de_debut.get()
        salle = nom_de_la_salle.get()
        code = "\n"+"""                      <tr>
                            <td class="cellule">"""
        code += nom_eleve + """</td>
                            <td class="cellule">"""
        code += date_de_naissance + """</td>
                            <td class="cellule">
                                
                            </td>
                            <td class="cellule">
                                
                            </td>
                            <td class="cellule">
                                
                            </td>
                            <td class="cellule">"""
        code += date_epreuve + """</td>
                            <td class="cellule">"""
        code += heure_debut + """</td>
                            <td class="cellule">"""
        code += salle + """</td>
                            <td class="cellule">
                                
                            </td>
                            <td class="cellule">
                                
                            </td>
                            <td class="cellule">
                               
                            </td>
                            <td class="cellule">
                                
                            </td>
                            
                        </tr>"""
        return code
        
         
        
    def etape_04():
        if validation[1]:
            NB_MAX = 36
            nb_eleves_non_sortants = 0
            ma_bdd_provisoire_sans_ordre =[]
            for ele in ma_bdd:
                if ele[mes_desc["sortie"]] == '' and (ele[mes_desc["choisi"]] == 'vide' or ele[mes_desc["choisi"]].get()):
                    ma_bdd_provisoire_sans_ordre.append(ele)
            ma_bdd_provisoire_avec_ordre = sorted(ma_bdd_provisoire_sans_ordre,key = lambda x : int(x[mes_desc["ordre_de_passage"]]))
            
            p = -1
            for eleve in ma_bdd_provisoire_avec_ordre:
            
                if eleve[mes_desc['sortie']] == '' and (eleve[mes_desc["choisi"]] == 'vide' or eleve[mes_desc["choisi"]].get()):
                
                    nb_eleves_non_sortants +=1
                    
            
            moitie = NB_MAX//2
            import subprocess as sp
            code_html_emargement=''
        
            if nb_eleves_non_sortants > NB_MAX:
                raise("Pas encore implémenté : il y a trop d'élèves")
            if nb_eleves_non_sortants > moitie:
                debut_gauche, debut_droite = moitie, nb_eleves_non_sortants % moitie
            else :
                debut_gauche, debut_droite = nb_eleves_non_sortants, 0
            fin_gauche = moitie - debut_gauche
            fin_droite = moitie - debut_droite
        
            code_html_emargement += code_html_emarge_debut
            code_html_emargement += en_tete_de_la_liste_emargement(nom_de_la_formation.get(),nom_de_la_classe.get(),nom_de_la_session.get(),nom_de_la_discipline.get(),duree_de_l_epreuve.get())
            code_html_emargement += """ <tr>
                            <td class="cellule">
                                Nom et Prénom <br>de l'étudiant(e)
                            </td>
                            <td class="cellule">
                                Date de <br>naissance
                            </td>
                            <td class="cellule">
                                émargement <br>distribution<br>convocation
                            </td>
                            <td class="cellule">
                                émargement <br>examen n°1
                            </td>
                            <td class="cellule">
                                émargement <br>examen n°2
                            </td>
                            <td class="cellule">
                                Date de  <br>convocation
                            </td>
                            <td class="cellule">
                                Heure  
                            </td>
                            <td class="cellule">
                                Salle
                            </td>
                            <td class="cellule">
                                Jury <br>prof 1
                            </td>
                            <td class="cellule">
                                Jury <br>prof 2
                            </td>
                            <td class="cellule">
                               Jury<br> professionnel
                            </td>
                            <td class="cellule">
                                Entreprise <br>Jury <br>professionnel
                            </td>
                            
                        </tr>"""
            num_de_non_sortant = 0
            num_de_ligne = 0
            while num_de_non_sortant < debut_gauche:
                
                if ma_bdd_provisoire_avec_ordre[num_de_ligne][mes_desc['sortie']] =='':
                    code_html_emargement += creer_code_html_ligne_enregistrement(ma_bdd_provisoire_avec_ordre[num_de_ligne],num_de_ligne)
                    num_de_non_sortant += 1
                num_de_ligne += 1
            for num_de_ligne in range(fin_gauche):
                code_html_emargement += code_html_enregistrement_vide
            code_html_emargement += """                    </table></td>
                    
                
            <!--///////////////////////////////colonne de droite/////////////////////-->    
                <td class="droite">
                     <table class="colonne">
                        <!--///////////////////////////////ligne des descripteurs/////////////////////-->
                        """
            if debut_droite > 0:
                code_html_emargement += """ <tr>
                            <td class="cellule">
                                Nom et Prénom <br>de l'étudiant(e)
                            </td>
                            <td class="cellule">
                                Date de <br>naissance
                            </td>
                            <td class="cellule">
                                émargement <br>distribution<br>convocation
                            </td>
                            <td class="cellule">
                                émargement <br>examen n°1
                            </td>
                            <td class="cellule">
                                émargement <br>examen n°2
                            </td>
                            <td class="cellule">
                                Date de  <br>convocation
                            </td>
                            <td class="cellule">
                                Heure  
                            </td>
                            <td class="cellule">
                                Salle
                            </td>
                            <td class="cellule">
                                Jury <br>prof 1
                            </td>
                            <td class="cellule">
                                Jury <br>prof 2
                            </td>
                            <td class="cellule">
                               Jury<br> professionnel
                            </td>
                            <td class="cellule">
                                Entreprise <br>Jury <br>professionnel
                            </td>
                            
                        </tr>"""
                num_de_non_sortant = 0
                num_de_ligne = 0
                while num_de_non_sortant < debut_droite:
                
                    if ma_bdd[num_de_ligne][mes_desc['sortie']] =='':
                        code_html_emargement += creer_code_html_ligne_enregistrement(ma_bdd[num_de_ligne+18],num_de_ligne+18)
                        num_de_non_sortant +=1
                    num_de_ligne += 1
                for num_de_ligne in range(fin_droite):
                    code_html_emargement += code_html_enregistrement_vide
            else:
                for num_de_ligne in range(18):
                    code_html_emargement += code_html_enregistrement_vide
            code_html_emargement += code_html_emarge_fin
            with open('Convocations\Liste_d_emargement.html','w',encoding='utf-8') as fichier:
                fichier.write(code_html_emargement)
            sp.call('Convocations\Liste_d_emargement.html',shell=True)
        else:
            etape_01_e['text'] = "Vous devez ,au moins, d'abord effectuer l'étape n°2 correctement..."
            etape_01_e.pack()
        
    
        
    def afficher_liste_eleves():
        def recuperer_les_ordres():
            global ma_bdd,mes_desc
            for eleve in ma_bdd:
                if eleve[-1].get():
                    eleve[mes_desc['ordre_de_passage']] = eleve[-1].get()
                else :
                    eleve[mes_desc['ordre_de_passage']] = '0'
            bouton_valider_les_ordres['text'] = "C'est fait, vous pouvez fermer la fenetre"
        
        global ma_bdd,mes_desc
        
        autre_fenetre = tk.Toplevel()
        
        autre_fenetre.title('Landatome')
        autre_fenetre.iconbitmap('fichiers_internes\icone.ico')
        explication = tk.Label(autre_fenetre,text = "Faites votre choix, puis fermez la fenêtre et passez à l'étape 2",bg = "#66ffff")
        explication.grid(row = 0, column = 0)
        explication2 = tk.Label(autre_fenetre,text = "Attention, si vous ne choisissez personne alors le fichier ",bg = "#66ffff")
        explication2.grid(row = 1, column = 0)
        explication3 = tk.Label(autre_fenetre,text = "des convocations sera vide tout comme celui des émargements.",bg = "#66ffff")
        explication3.grid(row = 2, column = 0)
        explication4 = tk.Label(autre_fenetre,text = "Pour changer l'ordre des convocations, il faut selectionner les élèves",bg = "#66ffff")
        explication4.grid(row = 0, column = 2)
        explication5 = tk.Label(autre_fenetre,text = "puis inscrire leur numéro dans la case adjacente et enfin valider.",bg = "#66ffff")
        explication5.grid(row = 1, column = 2)
        
        bouton_valider_les_ordres = tk.Button(autre_fenetre,text="valider les ordres",command = recuperer_les_ordres)
        bouton_valider_les_ordres.grid(row = 2, column = 2)
        numero = 0
        longueur_eleve = len(ma_bdd[0])
        for eleve in ma_bdd:
            #print(eleve[mes_desc['ordre_de_passage']])
            choisi = tk.BooleanVar()
            if eleve[mes_desc['sortie']] != '':
                
                eleve.append(tk.Label(autre_fenetre,text=f"{eleve[0]}  (sortant : ne sera pas convoqué(e)) ",bg = "#ffaaaa"))
            elif eleve[mes_desc['PAP']] != "":
                if len(eleve[mes_desc['PAP']]) > 15 :
                    text_pap = eleve[mes_desc['PAP']][:14]+"..."
                else:
                    text_pap = eleve[mes_desc['PAP']]
                eleve.append(tk.Label(autre_fenetre,text=f"{eleve[0]}  ({text_pap}) ",bg = "#aaffaa"))
            else :
                eleve.append(tk.Label(autre_fenetre,text=f"{eleve[0]}   ",bg = couleur[numero %2]))
            eleve[-1].grid(row = 4 + numero % 20, column = 4 * (numero // 20),sticky='we')
            eleve.append(tk.Checkbutton(autre_fenetre,text="choisir",variable = choisi,bg = couleur[numero %2]))
            eleve[-1].grid(row = 4 + numero % 20,column = 1 + 4 * (numero // 20), sticky = "w")
            eleve[mes_desc['choisi']] = choisi
            
            ordre_de_passage = tk.Entry(autre_fenetre,bg = couleur[numero %2])
            
            eleve.append(ordre_de_passage)
            eleve[-1].grid(row = 4 + numero % 20,column = 2 + 4 * (numero // 20), sticky = "w")
            #print(eleve)
            eleve[mes_desc['ordre_de_passage']] = '0'
            numero +=1
        
        
        
    fenetre = tk.Tk()
    fenetre.geometry('640x480')
    fenetre.title('Landatome')
    fenetre.iconbitmap('fichiers_internes\icone.ico')
    
    le_menu_principal = tk.Menu(fenetre)
    fenetre.config(menu=le_menu_principal)
    #Les variables utilisées par tkinter
    nom_de_la_formation = tk.StringVar()
    nom_de_la_formation.set('BTS Systèmes Constructifs Bois et Habitat')
    nom_de_la_classe = tk.StringVar()
    nom_de_la_classe.set('BTS MACHIN')
    nom_de_la_session = tk.StringVar()
    nom_de_la_session.set('2023-2024')
    nom_de_la_discipline = tk.StringVar()
    nom_de_la_discipline.set('Mathématiques')
    nom_de_la_salle = tk.StringVar()
    nom_de_la_salle.set('"Salle N201" ou "le café du coin"')
    date_de_l_epreuve = tk.StringVar()
    date_de_l_epreuve.set('25/09/23 (ou le format qui vous plait)')
    heure_de_debut = tk.StringVar()
    heure_de_debut.set('14h30')
    duree_de_l_epreuve = tk.StringVar()
    duree_de_l_epreuve.set('240')
    duree_decalage = tk.StringVar()
    duree_decalage.set('0')
    nom_du_chef = tk.StringVar()
    nom_du_chef.set('Régis VANACKERE') 
    
    
    le_menu_fichiers = tk.Menu(le_menu_principal,tearoff=False)
    #et on l'ajoute à la barre principale
    le_menu_principal.add_cascade(label='Fichier',menu=le_menu_fichiers)
    #On ajoute des commandes dans le menu (on pourrait aussi faire des sous menus)
    le_menu_fichiers.add_command(label='Quitter', command=fenetre.destroy)
    
    
    
    
    
    etape1 = tk.Menu(le_menu_principal,tearoff = False)
    le_menu_principal.add_cascade(label='Etape n°1',menu=etape1)
    etape1.add_command(label="Valider",command=etape_01)
    etape2 = tk.Menu(le_menu_principal,tearoff = False)
    le_menu_principal.add_cascade(label='Etape n°2',menu=etape2)
    etape2.add_command(label="Commencer",command=etape_02)
    etape3 = tk.Menu(le_menu_principal,tearoff = False)
    le_menu_principal.add_cascade(label='Etape n°3',menu=etape3)
    etape3.add_command(label="Générer les convocations",command=etape_03)
    etape4 = tk.Menu(le_menu_principal,tearoff = False)
    le_menu_principal.add_cascade(label='Etape n°4',menu=etape4)
    etape4.add_command(label="Générer la liste d'émargement",command=etape_04)
    bonus = tk.Menu(le_menu_principal,tearoff = False)
    le_menu_principal.add_cascade(label='Faire des groupes (avant étape 2)',menu=bonus)
    bonus.add_command(label="afficher liste",command=afficher_liste_eleves)
    
    img01 = tk.PhotoImage(file="fichiers_internes/image02.png")
    #img01 = ImageTk.PhotoImage(file="fichiers_internes/image01.png")
    #img02 = img01.zoom(2)
    etape_01_a = tk.Label(fenetre,text='Lancez Pronote. Dans "Ressources" -> "Classes" sélectionnez votre classe et cliquez sur :')
    #etape_01_a.configure(font=('Times New Roman',14,"normal bold"))
    etape_01_a.pack()
    etape_01_b = tk.Label(fenetre,image=img01)
    etape_01_b.pack()
    etape_01_c = tk.Label(fenetre,text='(En haut à droite de la liste des élèves)')
    #etape_01_c.configure(font=('Times New Roman',14,"normal bold")) 
    etape_01_c.pack()
    etape_01_d = tk.Label(fenetre,text='Puis dans le menu "Etape n°1" cliquez sur "Valider"')
    #etape_01_d.configure(font=('Times New Roman',14,"normal bold"))
    etape_01_d.pack()
    etape_01_e = tk.Label(fenetre,text='')
    #etape_01_e.configure(font=('Times New Roman',14,"normal bold"))
    etape_01_e.pack()
    etape_01_f = tk.Label(fenetre,text='Attention, vous devez utiliser le client Pronote\n et ne pas passer par lycée connecté')
    #etape_01_f.configure(font=('Times New Roman',14,"normal bold"))
    etape_01_f.pack()
    fenetre.mainloop()

main()
 