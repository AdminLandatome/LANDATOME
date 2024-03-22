/* les déclarations */
let repA = document.getElementById('repA');
let repB = document.getElementById('repB');

let point = 0;
let nb_question = 0;
let reponse = 0;
let liste_reponse = ['vide','Vis de réglage','Hausse',"Levier d'armement","Canon","Tunnel","Réservoir d'air",'Fût','Queue de détente','Pontet','Poignet pistolet','Crosse','Busc','Plaque de couche',"Guidon"]


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
	reponse = document.getElementById("name").value;
	if (reponse == x) {bravo();
	++ point;} else{alert(`Non, La bonne réponse était  ${x}`);}
	jeu();
	
}

function jeu(){
	x = Math.floor((Math.random() * 14) + 1);
	
	++ nb_question ;
	document.getElementById('question').innerHTML =`<div class="element"> ${liste_reponse[x]} </div><br/>
	 <div class="numero">
	 <label for="name">Entrez le numero qui correspond :</label> 
	 <input type="text" id="name" name="name" minlength="1" maxlength="2" size="3">
	 <button type="button" class = "paragraphe" onclick="lire_reponse();">Valider  </div>`;
	
	
}