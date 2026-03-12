let pyodide;
let editor;
let currentExoIndex = 0;
let scores = []; // Tableau pour suivre les exercices réussis

/**
 * Initialisation de l'éditeur, de Pyodide et de l'interface
 */
async function init() {
    // Initialisation du suivi des scores
    scores = new Array(exercices.length).fill(false);

    // 1. Configuration de l'éditeur CodeMirror
    editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        mode: "python",
        theme: "neo",
        lineNumbers: true,
        indentUnit: 4,
        gutters: ["CodeMirror-linenumbers"],
        extraKeys: { "Tab": (cm) => cm.replaceSelection("    ", "end") }
    });

    // 2. Chargement de Pyodide
    try {
        pyodide = await loadPyodide();
        
        pyodide.setStdout({
            batched: (text) => {
                const output = document.getElementById("output");
                output.innerText += text + "\n";
                output.scrollTop = output.scrollHeight;
            }
        });

        document.getElementById("run-btn").disabled = false;
        document.getElementById("run-btn").innerText = "Vérifier l'exercice";
		document.getElementById("run-btn").style.marginTop = "10px";
        document.getElementById("run-btn").style.marginLeft = "70%";
        setupExtraButtons();
        setupProgressBar(); // Initialise la barre de progression
        
        document.getElementById("output").innerText = "Python 3.10 prêt !";
        chargerExercice(0);
    } catch (err) {
        document.getElementById("output").innerText = "❌ Erreur : " + err;
    }
}

/**
 * Crée visuellement la barre de progression dans le header
 */
function setupProgressBar() {
    const header = document.querySelector('header');
    const progressContainer = document.createElement('div');
    progressContainer.style = "flex: 1; margin: 0 20px; background: #ddd; height: 10px; border-radius: 5px; overflow: hidden; border: 1px solid #999;";
    
    const progressBar = document.createElement('div');
    progressBar.id = "progress-fill";
    progressBar.style = "width: 0%; height: 100%; background: #4caf50; transition: width 0.3s ease;";
    
    progressContainer.appendChild(progressBar);
    header.appendChild(progressContainer);
}

/**
 * Met à jour le pourcentage de la barre
 */
function updateProgress() {
    const reussis = scores.filter(status => status === true).length;
    const pourcentage = (reussis / exercices.length) * 100;
    document.getElementById("progress-fill").style.width = pourcentage + "%";
}

/**
 * Ajoute les boutons de la barre d'outils (Exécuter et Enregistrer)
 */
function setupExtraButtons() {
    const btnContainer = document.querySelector('.nav-exos');
    
    const runScriptBtn = document.createElement('button');
    runScriptBtn.innerHTML = "▶️ Exécuter";
    runScriptBtn.className = "primary-btn";
    runScriptBtn.style.marginLeft = "10px";
	runScriptBtn.style.marginTop = "10px";
    runScriptBtn.onclick = runFreeCode;
    btnContainer.appendChild(runScriptBtn);

    const saveBtn = document.createElement('button');
    saveBtn.innerHTML = "💾 Enregistrer .py";
    saveBtn.className = "primary-btn";
    saveBtn.style.marginLeft = "10px";
	saveBtn.style.marginTop = "5px";
    saveBtn.onclick = downloadCode;
    btnContainer.appendChild(saveBtn);
}

/**
 * Téléchargement du code en .py
 */
function downloadCode() {
    const code = editor.getValue();
    const fileName = `exercice_${exercices[currentExoIndex].id}.py`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', fileName);
    element.click();
}

/**
 * Affiche l'exercice sélectionné
 */
function chargerExercice(index) {
    const exo = exercices[index];
    document.getElementById("exo-titre").innerText = `Exercice ${exo.id} : ${exo.titre}`;
    document.getElementById("consigne-texte").innerHTML = exo.consigne;
    editor.setValue(exo.codeDepart);
    document.getElementById("output").innerText = ">>> ";
}

/**
 * Navigation
 */
function changerExercice(dir) {
    let next = currentExoIndex + dir;
    if (next >= 0 && next < exercices.length) {
        currentExoIndex = next;
        chargerExercice(currentExoIndex);
    }
}

/**
 * Exécution libre (Thonny style)
 */
async function runFreeCode() {
    const userCode = editor.getValue();
    const output = document.getElementById("output");
    output.innerText = ">>> Running script...\n";
    output.style.color = "#000";

    try {
        await pyodide.runPythonAsync(userCode);
    } catch (err) {
        output.innerText += "\n⚠️ Erreur :\n" + err;
        output.style.color = "#ff4444";
    }
}

/**
 * Validation et mise à jour de la progression
 */
async function validerCode() {
    const userCode = editor.getValue();
    const output = document.getElementById("output");
    const testCondition = exercices[currentExoIndex].test;

    try {
        await pyodide.runPythonAsync(userCode);
        const success = pyodide.runPython(testCondition);

        if (success) {
            output.innerText = "✅ Bravo ! C'est correct.";
            output.style.color = "#2e7d32";
            
            // Mise à jour du score et de la barre
            scores[currentExoIndex] = true;
            updateProgress();
        } else {
            output.innerText = "❌ Le résultat n'est pas encore celui attendu.";
            output.style.color = "#e65100";
        }
    } catch (err) {
        output.innerText = "⚠️ Erreur :\n" + err;
        output.style.color = "#ff4444";
    }
}

document.getElementById("run-btn").addEventListener("click", validerCode);
window.addEventListener('DOMContentLoaded', init);