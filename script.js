const instrucoes = document.getElementById("instrucoes");
    const jogoDaVelha = document.getElementById("jogo-da-velha");
    const resultado = document.getElementById("resultado");
    const celulas = [];

    let jogador1, jogador2;

    function iniciarJogo() {
        jogador1 = prompt("Nome do jogador 1:");
        jogador2 = prompt("Nome do jogador 2:");

        instrucoes.textContent = `Vez de ${jogador1} jogar.`;

        // Cria as células do jogo
        for (let i = 0; i < 9; i++) {
            const celula = document.createElement("div");
            celula.className = "celula";
            celula.setAttribute("data-index", i);
            celula.addEventListener("click", jogar);
            jogoDaVelha.appendChild(celula);
            celulas.push(celula);
        }
    }

    let jogadorAtual = "X";
    let jogoAcabou = false;

    function jogar(event) {
        if (jogoAcabou) return;

        const index = event.target.getAttribute("data-index");
        const celula = celulas[index];

        if (!celula.textContent) {
            celula.textContent = jogadorAtual;
            verificarVitoria();
            trocarJogador();
            instrucoes.textContent = `Vez de ${jogadorAtual === "X" ? jogador1 : jogador2} jogar.`;
        }
    }

    function verificarVitoria() {
        const linhas = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const linha of linhas) {
            const [a, b, c] = linha;
            if (celulas[a].textContent && celulas[a].textContent === celulas[b].textContent && celulas[a].textContent === celulas[c].textContent) {
                resultado.textContent = `Jogador ${jogadorAtual} venceu!`;
                jogoAcabou = true;
                return;
            }
        }

        if (Array.from(celulas).every(celula => celula.textContent)) {
            resultado.textContent = "O jogo empatou!";
            jogoAcabou = true;
        }
    }

    function trocarJogador() {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    }

    iniciarJogo();