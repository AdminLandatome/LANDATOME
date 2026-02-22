// ============================================================
//  AUTOMATOME — Moteur JS
//  Traduction du script Python Automatome_V01.py
// ============================================================

// ---- Utilitaires aléatoires --------------------------------
function randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function choix(liste) {
    return liste[randint(0, liste.length - 1)];
}

// ---- Utilitaires mathématiques -----------------------------
function pgcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b !== 0) { [a, b] = [b, a % b]; }
    return a;
}

function simplifierFraction(a, b) {
    const d = pgcd(Math.abs(a), Math.abs(b));
    let n = Math.abs(a) / d, dd = Math.abs(b) / d;
    if (a * b > 0) return [n, dd];
    return [-n, dd];
}

function simplifierPetiteFraction(num, den) {
    if (num % den === 0) return [num / den, 1];
    for (let div = 2; div <= 10; div++) {
        while (num % div === 0 && den % div === 0) {
            num /= div; den /= div;
        }
    }
    return [num, den];
}

// normaliserFraction : renvoie une chaîne LaTeX \\frac{}{} ou entier
function normaliserFraction(numerateur, denominateur, debut = true, simplifiee = true) {
    let num, den;
    if (simplifiee) {
        [num, den] = simplifierFraction(numerateur, denominateur);
    } else {
        num = numerateur; den = denominateur;
    }
    if (debut) {
        if (Math.abs(num) === Math.abs(den)) return num > 0 ? "1" : "-1";
        if (den === 1) return String(num);
        if (num > 0) return `\\frac{${num}}{${den}}`;
        return `-\\frac{${-num}}{${den}}`;
    } else {
        if (Math.abs(num) === Math.abs(den)) return num > 0 ? "+1" : "-1";
        if (den === 1) return String(num);
        if (num > 0) return `+\\frac{${num}}{${den}}`;
        return `-\\frac{${-num}}{${den}}`;
    }
}

// normaliser(terme, lettre, debut) => "+3x" "-x" "x" "" etc.
function normaliser(terme, lettre, debut = false) {
    if (!debut) {
        if (terme === 0) return "";
        if (terme > 0) {
            if (terme === 1) return lettre === "" ? "+1" : "+" + lettre;
            return "+" + terme + lettre;
        } else {
            if (terme === -1) return lettre === "" ? "-1" : "-" + lettre;
            return terme + lettre;
        }
    } else {
        if (terme > 0) {
            if (terme === 1) return lettre === "" ? "1" : lettre;
            return terme + lettre;
        } else if (terme < 0) {
            if (terme === -1) return lettre === "" ? "-1" : "-" + lettre;
            return terme + lettre;
        } else return "";
    }
}

function normaliserCoef(m, debutLigne = true) {
    const s = String(m);
    if (debutLigne) {
        if (s === "1") return "";
        if (s === "-1") return "-";
        return s;
    } else {
        if (s === "1") return "+";
        if (s === "-1") return "-";
        if (m >= 0) return "+" + s;
        return s;
    }
}

function normaliserNombre(a) {
    if (a === 0) return "";
    if (a > 0) return "+" + a;
    return "-" + (-a);
}

function normaliserDelta(a, b, c) {
    const B2 = b >= 0 ? `${b}^2` : `(${b})^2`;
    const A = a >= 0 ? String(a) : `(${a})`;
    const C = c >= 0 ? String(c) : `(${c})`;
    return `${B2}- 4 \\times${A}\\times${C}`;
}

function normaliserRacineTrinome(numero, lettre, a, b, delta) {
    const den = a < 0 ? `{2 \\times (${a})}` : `{2 \\times ${a}}`;
    const numStr = numero === 1
        ? `{${normaliser(-b, "", true)}-\\sqrt{${delta}}}`
        : `{${normaliser(-b, "", true)}+\\sqrt{${delta}}}`;
    return `\\(${lettre}_${numero} = \\frac${numStr}${den}\\)`;
}

function normaliserQuotient(lettre, nombre, debutLigne = true) {
    const s = String(nombre);
    if (debutLigne) {
        if (s === "1") return lettre;
        if (s === "-1") return "-" + lettre;
        if (s[0] === "-") return `-\\frac{${lettre}}{${s.slice(1)}}`;
        return `\\frac{${lettre}}{${s}}`;
    } else {
        if (s === "1") return "+" + lettre;
        if (s === "-1") return "-" + lettre;
        if (s[0] === "-") return `-\\frac{${lettre}}{${s.slice(1)}}`;
        return `+\\frac{${lettre}}{${s}}`;
    }
}

function mettreVirgule1(n) {
    if (n < 10) return "0," + n;
    const s = String(n);
    if (n % 100 === 0) return s.slice(0, 2);
    if (n % 10 === 0) return s[0];
    return s[0] + "," + s.slice(1);
}

// ---- Mélange des réponses QCM ------------------------------
function melangeDesReponses(r1, r2, r3, r4) {
    const bonneReponse = randint(1, 4);
    const place = bonneReponse - 1;
    let liste = [r1, r2, r3, r4];
    // place la bonne réponse à l'index "place"
    [liste[0], liste[place]] = [liste[place], liste[0]];
    const restants = [0, 1, 2, 3].filter(i => i !== 0 && i !== place);
    if (randint(0, 1) === 0) {
        [liste[restants[0]], liste[restants[1]]] = [liste[restants[1]], liste[restants[0]]];
    }
    return [liste, bonneReponse];
}

// ============================================================
//  SVG — Génération des graphiques
// ============================================================
const X_MIN = -5, X_MAX = 5, Y_MIN = -5, Y_MAX = 5;
const COULEURS = {
    rouge: "255,0,0",
    noire: "0,0,0",
    gris_principal: "120,120,120",
    gris_secondaire: "150,150,150"
};

function XetY(x, y, tanAlpha, L, H) {
    const Y = -y * (H / 10) + H / 2;
    const X = (x + y * tanAlpha) * (L / 10) + L / 2;
    return [X, Y];
}

function positionDeC(xA, yA, xB, yB, L) {
    const AB = Math.sqrt((xB - xA) ** 2 + (yB - yA) ** 2);
    const coef = L / (50 * AB);
    return [coef * (xA - xB) + xB, coef * (yA - yB) + yB];
}

function positionsDeF1etF2(xA, yA, xB, yB, L) {
    const [xC, yC] = positionDeC(xA, yA, xB, yB, L);
    return [
        -yB + yC + xC, xB - xC + yC,
        yB - yC + xC, -xB + xC + yC
    ];
}

function creationFenetreSVG(H, L) {
    return `<svg viewBox="0 0 ${L} ${H}" width="100%" style="max-width:${L}px; height:auto;">\n`;
}

function creationRepere(H, L, angle = 0, couleur = "noire") {
    const tanA = Math.tan(Math.PI * angle / 180);
    const c = COULEURS[couleur];
    let svg = "";
    // axe X
    let [X1, Y1] = XetY(X_MIN, 0, tanA, L, H);
    let [X2, Y2] = XetY(X_MAX, 0, tanA, L, H);
    svg += `<line x1="${X1}" y1="${Y1}" x2="${X2}" y2="${Y2}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    let [xA, yA] = XetY(X_MIN, 0, tanA, L, H);
    let [xB, yB] = XetY(X_MAX, 0, tanA, L, H);
    let [f1x, f1y, f2x, f2y] = positionsDeF1etF2(xA, yA, xB, yB, L);
    svg += `<line x1="${xB}" y1="${yB}" x2="${f1x}" y2="${f1y}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    svg += `<line x1="${xB}" y1="${yB}" x2="${f2x}" y2="${f2y}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    // axe Y
    [X1, Y1] = XetY(0, Y_MIN, tanA, L, H);
    [X2, Y2] = XetY(0, Y_MAX, tanA, L, H);
    svg += `<line x1="${X1}" y1="${Y1}" x2="${X2}" y2="${Y2}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    [xA, yA] = XetY(0, Y_MIN, tanA, L, H);
    [xB, yB] = XetY(0, Y_MAX, tanA, L, H);
    [f1x, f1y, f2x, f2y] = positionsDeF1etF2(xA, yA, xB, yB, L);
    svg += `<line x1="${xB}" y1="${yB}" x2="${f1x}" y2="${f1y}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    svg += `<line x1="${xB}" y1="${yB}" x2="${f2x}" y2="${f2y}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    return svg;
}

function creerSegment(xA, yA, xB, yB, angle, L, H, couleur = "noire", epaisseur = 3) {
    const tanA = Math.tan(Math.PI * angle / 180);
    const c = COULEURS[couleur];
    const [X1, Y1] = XetY(xA, yA, tanA, L, H);
    const [X2, Y2] = XetY(xB, yB, tanA, L, H);
    return `<line x1="${X1}" y1="${Y1}" x2="${X2}" y2="${Y2}" style="stroke:rgb(${c});stroke-width:${epaisseur};"/>\n`;
}

