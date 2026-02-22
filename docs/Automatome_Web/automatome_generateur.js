// ============================================================
//  AUTOMATOME — Générateur HTML
//  Traduction des fonctions de mise en forme et d'assemblage
// ============================================================

const CSS_URL = "https://adminlandatome.github.io/LANDATOME/styles/styles_automatome_v01.css";
const CSS_URL_BIS = "https://adminlandatome.github.io/LANDATOME/styles/styles_automatome_v01_bis.css";
const ICON_URL = "https://AdminLandatome.github.io/LANDATOME/00_images/MC-Escher-Impossible-Cube.png";
const MATHJAX_URL = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";

// ---- En-tête / pied HTML commun ---------------------------
function htmlEnTete(titre = "Automatome") {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${titre}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="nofollow,nosnippet" />
<link rel="icon" type="image/png" size="16x16" href="${ICON_URL}" />
<link rel="stylesheet" href="${CSS_URL}" type="text/css">
<script src="${MATHJAX_URL}"></script>
</head>
<body>
`;
}

const HTML_FIN = `</body>\n</html>`;

// ---- Numérotation style Python (2 chiffres) ---------------
function numeroDiapo(n) {
    return n < 10 ? "0" + n : String(n);
}

// ---- Navigation -------------------------------------------
function navBar(prev, centre, next) {
    return `<div class="titre_page">
  <a href="${prev}"><div class="titre_page_cellule_gauche">précédent</div></a>
  <a href=""><div class="titre_page_cellule_centre">${centre}</div></a>
  <a href="${next}"><div class="titre_page_cellule_droite">suivant</div></a>
</div>
<div class="espace_vide"></div>
`;
}

// ---- Mise en forme QUESTION --------------------------------
function miseEnFormeQuestion(item, numQ) {
    const fmt = item[0];
    const question = item[1];
    const reponses = item.slice(2, 6);
    const imgQ = item[6] || "";
    const vf = ["faux", "faux", "faux", "faux"];
    const num = numQ + 1;

    if (fmt === 7) {
        // automatisme ouvert : question seule, la réponse masquée
        return `<div class="format05_grille">
  <div class="format05_cellule_question">${num}) ${question}</div>
  <div class="format05_cellule_explication_sans"></div>
</div>`;
    }

    const repHtml = (lettre, i) =>
        `<div class="format${f2(fmt)}_cellule_reponse${i + 1}_${vf[i]}">${lettre}) ${reponses[i]}</div>`;
    const letters = ["a", "b", "c", "d"];

    if (fmt === 1) {
        return `<div class="format01_grille">
  <div class="format01_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => repHtml(l, i)).join("\n  ")}
  <div class="format01_cellule_explication_sans"></div>
</div>`;
    }
    if (fmt === 2) {
        return `<div class="format02_grille">
  <div class="format02_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format02_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format02_cellule_explication_sans"></div>
  <div class="format02_cellule_graphique">${imgQ}</div>
</div>`;
    }
    if (fmt === 3) {
        return `<div class="format03_grille">
  <div class="format03_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format03_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format03_cellule_explication_sans"></div>
</div>`;
    }
    if (fmt === 4) {
        return `<div class="format04_grille">
  <div class="format04_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format04_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format04_cellule_explication_sans"></div>
</div>`;
    }
    if (fmt === 5) {
        return `<div class="format05_grille">
  <div class="format05_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format05_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format05_cellule_explication_sans"></div>
  <div class="format05_cellule_graphique">${imgQ}</div>
</div>`;
    }
    if (fmt === 8) {
        return `<div class="format08_grille">
  <div class="format08_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format08_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format08_cellule_explication_sans"></div>
  <div class="format08_cellule_graphique">${imgQ}</div>
</div>`;
    }
    // fallback
    return `<div class="format01_grille"><div class="format01_cellule_question">${num}) ${question}</div></div>`;
}

// ---- Mise en forme REPONSE ---------------------------------
function miseEnFormeReponse(item, numQ) {
    const fmt = item[0];
    const question = item[1];
    const reponses = item.slice(2, 6);
    const imgQ = item[6] || "";
    const imgsR = item.slice(7, 11).map(x => x || "");
    const avecExplication = item[11] || "sans";
    const bonneReponse = item[12];
    const vf = ["faux", "faux", "faux", "faux"];
    if (bonneReponse >= 1 && bonneReponse <= 4) vf[bonneReponse - 1] = "vrai";
    const num = numQ + 1;
    const letters = ["a", "b", "c", "d"];

    if (fmt === 7) {
        // automatisme ouvert : on affiche la question + la réponse visible
        return `<div class="format05_grille">
  <div class="format05_cellule_question">${num}) ${question}</div>
  <div class="format05_cellule_explication_avec">${reponses[0]}</div>
