const players = {
    Tyler: { w: 0, l: 0, league: "NL" },
    Mateo: { w: 0, l: 0, league: "NL" },
    Daniel: { w: 0, l: 0, league: "NL" },
    Alec: { w: 0, l: 0, league: "NL" },

    Donald: { w: 0, l: 0, league: "AL" },
    Xavier: { w: 0, l: 0, league: "AL" },
    Carlos: { w: 0, l: 0, league: "AL" },
    Drunoh: { w: 0, l: 0, league: "AL" }
};

/* =======================
   GAMES (EDIT SCORES HERE ONLY)
======================= */

const games = [

/* ================= WEEK 1 ================= */
{ week: 1, p1: "Mateo", p2: "Alec", s1: 4, s2: 2 },
{ week: 1, p1: "Daniel", p2: "Tyler", s1: 0, s2: 16 },
{ week: 1, p1: "Carlos", p2: "Xavier", s1: 1, s2: 2 },
{ week: 1, p1: "Carlos", p2: "Drunoh", s1: 1, s2: 2 },
{ week: 1, p1: "Drunoh", p2: "Donald", s1: 0, s2: 1 },
{ week: 1, p1: "Donald", p2: "Xavier", s1: 3, s2: 4 },
{ week: 1, p1: "Tyler", p2: "Mateo", s1: 4, s2: 7 },
{ week: 1, p1: "Alec", p2: "Daniel", s1: 6, s2: 0 },

/* ================= WEEK 2 ================= */
{ week: 2, p1: "Mateo", p2: "Donald", s1: 0, s2: 0 },
{ week: 2, p1: "Mateo", p2: "Daniel", s1: 8, s2: 1 },
{ week: 2, p1: "Alec", p2: "Drunoh", s1: 0, s2: 0 },
{ week: 2, p1: "Tyler", p2: "Alec", s1: 3, s2: 4 },
{ week: 2, p1: "Carlos", p2: "Tyler", s1: 1, s2: 0 },
{ week: 2, p1: "Donald", p2: "Carlos", s1: 0, s2: 0 },
{ week: 2, p1: "Xavier", p2: "Drunoh", s1: 3, s2: 2 },
{ week: 2, p1: "Xavier", p2: "Daniel", s1: 19, s2: 4 },

/* ================= WEEK 3 ================= */
{ week: 3, p1: "Alec", p2: "Mateo", s1: 0, s2: 0 },
{ week: 3, p1: "Mateo", p2: "Xavier", s1: 0, s2: 0 },
{ week: 3, p1: "Alec", p2: "Carlos", s1: 0, s2: 0 },
{ week: 3, p1: "Tyler", p2: "Daniel", s1: 0, s2: 0 },
{ week: 3, p1: "Tyler", p2: "Drunoh", s1: 0, s2: 0 },
{ week: 3, p1: "Drunoh", p2: "Carlos", s1: 0, s2: 0 },
{ week: 3, p1: "Xavier", p2: "Donald", s1: 0, s2: 0 },
{ week: 3, p1: "Donald", p2: "Daniel", s1: 0, s2: 0 },

/* ================= WEEK 4 ================= */
{ week: 4, p1: "Mateo", p2: "Carlos", s1: 0, s2: 0 },
{ week: 4, p1: "Mateo", p2: "Drunoh", s1: 0, s2: 0 },
{ week: 4, p1: "Alec", p2: "Xavier", s1: 0, s2: 0 },
{ week: 4, p1: "Alec", p2: "Donald", s1: 0, s2: 0 },
{ week: 4, p1: "Tyler", p2: "Donald", s1: 0, s2: 0 },
{ week: 4, p1: "Tyler", p2: "Xavier", s1: 0, s2: 0 },
{ week: 4, p1: "Daniel", p2: "Carlos", s1: 0, s2: 0 },
{ week: 4, p1: "Daniel", p2: "Drunoh", s1: 0, s2: 0 },

/* ================= WEEK 5 ================= */
{ week: 5, p1: "Mateo", p2: "Tyler", s1: 0, s2: 0 },
{ week: 5, p1: "Daniel", p2: "Mateo", s1: 0, s2: 0 },
{ week: 5, p1: "Alec", p2: "Tyler", s1: 0, s2: 0 },
{ week: 5, p1: "Carlos", p2: "Donald", s1: 0, s2: 0 },
{ week: 5, p1: "Xavier", p2: "Carlos", s1: 0, s2: 0 },
{ week: 5, p1: "Donald", p2: "Drunoh", s1: 0, s2: 0 },
{ week: 5, p1: "Drunoh", p2: "Xavier", s1: 0, s2: 0 },
{ week: 5, p1: "Alec", p2: "Daniel", s1: 0, s2: 0 }

];

/* =======================
   WEEK TOGGLE
======================= */

function toggleWeek(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("active");
}

/* =======================
   STANDINGS
======================= */

function updateStandings() {

    for (let p in players) {
        players[p].w = 0;
        players[p].l = 0;
    }

    for (let g of games) {

        if (!players[g.p1] || !players[g.p2]) continue;

        if (g.s1 > g.s2) {
            players[g.p1].w++;
            players[g.p2].l++;
        } else if (g.s2 > g.s1) {
            players[g.p2].w++;
            players[g.p1].l++;
        }
    }
}

function renderStandings() {

    const nlBody = document.getElementById("nl-body");
    const alBody = document.getElementById("al-body");

    if (!nlBody || !alBody) return;

    nlBody.innerHTML = "";
    alBody.innerHTML = "";

    const nl = Object.entries(players).filter(p => p[1].league === "NL");
    const al = Object.entries(players).filter(p => p[1].league === "AL");

    function draw(list, body) {

        const top = Math.max(...list.map(p => p[1].w));

        list
            .sort((a, b) => b[1].w - a[1].w)
            .forEach(([name, stats], i) => {

                const total = stats.w + stats.l;
                const pct = total ? (stats.w / total).toFixed(3) : ".000";
                const isTop = stats.w === top && top > 0;

                body.innerHTML += `
                    <tr class="${isTop ? 'winner-row' : ''}">
                        <td>${i + 1}</td>
                        <td>${name}</td>
                        <td>${stats.w}</td>
                        <td>${stats.l}</td>
                        <td>${pct}</td>
                    </tr>
                `;
            });
    }

    draw(nl, nlBody);
    draw(al, alBody);
}

/* =======================
   FIXED SCORE LOADER (NO DUPES)
======================= */

function fillScores() {

    const matchDivs = document.querySelectorAll(".match");

    matchDivs.forEach(match => {

        const textEl = match.querySelector("span");
        const scoreBox = match.querySelector(".score-display");

        if (!textEl || !scoreBox) return;

        const text = textEl.innerText;

        const weekContainer = match.closest(".week-content");
        if (!weekContainer) return;

        const weekNum = parseInt(weekContainer.id.replace("w", ""));

        const parts = text.split(/@|vs/).map(p => p.trim());
        if (parts.length !== 2) return;

        const p1 = parts[0];
        const p2 = parts[1];

        const game = games.find(g => {

            if (g.week !== weekNum) return false;

            return (
                (g.p1 === p1 && g.p2 === p2) ||
                (g.p1 === p2 && g.p2 === p1)
            );
        });

        if (game) {
            scoreBox.innerText = `${game.s1} - ${game.s2}`;
        }
    });
}

/* =======================
   INIT
======================= */

updateStandings();
renderStandings();
fillScores();
