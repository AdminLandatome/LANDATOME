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
        gutters: ["CodeMirror-linenumbers", "error-gutter"],
        extraKeys: { "Tab": (cm) => cm.replaceSelection("    ", "end") }
    });

    // Effacer les marqueurs d'erreur dès que l'utilisateur modifie le code
    editor.on("change", () => clearErrorMarkers());

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
        document.getElementById("run-btn").disabled  = true;
        document.getElementById("run-btn").innerText = "✅ Vérifier";
		document.getElementById("run-btn").style = "display:none;"
		
        document.getElementById("exec-btn").disabled = false;
        document.getElementById("exec-btn").onclick  = runFreeCode;
        document.getElementById("save-btn").disabled = false;
        document.getElementById("save-btn").onclick  = downloadCode;

        // Activer le bouton image
        document.getElementById("img-btn").disabled = false;
        document.getElementById("img-btn").onclick  = () => document.getElementById("img-input").click();

        // Bouton téléchargement image : toujours visible, chemin par défaut
        const dlBtn = document.getElementById("dl-img-btn");
        dlBtn.style.display = "inline-flex";
        dlBtn.onclick = () => telechargerImageResultat();

        initConsole();
        chargerExercice(0);
        setTimeout(() => editor.refresh(), 100);

    } catch (err) {
        const ta = document.getElementById("output");
        ta.value = "❌ Erreur : " + err;
    }
}

// ─── Chargement d'image dans Pyodide ─────────────────────────────────────────
async function chargerImage(input) {
    const file = input.files[0];
    if (!file) return;

    // Réinitialiser l'input pour permettre de recharger le même fichier
    input.value = "";

    const ext = file.name.split(".").pop().toLowerCase();
    const inputPath  = "/image_input."  + ext;
    const outputPath = "/image_output." + ext;

    // Lire le fichier et l'écrire dans le FS virtuel de Pyodide
    const arrayBuffer = await file.arrayBuffer();
    pyodide.FS.writeFile(inputPath, new Uint8Array(arrayBuffer));

    // Exposer les chemins comme variables Python globales
    pyodide.globals.set("__image_input__",  inputPath);
    pyodide.globals.set("__image_output__", outputPath);

    appendToConsole(`📂 Image chargée : ${file.name} → accessible via __image_input__\n`);

    // Injecter un code d'exemple dans l'éditeur
    editor.setValue(
`from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# Ouvrir l'image chargée
img = Image.open(__image_input__).convert("RGB")
arr = np.array(img)  # shape : (hauteur, largeur, 3)

print(f"Taille : {img.width}x{img.height}, mode : {img.mode}")

# ── Exemple : supprimer le canal rouge ──────────────────────────
arr_modif = arr.copy()
arr_modif[:, :, 0] = 0   # canal R = 0

# ── Autres idées à essayer ───────────────────────────────────────
# Niveaux de gris :     arr_modif = np.mean(arr, axis=2, keepdims=True).repeat(3, axis=2).astype(np.uint8)
# Inverser les couleurs: arr_modif = 255 - arr
# Garder seulement le vert : arr_modif[:,:,0]=0 ; arr_modif[:,:,2]=0

# Sauvegarder le résultat
img_modif = Image.fromarray(arr_modif.astype("uint8"))
img_modif.save(__image_output__)

# Afficher avant / après
fig, axes = plt.subplots(1, 2, figsize=(10, 5))
axes[0].imshow(arr)
axes[0].set_title("Original")
axes[0].axis("off")
axes[1].imshow(arr_modif)
axes[1].set_title("Modifiée")
axes[1].axis("off")
plt.tight_layout()
plt.show()
`);

}

