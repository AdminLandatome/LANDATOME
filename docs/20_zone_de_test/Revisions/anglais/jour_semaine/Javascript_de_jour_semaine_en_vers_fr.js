/* les déclarations */
let repA = document.getElementById('repA');
let repB = document.getElementById('repB');

let point = 0;
let nb_question = 0;
let reponse = 0;
let liste_francais = ['vide','LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI','DIMANCHE']
let liste_anglais = ['vide','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']


repA.addEventListener("click",jeu);
repB.addEventListener("click",score);

/*Les fonctions*/
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}





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
	reponse = document.getElementById("name").value.toUpperCase();
	reponse = reponse.replace(/\s/g, "");
	if (reponse == liste_francais[x]) {bravo();
	++ point;} else{alert(`Non, La bonne réponse était  ${liste_francais[x]}`);};
	jeu();
	
}

function jeu(){
	x = Math.floor((Math.random() * 7) + 1);
	
	++ nb_question ;
	document.getElementById('question').innerHTML =`<div class="element"> ${liste_anglais[x]} </div><br/>
	 <div class="numero">
	 <label for="name">Ecrivez ce mot en francais :</label> 
	 <input type="text" id="name" name="name" minlength="1" maxlength="15" size="3">
	 <button type="button" class = "paragraphe" onclick="lire_reponse();">Valider  </div>`;
	
	
}