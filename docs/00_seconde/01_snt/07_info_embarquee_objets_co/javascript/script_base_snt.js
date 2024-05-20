//******************************************************Cette partie est commune à toutes les pages**********************************

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

//**************************************Fin de la parie commune à chaque page******************************************************



// **************************************Cette partie est propre à chaque page******************************************************
// il faudra adapter les var à récuperer 



function saveData(numero) {
	
    var name = document.getElementById('name').value.toUpperCase(); // Met le nom en majuscules
    name = name.replace(/\s/g, "_"); // Remplace les espaces par des underscores
    name = name.replace(/-/g, "_"); // Remplace les tirets par des underscores
    var email = document.getElementById('email').value;
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

        // Ici on crée le contenu du fichier de réponses en fonction du numero de l'exercice
		if (numero === 1){var personData = 'Nom: ';}
		else if (numero === 0){var personData = 'Nom: ' + personName + '\nEmail: ' + email;}
		else {var personData = 'Nom: ' + personName +  + email;}
		// fin de la creation du contenu du fichier de reponses
        
        var blob = new Blob([personData], { type: 'text/plain' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download ='Ex0'+numero+'_'+ person_classe+'_'+personName + '_'+person_preName+'.txt'; // Nom du fichier par personne
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // Retirez le lien de l'élément body pour éviter la pollution du DOM
        document.body.removeChild(a);
	// Fin de la partie créant les fichiers.
    }
}


function copyCode() {
    var codeSnippet = document.querySelector('.code-snippet pre code');
    var range = document.createRange();
    range.selectNode(codeSnippet);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert("Code copié !");
}

document.addEventListener("DOMContentLoaded", function() {
    var copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var codeSnippet = this.previousElementSibling.querySelector('code').innerText;
            copyCodeToClipboard(codeSnippet);
        });
    });

    function copyCodeToClipboard(code) {
        navigator.clipboard.writeText(code).then(function() {
            alert("Code copié!");
        }).catch(function(error) {
            console.error('Failed to copy: ', error);
        });
    }
});