</div>`;
    }

    if (fmt === 1) {
        return `<div class="format01_grille">
  <div class="format01_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format01_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format01_cellule_explication_${avecExplication}"></div>
</div>`;
    }
    if (fmt === 2) {
        return `<div class="format02_grille">
  <div class="format02_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format02_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format02_cellule_explication_${avecExplication}"></div>
  <div class="format02_cellule_graphique">${imgQ}</div>
</div>`;
    }
    if (fmt === 3) {
        return `<div class="format03_grille">
  <div class="format03_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format03_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format03_cellule_explication_${avecExplication}"></div>
</div>`;
    }
    if (fmt === 4) {
        return `<div class="format04_grille">
  <div class="format04_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format04_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format04_cellule_explication_${avecExplication}"></div>
</div>`;
    }
    if (fmt === 5) {
        return `<div class="format05_grille">
  <div class="format05_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format05_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format05_cellule_explication_${avecExplication}"></div>
  <div class="format05_cellule_graphique">${imgQ}</div>
</div>`;
    }
    if (fmt === 8) {
        return `<div class="format08_grille">
  <div class="format08_cellule_question">${num}) ${question}</div>
  ${letters.map((l, i) => `<div class="format08_cellule_reponse${i+1}_${vf[i]}">${l}) ${reponses[i]}</div>`).join("\n  ")}
  <div class="format08_cellule_explication_${avecExplication}"></div>
  <div class="format08_cellule_graphique">${imgQ}</div>
</div>`;
    }
    return `<div class="format01_grille"><div class="format01_cellule_question">${num}) ${question}</div></div>`;
}

function f2(n) { return n < 10 ? "0" + n : String(n); }

// ============================================================
//  Génération d'une SÉRIE (ensemble de fichiers HTML)
//  Renvoie un objet { nomFichier: contenuHTML }
// ============================================================
function genererSerie(listeDeListes) {
    const n = listeDeListes.length;
    const fichiers = {};

    // 00_diapo_debut.html
    fichiers["00_diapo_debut.html"] =
        htmlEnTete("Automatomes") +
        navBar(numeroDiapo(2 * n + 3) + "_diapo_bilan.html", "", "01_diapo_consignes.html") +
        `<div class="titre_annonce">Automatismes</div>` +
        HTML_FIN;

    // 01_diapo_consignes.html
    const consigne = `Aucune justification n'est demandée et une seule réponse est possible par question.<br>
Pour chaque question, reportez son numéro sur votre copie et indiquez votre réponse.<br><br>
Si la question n'est pas un QCM alors la consigne est :<br><br>Donnez vos réponses sans justification<br>(vous pouvez, par contre, faire des calculs au brouillon)`;
    fichiers["01_diapo_consignes.html"] =
        htmlEnTete("Consignes") +
        navBar("00_diapo_debut.html", "", "02_diapo_q_01.html") +
        `<div class="consigne">${consigne}</div>` +
        HTML_FIN;

    // Diapos QUESTIONS
    for (let i = 0; i < n; i++) {
        const numFichier = numeroDiapo(i + 2);
        const numQ = numeroDiapo(i + 1);
        const prev = i === 0
            ? "01_diapo_consignes.html"
            : numeroDiapo(i + 1) + "_diapo_q_" + numeroDiapo(i) + ".html";
        const next = i === n - 1
            ? numeroDiapo(n + 2) + "_diapo_annonce_correction.html"
            : numeroDiapo(i + 3) + "_diapo_q_" + numeroDiapo(i + 2) + ".html";
        const nom = numFichier + "_diapo_q_" + numQ + ".html";
        fichiers[nom] =
            htmlEnTete(`Question ${i + 1}`) +
            navBar(prev, "Automatismes", next) +
            miseEnFormeQuestion(listeDeListes[i], i) +
            HTML_FIN;
    }

    // Diapo annonce correction
    const prevAC = numeroDiapo(n + 1) + "_diapo_q_" + numeroDiapo(n) + ".html";
    const nextAC = numeroDiapo(n + 3) + "_diapo_r_01.html";
    fichiers[numeroDiapo(n + 2) + "_diapo_annonce_correction.html"] =
        htmlEnTete("Correction") +
        navBar(prevAC, "", nextAC) +
        `<div class="titre_annonce">Correction</div>` +
        HTML_FIN;

    // Diapos RÉPONSES
    for (let i = 0; i < n; i++) {
        const numFichier = numeroDiapo(n + 3 + i);
        const numR = numeroDiapo(i + 1);
        const prev = i === 0
            ? numeroDiapo(n + 2) + "_diapo_annonce_correction.html"
            : numeroDiapo(n + 2 + i) + "_diapo_r_" + numeroDiapo(i) + ".html";
        const next = i === n - 1
            ? numeroDiapo(2 * n + 3) + "_diapo_bilan.html"
            : numeroDiapo(n + 4 + i) + "_diapo_r_" + numeroDiapo(i + 2) + ".html";
        const nom = numFichier + "_diapo_r_" + numR + ".html";
        fichiers[nom] =
            htmlEnTete(`Réponse ${i + 1}`) +
            navBar(prev, "Automatismes", next) +
            miseEnFormeReponse(listeDeListes[i], i) +
            HTML_FIN;
    }

    // Diapo bilan
    fichiers[numeroDiapo(2 * n + 3) + "_diapo_bilan.html"] =
        htmlEnTete("Bilan") +
        navBar(numeroDiapo(2 * n + 2) + "_diapo_r_" + numeroDiapo(n) + ".html", "", "00_diapo_debut.html") +
        `<div class="titre_annonce">Fin</div>` +
        HTML_FIN;

    return fichiers;
}

