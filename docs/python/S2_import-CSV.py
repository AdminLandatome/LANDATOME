import csv
with open("S2-titanic.csv") as fichier_csv:
    csv_passagers= csv.reader(fichier_csv, delimiter=";")
    numero = 0
    for ligne in csv_passagers:
        if numero == 0:
            print("Descripteurs :")
            print(ligne)
        else:
            print("Données :")
            print(ligne)
        numero = numero+1
    print("total :",numero, "passagers")
