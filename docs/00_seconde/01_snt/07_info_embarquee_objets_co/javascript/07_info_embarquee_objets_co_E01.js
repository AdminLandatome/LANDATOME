
var selectedOptions = [];

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedOptions.push(options[i].value);
        }
    }


function showFields() {
	
    var nbPersons = document.getElementById('nbPersons').value; // Obtient le nombre de personnes choisi dans la liste déroulante
    var personFieldsContainer = document.getElementById('personFields'); // Obtient l'élément div où les champs de personne seront ajoutés
    personFieldsContainer.innerHTML = ''; // Efface les champs précédents pour éviter les duplications

    // Boucle pour créer les champs de saisie en fonction du nombre de personnes choisi
    for (var i = 0; i < nbPersons; i++) {
        // Crée un élément label pour afficher "Personne X"
        var label = document.createElement('label');
        label.textContent = 'Personne ' + (i + 1) + ':';

        // Crée un élément input de type texte pour saisir le nom de la personne
        var nom = document.createElement('input');
        nom.type = 'text';
        nom.name = 'nom_de_famille' + (i + 1); // Affecte un nom unique à chaque champ de personne
        nom.placeholder = 'Nom  ' + (i + 1); // Placeholder pour indiquer à l'utilisateur ce qu'il doit saisir

        var prenom = document.createElement('input');
        prenom.type = 'text';
        prenom.name = 'le_prenom' + (i + 1); // Affecte un nom unique à chaque champ de personne
        prenom.placeholder = 'Prénom ' + (i + 1);

        var classe = document.createElement('input');
        classe.type = 'text';
        classe.name = 'la_classe' + (i + 1); // Affecte un nom unique à chaque champ de personne
        classe.placeholder = 'Classe ' + (i + 1);


        // Ajoute l'élément label à l'élément div
        personFieldsContainer.appendChild(label);
        // Ajoute l'élément input à l'élément div
        personFieldsContainer.appendChild(nom);
		personFieldsContainer.appendChild(prenom);
		personFieldsContainer.appendChild(classe);
        // Ajoute un élément <br> pour ajouter un saut de ligne entre chaque champ de personne
        personFieldsContainer.appendChild(document.createElement('br'));
    }
}




