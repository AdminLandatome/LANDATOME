/* les déclarations */
let repA = document.getElementById('repA');
let repB = document.getElementById('repB');
let repC = document.getElementById('repC');
let point = 0;
let nb_question = 0;
let reponse = 0;
let liste_reponse = ['vide','Cran de mire',"Culasse","Carcasse","Canon","Guidon","Réservoir d'air",'Pontet','Queue de détente','Appui paume','Vis de réglage','Poignée']

repA.addEventListener("click",jeu);
repB.addEventListener("click",score);
repC.addEventListener("click",mise_a_zero);





/*Les fonctions*/

function score(){
	
	alert(`${point} sur ${nb_question-1} `);
}
function efface(){
	document.getElementById('ok').innerHTML ="";
}
function bravo(){
	document.getElementById('ok').innerHTML ="<Button class='affiche'> Bravo ! </Button>";
	/*"<Button class='affiche'> Bravo ! </Button>";*/
	setTimeout(efface,1000);
	
}


function lire_reponse(){
	reponse = document.getElementById("name").value;
	if (reponse == x) {bravo();
	++ point;} else{alert(`Non, La bonne réponse était  ${x}`);}
	jeu();
	
}

function jeu(){
	x = Math.floor((Math.random() * 11) + 1);
	
	
	++ nb_question ;
	document.getElementById('question').innerHTML =`<div class="element"> ${liste_reponse[x]} </div><br/>
	 <div class="numero">
	 <label for="name">Entrez le numero qui correspond :</label> 
	 <input type="text" id="name" name="name" minlength="1" maxlength="2" size="3">
	 <button type="button" class = "paragraphe" onclick="lire_reponse();">Valider  </div>`;
	
	
}