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
	
	
	
    //name = name.replace(/\s/g, "_"); // Remplace les espaces par des underscores
    //name = name.replace(/-/g, "_"); // Remplace les tirets par des underscores
    //var email = document.getElementById('email').value;
    var nbPersons = document.getElementById('nbPersons').value;
	
    // Début de la partie qui sert à créer les fichiers réponses
    for (var i = 0; i < nbPersons; i++) {
        var personName = document.getElementsByName('nom_de_famille' + (i + 1))[0].value.toUpperCase();
        personName = personName.replace(/\s/g, "_"); // Remplace les espaces par des underscores
        personName = personName.replace(/-/g, "_"); // Remplace les tirets par des underscores

        var person_preName = document.getElementsByName('le_prenom' + (i + 1))[0].value;
        person_preName = person_preName.replace(/\s/g, "_"); // Remplace les espaces par des underscores
        person_preName = person_preName.replace(/-/g, "_"); // Remplace les tirets par des underscores

        var person_classe = document.getElementsByName('la_classe' + (i + 1))[0].value.toUpperCase();
        person_classe = person_classe.replace(/\s/g, ""); // efface les espaces 
        person_classe = person_classe.replace(/-/g, ""); // efface les tirets

        // Ici on crée le contenu du fichier de réponses
		var contenu = 'Nom: ' + personName+'\n';
		contenu += "Prénom : "+person_preName+'\n';
		contenu += "Classe : "+person_classe + '\n\n';
		
		contenu += "Q01 : ";
		for (var i = 0; i < qcm01.length; i++) {
        contenu += qcm01[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q02 : ";
		for (var i = 0; i < qcm02.length; i++) {
        contenu += qcm02[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q03 : ";
		for (var i = 0; i < qcm03.length; i++) {
        contenu += qcm03[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q04 : ";
		for (var i = 0; i < qcm04.length; i++) {
        contenu += qcm04[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q05 : ";
		for (var i = 0; i < qcm05.length; i++) {
        contenu += qcm05[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q06 : ";
		for (var i = 0; i < qcm06.length; i++) {
        contenu += qcm06[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q07 : ";
		for (var i = 0; i < qcm07.length; i++) {
        contenu += qcm07[i] + '**';
        }
	    contenu += "\n"
		
		contenu += "Q08 : ";
		contenu += qcm08_1+qcm08_2+qcm08_3+qcm08_4+"**";
		contenu += "\n";
		
		
		
		// fin de la creation du contenu du fichier de reponses
        
		
        var blob = new Blob([contenu], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "07EVAL01_"+person_classe+'_'+personName + '_'+person_preName+'.txt'; // Nom du fichier par personne
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // Retirez le lien de l'élément body pour éviter la pollution du DOM
        document.body.removeChild(a);
	// Fin de la partie créant les fichiers.
    }
}
