const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    const valorEntropia = document.querySelector('.entropia');
    const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    valorEntropia.textContent = `Um computador pode levar até ${dias} dias para descobrir essa senha.`;
}

// Alternância de tema
const botaoTema = document.createElement('button');
botaoTema.classList.add('tema-toggle');
botaoTema.innerHTML = '🌙';
document.body.appendChild(botaoTema);

botaoTema.addEventListener('click', () => {
    if (document.body.classList.contains('tema-escuro')) {
        document.body.classList.remove('tema-escuro');
        document.body.classList.add('tema-claro');
        botaoTema.innerHTML = '🌞';
    } else {
        document.body.classList.remove('tema-claro');
        document.body.classList.add('tema-escuro');
        botaoTema.innerHTML = '🌙';
    }
});

// Tema padrão
document.body.classList.add('tema-escuro');