// ─── Téléchargement de l'image résultat ──────────────────────────────────────
function telechargerImageResultat(pyodidePath, nomFichier) {
    // Chemin par défaut si aucune image n'a été chargée via le bouton
    pyodidePath = pyodidePath || "/image_output.png";
    nomFichier  = nomFichier  || "resultat.png";
    try {
        const data = pyodide.FS.readFile(pyodidePath);
        const blob = new Blob([data], { type: "image/" + nomFichier.split(".").pop() });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href     = url;
        a.download = nomFichier;
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        appendToConsole("⚠️ Image résultat introuvable. Lance d'abord le code avec img.save(\"/image_output.png\").\n");
    }
}

// ─── Gestion des erreurs style Thonny ────────────────────────────────────────

/**
 * Parse le traceback Python pour extraire le numéro de ligne et le message.
 * Retourne { lineNumber: int|null, message: string, fullTraceback: string }
 */
function parseTraceback(errMessage) {
    const allLines = errMessage.split("\n");
    const lines = allLines.filter(l => l.trim() !== "");

    // Numéro de ligne : on garde le dernier match (le plus profond dans la pile utilisateur)
    let lineNumber = null;
    for (const line of lines) {
        const match = line.match(/File "<string>", line (\d+)/);
        if (match) lineNumber = parseInt(match[1], 10);
    }

    // Traceback nettoyé : on garde "Traceback...", les frames "<string>", et la ligne d'erreur finale
    // On supprime les frames internes Pyodide (/lib/python, /home/pyodide, etc.)
    const kept = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (line.startsWith("Traceback")) {
            kept.push(line);
        } else if (line.trim().startsWith('File "<string>"')) {
            kept.push("  " + line.trim());
            // La ligne suivante est le code source, on la garde si elle existe
            if (i + 1 < lines.length && !lines[i+1].trim().startsWith("File ")) {
                kept.push("    " + lines[i+1].trim());
                i++;
            }
        } else if (/^\w.*Error/.test(line) || /^Exception/.test(line) || /^Syntax/.test(line)) {
            kept.push(line);
        }
        i++;
    }

    const fullTraceback = kept.length > 0 ? kept.join("\n") : lines.slice(-3).join("\n");
    const message = lines[lines.length - 1] || errMessage;

    return { lineNumber, message, fullTraceback };
}

/**
 * Affiche le traceback dans la console avec coloration rouge,
 * et surligne la ligne fautive dans l'éditeur.
 */
function afficherErreur(errMessage) {
    const { lineNumber, fullTraceback } = parseTraceback(errMessage);

    // Afficher le traceback complet dans la console
    appendToConsole("⚠️ " + fullTraceback + "\n");

    // Surligner la ligne dans l'éditeur
    if (lineNumber !== null) {
        highlightErrorLine(lineNumber);
    }
}

/**
 * Surligne la ligne fautive dans CodeMirror (numérotation Python = 1-based).
 */
function highlightErrorLine(lineNumber) {
    const line = lineNumber - 1; // CodeMirror est 0-based
    const totalLines = editor.lineCount();
    if (line < 0 || line >= totalLines) return;

    // Marqueur gutter (icône à gauche)
    const marker = document.createElement("div");
    marker.className = "error-gutter-marker";
    marker.title = `Erreur ligne ${lineNumber}`;
    marker.innerHTML = "●";
    editor.setGutterMarker(line, "error-gutter", marker);

    // Surlignage de la ligne entière
    editor.addLineClass(line, "background", "error-line-highlight");

    // Scroller vers la ligne fautive
    editor.scrollIntoView({ line: line, ch: 0 }, 80);

    // Mettre le curseur sur la ligne
    editor.setCursor({ line: line, ch: 0 });
    editor.focus();
}

/**
 * Efface tous les marqueurs d'erreur.
 */
