// Elementos da página
const numeroSenha = document.querySelector(".parametro-senha_texto");
// Corrigido aqui: trocado de __botao para _botao para coincidir com o HTML
const botoes = document.querySelectorAll(".parametro-senha_botao"); 
const campoSenha = document.querySelector("#campo-senha");
const checkbox = document.querySelectorAll(".checkbox");
const barra = document.querySelector(".forca");

// Configuração inicial
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// Caracteres disponíveis
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*?";

// =========================
// EVENTOS
// =========================

// Botão diminuir
botoes[0].addEventListener("click", diminuirTamanho);

// Botão aumentar
botoes[1].addEventListener("click", aumentarTamanho);

// Atualiza a senha sempre que marcar/desmarcar um checkbox
checkbox.forEach(item => {
    item.addEventListener("change", geraSenha);
});

// =========================
// FUNÇÕES
// =========================

// Diminui tamanho da senha
function diminuirTamanho() {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

// Aumenta tamanho da senha
function aumentarTamanho() {
    if (tamanhoSenha < 32) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

// Gera uma senha aleatória
function geraSenha() {

    let caracteres = "";

    if (checkbox[0].checked) caracteres += letrasMaiusculas;
    if (checkbox[1].checked) caracteres += letrasMinusculas;
    if (checkbox[2].checked) caracteres += numeros;
    if (checkbox[3].checked) caracteres += simbolos;

    // Se nenhuma opção estiver marcada
    if (caracteres.length === 0) {
        campoSenha.value = "Selecione pelo menos uma opção";
        barra.style.width = "0%";
        barra.className = "forca";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    campoSenha.value = senha;

    classificaSenha();
}

// Atualiza a barra de força
function classificaSenha() {

    let pontos = 0;

    // Pontuação pelo tamanho
    if (tamanhoSenha >= 8) pontos++;
    if (tamanhoSenha >= 12) pontos++;
    if (tamanhoSenha >= 16) pontos++;

    // Pontuação pelos tipos de caracteres
    checkbox.forEach(item => {
        if (item.checked) pontos++;
    });

    barra.className = "forca";

    if (pontos <= 3) {
        barra.style.width = "33%";
        barra.classList.add("fraca");
    } else if (pontos <= 5) {
        barra.style.width = "66%";
        barra.classList.add("media");
    } else {
        barra.style.width = "100%";
        barra.classList.add("forte");
    }

}

// Gera a senha inicial ao carregar a página
geraSenha();