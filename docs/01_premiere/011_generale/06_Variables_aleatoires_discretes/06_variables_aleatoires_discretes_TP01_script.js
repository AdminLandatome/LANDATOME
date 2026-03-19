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

// ─── Packages non supportés dans Pyodide ─────────────────────────────────────
const UNSUPPORTED_MODULES = ["turtle", "tkinter", "wx", "PyQt5", "pygame"];

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

        // Configurer matplotlib pour le mode non-interactif (rendu dans le navigateur)
        await pyodide.runPythonAsync(`
import sys
# Patch pour capturer les figures matplotlib en base64
def _setup_matplotlib():
    import io, base64
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt

    _original_show = plt.show

    def _show_in_browser(*args, **kwargs):
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        img_b64 = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        plt.close()
        # Signal JS via stdout avec un marqueur spécial
        print("__MATPLOTLIB_IMG__" + img_b64 + "__END_IMG__")

    plt.show = _show_in_browser

# On ne charge matplotlib maintenant que s'il est disponible
try:
    _setup_matplotlib()
except Exception:
    pass  # matplotlib pas encore chargé, sera configuré à la demande
`);

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

// ─── Détection et chargement des packages ─────────────────────────────────────
function detecterModulesInsupports(code) {
    const unsupported = [];
    for (const mod of UNSUPPORTED_MODULES) {
        const regex = new RegExp(`(^|\\n)\\s*(import\\s+${mod}|from\\s+${mod}\\s+import)`, "m");
        if (regex.test(code)) unsupported.push(mod);
    }
    return unsupported;
}

async function chargerPackagesDepuisCode(code) {
    try {
        appendToConsole("⏳ Chargement des modules...\n");
        await pyodide.loadPackagesFromImports(code);

        // Après chargement, reconfigurer matplotlib si présent dans le code
        if (/matplotlib/.test(code)) {
            await pyodide.runPythonAsync(`_setup_matplotlib()`);
        }
        appendToConsole("✅ Modules prêts.\n");
    } catch (err) {
        appendToConsole("⚠️ Impossible de charger un ou plusieurs modules : " + err.message.split("\n").pop() + "\n");
    }
}

// ─── Affichage des images matplotlib ─────────────────────────────────────────
function afficherImageMatplotlib(b64) {
    const container = document.getElementById("plot-container");
    container.innerHTML = "";  // effacer l'ancienne image
    const img = document.createElement("img");
    img.src = "data:image/png;base64," + b64;
    img.style = "max-width:100%; border:1px solid #ccc; border-radius:4px; margin-top:6px;";
    container.appendChild(img);
    container.style.display = "block";
}

// ─── Traitement de la sortie (détection des images matplotlib) ────────────────
function traiterSortie(text) {
    const marker = "__MATPLOTLIB_IMG__";
    const endMarker = "__END_IMG__";

    if (text.includes(marker)) {
        // Extraire les images et le texte restant
        const parts = text.split(marker);
        const texteBefore = parts[0];
        if (texteBefore.trim()) appendToConsole(texteBefore);

        for (let i = 1; i < parts.length; i++) {
            const endIdx = parts[i].indexOf(endMarker);
            if (endIdx !== -1) {
                const b64 = parts[i].substring(0, endIdx);
                afficherImageMatplotlib(b64);
                const reste = parts[i].substring(endIdx + endMarker.length);
                if (reste.trim()) appendToConsole(reste);
            }
        }
    } else {
        appendToConsole(text);
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
    document.getElementById("exo-titre").innerText = `Partie ${exo.id} :\n ${exo.titre}`;
    document.getElementById("consigne-texte").innerHTML = exo.consigne;
    editor.setValue(exo.codeDepart.trimStart());
    resetConsole();
    // Effacer les graphes précédents
    const container = document.getElementById("plot-container");
    if (container) {
        container.innerHTML = "";
        if (typeof togglePlot === "function") togglePlot(false);
    }
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

            // Vérifier les modules non supportés
            const unsupported = detecterModulesInsupports(userInput);
            if (unsupported.length > 0) {
                appendToConsole(`❌ Module(s) non supporté(s) dans le navigateur : ${unsupported.join(", ")}\n`);
                return;
            }

            try {
                // Charger les packages si nécessaire
                await pyodide.loadPackagesFromImports(userInput);
                if (/matplotlib/.test(userInput)) {
                    await pyodide.runPythonAsync(`_setup_matplotlib()`);
                }

                // Rediriger stdout pour capturer les images matplotlib
                let capturedOutput = "";
                pyodide.setStdout({ batched: (text) => { capturedOutput += text + "\n"; } });

                const result = await pyodide.runPythonAsync(userInput);

                pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });

                if (capturedOutput) traiterSortie(capturedOutput);

                if (result !== undefined && result !== null) {
                    appendToConsole(String(result) + "\n");
                } else {
                    appendToConsole("");
                }
            } catch (err) {
                pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });
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

    // Vérifier les modules non supportés
    const unsupported = detecterModulesInsupports(userCode);
    if (unsupported.length > 0) {
        resetConsole(`❌ Module(s) non supporté(s) dans le navigateur : ${unsupported.join(", ")}\n💡 turtle et tkinter nécessitent une application bureau.`);
        return;
    }

    resetConsole(">>> Exécution en cours...");

    // Effacer le graphe précédent
    const container = document.getElementById("plot-container");
    if (container) {
        container.innerHTML = "";
        if (typeof togglePlot === "function") togglePlot(false);
    }

    try {
        // Charger les packages requis par le code
        await chargerPackagesDepuisCode(userCode);

        // Capturer stdout pour intercepter les images matplotlib
        let capturedOutput = "";
        pyodide.setStdout({ batched: (text) => { capturedOutput += text + "\n"; } });
        pyodide.setStderr({ batched: (text) => { capturedOutput += text + "\n"; } });

        await pyodide.runPythonAsync(userCode);

        // Restaurer stdout
        pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });
        pyodide.setStderr({ batched: (text) => appendToConsole(text + "\n") });

        if (capturedOutput) traiterSortie(capturedOutput);

    } catch (err) {
        pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });
        pyodide.setStderr({ batched: (text) => appendToConsole(text + "\n") });
        appendToConsole("⚠️ " + err.message.split("\n").pop() + "\n");
    }
}

async function validerCode() {
    const userCode = editor.getValue();
    const testCondition = exercices[currentExoIndex].test;
    const ta = document.getElementById("output");

    // Vérifier les modules non supportés
    const unsupported = detecterModulesInsupports(userCode);
    if (unsupported.length > 0) {
        ta.style.color = "#ff4444";
        resetConsole(`❌ Module(s) non supporté(s) : ${unsupported.join(", ")}`);
        return;
    }

    try {
        await chargerPackagesDepuisCode(userCode);
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