function clearErrorMarkers() {
    editor.clearGutter("error-gutter");
    const totalLines = editor.lineCount();
    for (let i = 0; i < totalLines; i++) {
        editor.removeLineClass(i, "background", "error-line-highlight");
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
    container.innerHTML = "";
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
    document.getElementById("exo-titre").innerText = "";
    document.getElementById("consigne-texte").innerHTML = exo.consigne;
    editor.setValue(exo.codeDepart.trimStart());
    clearErrorMarkers();
    resetConsole();
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
    if (window.innerWidth > 768) {
        ta.focus();
        ta.setSelectionRange(consoleInputStart, consoleInputStart);
    }

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

    const navKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
    if (!navKeys.includes(e.key)) {
        if (ta.selectionStart < consoleInputStart ||
            (e.key === "Backspace" && ta.selectionStart <= consoleInputStart)) {
            e.preventDefault();
            return;
        }
    }

    if (e.key === "Enter") {
        e.preventDefault();
        const userInput = ta.value.substring(consoleInputStart).trim();
        ta.value += "\n";
        consoleInputStart = ta.value.length;

        if (userInput) {
            consoleHistory.unshift(userInput);
            historyIndex = -1;

            const unsupported = detecterModulesInsupports(userInput);
            if (unsupported.length > 0) {
                appendToConsole(`❌ Module(s) non supporté(s) dans le navigateur : ${unsupported.join(", ")}\n`);
                return;
            }

            try {
                await pyodide.loadPackagesFromImports(userInput);
                if (/matplotlib/.test(userInput)) {
                    await pyodide.runPythonAsync(`_setup_matplotlib()`);
                }

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
                // Dans la console REPL, on affiche le traceback complet mais sans highlight éditeur
                const { fullTraceback } = parseTraceback(err.message);
                appendToConsole("⚠️ " + fullTraceback + "\n");
            }
        } else {
            appendToConsole("");
        }
        ta.scrollTop = ta.scrollHeight;
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < consoleHistory.length - 1) {
            historyIndex++;
            ta.value = ta.value.substring(0, consoleInputStart) + consoleHistory[historyIndex];
        }
    }

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

    const unsupported = detecterModulesInsupports(userCode);
    if (unsupported.length > 0) {
        resetConsole(`❌ Module(s) non supporté(s) dans le navigateur : ${unsupported.join(", ")}\n💡 turtle et tkinter nécessitent une application bureau.`);
        return;
    }

    clearErrorMarkers();
    resetConsole(">>> Exécution en cours...");

    const container = document.getElementById("plot-container");
    if (container) {
        container.innerHTML = "";
        if (typeof togglePlot === "function") togglePlot(false);
    }

    try {
        await chargerPackagesDepuisCode(userCode);

        // stdout capturé pour détecter les images matplotlib
        // stderr affiché directement (tracebacks, warnings)
        let capturedOutput = "";
        let stderrOutput = "";
        pyodide.setStdout({ batched: (text) => { capturedOutput += text + "\n"; } });
        pyodide.setStderr({ batched: (text) => { stderrOutput += text + "\n"; } });

        await pyodide.runPythonAsync(userCode);

        pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });
        pyodide.setStderr({ batched: (text) => appendToConsole(text + "\n") });

        if (capturedOutput) traiterSortie(capturedOutput);

        // Stderr sans exception JS (ex: warnings Python)
        if (stderrOutput.trim()) afficherErreur(stderrOutput);

    } catch (err) {
        pyodide.setStdout({ batched: (text) => appendToConsole(text + "\n") });
        pyodide.setStderr({ batched: (text) => appendToConsole(text + "\n") });
        // err.message contient le traceback complet dans ce cas
        afficherErreur(err.message);
    }
}

async function validerCode() {
    const userCode = editor.getValue();
    const testCondition = exercices[currentExoIndex].test;
    const ta = document.getElementById("output");

    const unsupported = detecterModulesInsupports(userCode);
    if (unsupported.length > 0) {
        ta.style.color = "#ff4444";
        resetConsole(`❌ Module(s) non supporté(s) : ${unsupported.join(", ")}`);
        return;
    }

    clearErrorMarkers();

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
        afficherErreur(err.message);
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
