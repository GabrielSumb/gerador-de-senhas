// Seleciona elementos do DOM
const numeroSenha = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');
const botaoTema = document.querySelector('#botao-tema');
const body = document.body;

let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Funções de incremento e decremento do tamanho da senha
botoes[0].onclick = () => {
    if (tamanhoSenha > 1) tamanhoSenha--;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
};

botoes[1].onclick = () => {
    if (tamanhoSenha < 20) tamanhoSenha++;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
};

checkbox.forEach(c => c.addEventListener('change', geraSenha));

// Gera senha automaticamente na inicialização
geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const index = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[index];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.className = 'forca';

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    const dias = Math.floor((2 ** entropia) / (100e6 * 60 * 60 * 24));
    valorEntropia.textContent = `Um computador pode levar até ${dias} dias para descobrir essa senha.`;
}

// Alterna o tema (claro/escuro)
botaoTema.addEventListener('click', () => {
    if (body.classList.contains('tema-escuro')) {
        body.classList.remove('tema-escuro');
        body.classList.add('tema-claro');
    } else {
        body.classList.remove('tema-claro');
        body.classList.add('tema-escuro');
    }
});
