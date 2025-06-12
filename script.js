// Seleciona o botão de toggle do tema
const temaToggle = document.querySelector('.tema-toggle');
const body = document.body;

// Função para aplicar o tema escuro
function aplicarTemaEscuro() {
  body.classList.add('tema-escuro');
  body.classList.remove('tema-claro');
  // Aplica a imagem de fundo do modo escuro
  body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp2831929.jpg')";
}

// Função para aplicar o tema claro
function aplicarTemaClaro() {
  body.classList.add('tema-claro');
  body.classList.remove('tema-escuro');
  // Aplica a imagem de fundo do modo claro
  body.style.backgroundImage = "url('https://i.pinimg.com/736x/07/07/8d/07078da2325216eb39a8f26a15d4f1f5.jpg')";
}

// Função para alternar o tema ao clicar no botão
function alternarTema() {
  if (body.classList.contains('tema-escuro')) {
    aplicarTemaClaro();
    temaToggle.textContent = '☀️'; // ícone de sol para tema claro
    localStorage.setItem('tema', 'claro');
  } else {
    aplicarTemaEscuro();
    temaToggle.textContent = '🌙'; // ícone de lua para tema escuro
    localStorage.setItem('tema', 'escuro');
  }
}

// Inicializa o tema baseado no armazenamento local ou padrão para escuro
function inicializarTema() {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'claro') {
    aplicarTemaClaro();
    temaToggle.textContent = '☀️';
  } else {
    aplicarTemaEscuro();
    temaToggle.textContent = '🌙';
  }
}

// Event listener no botão de tema
temaToggle.addEventListener('click', alternarTema);

// Inicializa ao carregar a página
inicializarTema();