// ============================================================
//  Génération d'un DIAPORAMA autonome (un seul fichier HTML)
//  Navigation clavier (←→ espace) + boutons
//  Ordre : Q1 / R1 / Q2 / R2 ... / Fin
// ============================================================

const CSS_FORMATS_INLINE = `
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:"Segoe UI",Helvetica,Arial,sans-serif;background:#f0f2f5;color:#1a1a2e}
.diapo-wrapper{display:none;flex-direction:column;min-height:100vh}
.diapo-wrapper.active{display:flex}
.diapo-nav{display:flex;align-items:center;justify-content:space-between;background:#1d3557;color:#fff;padding:10px 20px;user-select:none}
.diapo-nav .nav-titre{font-weight:700;font-size:1rem;letter-spacing:.03em}
.diapo-nav .nav-pos{font-size:.8rem;opacity:.65}
.diapo-nav button{background:rgba(255,255,255,.15);border:none;color:#fff;padding:8px 18px;border-radius:6px;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .15s}
.diapo-nav button:hover{background:rgba(255,255,255,.3)}
.diapo-nav button:disabled{opacity:.3;cursor:default}
.diapo-content{flex:1;padding:28px 36px;max-width:960px;margin:0 auto;width:100%}
.slide-annonce{display:flex;align-items:center;justify-content:center;flex:1;min-height:60vh}
.titre_annonce{font-size:2.5rem;font-weight:900;color:#1d3557;text-align:center;letter-spacing:.05em}
.consigne{font-size:.95rem;line-height:1.8;color:#333;background:#f8f9fa;border-left:4px solid #457b9d;padding:16px 20px;border-radius:0 8px 8px 0;max-width:700px;margin:40px auto}
[class*="_cellule_reponse"]{padding:10px 14px;border:2px solid #ccc;border-radius:8px;font-size:.93rem;line-height:1.5;background:#fff}
[class*="_cellule_reponse"][class$="_vrai"]{background:#fff9c4;border-color:#f4c430;font-weight:700}
[class*="_cellule_question"]{font-size:1rem;font-weight:600;line-height:1.6;padding:12px 0 10px 0;color:#1a1a2e}
[class*="_cellule_explication_avec"]{background:#fff9c4;border:2px solid #f4c430;border-radius:8px;padding:14px 16px;font-size:.93rem;line-height:1.6;margin-top:8px}
[class*="_cellule_explication_sans"]{display:none}
[class*="_cellule_graphique"]{display:flex;justify-content:center;align-items:center;padding:8px 0}
[class*="_cellule_graphique"] svg,[class*="_cellule_graphique"] img{max-width:100%;height:auto}
.format01_grille{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.format01_cellule_question{grid-column:1/-1}
.format01_cellule_reponse1_faux,.format01_cellule_reponse1_vrai{grid-column:1;grid-row:2}
.format01_cellule_reponse2_faux,.format01_cellule_reponse2_vrai{grid-column:2;grid-row:2}
.format01_cellule_reponse3_faux,.format01_cellule_reponse3_vrai{grid-column:1;grid-row:3}
.format01_cellule_reponse4_faux,.format01_cellule_reponse4_vrai{grid-column:2;grid-row:3}
.format01_cellule_explication_sans,.format01_cellule_explication_avec{grid-column:1/-1}
.format02_grille{display:grid;grid-template-columns:1fr 220px;gap:8px}
.format02_cellule_question{grid-column:1;grid-row:1}
.format02_cellule_reponse1_faux,.format02_cellule_reponse1_vrai{grid-column:1;grid-row:2}
.format02_cellule_reponse2_faux,.format02_cellule_reponse2_vrai{grid-column:1;grid-row:3}
.format02_cellule_reponse3_faux,.format02_cellule_reponse3_vrai{grid-column:1;grid-row:4}
.format02_cellule_reponse4_faux,.format02_cellule_reponse4_vrai{grid-column:1;grid-row:5}
.format02_cellule_explication_sans,.format02_cellule_explication_avec{grid-column:1;grid-row:6}
.format02_cellule_graphique{grid-column:2;grid-row:1/7;align-self:center}
.format03_grille{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.format03_cellule_question{grid-column:1/-1}
.format03_cellule_reponse1_faux,.format03_cellule_reponse1_vrai{grid-column:1}
.format03_cellule_reponse2_faux,.format03_cellule_reponse2_vrai{grid-column:2}
.format03_cellule_reponse3_faux,.format03_cellule_reponse3_vrai{grid-column:1}
.format03_cellule_reponse4_faux,.format03_cellule_reponse4_vrai{grid-column:2}
.format03_cellule_explication_sans,.format03_cellule_explication_avec{grid-column:1/-1}
.format04_grille{display:grid;grid-template-columns:1fr;gap:8px}
.format05_grille{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.format05_cellule_question{grid-column:1/-1}
.format05_cellule_reponse1_faux,.format05_cellule_reponse1_vrai{grid-column:1}
.format05_cellule_reponse2_faux,.format05_cellule_reponse2_vrai{grid-column:2}
.format05_cellule_reponse3_faux,.format05_cellule_reponse3_vrai{grid-column:1}
.format05_cellule_reponse4_faux,.format05_cellule_reponse4_vrai{grid-column:2}
.format05_cellule_explication_sans,.format05_cellule_explication_avec{grid-column:1/-1}
.format05_cellule_graphique{grid-column:1/-1;display:flex;justify-content:center}
.format08_grille{display:grid;grid-template-columns:1fr 280px;gap:8px}
.format08_cellule_question{grid-column:1}
.format08_cellule_reponse1_faux,.format08_cellule_reponse1_vrai,
.format08_cellule_reponse2_faux,.format08_cellule_reponse2_vrai,
.format08_cellule_reponse3_faux,.format08_cellule_reponse3_vrai,
.format08_cellule_reponse4_faux,.format08_cellule_reponse4_vrai,
.format08_cellule_explication_sans,.format08_cellule_explication_avec{grid-column:1}
.format08_cellule_graphique{grid-column:2;grid-row:1/8;align-self:center;display:flex;justify-content:center}
`;