function saveData() {
    //var question01 = document.getElementById('question01').value.toUpperCase(); // Met le mot en majuscules
	
	
    var options_qcm01 = document.getElementsByName('option_qcm01');
	var qcm01 = [];
	for (var i = 0; i < options_qcm01.length; i++) {
        if (options_qcm01[i].checked) {
            qcm01.push(options_qcm01[i].value);
        }
    }
	
	var options_qcm02 = document.getElementsByName('option_qcm02');
	var qcm02 = [];
	for (var i = 0; i < options_qcm02.length; i++) {
        if (options_qcm02[i].checked) {
            qcm02.push(options_qcm02[i].value);
        }
    }
	var options_qcm03 = document.getElementsByName('option_qcm03');
	var qcm03 = [];
	for (var i = 0; i < options_qcm03.length; i++) {
        if (options_qcm03[i].checked) {
            qcm03.push(options_qcm03[i].value);
        }
    }
	
	var options_qcm04 = document.getElementsByName('option_qcm04');
	var qcm04 = [];
	for (var i = 0; i < options_qcm04.length; i++) {
        if (options_qcm04[i].checked) {
            qcm04.push(options_qcm04[i].value);
			
        }
    }
	
	var options_qcm05 = document.getElementsByName('option_qcm05');
	var qcm05 = [];
	for (var i = 0; i < options_qcm05.length; i++) {
        if (options_qcm05[i].checked) {
            qcm05.push(options_qcm05[i].value);
        }
    }
	
	var options_qcm06 = document.getElementsByName('option_qcm06');
	var qcm06 = [];
	for (var i = 0; i < options_qcm06.length; i++) {
		
        if (options_qcm06[i].checked) {
            qcm06.push(options_qcm06[i].value);
        }
    }
	
	var options_qcm07 = document.getElementsByName('option_qcm07');
	var qcm07 = [];
	for (var i = 0; i < options_qcm07.length; i++) {
        if (options_qcm07[i].checked) {
            qcm07.push(options_qcm07[i].value);
        }
    }
    
	var qcm08_1 = document.getElementById('option_qcm08_1').value;
	var qcm08_2 = document.getElementById('option_qcm08_2').value;
	var qcm08_3 = document.getElementById('option_qcm08_3').value;
	var qcm08_4 = document.getElementById('option_qcm08_4').value;
	
	var options_qcm09 = document.getElementsByName('option_qcm09');
	var qcm09 = [];
	for (var i = 0; i < options_qcm09.length; i++) {
		
        if (options_qcm09[i].checked) {
			
            qcm09.push(options_qcm09[i].value);
        }
    }
	
	var options_qcm10 = document.getElementsByName('option_qcm10');
	var qcm10 = [];
	for (var i = 0; i < options_qcm10.length; i++) {
        if (options_qcm10[i].checked) {
            qcm10.push(options_qcm10[i].value);
        }
    }
	
	var options_qcm11 = document.getElementsByName('option_qcm11');
	var qcm11 = [];
	for (var i = 0; i < options_qcm11.length; i++) {
        if (options_qcm11[i].checked) {
            qcm11.push(options_qcm11[i].value);
        }
    }
	
	var options_qcm12 = document.getElementsByName('option_qcm12');
	var qcm12 = [];
	for (var i = 0; i < options_qcm12.length; i++) {
        if (options_qcm12[i].checked) {
            qcm12.push(options_qcm12[i].value);
        }
    }
	
	var options_qcm13 = document.getElementsByName('option_qcm13');
	var qcm13 = [];
	for (var i = 0; i < options_qcm13.length; i++) {
        if (options_qcm13[i].checked) {
            qcm13.push(options_qcm13[i].value);
        }
    }
	
	var options_qcm14 = document.getElementsByName('option_qcm14');
	var qcm14 = [];
	for (var i = 0; i < options_qcm14.length; i++) {
        if (options_qcm14[i].checked) {
            qcm14.push(options_qcm14[i].value);
        }
    }
	
	var qcm15_1 = document.getElementById('qcm15_1').value;
	var qcm15_2 = document.getElementById('qcm15_2').value;
	var qcm15_3 = document.getElementById('qcm15_3').value;
	var qcm15_4 = document.getElementById('qcm15_4').value;
	
	
	
	var options_qcm16 = document.getElementsByName('option_qcm16');
	var qcm16 = [];
	for (var i = 0; i < options_qcm16.length; i++) {
        if (options_qcm16[i].checked) {
            qcm16.push(options_qcm16[i].value);
        }
    }
	
	var options_qcm17 = document.getElementsByName('option_qcm17');
	var qcm17 = [];
	for (var i = 0; i < options_qcm17.length; i++) {
        if (options_qcm17[i].checked) {
            qcm17.push(options_qcm17[i].value);
        }
    }

	var options_qcm18 = document.getElementsByName('option_qcm18');
	var qcm18 = [];
	for (var i = 0; i < options_qcm18.length; i++) {
        if (options_qcm18[i].checked) {
            qcm18.push(options_qcm18[i].value);
        }
    }
	
	var options_qcm19 = document.getElementsByName('option_qcm19');
	var qcm19 = [];
	for (var i = 0; i < options_qcm19.length; i++) {
        if (options_qcm19[i].checked) {
            qcm19.push(options_qcm19[i].value);
        }
    }
	
	var options_qcm20 = document.getElementsByName('option_qcm20');
	var qcm20 = [];
	for (var i = 0; i < options_qcm20.length; i++) {
        if (options_qcm20[i].checked) {
            qcm20.push(options_qcm20[i].value);
        }
    }
	
    //name = name.replace(/\s/g, "_"); // Remplace les espaces par des underscores
    //name = name.replace(/-/g, "_"); // Remplace les tirets par des underscores
    //var email = document.getElementById('email').value;
    var nbPersons = document.getElementById('nbPersons').value;
	
    // Début de la partie qui sert à créer les fichiers réponses
    for (var j = 0; j < nbPersons; j++) {
        var personName = document.getElementsByName('nom_de_famille' + (j + 1))[0].value.toUpperCase();
        personName = personName.replace(/\s/g, "_"); // Remplace les espaces par des underscores
        personName = personName.replace(/-/g, "_"); // Remplace les tirets par des underscores

        var person_preName = document.getElementsByName('le_prenom' + (j + 1))[0].value;
        person_preName = person_preName.replace(/\s/g, "_"); // Remplace les espaces par des underscores
        person_preName = person_preName.replace(/-/g, "_"); // Remplace les tirets par des underscores

        var person_classe = document.getElementsByName('la_classe' + (j + 1))[0].value.toUpperCase();
        person_classe = person_classe.replace(/\s/g, ""); // efface les espaces 
        person_classe = person_classe.replace(/-/g, ""); // efface les tirets
        
        // Ici on crée le contenu du fichier de réponses
		var contenu = 'Nom: ' + personName+'\n';
		contenu += "Prénom : "+person_preName+'\n';
		contenu += "Classe : "+person_classe + '\n\n';
		
		contenu += "Q01 : ";
		for (var i01 = 0; i01 < qcm01.length; i01++) {
        contenu += qcm01[i01] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q02 : ";
		for (var i02 = 0; i02 < qcm02.length; i02++) {
        contenu += qcm02[i02] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q03 : ";
		for (var i03 = 0; i03 < qcm03.length; i03++) {
        contenu += qcm03[i03] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q04 : ";
		for (var i04 = 0; i04 < qcm04.length; i04++) {
			
        contenu += qcm04[i04] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q05 : ";
		for (var i05 = 0; i05 < qcm05.length; i05++) {
        contenu += qcm05[i05] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q06 : ";
		for (var i06 = 0; i06 < qcm06.length; i06++) {
        contenu += qcm06[i06] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q07 : ";
		for (var i07 = 0; i07 < qcm07.length; i07++) {
        contenu += qcm07[i07] + '**';
        }
	    contenu += "\n";
		
		
		contenu += "Q08 : ";
		contenu += qcm08_1+qcm08_2+qcm08_3+qcm08_4+"**";
		contenu += "\n";
		
		
		
		contenu += "Q09 : ";
		for (var i09 = 0; i09 < qcm09.length; i09++) {
        contenu += qcm09 [i09] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q10 : ";
		for (var i10 = 0; i10 < qcm10.length; i10++) {
        contenu += qcm10[i10] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q11 : ";
		for (var i11 = 0; i11 < qcm11.length; i11++) {
        contenu += qcm11[i11] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q12 : ";
		for (var i12 = 0; i12 < qcm12.length; i12++) {
        contenu += qcm12[i12] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q13 : ";
		for (var i13 = 0; i13 < qcm13.length; i13++) {
        contenu += qcm13[i13] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q14 : ";
		for (var i14 = 0; i14 < qcm14.length; i14++) {
        contenu += qcm14[i14] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q15 : ";
		contenu += qcm15_1+"**"+qcm15_2+"**"+qcm15_3+"**"+qcm15_4+"**";
		contenu += "\n";
		
		
		contenu += "Q16 : ";
		for (var i16 = 0; i16 < qcm16.length; i16++) {
        contenu += qcm16[i16] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q17 : ";
		for (var i17 = 0; i17 < qcm17.length; i17++) {
        contenu += qcm17[i17] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q18 : ";
		for (var i18 = 0; i18 < qcm18.length; i18++) {
        contenu += qcm18[i18] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q19 : ";
		for (var i19 = 0; i19 < qcm19.length; i19++) {
        contenu += qcm19[i19] + '**';
        }
	    contenu += "\n";
		
		contenu += "Q20 : ";
		for (var i20 = 0; i20 < qcm20.length; i20++) {
        contenu += qcm20[i20] + '**';
        }
	    contenu += "\n";
		// fin de la creation du contenu du fichier de reponses
        
		
        var blob = new Blob([contenu], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "07E01_"+person_classe+'_'+personName + '_'+person_preName+'.txt'; // Nom du fichier par personne
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // Retirez le lien de l'élément body pour éviter la pollution du DOM
        document.body.removeChild(a);
	// Fin de la partie créant les fichiers.
    }
}
