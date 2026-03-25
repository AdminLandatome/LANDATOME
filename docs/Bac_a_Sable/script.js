// ─── État global ────────────────────────────────────────────────────────────
let pyodide;
let editor;
let currentExoIndex = 0;
let scores = [];

// ─── Console REPL ────────────────────────────────────────────────────────────
const PROMPT = ">>> ";
let consoleHistory = [];
let historyIndex   = -1;
let consoleInputStart = 0;

// ─── Init ────────────────────────────────────────────────────────────────────
async function init() {
    scores = new Array(exercices.length).fill(false);

    // CodeMirror
    editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        mode: "python",
        theme: "neo",
        lineNumbers: true,
        indentUnit: 4,
        gutters: ["CodeMirror-linenumbers"],
        extraKeys: { "Tab": (cm) => cm.replaceSelection("    ", "end") }
    });

    // Pyodide
    try {
        pyodide = await loadPyodide();

        pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });
        pyodide.setStderr({ batched: (text) => appendToConsole(text + "\n") });

        // Activer les boutons de la toolbar
        document.getElementById("run-btn").disabled  = false;
        document.getElementById("run-btn").innerText = "✅ Vérifier";
        document.getElementById("exec-btn").disabled = false;
        document.getElementById("exec-btn").onclick  = runFreeCode;
        document.getElementById("save-btn").disabled = false;
        document.getElementById("save-btn").onclick  = downloadCode;

        setupProgressBar();
        initConsole();
        chargerExercice(0);

    } catch (err) {
        const ta = document.getElementById("output");
        ta.value = "❌ Erreur : " + err;
    }
}

// ─── Barre de progression ─────────────────────────────────────────────────────
function setupProgressBar() {
    const header = document.querySelector("header");
    const progressContainer = document.createElement("div");
    progressContainer.style = "flex: 1; margin: 0 20px; background: #ddd; height: 10px; border-radius: 5px; overflow: hidden; border: 1px solid #999;";

    const progressBar = document.createElement("div");
    progressBar.id = "progress-fill";
    progressBar.style = "width: 0%; height: 100%; background: #4caf50; transition: width 0.3s ease;";

    progressContainer.appendChild(progressBar);
    header.appendChild(progressContainer);
}

function updateProgress() {
    const reussis = scores.filter(Boolean).length;
    const pct = (reussis / exercices.length) * 100;
    document.getElementById("progress-fill").style.width = pct + "%";
}

// ─── Navigation exercices ─────────────────────────────────────────────────────
function chargerExercice(index) {
    const exo = exercices[index];
    document.getElementById("exo-titre").innerText = `Exercice ${exo.id} : ${exo.titre}`;
    document.getElementById("consigne-texte").innerHTML = exo.consigne;
    editor.setValue(exo.codeDepart.trimStart());
    resetConsole();
}

function changerExercice(dir) {
    const next = currentExoIndex + dir;
    if (next >= 0 && next < exercices.length) {
        currentExoIndex = next;
        chargerExercice(currentExoIndex);
    }
}

// ─── Console REPL ─────────────────────────────────────────────────────────────
function initConsole() {
    const ta = document.getElementById("output");
    ta.value = "Python 3.10 prêt !\n" + PROMPT;
    consoleInputStart = ta.value.length;
    ta.focus();
    ta.setSelectionRange(consoleInputStart, consoleInputStart);

    ta.addEventListener("keydown",  handleConsoleKey);
    ta.addEventListener("mouseup",  preventCursorBeforePrompt);
    ta.addEventListener("click",    preventCursorBeforePrompt);
}

function resetConsole(msg) {
    const ta = document.getElementById("output");
    ta.style.color = "#000";
    ta.value = (msg ? msg + "\n" : "") + PROMPT;
    consoleInputStart = ta.value.length;
    ta.scrollTop = ta.scrollHeight;
}

function appendToConsole(text) {
    const ta = document.getElementById("output");
    const before = ta.value.substring(0, consoleInputStart);
    const input  = ta.value.substring(consoleInputStart);
    ta.value = before + text + PROMPT + input;
    consoleInputStart = (before + text + PROMPT).length;
    ta.scrollTop = ta.scrollHeight;
}

function preventCursorBeforePrompt() {
    const ta = document.getElementById("output");
    setTimeout(() => {
        if (ta.selectionStart < consoleInputStart) {
            ta.setSelectionRange(consoleInputStart, consoleInputStart);
        }
    }, 0);
}

async function handleConsoleKey(e) {
    const ta = document.getElementById("output");

    // Bloquer toute modification avant le prompt (sauf flèches)
    const navKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
    if (!navKeys.includes(e.key)) {
        if (ta.selectionStart < consoleInputStart ||
            (e.key === "Backspace" && ta.selectionStart <= consoleInputStart)) {
            e.preventDefault();
            return;
        }
    }

    // Entrée : exécuter la ligne
    if (e.key === "Enter") {
        e.preventDefault();
        const userInput = ta.value.substring(consoleInputStart).trim();
        ta.value += "\n";
        consoleInputStart = ta.value.length;

        if (userInput) {
            consoleHistory.unshift(userInput);
            historyIndex = -1;

            try {
                const result = await pyodide.runPythonAsync(userInput);
                if (result !== undefined && result !== null) {
                    appendToConsole(String(result) + "\n");
                } else {
                    appendToConsole("");
                }
            } catch (err) {
                appendToConsole(err.message.split("\n").pop() + "\n");
            }
        } else {
            appendToConsole("");
        }
        ta.scrollTop = ta.scrollHeight;
    }

    // Historique flèche haut
    if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < consoleHistory.length - 1) {
            historyIndex++;
            ta.value = ta.value.substring(0, consoleInputStart) + consoleHistory[historyIndex];
        }
    }

    // Historique flèche bas
    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            ta.value = ta.value.substring(0, consoleInputStart) + consoleHistory[historyIndex];
        } else {
            historyIndex = -1;
            ta.value = ta.value.substring(0, consoleInputStart);
        }
    }
}

// ─── Boutons toolbar ──────────────────────────────────────────────────────────
async function runFreeCode() {
    const userCode = editor.getValue();
    resetConsole(">>> Running script...");

    try {
        await pyodide.runPythonAsync(userCode);
    } catch (err) {
        appendToConsole("⚠️ " + err.message.split("\n").pop() + "\n");
    }
}

async function validerCode() {
    const userCode = editor.getValue();
    const testCondition = exercices[currentExoIndex].test;
    const ta = document.getElementById("output");

    try {
        await pyodide.runPythonAsync(userCode);
        const success = pyodide.runPython(testCondition);

        if (success) {
            ta.style.color = "#2e7d32";
            resetConsole("✅ Bravo ! C'est correct.");
            scores[currentExoIndex] = true;
            updateProgress();
        } else {
            ta.style.color = "#e65100";
            resetConsole("❌ Le résultat n'est pas encore celui attendu.");
        }
    } catch (err) {
        ta.style.color = "#ff4444";
        resetConsole("⚠️ Erreur :\n" + err.message.split("\n").pop());
    }
}

function downloadCode() {
    const code = editor.getValue();
    const fileName = `exercice_${exercices[currentExoIndex].id}.py`;
    const el = document.createElement("a");
    el.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(code));
    el.setAttribute("download", fileName);
    el.click();
}

// ─── Démarrage ────────────────────────────────────────────────────────────────
document.getElementById("run-btn").addEventListener("click", validerCode);
window.addEventListener("DOMContentLoaded", init);