function placerPoint(x, y, L, H, angle, couleur = "noire", nom = "") {
    const tanA = Math.tan(Math.PI * angle / 180);
    const [X, Y] = XetY(x, y, tanA, L, H);
    const c = COULEURS[couleur];
    const dxy = Math.min(L / 50, H / 50);
    let svg = "";
    svg += `<line x1="${X - dxy}" y1="${Y}" x2="${X + dxy}" y2="${Y}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    svg += `<line x1="${X}" y1="${Y - dxy}" x2="${X}" y2="${Y + dxy}" style="stroke:rgb(${c});stroke-width:3;"/>\n`;
    if (nom) svg += `<text x="${X + 2 * dxy}" y="${Y + 2 * dxy}" style="font-size:80%; stroke:rgb(${c});">${nom}</text>\n`;
    return svg;
}

function placerTexte(texte, x, y, L, H, angle, couleur = "noire", taille = 100, fontStyle = "normal") {
    const tanA = Math.tan(Math.PI * angle / 180);
    const [X, Y] = XetY(x, y, tanA, L, H);
    const c = COULEURS[couleur];
    return `<text x="${X}" y="${Y}" style="font-size:${taille}%; font-style:${fontStyle}; stroke:rgb(${c});">${texte}</text>\n`;
}

function dessinerFonction(points, angle, L, H, couleur = "noire", epaisseur = 3) {
    const tanA = Math.tan(Math.PI * angle / 180);
    const c = COULEURS[couleur];
    const pts = points.map(([px, py]) => {
        const [X, Y] = XetY(px, py, tanA, L, H);
        return `${X},${Y}`;
    }).join(" ");
    return `<polyline fill="none" stroke="rgb(${c})" stroke-width="${epaisseur}" points="${pts}"/>\n`;
}

function fonctionTrinome(a, b, c, xg, xd) {
    const pts = [];
    for (let xi = Math.round(xg * 10); xi <= Math.round(xd * 10); xi++) {
        const x = xi / 10;
        pts.push([x, a * x * x + b * x + c]);
    }
    return pts;
}

function quadrillage(angle, L, H) {
    let svg = "";
    for (let y = Y_MIN; y <= Y_MAX; y++) {
        if (y !== 0) svg += creerSegment(X_MIN, y, X_MAX, y, angle, L, H, "gris_principal", 1);
    }
    for (let x = X_MIN; x <= X_MAX; x++) {
        if (x !== 0) svg += creerSegment(x, Y_MIN, x, Y_MAX, angle, L, H, "gris_principal", 1);
    }
    return svg;
}

const FIN_SVG = "</svg>\n";

// ============================================================
//  Fonctions d'automatismes — Calcul littéral (développer)
// ============================================================

function calcul_litteral_0001() {
    const lettres = ["x","y","z","t","h"];
    const L = choix(lettres);
    const k = randint(2,10), a = randint(2,10), b = randint(2,10);
    const q = `\\(${k}(${a}${L} + ${b}) \\)`;
    const R1 = `\\( ${k}\\times ${a}${L} + ${k}\\times ${b}\\)<br>\n\\(${k*a}${L}+${k*b}\\)<br><br>\n`;
    return [7, "Développer et réduire l'expression.<br>" + q, R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0002() {
    const L = choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a}${L} - ${b}) \\)`;
    const R1=`\\(${k}\\times ${a}${L} - ${k}\\times ${b}\\)<br>\n\\(${k*a}${L}-${k*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0003() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a}${L} + ${b}) \\)`;
    const R1=`\\(${k}\\times ${a}${L} + (${k})\\times ${b}\\)<br>\n\\(${k*a}${L}${k*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0004() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a}${L} - ${b}) \\)`;
    const R1=`\\(${k}\\times ${a}${L} - (${k})\\times ${b}\\)<br>\n\\(${k*a}${L}+${Math.abs(k*b)}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0005() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a}${L} + ${b}) \\)`;
    const R1=`\\(${k}${L}\\times ${a}${L} + (${k}${L})\\times ${b}\\)<br>\n\\(${k*a}${L}^2+${Math.abs(k*b)}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0006() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a}${L} - ${b}) \\)`;
    const R1=`\\(${k}${L}\\times ${a}${L} - ${k}${L}\\times ${b}\\)<br>\n\\(${k*a}${L}^2-${Math.abs(k*b)}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0007() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a}${L} + ${b}) \\)`;
    const R1=`\\(${k}${L}\\times ${a}${L} + (${k}${L})\\times ${b}\\)<br>\n\\(${k*a}${L}^2-${Math.abs(k*b)}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0008() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a}${L} - ${b}) \\)`;
    const R1=`\\(${k}${L}\\times ${a}${L} - (${k}${L})\\times ${b}\\)<br>\n\\(${k*a}${L}^2+${Math.abs(k*b)}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0009() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a} + ${b}${L}) \\)`;
    const R1=`\\(${k}\\times ${a} + ${k}\\times ${b}${L}\\)<br>\n\\(${k*a}+${k*b}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0010() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a} - ${b}${L}) \\)`;
    const R1=`\\(${k}\\times ${a} - ${k}\\times ${b}${L}\\)<br>\n\\(${k*a}-${k*b}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0011() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a} + ${b}${L}) \\)`;
    const R1=`\\(${k}\\times ${a} + (${k})\\times ${b}${L}\\)<br>\n\\(${k*a}${k*b>0?"+":""}${k*b}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0012() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}(${a} - ${b}${L}) \\)`;
    const R1=`\\(${k}\\times ${a} - (${k})\\times ${b}${L}\\)<br>\n\\(${k*a}+${Math.abs(k*b)}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0013() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a} + ${b}${L}) \\)`;
    const R1=`\\(${k}${L}\\times ${a} + ${k}${L}\\times ${b}${L}\\)<br>\n\\(${k*a}${L}+${k*b}${L}^2\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0014() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a} - ${b}${L}) \\)`;
    const R1=`\\(${k}${L}\\times ${a} - ${k}${L}\\times ${b}${L}\\)<br>\n\\(${k*a}${L}-${k*b}${L}^2\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0015() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a} + ${b}${L}) \\)`;
    const R1=`\\(${k}${L}\\times ${a} + (${k}${L})\\times ${b}${L}\\)<br>\n\\(${k*a}${L}-${Math.abs(k*b)}${L}^2\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0016() {
    const L=choix(["x","y","z","t","h"]);
    const k=-randint(2,10),a=randint(2,10),b=randint(2,10);
    const q=`\\(${k}${L}(${a} - ${b}${L}) \\)`;
    const R1=`\\(${k}${L}\\times ${a} - (${k}${L})\\times ${b}${L}\\)<br>\n\\(${k*a}${L}+${Math.abs(k*b)}${L}^2\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}

// double distributivité (ax+b)(cx+d)
function _doubleDist(a, b, c, d, L) {
    const p = a*c, q2 = a*d+b*c, r = b*d;
    const q_txt = `\\( (${a}${L}${b>=0?"+":""}${b})(${c}${L}${d>=0?"+":""}${d})\\)`;
    const terme = q2===0?"":q2>0?`+${q2}${L}`:`${q2}${L}`;
    const R1 = `\\(${p}${L}^2${terme}${r>=0?"+":""}${r}\\)<br><br>\n`;
    return [q_txt, R1];
}
function calcul_litteral_0017() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const [q,R1]=_doubleDist(a,b,c,d,L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0018() {
    const L=choix(["x","y","z","t","h"]);
    const a=-randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const [q,R1]=_doubleDist(a,b,c,d,L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0019() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=-randint(2,10),c=randint(2,10),d=randint(2,10);
    const [q,R1]=_doubleDist(a,b,c,d,L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0020() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=-randint(2,10),d=randint(2,10);
    const [q,R1]=_doubleDist(a,b,c,d,L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0021() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=-randint(2,10);
    const [q,R1]=_doubleDist(a,b,c,d,L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0022() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=-randint(2,10),c=randint(2,10),d=-randint(2,10);
    const [q,R1]=_doubleDist(a,b,c,d,L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0023() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const q=`\\( (${a}+${b}${L})(${c}${L}+${d})\\)`;
    const p=b*c, q2=-a*c+b*d, r=a*d;
    const terme2=q2===0?"":q2>0?`+${q2}${L}`:`${q2}${L}`;
    const R1=`\\(${p}${L}^2${terme2}+${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0024() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const q=`\\( (-${a}+${b}${L})(${c}${L}+${d})\\)`;
    const p=b*c, q2=a*c+b*d, r=-a*d;
    const terme2=q2===0?"":q2>0?`+${q2}${L}`:`${q2}${L}`;
    const R1=`\\(${p}${L}^2${terme2}${r>=0?"+":""}${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0025() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const q=`\\( (${a}-${b}${L})(${c}${L}+${d})\\)`;
    const p=-b*c, q2=a*c-b*d, r=a*d;
    const terme2=q2===0?"":q2>0?`+${q2}${L}`:`${q2}${L}`;
    const R1=`\\(${p}${L}^2${terme2}+${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0026() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const q=`\\( (${a}-${b}${L})(-${c}${L}+${d})\\)`;
    const p=b*c, q2=-a*c+b*d, r=a*d;
    const terme2=q2===0?"":q2>0?`+${q2}${L}`:`${q2}${L}`;
    const R1=`\\(${p}${L}^2${terme2}+${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0027() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),c=randint(2,10),d=randint(2,10);
    const q=`\\( (${a}+${b}${L})(${c}${L}-${d})\\)`;
    const p=b*c, q2=a*c-b*d, r=-a*d;
    const terme2=q2===0?"":q2>0?`+${q2}${L}`:`${q2}${L}`;
    const R1=`\\(${p}${L}^2${terme2}${r>=0?"+":""}${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}

// Identités remarquables (ax+b)^2, (ax-b)^2, (ax+b)(ax-b)
function calcul_litteral_0060() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10);
    const q=`\\( (${a}${L}+${b})^2\\)`;
    const R1=`\\( (${a}${L})^2+2 \\times ${a}${L}\\times${b}+${b}^2\\)<br>\n\\(${a*a}${L}^2+${2*a*b}${L}+${b*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0061() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10);
    const q=`\\( (${a}+${b}${L})^2\\)`;
    const R1=`\\( ${a}^2+2 \\times ${a}\\times${b}${L}+(${b}${L})^2\\)<br>\n\\(${b*b}${L}^2+${2*a*b}${L}+${a*a}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0062() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10);
    const q=`\\( (${a}${L}-${b})^2\\)`;
    const R1=`\\( (${a}${L})^2-2 \\times ${a}${L}\\times${b}+${b}^2\\)<br>\n\\(${a*a}${L}^2-${2*a*b}${L}+${b*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0063() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10);
    const q=`\\( (${a}-${b}${L})^2\\)`;
    const R1=`\\( ${a}^2-2 \\times ${a}\\times${b}${L}+(${b}${L})^2\\)<br>\n\\(${b*b}${L}^2-${2*a*b}${L}+${a*a}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0064() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10);
    const q=`\\( (${a}${L}+${b})(${a}${L}-${b})\\)`;
    const R1=`\\(${a*a}${L}^2-${b*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0065() { return calcul_litteral_0064(); }
function calcul_litteral_0066() { return calcul_litteral_0064(); }
function calcul_litteral_0067() { return calcul_litteral_0064(); }

// Expressions diverses : (ax+b)(cx+d)+(ex+f)(gx+h)
function calcul_litteral_0070() {
    const L=choix(["x","y","z","t","h"]);
    const [a,b,c,d,e,f,g,h]=[randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5)];
    const p1=a*c+e*g, q1=a*d+b*c+e*h+f*g, r1=b*d+f*h;
    const q=`\\( (${a}${L}+${b})(${c}${L}+${d})+(${e}${L}+${f})(${g}${L}+${h})\\)`;
    const t=q1===0?"":q1>0?`+${q1}${L}`:`${q1}${L}`;
    const R1=`\\(${p1}${L}^2${t}+${r1}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0071() {
    const L=choix(["x","y","z","t","h"]);
    const [a,b,c,d,e,f,g,h]=[randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5),randint(2,5)];
    const p1=a*c-e*g, q1=a*d+b*c-e*h-f*g, r1=b*d-f*h;
    const q=`\\( (${a}${L}+${b})(${c}${L}+${d})-(${e}${L}+${f})(${g}${L}+${h})\\)`;
    const t=q1===0?"":q1>0?`+${q1}${L}`:`${q1}${L}`;
    const R1=`\\(${p1}${L}^2${t}${r1>=0?"+":""}${r1}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
// 72-86: variantes similaires
function _developerDouble(a,b,c,d,L) {
    const p=a*c, t=a*d+b*c, r=b*d;
    const ts=t===0?"":t>0?`+${t}${L}`:`${t}${L}`;
    return [7,`\\( (${a}${L}${b>=0?"+":""}${b})(${c}${L}${d>=0?"+":""}${d})\\)`,`\\(${p}${L}^2${ts}${r>=0?"+":""}${r}\\)<br><br>\n`,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0072() {
    const L=choix(["x","y","z","t","h"]);
    const a1=randint(2,5),b1=-randint(1,4),c1=randint(2,5),d1=randint(2,5);
    const a2=randint(2,5),b2=randint(2,5),c2=randint(2,5),d2=-randint(2,5);
    const p=a1*c1-a2*c2, t=a1*d1+b1*c1-a2*d2-b2*c2, r=b1*d1-b2*d2;
    const ts=t===0?"":t>0?`+${t}${L}`:`${t}${L}`;
    const q=`\\( (${a1}${L}${b1})(${c1}${L}+${d1})-(${a2}${L}+${b2})(${c2}${L}${d2})\\)`;
    const R1=`\\(${p}${L}^2${ts}${r>=0?"+":""}${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0073() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,5),b=randint(1,5),c=randint(2,5),d=randint(1,5);
    const p=a*a+c*c, t=2*a*b-2*c*d, r=b*b+d*d;
    const ts=t===0?"":t>0?`+${t}${L}`:`${t}${L}`;
    const q=`\\( (${a}${L}+${b})^2+(${c}${L}-${d})^2\\)`;
    const R1=`\\(${p}${L}^2${ts}+${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0074() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,5),b=randint(1,5),c=randint(2,5),d=randint(1,5);
    const p=a*a-c*c, t=2*a*b+2*c*d, r=b*b-d*d;
    const ts=t===0?"":t>0?`+${t}${L}`:`${t}${L}`;
    const q=`\\( (${a}${L}+${b})^2-(${c}${L}-${d})^2\\)`;
    const R1=`\\(${p}${L}^2${ts}${r>=0?"+":""}${r}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
// Formes canoniques a(x-α)²+β
function _formeCanonique(a, alpha, beta, signAlpha, L="x") {
    // (x signAlpha alpha)^2  => x^2 signAlpha 2*alpha*x + alpha^2
    const s = signAlpha === "+" ? -1 : 1; // signe dans le développement
    const p = a, t = a * 2 * s * alpha, r = a * alpha * alpha + beta;
    const ts = t === 0 ? "" : t > 0 ? `+${t}${L}` : `${t}${L}`;
    const R1 = `\\(${p}${L}^2${ts}${r >= 0 ? "+" : ""}${r}\\)<br><br>\n`;
    return R1;
}
function calcul_litteral_0075() {
    const L="x";const a=randint(2,5),alpha=randint(1,5),beta=randint(1,10);
    const q=`\\( ${a}(${L}-${alpha})^2+${beta}\\)`;
    const R1=_formeCanonique(a,alpha,beta,"-",L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0076() {
    const L="x";const a=randint(2,5),alpha=randint(1,5),beta=randint(1,10);
    const q=`\\( -${a}(${L}-${alpha})^2+${beta}\\)`;
    const R1=_formeCanonique(-a,alpha,beta,"-",L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0077() {
    const L="x";const a=randint(2,5),alpha=randint(1,5),beta=randint(1,10);
    const q=`\\( ${a}(${L}+${alpha})^2+${beta}\\)`;
    const R1=_formeCanonique(a,alpha,beta,"+",L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0078() {
    const L="x";const a=randint(2,5),alpha=randint(1,5),beta=randint(1,10);
    const q=`\\( -${a}(${L}+${alpha})^2+${beta}\\)`;
    const R1=_formeCanonique(-a,alpha,beta,"+",L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0079() {
    const L="x";const a=randint(2,5),alpha=randint(1,5),beta=randint(1,10);
    const q=`\\( ${a}(${L}-${alpha})^2-${beta}\\)`;
    const R1=_formeCanonique(a,alpha,-beta,"-",L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0080() {
    const L="x";const a=randint(2,5),alpha=randint(1,5),beta=randint(1,10);
    const q=`\\( -${a}(${L}+${alpha})^2-${beta}\\)`;
    const R1=_formeCanonique(-a,alpha,-beta,"+",L);
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0081() { return calcul_litteral_0079(); }
function calcul_litteral_0082() { return calcul_litteral_0080(); }
function calcul_litteral_0083() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),k=randint(2,10);
    const q=`\\((${a}${L}+${b})\\times ${k}\\)`;
    const R1=`\\(${k*a}${L}+${k*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0084() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),k=randint(2,10);
    const q=`\\((${a}${L}-${b})\\times ${k}\\)`;
    const R1=`\\(${k*a}${L}-${k*b}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0085() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),k=randint(2,10);
    const q=`\\((${a}${L}+${b})\\times ${k}${L}\\)`;
    const R1=`\\(${k*a}${L}^2+${k*b}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0086() {
    const L=choix(["x","y","z","t","h"]);
    const a=randint(2,10),b=randint(2,10),k=randint(2,10);
    const q=`\\((${a}${L}-${b})\\times ${k}${L}\\)`;
    const R1=`\\(${k*a}${L}^2-${k*b}${L}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}

// Triple distributivité
function _tripleD(a,b,c,d,e,f,L) {
    // (ax+b)(cx+d)(ex+f)
    const p1=a*c, q1=a*d+b*c, r1=b*d;
    const A=p1*e, B=p1*f+q1*e, C=q1*f+r1*e, D=r1*f;
    const t1=B===0?"":B>0?`+${B}${L}^2`:`${B}${L}^2`;
    const t2=C===0?"":C>0?`+${C}${L}`:`${C}${L}`;
    const q=`\\((${a}${L}${b>=0?"+":""}${b})(${c}${L}${d>=0?"+":""}${d})(${e}${L}${f>=0?"+":""}${f})\\)`;
    const R1=`\\(${A}${L}^3${t1}${t2}${D>=0?"+":""}${D}\\)<br><br>\n`;
    return [7,"Développer et réduire l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0090() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),randint(1,4),randint(1,4),randint(1,4),randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0091() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),-randint(1,4),randint(1,4),randint(1,4),randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0092() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[-randint(1,4),-randint(1,4),randint(1,4),randint(1,4),randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0093() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),randint(1,4),randint(1,4),-randint(1,4),randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0094() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),-randint(1,4),randint(1,4),-randint(1,4),randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0095() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),-randint(1,4),randint(1,4),-randint(1,4),randint(1,4),-randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0096() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),-randint(1,4),randint(1,4),randint(1,4),randint(1,4),-randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0097() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),-randint(1,4),-randint(1,4),randint(1,4),randint(1,4),-randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0098() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),-randint(1,4),-randint(1,4),randint(1,4),-randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }
function calcul_litteral_0099() { const L=choix(["x","y","z","t","h"]); const [a,b,c,d,e,f]=[randint(1,4),randint(1,4),-randint(1,4),randint(1,4),randint(1,4),randint(1,4)]; return _tripleD(a,b,c,d,e,f,L); }

// Réduction au même dénominateur
function _redDenom(ma, a, b, mb, c, d, L) {
    // ma/(ax+b) op mb/(cx+d)
    const num1 = `${ma}(${c}${L}${d>=0?"+":""}${d})`;
    const num2 = `${mb}(${a}${L}${b>=0?"+":""}${b})`;
    const den = `(${a}${L}${b>=0?"+":""}${b})(${c}${L}${d>=0?"+":""}${d})`;
    return [den, num1, num2];
}
function calcul_litteral_0100() {
    const L=choix(["x","y","z","t","h"]);
    const m=randint(1,5),a=randint(1,4),b=randint(1,4),p=randint(1,5),c=randint(1,4),d=randint(1,4);
    const q=`\\(\\frac{${m}}{${a}${L}+${b}} + \\frac{${p}}{${c}${L}+${d}} \\)`;
    const R1=`\\(\\frac{${m}(${c}${L}+${d})+${p}(${a}${L}+${b})}{(${a}${L}+${b})(${c}${L}+${d})}\\)<br><br>\n`;
    return [7,"Réduire au même dénominateur.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0101() {
    const L=choix(["x","y","z","t","h"]);
    const m=randint(1,5),a=randint(1,4),b=randint(1,4),p=randint(1,5),c=randint(1,4),d=randint(1,4);
    const q=`\\(\\frac{${m}}{${a}${L}+${b}} - \\frac{${p}}{${c}${L}+${d}} \\)`;
    const R1=`\\(\\frac{${m}(${c}${L}+${d})-${p}(${a}${L}+${b})}{(${a}${L}+${b})(${c}${L}+${d})}\\)<br><br>\n`;
    return [7,"Réduire au même dénominateur.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0102() {
    const L=choix(["x","y","z","t","h"]);
    const m=randint(1,5),a=randint(1,4),b=randint(1,4),p=randint(1,5),c=randint(1,4),d=randint(1,4);
    const q=`\\(\\frac{${m}}{-${a}${L}+${b}} - \\frac{-${p}}{${c}${L}+${d}} \\)`;
    const R1=`\\(\\frac{${m}(${c}${L}+${d})+${p}(-${a}${L}+${b})}{(-${a}${L}+${b})(${c}${L}+${d})}\\)<br><br>\n`;
    return [7,"Réduire au même dénominateur.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0103() {
    const L=choix(["x","y","z","t","h"]);
    const m=randint(1,5),a=randint(1,4),b=randint(1,4),p=randint(1,5),c=randint(1,4),d=randint(1,4);
    const q=`\\(\\frac{${m}${L}}{${a}${L}+${b}} + \\frac{${p}}{${c}${L}+${d}} \\)`;
    const R1=`\\(\\frac{${m}${L}(${c}${L}+${d})+${p}(${a}${L}+${b})}{(${a}${L}+${b})(${c}${L}+${d})}\\)<br><br>\n`;
    return [7,"Réduire au même dénominateur.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0104() {
    const L=choix(["x","y","z","t","h"]);
    const m=randint(1,5),a=randint(1,4),b=randint(1,4),p=randint(1,5),c=randint(1,4),d=randint(1,4);
    const q=`\\(\\frac{${m}${L}}{${a}${L}+${b}} - \\frac{${p}}{${c}${L}+${d}} \\)`;
    const R1=`\\(\\frac{${m}${L}(${c}${L}+${d})-${p}(${a}${L}+${b})}{(${a}${L}+${b})(${c}${L}+${d})}\\)<br><br>\n`;
    return [7,"Réduire au même dénominateur.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}

// Factorisation simple
function _factorSimple(ka, kb, L, question) {
    const g=pgcd(Math.abs(ka),Math.abs(kb));
    const fa=ka/g, fb=kb/g;
    const R1=`\\(${g}(${fa}${L}${fb>=0?"+":""}${fb})\\)<br><br>\n`;
    return [7,"Factoriser l'expression.<br>"+question,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0301() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,5),a=randint(2,6),b=randint(2,6);
    return _factorSimple(k*a,k*b,L,`\\(${k*a}${L}+${k*b}\\)`);
}
function calcul_litteral_0302() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,5),a=randint(2,6),b=randint(2,6);
    return _factorSimple(k*a,-k*b,L,`\\(${k*a}${L}-${k*b}\\)`);
}
function calcul_litteral_0303() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,5),a=randint(2,6),b=randint(2,6);
    const g=pgcd(k*a,k*b);const fa=k*a/g,fb=k*b/g;
    const R1=`\\(${g}(${fa}+${fb}${L})\\)<br><br>\n`;
    return [7,`Factoriser l'expression.<br>\\(${k*a}+${k*b}${L}\\)`,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0304() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,5),a=randint(2,6),b=randint(2,6);
    const g=pgcd(k*a,k*b);const fa=k*a/g,fb=k*b/g;
    const R1=`\\(${g}(${fa}-${fb}${L})\\)<br><br>\n`;
    return [7,`Factoriser l'expression.<br>\\(${k*a}-${k*b}${L}\\)`,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0305() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,5),a=randint(2,6),b=randint(2,6);
    const g=pgcd(k*a,k*b);const fa=k*a/g,fb=k*b/g;
    const R1=`\\(${g}${L}(${fa}${L}+${fb})\\)<br><br>\n`;
    return [7,`Factoriser l'expression.<br>\\(${k*a}${L}^2+${k*b}${L}\\)`,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0306() {
    const L=choix(["x","y","z","t","h"]);
    const k=randint(2,5),a=randint(2,6),b=randint(2,6);
    const g=pgcd(k*a,k*b);const fa=k*a/g,fb=k*b/g;
    const R1=`\\(${g}${L}(${fa}${L}-${fb})\\)<br><br>\n`;
    return [7,`Factoriser l'expression.<br>\\(${k*a}${L}^2-${k*b}${L}\\)`,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0307() {
    const L=choix(["x","y","z","t","h"]);
    const x1=randint(1,5), x2=randint(1,5);
    const a=randint(1,3);
    const b=-a*(x1+x2), c=a*x1*x2;
    const q=`\\(${normaliser(a,L+"^2",true)}${normaliser(b,L)}${normaliser(c,"")}\\)`;
    const R1=`\\(${a}(${L}${normaliser(-x1,"")})(${L}${normaliser(-x2,"")})\\)<br><br>\n`;
    return [7,"Factoriser l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0308() {
    const L=choix(["x","y","z","t","h"]);
    const x1=(2*randint(0,1)-1)*randint(1,8);
    const ecart=randint(1,Math.abs(x1)-1<1?1:Math.abs(x1)-1)||1;
    const x2=x1+ecart;
    const a=randint(1,3);
    const b=-a*(x1+x2), c=a*x1*x2;
    const delta=b*b-4*a*c;
    const q=`\\(${normaliser(a,L+"^2",true)}${normaliser(b,L)}${normaliser(c,"")}\\)`;
    const R1=`\\(\\Delta=${normaliserDelta(a,b,c)}=${delta}\\)<br>`+
        `${normaliserRacineTrinome(1,L,a,b,delta)} = ${x1}<br>et ${normaliserRacineTrinome(2,L,a,b,delta)} = ${x2}<br>`+
        `Donc : ${q} \\(= ${a}(${L}${normaliser(-x1,"")})(${L}${normaliser(-x2,"")})\)<br><br>\n`;
    return [7,"Factoriser l'expression.<br>"+q,R1,"","","",null,null,null,null,null,"sans",0];
}
function calcul_litteral_0309() { return calcul_litteral_0308(); }

// ============================================================
//  Dérivation
// ============================================================
function derivation_0401() {
    const a = (2*randint(0,1)-1)*randint(1,500);
    const b = (2*randint(0,1)-1)*randint(2,500);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par \\(${f}(x)=${normaliser(a,'x',true)}${normaliser(b,'',false)}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est une combinaison linéraire de fonctions de référence toutes dérivables sur \\(\\mathbb{R}\\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout réel \\(x\\),<br><br>`
             + `\\[${f}'(x)=${a}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0402() {
    const a = (2*randint(0,1)-1)*randint(1,25);
    const b = (2*randint(0,1)-1)*randint(2,500);
    const c = (2*randint(0,1)-1)*randint(2,500);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par \\(${f}(x)=${normaliser(a,'x^2',true)}${normaliser(b,'x',false)}${normaliser(c,'',false)}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est une combinaison linéraire de fonctions de référence toutes dérivables sur \\(\\mathbb{R}\\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout réel \\(x\\),<br><br>`
             + `\\[${f}'(x)=${2*a}x${normaliser(b,'',false)}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0403() {
    const a = (2*randint(0,1)-1)*randint(1,25);
    const b = (2*randint(0,1)-1)*randint(2,25);
    const c = (2*randint(0,1)-1)*randint(2,500);
    const d = (2*randint(0,1)-1)*randint(2,500);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par : \\(${f}(x)=${normaliser(a,'x^3',true)}${normaliser(b,'x^2',false)}${normaliser(c,'x',false)}${normaliser(d,'',false)}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est une combinaison linéraire de fonctions de référence toutes dérivables sur \\(\\mathbb{R}\\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout réel \\(x\\),<br><br>`
             + `\\[${f}'(x)=${3*a}x^2${normaliser(2*b,'x',false)}${normaliser(c,'',false)}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0404() {
    const a = (2*randint(0,1)-1)*randint(1,11);
    const b = (2*randint(0,1)-1)*randint(2,20);
    const c = (2*randint(0,1)-1)*randint(2,20);
    const d = (2*randint(0,1)-1)*randint(2,500);
    const n = randint(6,10), p = randint(3,5);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par : \\(${f}(x)=${normaliser(a,'x^{'+n+'}',true)}${normaliser(b,'x^'+p,false)}${normaliser(c,'x',false)}${normaliser(d,'',false)}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est une combinaison linéraire de fonctions de référence toutes dérivables sur \\(\\mathbb{R}\\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout réel \\(x\\),<br><br>`
             + `\\[${f}'(x)=${n*a}x^{${n-1}}${normaliser(b*p,'x^'+(p-1),false)}${normaliser(c,'',false)}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0405() {
    const a = (2*randint(0,1)-1)*randint(1,25);
    const b = (2*randint(0,1)-1)*randint(2,25);
    const c = (2*randint(0,1)-1)*randint(2,500);
    const d = (2*randint(0,1)-1)*randint(2,500);
    const k = (2*randint(0,1)-1)*randint(2,500);
    const f = choix(["f","g","h"]);
    let q, R1;
    if (k > 0) {
        q = `On donne la fonction \\(${f}\\) définie pour tout réel non nul \\(x\\) par : \\[${f}(x)=${normaliser(a,'x^3',true)}${normaliser(b,'x^2',false)}${normaliser(c,'x',false)}${normaliser(d,'',false)}+\\frac{${k}}{x}\\]`
          + `Donner l'expression de \\(${f}'(x)\\)`;
        R1 = `La fonction \\(${f}\\) est une combinaison linéraire de fonctions de référence toutes dérivables sur \\(\\mathbb{R}\\backslash\\lbrace{0}\\rbrace \\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\backslash\\lbrace{0}\\rbrace \\) et pour tout  \\(x\\in\\mathbb{R}\\backslash\\lbrace{0}\\rbrace \\),`
           + `\\[${f}'(x)=${3*a}x^2${normaliser(2*b,'x',false)}${normaliser(c,'',false)}-\\frac{${k}}{x^2}\\]`;
    } else {
        q = `On donne la fonction \\(${f}\\) définie pour tout réel non nul \\(x\\) par : \\[${f}(x)=${normaliser(a,'x^3',true)}${normaliser(b,'x^2',false)}${normaliser(c,'x',false)}${normaliser(d,'',false)}-\\frac{${-k}}{x}\\]`
          + `Donner l'expression de \\(${f}'(x)\\)`;
        R1 = `La fonction \\(${f}\\) est une combinaison linéraire de fonctions de référence toutes dérivables sur \\(\\mathbb{R}\\backslash\\lbrace{0}\\rbrace \\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\backslash\\lbrace{0}\\rbrace \\) et pour tout  \\(x\\in\\mathbb{R}\\backslash\\lbrace{0}\\rbrace \\),`
           + `\\[${f}'(x)=${3*a}x^2${normaliser(2*b,'x',false)}${normaliser(c,'',false)}+\\frac{${-k}}{x^2}\\]`;
    }
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0406() {
    const a = (2*randint(0,1)-1)*randint(1,10);
    const b = (2*randint(0,1)-1)*randint(2,10);
    const f = choix(["f","g","h"]);
    const racine = normaliserFraction(-b, a);
    const q = `On donne la fonction \\(${f}\\) définie pour tout  \\(x\\in\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\) par : \\[${f}(x)=\\frac{1}{${normaliser(a,'x',true)}${normaliser(b,'',false)}}\\]`
            + `Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est l'inverse d'une fonction dérivable qui ne s'annule pas sur \\(\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace \\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace \\) et pour tout  \\(x\\in\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace \\),`
             + `\\[${f}'(x)=\\frac{${-a}}{(${normaliser(a,'x',true)}${normaliser(b,'',false)})^2}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0407() {
    const a = (2*randint(0,1)-1)*randint(1,10);
    const b = (2*randint(0,1)-1)*randint(2,10);
    const f = choix(["f","g","h"]);
    const racine = normaliserFraction(-b, a);
    let iv_f, iv_o;
    if (a > 0) {
        iv_f = `\\mathopen{[}${racine} ; +\\infty \\mathclose{[}`;
        iv_o = `\\mathopen{]}${racine} ; +\\infty \\mathclose{[}`;
    } else {
        iv_f = `\\mathopen{]} -\\infty ; ${racine} \\mathclose{]}`;
        iv_o = `\\mathopen{]} -\\infty ; ${racine} \\mathclose{[}`;
    }
    const q = `On donne la fonction \\(${f}\\) définie pour tout  \\(x\\in${iv_f}\\) par : \\[${f}(x)=\\sqrt{${normaliser(a,'x',true)}${normaliser(b,'',false)}}\\]`
            + `Donner l'expression de \\(${f}'(x)\\)`;
    let R1 = `La fonction \\(${f}\\) est la composée de la fonction racine carrée avec une fonction définie et strictement positive sur  \\(${iv_o}\\).<br>\\(${f}\\) est donc dérivable sur  \\(${iv_o}\\)  et pour tout  \\(x\\in${iv_o}\\),`;
    if (a % 2 !== 0) {
        R1 += `\\[${f}'(x)=\\frac{${a}}{2\\sqrt{${normaliser(a,'x',true)}${normaliser(b,'',false)}}}\\]`;
    } else {
        R1 += `\\[${f}'(x)=\\frac{${a/2}}{\\sqrt{${normaliser(a,'x',true)}${normaliser(b,'',false)}}}\\]`;
    }
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0408() {
    const a = (2*randint(0,1)-1)*randint(2,10);
    const b = (2*randint(0,1)-1)*randint(1,10);
    const c = randint(2,10);
    const d = (2*randint(0,1)-1)*randint(1,10);
    const f = choix(["f","g","h"]);
    const racine = normaliserFraction(-d, c);
    const q = `On donne la fonction \\(${f}\\) définie pour tout  \\(x\\in\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\) par : \\[${f}(x)=\\frac{${normaliser(a,'x',true)}${normaliser(b,'',false)}}{${normaliser(c,'x',true)}${normaliser(d,'',false)}}\\]`
            + `Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est un quotient de fonctions définies et dérivables sur \\(\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\) de plus le dénominteur ne s'annule pas sur \\(\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\) et pour tout  \\(x\\in\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\),`
             + `<br><br>\\(${f}'(x)=\\frac{${a}(${normaliser(c,'x',true)}${normaliser(d,'',false)}) -${c}(${normaliser(a,'x',true)}${normaliser(b,'',false)})}{(${normaliser(c,'x',true)}${normaliser(d,'',false)})^2}\\)`
             + `<br> Ainsi : <br>\\[\\forall x \\in\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace,\\;\\;\\;${f}'(x)=\\frac{${a*d-b*c}}{(${normaliser(c,'x',true)}${normaliser(d,'',false)})^2}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0409() {
    const a = (2*randint(0,1)-1)*randint(2,10);
    const b = (2*randint(0,1)-1)*randint(1,10);
    const c = randint(2,10);
    const d = (2*randint(0,1)-1)*randint(1,10);
    const f = choix(["f","g","h"]);
    const racine = normaliserFraction(-d, c);
    let iv_f, iv_o;
    if (c > 0) {
        iv_f = `\\mathopen{[}${racine} ; +\\infty \\mathclose{[}`;
        iv_o = `\\mathopen{]}${racine} ; +\\infty \\mathclose{[}`;
    } else {
        iv_f = `\\mathopen{]} -\\infty ; ${racine} \\mathclose{]}`;
        iv_o = `\\mathopen{]} -\\infty ; ${racine} \\mathclose{[}`;
    }
    const q = `On donne la fonction \\(${f}\\) définie pour tout  \\(x\\in${iv_f}\\) par : \\[${f}(x)=(${normaliser(a,'x',true)}${normaliser(b,'',false)})\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)}}\\]`
            + `Donner l'expression de \\(${f}'(x)\\)`;
    let R1 = `La fonction \\(${f}\\) est le produit d'une fonction dérivable sur \\(\\mathbb{R}\\) par la fonction racine carrée composée avec une fonction  strictement positive sur \\(${iv_o}\\).\n<br>\\(${f}\\) est donc dérivable sur \\(${iv_o}\\) et pour tout  \\(x\\in${iv_o}\\),\n`;
    if (c % 2 !== 0) {
        R1 += `<br>\\(${f}'(x)=${a}\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)}}+ \\frac{${c}(${normaliser(a,'x',true)}${normaliser(b,'',false)})}{2\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)} }}\\)`;
        R1 += `<br> qui s'écrit encore : `;
        R1 += `<br>\\(${f}'(x)=\\frac{${2*a}(${normaliser(c,'x',true)}${normaliser(d,'',false)})+${c}(${normaliser(a,'x',true)}${normaliser(b,'',false)})}{2\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)} }}\\)`;
        R1 += `<br> et enfin : `;
        if ((3*a*c) % 2 === 0 && (2*a*d + c*b) % 2 === 0) {
            R1 += `<br>\\[${f}'(x)=\\frac{${3*a*c/2}x${normaliser((2*a*d+c*b)/2,'',false)}}{\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)} }}\\]`;
        } else {
            R1 += `<br>\\[${f}'(x)=\\frac{${3*a*c}x${normaliser(2*a*d+c*b,'',false)}}{2\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)} }}\\]`;
        }
    } else {
        const dc = c/2;
        R1 += `<br>\\(${f}'(x)=${a}\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)}}+ \\frac{${dc}(${normaliser(a,'x',true)}${normaliser(b,'',false)})}{\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)}}}\\)`;
        R1 += `<br> qui s'écrit encore : `;
        R1 += `<br>\\(${f}'(x)=\\frac{${a}(${normaliser(c,'x',true)}${normaliser(d,'',false)})+${dc}(${normaliser(a,'x',true)}${normaliser(b,'',false)})}{\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)} }}\\)`;
        R1 += `<br> et enfin : `;
        R1 += `<br>\\[${f}'(x)=\\frac{${3*a*c/2}x${normaliser(a*d + c*b/2,'',false)}}{\\sqrt{${normaliser(c,'x',true)}${normaliser(d,'',false)} }}\\]`;
    }
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0410() {
    const a = (2*randint(0,1)-1)*randint(2,11);
    const b = (2*randint(0,1)-1)*randint(2,20);
    const n = randint(3,10);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par : \\(${f}(x)=(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n}}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    let R1 = `La fonction \\(${f}\\) est une puisance d'une fonction dérivable sur \\(\\mathbb{R}\\).<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout réel \\(x\\),<br><br>`;
    if (a > 0) {
        R1 += `\\(${f}'(x)=${n}\\times${a}\\times(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n-1}}\\)`;
    } else {
        R1 += `\\(${f}'(x)=${n}\\times(${a})\\times(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n-1}}\\)`;
    }
    R1 += `<br> qui se simplifie en : `;
    R1 += `\\[${f}'(x)=${n*a}(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n-1}}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0411() {
    const a = (2*randint(0,1)-1)*randint(2,11);
    const b = (2*randint(0,1)-1)*randint(2,11);
    const c = (2*randint(0,1)-1)*randint(2,11);
    const d = (2*randint(0,1)-1)*randint(2,11);
    const n = randint(3,7);
    const f = choix(["f","g","h"]);
    // normaliser_coef(str(c), False) : si c>0 → "+c", si c==-1 → "-", si c==1 → "+", sinon → str(c) avec signe
    const nc = (c === 1) ? "+" : (c === -1) ? "-" : (c > 0) ? `+${c}` : `${c}`;
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par : \\(${f}(x)=(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n}}(${normaliser(c,'x',true)}${normaliser(d,'',false)})\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    let R1 = `La fonction \\(${f}\\) est le produit d'une puisance d'une fonction dérivable sur \\(\\mathbb{R}\\) par une fonction affine.<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout réel \\(x\\),<br><br>`;
    R1 += `<br><br>\\(${f}'(x)=${n*a}(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n-1}} \\times (${normaliser(c,'x',true)}${normaliser(d,'',false)})${nc}\\times (${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n}} \\)`;
    R1 += `<br>ou encore :`;
    R1 += `<br>\\(${f}'(x)=[${n*a}(${normaliser(c,'x',true)}${normaliser(d,'',false)})${normaliser(c,'',false)}(${normaliser(a,'x',true)}${normaliser(b,'',false)})] (${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n-1}} \\)`;
    R1 += `<br>et enfin :`;
    R1 += `\\[${f}'(x)=(${normaliser(n*a*c+c*a,'x',true)}${normaliser(n*a*d+c*b,'',false)})(${normaliser(a,'x',true)}${normaliser(b,'',false)})^{${n-1}} \\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0412() {
    const a = (2*randint(0,1)-1)*randint(2,11);
    const b = (2*randint(0,1)-1)*randint(2,11);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par : \\(${f}(x)=e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    const R1 = `La fonction \\(${f}\\) est l'exponentielle d'une fonction affine.<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R},\\) et \n<br>`
             + `\\[ \\forall x\\ \\in \\mathbb{R}, \\;\\;\\;\\;${f}'(x)=${a} e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}} \\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0413() {
    const a = (2*randint(0,1)-1)*randint(2,11);
    const b = (2*randint(0,1)-1)*randint(2,11);
    const c = (2*randint(0,1)-1)*randint(2,11);
    const d = (2*randint(0,1)-1)*randint(2,11);
    const f = choix(["f","g","h"]);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\) par : \\(${f}(x)=(${normaliser(c,'x',true)}${normaliser(d,'',false)})e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}\\).<br>Donner l'expression de \\(${f}'(x)\\)`;
    let R1 = `La fonction \\(${f}\\) est le produit d'une fonction affine par l'exponentielle d'une fonction affine.<br>\\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout \\(x\\in\\mathbb{R},\\) \n<br>`;
    R1 += `<br>\\(${f}'(x)=${normaliser(a,'',true)}e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}\\times(${normaliser(c,'x',true)}${normaliser(d,'',false)})${normaliser(c,'',false)}e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}} \\)`;
    R1 += `<br>ou encore :`;
    R1 += `<br>\\(${f}'(x)=[${normaliser(a,'',true)}(${normaliser(c,'x',true)}${normaliser(d,'',false)})${normaliser(c,'',false)}]e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}} \\)`;
    R1 += `<br>Ainsi ,`;
    R1 += `\\[ \\forall x\\ \\in \\mathbb{R}, \\;\\;\\;\\;${f}'(x)=(${normaliser(a*c,'x',true)}${normaliser(a*d+c,'',false)})e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}} \\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

function derivation_0414() {
    const a = (2*randint(0,1)-1)*randint(2,11);
    const b = (2*randint(0,1)-1)*randint(2,11);
    const c = (2*randint(0,1)-1)*randint(2,11);
    const d = (2*randint(0,1)-1)*randint(2,11);
    const f = choix(["f","g","h"]);
    const racine = normaliserFraction(-c, d);
    const q = `On donne la fonction \\(${f}\\) définie pour tout réel \\(x\\in\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\) par : \\[${f}(x)=\\frac{e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}}{${normaliser(c,'x',true)}${normaliser(d,'',false)}}\\]`
            + `<br>Donner l'expression de \\(${f}'(x)\\)`;
    let R1 = `La fonction \\(${f}\\) est le quotient de l'exponentielle d'une fonction affine par une fonction affine.<br>De plus, le dénominateur ne s'annule pas sur \\(\\mathbb{R}\\backslash\\lbrace{${racine}}\\rbrace\\).<br> \\(${f}\\) est donc dérivable sur \\(\\mathbb{R}\\) et pour tout \\(x\\in\\mathbb{R},\\) \n<br>`;
    R1 += `<br>\\(${f}'(x)=\\frac{${normaliser(a,'',true)}e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}\\times(${normaliser(c,'x',true)}${normaliser(d,'',false)})${normaliser(-c,'',false)}e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}}{(${normaliser(c,'x',true)}${normaliser(d,'',false)})^2} \\)`;
    R1 += `<br>ou encore :`;
    R1 += `<br>\\(${f}'(x)=\\frac{[${normaliser(a,'',true)}(${normaliser(c,'x',true)}${normaliser(d,'',false)})${normaliser(-c,'',false)}]e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}}{(${normaliser(c,'x',true)}${normaliser(d,'',false)})^2}\\)`;
    R1 += `<br>Ainsi ,`;
    R1 += `\\[ \\forall x\\ \\in \\mathbb{R}, \\;\\;\\;\\;${f}'(x)=\\frac{(${normaliser(a*c,'x',true)}${normaliser(a*d-c,'',false)})e^{${normaliser(a,'x',true)}${normaliser(b,'',false)}}}{(${normaliser(c,'x',true)}${normaliser(d,'',false)})^2}\\]`;
    return [7,q,R1,"","","",null,null,null,null,null,"sans",0];
}

// ============================================================
//  Calcul numérique (collège)
// ============================================================
function _calcNumOuvert(q, res) {
    return [7, q, `\\(${res}\\)<br><br>\n`, "", "", "", null, null, null, null, null, "sans", 0];
}
function calcul_numerique_0501() {
    const a=(2*randint(0,1)-1)*randint(1,15), b=(2*randint(0,1)-1)*randint(1,15);
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer l'expression \\(${L}=${normaliser(a,'',true)}${normaliser(b,'',false)}\\)`, a+b);
}
function calcul_numerique_0502() {
    const a=(2*randint(0,1)-1)*randint(1,15), b=(2*randint(0,1)-1)*randint(1,15), c=(2*randint(0,1)-1)*randint(1,15);
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}${normaliser(b,'',false)}${normaliser(c,'',false)}\\)`, a+b+c);
}
function calcul_numerique_0503() {
    const a=(2*randint(0,1)-1)*randint(1,15), b=(2*randint(0,1)-1)*randint(1,15), c=(2*randint(0,1)-1)*randint(1,15);
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}+(${normaliser(b,'',true)}${normaliser(c,'',false)})\\)`, a+b+c);
}
function calcul_numerique_0504() {
    const a=(2*randint(0,1)-1)*randint(1,15), b=(2*randint(0,1)-1)*randint(1,15), c=(2*randint(0,1)-1)*randint(1,15);
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}-(${normaliser(b,'',true)}${normaliser(c,'',false)})\\)`, a-b-c);
}
function calcul_numerique_0505() { return calcul_numerique_0502(); }
function calcul_numerique_0506() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}${normaliser(b,'',false)}${normaliser(c,'',false)}${normaliser(d,'',false)}\\)`, a+b+c+d);
}
function calcul_numerique_0507() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=(${normaliser(a,'',true)}${normaliser(b,'',false)})+(${normaliser(c,'',true)}${normaliser(d,'',false)})\\)`, a+b+c+d);
}
function calcul_numerique_0508() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=(${normaliser(a,'',true)}${normaliser(b,'',false)})-(${normaliser(c,'',true)}${normaliser(d,'',false)})\\)`, a+b-c-d);
}
function calcul_numerique_0509() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}+(${normaliser(b,'',true)}${normaliser(c,'',false)}${normaliser(d,'',false)})\\)`, a+b+c+d);
}
function calcul_numerique_0510() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15),(2*randint(0,1)-1)*randint(1,15)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}-(${normaliser(b,'',true)}${normaliser(c,'',false)}${normaliser(d,'',false)})\\)`, a-b-c-d);
}
function calcul_numerique_0511() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}+(${normaliser(b,'',true)}+(${normaliser(c,'',true)}${normaliser(d,'',false)}))\\)`, a+b+c+d);
}
function calcul_numerique_0512() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}+(${normaliser(b,'',true)}-(${normaliser(c,'',true)}${normaliser(d,'',false)}))\\)`, a+b-c-d);
}
function calcul_numerique_0513() {
    const [a,b,c,d]=[(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10),(2*randint(0,1)-1)*randint(1,10)];
    const L=choix(["A","B","C","D","E"]);
    return _calcNumOuvert(`Calculer \\(${L}=${normaliser(a,'',true)}-(${normaliser(b,'',true)}-(${normaliser(c,'',true)}${normaliser(d,'',false)}))\\)`, a-b+c+d);
}

// ============================================================
//  Fractions (collège)
// ============================================================
function calcul_fractionnaire_0601() {
    const c=randint(2,12);
    const a=(2*randint(0,1)-1)*randint(1,c-1), b=(2*randint(0,1)-1)*randint(1,c-1);
    const R1=normaliserFraction(a+b,c);
    return [7,`Calculer \\(\\frac{${a}}{${c}}+\\frac{${b}}{${c}}\\)`,`\\(${R1}\\)<br><br>\n`,"","","",null,null,null,null,null,"sans",0];
}
function calcul_fractionnaire_0602() {
    const c=randint(2,10), k=randint(2,4);
    const a=(2*randint(0,1)-1)*randint(1,c-1), b=(2*randint(0,1)-1)*randint(1,c*k-1);
    const R1=normaliserFraction(a*k+b,c*k);
    return [7,`Calculer \\(\\frac{${a}}{${c}}+\\frac{${b}}{${c*k}}\\)`,`\\(${R1}\\)<br><br>\n`,"","","",null,null,null,null,null,"sans",0];
}
function calcul_fractionnaire_0603() {
    const a=(2*randint(0,1)-1)*randint(1,9), b=(2*randint(0,1)-1)*randint(1,9);
    const c=randint(2,9), d=randint(2,9);
    const R1=normaliserFraction(a*b,c*d);
    return [7,`Calculer \\(\\frac{${a}}{${c}}\\times\\frac{${b}}{${d}}\\)`,`\\(${R1}\\)<br><br>\n`,"","","",null,null,null,null,null,"sans",0];
}

// ============================================================
//  Première Spécialité
// ============================================================
function calcul_numerique_2001() {
    const dbl=[3,5,7,9,11,13], tri=[2,5,7,9,11,13];
    const choix_cm=randint(0,1), cm=choix_cm===0?2:3;
    const un_nombre=choix_cm===0?choix(dbl):choix(tri);
    const questions=[`L'inverse du double de ${un_nombre} est :`,`L'inverse du triple de ${un_nombre} est :`];
    const q=questions[choix_cm];
    const R1=`\\(\\frac{1}{${un_nombre*cm}}\\)`;
    const R2=`\\(\\frac{${cm}}{${un_nombre}}\\)`;
    const R3=`\\(\\frac{${un_nombre}}{${cm}}\\)`;
    const R4=`\\(${un_nombre*cm}\\)`;
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [1,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function calcul_numerique_2002() {
    const lets=["F","G","H"]; const lm=choix(lets);
    const den_a=randint(2,9), b=randint(2,9), c=(1-2*randint(0,1))*randint(2,9);
    const num_d=1-2*randint(0,1), den_d=Math.abs(c);
    const q=`On considère la relation ${lm}\\(=a+\\frac{b}{cd}\\).<br>\nLorsque \\(a=\\frac{1}{${den_a}}\\) , \\(b=${b}\\) , \\(c=${c}\\) et \\(d=\\frac{${num_d}}{${den_d}}\\) , la valeur de ${lm} est égale à :`;
    const cd=Math.round(num_d*c/den_d);
    const res_num=1+den_a*b*cd;
    let [rn,rd]=simplifierPetiteFraction(res_num,den_a);
    const R1=rd===1?`\\(${rn}\\)`:`\\(\\frac{${rn}}{${rd}}\\)`;
    const faux=1-den_a*b*cd;
    let [fn,fd]=simplifierPetiteFraction(Math.abs(faux),den_a);
    const sign=faux<0?"-":"";
    const R2=`\\(\\frac{${fn}}{${fd}}\\)`;
    const R3=rd===1?`\\(${-rn}\\)`:`\\(-\\frac{${rn}}{${rd}}\\)`;
    const R4=`\\(\\frac{${fn+1}}{${fd}}\\)`;
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [1,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function proportionnalite_2101() {
    const pb=10*randint(1,9), ph=10*randint(1,9);
    const mots_b=["baisse","diminution","réduction"], mots_h=["hausse","augmentation"];
    const mb=choix(mots_b), mh=choix(mots_h);
    const CMb=100-pb, CMh=100+ph;
    const bon=(CMb*CMh)/100-100;
    const faux1=ph-pb, faux2=((100+pb)*(100-ph))/100-100, faux3=(CMb*CMh)/100;
    function texte(v) { return v>0?`une augmentation de ${v} %`:v<0?`une diminution de ${-v} %`:"ne rien faire"; }
    let p1=pb,p2=ph,m1=mb,m2=mh;
    if (randint(0,1)===1) { [p1,p2,m1,m2]=[ph,pb,mh,mb]; }
    const q=`Une ${m1} de ${p1} % suivie d'une ${m2} de ${p2} % équivaut à :`;
    const R1=texte(bon), R2=texte(faux1), R3=texte(faux2), R4=texte(faux3);
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function proportionnalite_2102() {
    const n=randint(1,99);
    const CM="0,"+(1000-n);
    const R1=`une baisse de ${mettreVirgule1(n)} %`;
    const R2=`une hausse de ${mettreVirgule1(n)} %`;
    const R3=`une baisse de ${n} %`;
    const R4=`une hausse de ${n} %`;
    const q=`Multiplier une quantité par \\(${CM}\\) revient à :`;
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}

// Second degré
function _secondDegSVG() {
    const L=400, H=400, ang=0;
    const v=choix([2,3,5,7,10,11,13]);
    let svg=creationFenetreSVG(H,L)+creationRepere(H,L,ang,"noire");
    svg+=placerPoint(0,v,L,H,ang,"noire",String(v));
    svg+=dessinerFonction(fonctionTrinome(0.2,0,0,-5,5),ang,L,H,"noire");
    svg+=placerTexte("x",4.6,-0.5,L,H,ang,"noire",70,"italic");
    svg+=placerTexte("y",-0.5,4.6,L,H,ang,"noire",70,"italic");
    svg+=FIN_SVG;
    return [svg, String(v)];
}
function second_degre_2201() {
    const [svg, nb]=_secondDegSVG();
    const nature=choix(["strict","large"]);
    const sym=nature==="large"?"\\geq":"\\gt";
    const q=`On a représenté ci-contre la parabole d'équation \\(y=x^2\\).<br>On note \\((I)\\) l'inéquation, sur \\(\\mathbb{R}\\) , \\(x^2${sym}{${nb}}\\).<br>L'ensemble des solutions \\(S\\) de cette inéquation est :`;
    const [r1,r2,r3,r4]=nature==="large"?[
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{[}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{]}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}} \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ -\\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ]:[
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ -\\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ];
    const [reps,br]=melangeDesReponses(r1,r2,r3,r4);
    return [2,q,reps[0],reps[1],reps[2],reps[3],svg,null,null,null,null,"sans",br];
}
function second_degre_2202() {
    const [svg,nb]=_secondDegSVG();
    const nature=choix(["strict","large"]);
    const sym=nature==="large"?"\\leq":"\\lt";
    const q=`On a représenté ci-contre la parabole d'équation \\(y=x^2\\).<br>On note \\((I)\\) l'inéquation, sur \\(\\mathbb{R}\\) , \\(x^2${sym}{${nb}}\\).<br>L'ensemble des solutions \\(S\\) de cette inéquation est :`;
    const [r1,r2,r3,r4]=nature==="large"?[
        `\\(S= \\mathopen{[}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{]}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}} \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ \\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ]:[
        `\\(S= \\mathopen{]}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ \\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ];
    const [reps,br]=melangeDesReponses(r1,r2,r3,r4);
    return [2,q,reps[0],reps[1],reps[2],reps[3],svg,null,null,null,null,"sans",br];
}
function second_degre_2203() { return second_degre_2201(); }
function second_degre_2204() { return second_degre_2202(); }
function second_degre_2205() { return second_degre_2201(); }
function second_degre_2206() {
    const nb=String(choix([2,3,5,7,10,11,13]));
    const nature=choix(["strict","large"]);
    const sym=nature==="large"?"\\geq":"\\gt";
    const q=`On note \\((I)\\) l'inéquation, sur \\(\\mathbb{R}\\) , \\(x^2${sym}{${nb}}\\).<br>L'ensemble des solutions \\(S\\) de cette inéquation est :`;
    const [r1,r2,r3,r4]=nature==="large"?[
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{[}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{]}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}} \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ \\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ]:[
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ \\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ];
    const [reps,br]=melangeDesReponses(r1,r2,r3,r4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function second_degre_2207() {
    const nb=String(choix([2,3,5,7,10,11,13]));
    const nature=choix(["strict","large"]);
    const sym=nature==="large"?"\\leq":"\\lt";
    const q=`On note \\((I)\\) l'inéquation, sur \\(\\mathbb{R}\\) , \\(x^2${sym}{${nb}}\\).<br>L'ensemble des solutions \\(S\\) de cette inéquation est :`;
    const [r1,r2,r3,r4]=nature==="large"?[
        `\\(S= \\mathopen{[}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{]}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}} \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ \\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ]:[
        `\\(S= \\mathopen{]}-\\sqrt{${nb}}; \\sqrt{${nb}}\\; \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{[} \\cup \\mathopen{]} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S= \\mathopen{]} - \\infty ; -\\sqrt{${nb}}\\; \\mathclose{]} \\cup \\mathopen{[} \\sqrt{${nb}} ; +\\infty \\mathclose{[}\\)`,
        `\\(S=\\left\\{ \\sqrt{${nb}} ; \\sqrt{${nb}} \\right\\}\\)`
    ];
    const [reps,br]=melangeDesReponses(r1,r2,r3,r4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function calcul_litteral_2301() {
    const pool=["a","b","c","d","u","v","x","y","z"];
    const l1=choix(pool);
    const pool2=pool.filter(x=>x!==l1); const l2=choix(pool2);
    const pool3=pool2.filter(x=>x!==l2); const l3=choix(pool3);
    const q=`On considère \\(${l1} , ${l2} , ${l3}\\) des réels non nuls tels que : \\(\\frac{1}{${l1}} + \\frac{1}{${l2}} = \\frac{1}{${l3}} \\) .`;
    const R1=`\\(${l3}= \\frac{${l1}${l2}}{${l1}+${l2}}\\)`;
    const R2=`\\(${l3}= \\frac{1}{${l1}${l2}}\\)`;
    const R3=`\\(${l3}= ${l1}${l2}(${l1}+${l2})\\)`;
    const R4=`\\(${l3}= ${l1}+${l2}\\)`;
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function fonctions_affines_2401() {
    const a=(2*randint(0,1)-1)*randint(1,5), b=(2*randint(0,1)-1)*randint(1,10);
    const ang=0, L=400, H=400;
    let svg=creationFenetreSVG(H,L)+quadrillage(ang,L,H)+creationRepere(H,L,ang,"noire");
    // tracer la droite
    const tanA=0;
    const pts=[];
    for(let xi=-5;xi<=5;xi+=0.5) { pts.push([xi, a*xi+b]); }
    svg+=dessinerFonction(pts.filter(([x,y])=>y>=-5&&y<=5),ang,L,H,"rouge",3);
    svg+=placerTexte("x",4.6,-0.5,L,H,ang,"noire",70,"italic");
    svg+=placerTexte("y",-0.5,4.6,L,H,ang,"noire",70,"italic");
    svg+=FIN_SVG;
    // QCM : quelle est la formule ?
    const a2=(a===1)?a+1:(a===-1)?a-1:a+choix([-2,-1,1,2]);
    const b2=b+choix([-2,-1,1,2]);
    const R1=`\\(f(x)=${normaliser(a,'x',true)}${normaliser(b,'',false)}\\)`;
    const R2=`\\(f(x)=${normaliser(a2,'x',true)}${normaliser(b,'',false)}\\)`;
    const R3=`\\(f(x)=${normaliser(a,'x',true)}${normaliser(b2,'',false)}\\)`;
    const R4=`\\(f(x)=${normaliser(a2,'x',true)}${normaliser(b2,'',false)}\\)`;
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [2,"Identifier l'équation de la droite représentée ci-contre :",reps[0],reps[1],reps[2],reps[3],svg,null,null,null,null,"sans",br];
}
function probabilite_2501() {
    // tableau de probabilité à compléter
    const n=randint(3,5);
    const vals=[]; let s=0;
    for(let i=0;i<n-1;i++){const p=randint(1,Math.floor(10/(n)))/10; vals.push(p); s+=p;}
    vals.push(Math.round((1-s)*10)/10);
    const manquant=randint(0,n-1);
    const R1=`\\(${vals[manquant]}\\)`;
    const R2=`\\(${Math.round((vals[manquant]+0.1)*10)/10}\\)`;
    const R3=`\\(${Math.max(0,Math.round((vals[manquant]-0.1)*10)/10)}\\)`;
    const R4=`\\(${Math.round((1-vals[manquant])*10)/10}\\)`;
    let qText="Dans un tableau de probabilité, les probabilités sont : ";
    for(let i=0;i<n;i++) { qText += i===manquant?"? , ":`${vals[i]} , `; }
    qText+="et leur somme vaut 1. La probabilité manquante est :";
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [1,qText,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function calcul_algebrique_2701() {
    let a,b,c,d,cx,tc;
    do {
        a=randint(1,5); b=randint(2,8); c=randint(2,9); d=randint(1,9);
        if(b===1) continue;
        cx=a-b*c; tc=-b*d;
    } while(cx===0||tc===0);
    const q=`Soit \\(x\\) un réel non nul. À quelle expression est égale \\(\\dfrac{${a}}{${b}}-\\dfrac{${c}x+${d}}{x}\\) ?`;
    function fmt(coefX,cst,den) {
        const num=coefX>=0&&cst>=0?`${coefX}x+${cst}`:coefX>=0&&cst<0?`${coefX}x${cst}`:coefX<0&&cst>=0?`${coefX}x+${cst}`:`${coefX}x${cst}`;
        return `\\(\\dfrac{${num}}{${den}}\\)`;
    }
    const R1=fmt(cx,tc,b+"x");
    const R2=fmt(cx,-tc,b+"x");
    const R3=fmt(-cx,tc,b+"x");
    const R4=fmt(a-c,-d,b+"x");
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}

// ============================================================
//  Première Technologique
// ============================================================
function calcul_numerique_3001() {
    const A=[3,5,7,11];
    const a=choix(A), B=A.filter(x=>x!==a), b=choix(B);
    const lets=["A","B","C","D","E","F"]; const lm=choix(lets);
    const choixQ=randint(0,1);
    const questions=[
        `On considère ${lm} \\(=\\frac{${a}}{1+\\frac{${a}}{${b}}}\\). On a :`,
        `On considère ${lm} \\(=\\frac{${a}}{1-\\frac{${a}}{${b}}}\\). On a :`
    ];
    const q=questions[choixQ];
    let R1,R2,R3,R4;
    if(choixQ===0) {
        let [rn,rd]=simplifierPetiteFraction(a*b,a+b);
        R1=`\\(\\frac{${rn}}{${rd}}\\)`;
        R2=`\\(\\frac{${rd}}{${rn}}\\)`;
        R3=`\\(${a*b}\\)`;
        R4=`\\(${a+b}\\)`;
    } else {
        let [rn,rd]=simplifierPetiteFraction(a*b,b-a);
        let [fn,fd]=simplifierPetiteFraction(a*b,a-b);
        R1=`\\(\\frac{${rn}}{${rd}}\\)`;
        R2=`\\(\\frac{${rd}}{${rn}}\\)`;
        R3=`\\(${a*b}\\)`;
        R4=`\\(\\frac{${fn}}{${fd}}\\)`;
    }
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [1,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function proportionnalite_3101() {
    const c=randint(2,9)*100, p=10*choix([2,3,4,6,7,8,9]);
    const bon=c+c*p/100, f1=c+p, f2=(randint(2,9)-1)*100+p, f3=c+100;
    const [reps,br]=melangeDesReponses(`${bon} euros`,`${f1} euros`,`${f2} euros`,`${f3} euros`);
    return [1,`Un article coûte ${c} euros. Le prix augmente de ${p} %. Le nouveau prix est :`,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function proportionnalite_3102() {
    const c=randint(2,9)*100, p=10*choix([2,3,4,6,7,8,9]);
    const bon=c-c*p/100, f1=c-p, f2=(randint(2,9)-1)*100+p, f3=c-100;
    const [reps,br]=melangeDesReponses(`${bon} euros`,`${f1} euros`,`${f2} euros`,`${f3} euros`);
    return [1,`Un article coûte ${c} euros. Le prix baisse de ${p} %. Le nouveau prix est :`,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function proportionnalite_3103() {
    const c=randint(2,9)*100, p=10*choix([2,3,4,6,7,8,9]);
    const nc=c+c*p/100;
    const bon=p, f1=nc-c, f2=nc/c*100-100+10, f3=p+10;
    const [reps,br]=melangeDesReponses(`${bon} %`,`${f1} %`,`${f2.toFixed(0)} %`,`${f3} %`);
    return [1,`Un article coûtait ${c} euros, il coûte maintenant ${nc} euros. Le pourcentage d'augmentation est :`,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}

// Puissances (versions simplifiées)
function _puissance_base(q,R1,R2,R3,R4) {
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [3,q,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function puissances_3201() {
    const u=choix(["m","g","L","s"]);
    const mantisse=choix([1.5,2.0,2.5,3.0,3.5,4.0,5.0]);
    const expo=randint(2,8);
    const q=randint(2,9);
    const bon=(q*mantisse*Math.pow(10,expo)).toFixed(3).replace(/\.?0+$/,"").replace(".",",");
    const f1=(q*mantisse*Math.pow(10,expo-1)).toFixed(3).replace(/\.?0+$/,"").replace(".",",");
    const f2=(q*mantisse*Math.pow(10,expo+1)).toFixed(3).replace(/\.?0+$/,"").replace(".",",");
    return _puissance_base(
        `On donne une longueur de \\(${mantisse}\\times 10^{${expo}}\\) ${u}. La longueur de ${q} de ces objets est :`,
        `${bon} ${u}`, `${f1} ${u}`, `${f2} ${u}`, `${bon} m${u}`
    );
}
function puissances_3202() {
    const n=randint(2,6), p=randint(2,5);
    const q=`\\(10^{${n}}\\times 10^{${p}}\\) est égal à :`;
    return _puissance_base(q,`\\(10^{${n+p}}\\)`,`\\(10^{${n*p}}\\)`,`\\(10^{${n-p}}\\)`,`\\(10^{${n+p+1}}\\)`);
}
function puissances_3203() {
    const b=randint(2,5), k=randint(2,4), a=b*k;
    const n=randint(3,5), p=randint(2,3);
    const exp_b=n-p, kn=Math.pow(k,n);
    let R1; if(exp_b===0) R1=`\\(N=${kn}\\)`; else if(exp_b===1) R1=`\\(N=${kn}\\times ${b}\\)`; else R1=`\\(N=${kn}\\times ${b}^{${exp_b}}\\)`;
    return _puissance_base(`On considère le nombre \\(N=\\dfrac{${a}^{${n}}}{${b}^{${p}}}\\). On a :`,R1,`\\(N=\\dfrac{1}{${a}^{${n-p}}}\\)`,`\\(N=${Math.floor(Math.pow(a,n)/Math.pow(b,p))-randint(10,50)}\\)`,`\\(N=${k}^{${n}}\\)`);
}
function puissances_3204() { return puissances_3202(); }
function puissances_3205() { return puissances_3203(); }
function puissances_3206() { return puissances_3202(); }
function puissances_3207() { return puissances_3203(); }
function puissances_3208() { return puissances_3202(); }
function puissances_3209() { return puissances_3203(); }
function puissances_3210() { return puissances_3202(); }
function puissances_3211() { return puissances_3203(); }
function puissances_3212() { return puissances_3202(); }
function puissances_3213() { return puissances_3203(); }

// Diagrammes
function diagramme_3501() {
    const vmin=randint(1,3)*10, vmax=randint(8,11)*10;
    const n=randint(4,5);
    const vals=[vmin];
    for(let i=1;i<n-1;i++) vals.push(randint(vmin+10,vmax-10));
    vals.push(vmax);
    // shuffle
    for(let i=vals.length-1;i>0;i--) { const j=randint(0,i); [vals[i],vals[j]]=[vals[j],vals[i]]; }
    const labels=["Jan","Fév","Mar","Avr","Mai","Jun"].slice(0,n);
    const vraieMin=Math.min(...vals), vraiMax=Math.max(...vals);
    const idxMin=vals.indexOf(vraieMin), idxMax=vals.indexOf(vraiMax);
    const choixQ=randint(0,1);
    const q=choixQ===0?`D'après le diagramme ci-contre, quel mois a la valeur la plus petite ?`:`D'après le diagramme ci-contre, quel mois a la valeur la plus grande ?`;
    const bonne=choixQ===0?labels[idxMin]:labels[idxMax];
    const autres=labels.filter(l=>l!==bonne);
    const [reps,br]=melangeDesReponses(bonne,autres[0],autres[1],autres[2]||autres[0]);
    // génération d'un SVG simple de diagramme en barres
    const W=400,H=300,marg=40;
    const bw=Math.floor((W-2*marg)/(n+1));
    const scale=(H-2*marg)/vraiMax;
    let svg=`<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px;height:auto;">`;
    // barres
    vals.forEach((v,i) => {
        const x=marg+(i+0.5)*bw, bh=v*scale, y=H-marg-bh;
        svg+=`<rect x="${x-bw/3}" y="${y}" width="${bw*0.6}" height="${bh}" fill="rgb(100,149,237)" stroke="white"/>`;
        svg+=`<text x="${x}" y="${H-marg+14}" text-anchor="middle" font-size="12">${labels[i]}</text>`;
        svg+=`<text x="${x}" y="${y-3}" text-anchor="middle" font-size="10">${v}</text>`;
    });
    // axe bas
    svg+=`<line x1="${marg}" y1="${H-marg}" x2="${W-marg}" y2="${H-marg}" stroke="black" stroke-width="2"/>`;
    svg+=`</svg>`;
    return [8,q,reps[0],reps[1],reps[2],reps[3],svg,null,null,null,null,"sans",br];
}
function diagramme_3502() { return diagramme_3501(); }
function diagramme_3503() { return diagramme_3501(); }

function calcul_fractionnaire_3601() {
    const a=randint(1,9), b=randint(2,9), c=randint(1,9), d=randint(2,9);
    let [rn,rd]=simplifierFraction(a*d+b*c,b*d);
    const R1=rd===1?`\\(${rn}\\)`:`\\(\\frac{${rn}}{${rd}}\\)`;
    const R2=`\\(\\frac{${a+c}}{${b+d}}\\)`;
    const R3=`\\(\\frac{${a*c}}{${b*d}}\\)`;
    const R4=rd===1?`\\(${rn+1}\\)`:`\\(\\frac{${rn+1}}{${rd}}\\)`;
    const [reps,br]=melangeDesReponses(R1,R2,R3,R4);
    return [1,`Calculer \\(\\frac{${a}}{${b}}+\\frac{${c}}{${d}}\\)`,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}

// ============================================================
//  Première Spécifique
// ============================================================
function pourcentage_4001() {
    const total=randint(2,9)*100, p=10*choix([1,2,3,4,5,6,7,8,9]);
    const bon=total*p/100;
    const [reps,br]=melangeDesReponses(`${bon}`,`${bon+p}`,`${Math.abs(bon-10)}`,`${bon*2}`);
    return [1,`Calculer ${p} % de ${total}.`,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}
function fractions_4002() {
    const a=randint(1,9), b=randint(2,9), c=randint(1,9), d=randint(2,9);
    const val_a=a/b, val_b=c/d;
    const [r,s]=val_a>val_b?[`\\frac{${a}}{${b}}`,`\\frac{${c}}{${d}}`]:[`\\frac{${c}}{${d}}`,`\\frac{${a}}{${b}}`];
    const [reps,br]=melangeDesReponses(`\\(${r} > ${s}\\)`,`\\(${r} < ${s}\\)`,`\\(${r} = ${s}\\)`,`\\(${r} \\geq ${s}\\)`);
    return [1,`Comparer \\(\\frac{${a}}{${b}}\\) et \\(\\frac{${c}}{${d}}\\).`,reps[0],reps[1],reps[2],reps[3],null,null,null,null,null,"sans",br];
}

// ============================================================
//  DISPATCH — creation_de_liste_a_traiter
// ============================================================
function creationListeATraiter(numero) {
    const map = {
        1:calcul_litteral_0001, 2:calcul_litteral_0002, 3:calcul_litteral_0003,
        4:calcul_litteral_0004, 5:calcul_litteral_0005, 6:calcul_litteral_0006,
        7:calcul_litteral_0007, 8:calcul_litteral_0008, 9:calcul_litteral_0009,
        10:calcul_litteral_0010, 11:calcul_litteral_0011, 12:calcul_litteral_0012,
        13:calcul_litteral_0013, 14:calcul_litteral_0014, 15:calcul_litteral_0015,
        16:calcul_litteral_0016, 17:calcul_litteral_0017, 18:calcul_litteral_0018,
        19:calcul_litteral_0019, 20:calcul_litteral_0020, 21:calcul_litteral_0021,
        22:calcul_litteral_0022, 23:calcul_litteral_0023, 24:calcul_litteral_0024,
        25:calcul_litteral_0025, 26:calcul_litteral_0026, 27:calcul_litteral_0027,
        60:calcul_litteral_0060, 61:calcul_litteral_0061, 62:calcul_litteral_0062,
        63:calcul_litteral_0063, 64:calcul_litteral_0064, 65:calcul_litteral_0065,
        66:calcul_litteral_0066, 67:calcul_litteral_0067,
        70:calcul_litteral_0070, 71:calcul_litteral_0071, 72:calcul_litteral_0072,
        73:calcul_litteral_0073, 74:calcul_litteral_0074, 75:calcul_litteral_0075,
        76:calcul_litteral_0076, 77:calcul_litteral_0077, 78:calcul_litteral_0078,
        79:calcul_litteral_0079, 80:calcul_litteral_0080, 81:calcul_litteral_0081,
        82:calcul_litteral_0082, 83:calcul_litteral_0083, 84:calcul_litteral_0084,
        85:calcul_litteral_0085, 86:calcul_litteral_0086,
        90:calcul_litteral_0090, 91:calcul_litteral_0091, 92:calcul_litteral_0092,
        93:calcul_litteral_0093, 94:calcul_litteral_0094, 95:calcul_litteral_0095,
        96:calcul_litteral_0096, 97:calcul_litteral_0097, 98:calcul_litteral_0098,
        99:calcul_litteral_0099,
        100:calcul_litteral_0100, 101:calcul_litteral_0101, 102:calcul_litteral_0102,
        103:calcul_litteral_0103, 104:calcul_litteral_0104,
        301:calcul_litteral_0301, 302:calcul_litteral_0302, 303:calcul_litteral_0303,
        304:calcul_litteral_0304, 305:calcul_litteral_0305, 306:calcul_litteral_0306,
        307:calcul_litteral_0307, 308:calcul_litteral_0308, 309:calcul_litteral_0309,
        401:derivation_0401, 402:derivation_0402, 403:derivation_0403,
        404:derivation_0404, 405:derivation_0405, 406:derivation_0406,
        407:derivation_0407, 408:derivation_0408, 409:derivation_0409,
        410:derivation_0410, 411:derivation_0411, 412:derivation_0412,
        413:derivation_0413, 414:derivation_0414,
        501:calcul_numerique_0501, 502:calcul_numerique_0502, 503:calcul_numerique_0503,
        504:calcul_numerique_0504, 505:calcul_numerique_0505, 506:calcul_numerique_0506,
        507:calcul_numerique_0507, 508:calcul_numerique_0508, 509:calcul_numerique_0509,
        510:calcul_numerique_0510, 511:calcul_numerique_0511, 512:calcul_numerique_0512,
        513:calcul_numerique_0513,
        601:calcul_fractionnaire_0601, 602:calcul_fractionnaire_0602, 603:calcul_fractionnaire_0603,
        2001:calcul_numerique_2001, 2002:calcul_numerique_2002,
        2101:proportionnalite_2101, 2102:proportionnalite_2102,
        2201:second_degre_2201, 2202:second_degre_2202, 2203:second_degre_2203,
        2204:second_degre_2204, 2205:second_degre_2205, 2206:second_degre_2206,
        2207:second_degre_2207,
        2301:calcul_litteral_2301, 2401:fonctions_affines_2401, 2501:probabilite_2501,
        2701:calcul_algebrique_2701,
        3001:calcul_numerique_3001,
        3101:proportionnalite_3101, 3102:proportionnalite_3102, 3103:proportionnalite_3103,
        3201:puissances_3201, 3202:puissances_3202, 3203:puissances_3203,
        3204:puissances_3204, 3205:puissances_3205, 3206:puissances_3206,
        3207:puissances_3207, 3208:puissances_3208, 3209:puissances_3209,
        3210:puissances_3210, 3211:puissances_3211, 3212:puissances_3212,
        3213:puissances_3213,
        3501:diagramme_3501, 3502:diagramme_3502, 3503:diagramme_3503,
        3601:calcul_fractionnaire_3601,
        4001:pourcentage_4001, 4002:fractions_4002,
    };
    const fn = map[numero];
    if (!fn) { console.warn("Numéro inconnu :", numero); return null; }
    return fn();
}

function creationListeDeListes(numeros) {
    return numeros.map(n => creationListeATraiter(n)).filter(x => x !== null);
}
