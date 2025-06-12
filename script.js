const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const barra = document.querySelector('.barra');
const entropiaTexto = document.querySelector('.entropia');
const temaToggleBtn = document.getElementById('tema-toggle');
const body = document.body;

let tamanhoSenha = 12;
const minTamanho = 4;
const maxTamanho = 32;

const caracteres = {
  maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  numeros: '0123456789',
  simbolos: '!@%*?'
};

function gerarSenha() {
  let caracteresSelecionados = '';
  if (checkboxes[0].checked) caracteresSelecionados += caracteres.maiusculas;
  if (checkboxes[1].checked) caracteresSelecionados += caracteres.minusculas;
  if (checkboxes[2].checked) caracteresSelecionados += caracteres.numeros;
  if (checkboxes[3].checked) caracteresSelecionados += caracteres.simbolos;

  if (!caracteresSelecionados) {
    campoSenha.value = 'Selecione ao menos uma opção';
    atualizarBarra(0);
    atualizarEntropia(0);
    return;
  }

  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    senha += caracteresSelecionados.charAt(Math.floor(Math.random() * caracteresSelecionados.length));
  }

  campoSenha.style.opacity = 0;
  setTimeout(() => {
    campoSenha.value = senha;
    campoSenha.style.opacity = 1;
  }, 300);

  const entropia = calcularEntropia(tamanhoSenha, caracteresSelecionados.length);
  atualizarBarra(entropia);
  atualizarEntropia(entropia);
}

function calcularEntropia(tamanho, base) {
  return tamanho * Math.log2(base);
}

function atualizarBarra(entropia) {
  if (entropia === 0) {
    forcaSenha.style.width = '0%';
    forcaSenha.className = 'forca';
    return;
  }
  if (entropia < 28) {
    forcaSenha.style.width = '25%';
    forcaSenha.className = 'forca fraca';
  } else if (entropia < 56) {
    forcaSenha.style.width = '50%';
    forcaSenha.className = 'forca media';
  } else {
    forcaSenha.style.width = '100%';
    forcaSenha.className = 'forca forte';
  }
}

function atualizarEntropia(entropia) {
  if (entropia === 0) {
    entropiaTexto.textContent = 'Selecione ao menos uma opção para gerar a senha.';
    return;
  }

  const dias = Math.round(Math.pow(2, entropia) / (60 * 60 * 24 * 10 ** 9));
  let texto;
  if (dias < 1) texto = 'Senha pode ser descoberta em menos de um dia.';
  else texto = `Um computador pode levar até ${dias.toLocaleString('pt-BR')} dias para descobrir essa senha.`;
  entropiaTexto.textContent = texto;
}

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    if (botao.textContent === '+') {
      if (tamanhoSenha < maxTamanho) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        gerarSenha();
      }
    } else {
      if (tamanhoSenha > minTamanho) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        gerarSenha();
      }
    }
  });
});

checkboxes.forEach(box => {
  box.addEventListener('change', () => {
    gerarSenha();
  });
});

function alternarTema() {
  if (body.classList.contains('tema-claro')) {
    body.classList.remove('tema-claro');
    body.classList.add('tema-escuro');
    temaToggleBtn.textContent = '🌙';
  } else {
    body.classList.remove('tema-escuro');
    body.classList.add('tema-claro');
    temaToggleBtn.textContent = '🌞';
  }
  aplicarFundoPorTema();
}

temaToggleBtn.addEventListener('click', alternarTema);

function aplicarFundoPorTema() {
  if (body.classList.contains('tema-escuro')) {
    body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp2831929.jpg')";
    body.style.backgroundSize = 'cover';
    body.style.backgroundAttachment = 'fixed';
  } else {
    body.style.backgroundImage = "url('https://i.pinimg.com/736x/07/07/8d/07078da2325216eb39a8f26a15d4f1f5.jpg')";
    body.style.backgroundSize = 'cover';
    body.style.backgroundAttachment = 'fixed';
  }
}

// Inicializa
body.classList.add('tema-escuro');
temaToggleBtn.textContent = '🌙';
aplicarFundoPorTema();
numeroSenha.textContent = tamanhoSenha;
gerarSenha();

temaToggle.addEventListener('click', alternarTema);

// Inicializa ao carregar a página
inicializarTema();