function genererDiaporama(listeDeListes, avecConsigne = true) {
    const n = listeDeListes.length;

    // Tableau de slides : titre / consigne / Q1 R1 Q2 R2 ... / fin
    const slides = [];
    slides.push({ type:"titre",   label:"Automatismes",
        html:`<div class="slide-annonce"><div class="titre_annonce">Automatismes</div></div>` });
    if (avecConsigne) {
        slides.push({ type:"consigne", label:"Consignes",
            html:`<div class="consigne">Aucune justification n'est demandée et une seule réponse est possible par question.<br>Pour chaque question, reportez son numéro sur votre copie et indiquez votre réponse.<br><br>Si la question n'est pas un QCM alors la consigne est :<br><br>Donnez vos réponses sans justification<br>(vous pouvez, par contre, faire des calculs au brouillon)</div>` });
    }
    for (let i = 0; i < n; i++) {
        slides.push({ type:"question", label:`Question ${i+1} / ${n}`, html: miseEnFormeQuestion(listeDeListes[i], i) });
        slides.push({ type:"reponse",  label:`Réponse ${i+1} / ${n}`,  html: miseEnFormeReponse(listeDeListes[i], i) });
    }
    slides.push({ type:"fin", label:"Fin",
        html:`<div class="slide-annonce"><div class="titre_annonce">Fin</div></div>` });

    const total = slides.length;

    const slidesHTML = slides.map((s, idx) => `<div class="diapo-wrapper${idx===0?" active":""}" id="s${idx}">
  <div class="diapo-nav">
    <button onclick="va(${idx-1})"${idx===0?" disabled":""}>&#9664; Précédent</button>
    <div><div class="nav-titre">${s.label}</div><div class="nav-pos">${idx+1} / ${total}</div></div>
    <button onclick="va(${idx+1})"${idx===total-1?" disabled":""}>Suivant &#9654;</button>
  </div>
  <div class="diapo-content">${s.html}</div>
</div>`).join("\n");

    return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Automatismes</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/png" href="${ICON_URL}"/>
<script src="${MATHJAX_URL}"></script>
<style>${CSS_FORMATS_INLINE}</style>
</head>
<body>
${slidesHTML}
<script>
var _i=0,_t=${total};
function va(n){
  if(n<0||n>=_t)return;
  document.getElementById('s'+_i).classList.remove('active');
  _i=n;
  var el=document.getElementById('s'+_i);
  el.classList.add('active');
  if(window.MathJax&&MathJax.Hub)MathJax.Hub.Queue(['Typeset',MathJax.Hub,el]);
  window.scrollTo(0,0);
}
document.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight'||e.key===' ')va(_i+1);
  if(e.key==='ArrowLeft')va(_i-1);
});
<\/script>
</body>
</html>`;
}

// ============================================================
//  ZIP via JSZip + déclenchement de téléchargement
// ============================================================
async function telechargerSerieZip(fichiers, nomDossier = "serie_automatismes") {
    if (typeof JSZip === "undefined") {
        alert("JSZip non disponible. Vérifier l'import.");
        return;
    }
    const zip = new JSZip();
    const dossier = zip.folder(nomDossier);
    for (const [nom, contenu] of Object.entries(fichiers)) {
        dossier.file(nom, contenu);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    declencherTelechargement(blob, nomDossier + ".zip");
}

function telechargerDiaporama(htmlContent, nom = "diaporama_automatismes.html") {
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    declencherTelechargement(blob, nom);
}

function declencherTelechargement(blob, nom) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nom;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ============================================================
//  Upload GitHub (API REST)
//  Token et destination fixes depuis la config du lycée
// ============================================================
const GH_TOKEN  = "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";
const GH_REPO   = "AdminLandatome/Landatome_public";
const GH_BRANCH = "main";
const GH_PATH   = "docs/rep_transfert_github";

async function uploadGitHub({ fichiers, onProgress, token, owner, repo, branch, basePath } = {}) {
    // Priorité aux paramètres passés, sinon valeurs fixes
    const _token  = token  || GH_TOKEN;
    const _repo   = (owner && repo) ? `${owner}/${repo}` : GH_REPO;
    const [_owner, _repoName] = _repo.split("/");
    const _branch = branch || GH_BRANCH;
    const _base   = basePath !== undefined ? basePath : GH_PATH;

    const headers = {
        "Authorization": `token ${_token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    };
    const entries = Object.entries(fichiers);
    let done = 0;
    const erreurs = [];
    for (const [nom, contenu] of entries) {
        const chemin = (_base ? _base + "/" : "") + nom;
        const url = `https://api.github.com/repos/${_owner}/${_repoName}/contents/${chemin}`;
        // Récupérer le sha si le fichier existe déjà (pour le mettre à jour)
        let sha = null;
        try {
            const check = await fetch(url, { headers });
            if (check.ok) { const data = await check.json(); sha = data.sha; }
        } catch (_) {}
        const b64 = btoa(unescape(encodeURIComponent(contenu)));
        const body = JSON.stringify({
            message: `Automatisme: ${nom}`,
            content: b64,
            branch: _branch,
            ...(sha ? { sha } : {})
        });
        try {
            const resp = await fetch(url, { method: "PUT", headers, body });
            if (!resp.ok) { const err = await resp.json(); erreurs.push(`${nom}: ${err.message}`); }
        } catch (e) { erreurs.push(`${nom}: ${e.message}`); }
        done++;
        if (onProgress) onProgress(done, entries.length);
    }
    return erreurs;
}
