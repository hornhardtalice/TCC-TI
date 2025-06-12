// Abrir e fechar modais
const btnEntrar = document.getElementById('btnEntrar');
const modalLogin = document.getElementById('modalLogin');
const fecharLogin = document.getElementById('fecharLogin');

const btnRegistrar = document.getElementById('btnRegistrar');
const modalRegistro = document.getElementById('modalRegistro');
const fecharRegistro = document.getElementById('fecharRegistro');

btnEntrar.addEventListener('click', e => {
  e.preventDefault();
  modalLogin.style.display = 'block';
});

fecharLogin.addEventListener('click', () => {
  modalLogin.style.display = 'none';
  clearLoginForm();
});

btnRegistrar.addEventListener('click', e => {
  e.preventDefault();
  modalRegistro.style.display = 'block';
});

fecharRegistro.addEventListener('click', () => {
  modalRegistro.style.display = 'none';
  clearRegisterForm();
});

// Fechar modal clicando fora do conteúdo
window.addEventListener('click', e => {
  if (e.target == modalLogin) {
    modalLogin.style.display = 'none';
    clearLoginForm();
  }
  if (e.target == modalRegistro) {
    modalRegistro.style.display = 'none';
    clearRegisterForm();
  }
});

// Funções para limpar mensagens e formulários
function clearLoginForm() {
  document.getElementById('loginForm').reset();
  document.getElementById('loginMessage').textContent = '';
}

function clearRegisterForm() {
  document.getElementById('registroForm').reset();
  document.getElementById('regMessage').textContent = '';
}

// Simulação simples de login
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = loginForm.loginEmail.value.trim();
  const password = loginForm.loginPassword.value.trim();

  if (email === '' || password === '') {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'Preencha todos os campos.';
    return;
  }

  if (email === 'usuario@teste.com' && password === '123456') {
    loginMessage.style.color = 'green';
    loginMessage.textContent = 'Login realizado! Redirecionando...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  } else {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'E-mail ou senha inválidos.';
  }
});

// Simulação simples de registro
const registroForm = document.getElementById('registroForm');
const regMessage = document.getElementById('regMessage');

registroForm.addEventListener('submit', e => {
  e.preventDefault();
  const nome = registroForm.regNome.value.trim();
  const email = registroForm.regEmail.value.trim();
  const password = registroForm.regPassword.value.trim();

  if (nome === '' || email === '' || password === '') {
    regMessage.style.color = 'red';
    regMessage.textContent = 'Preencha todos os campos.';
    return;
  }

  regMessage.style.color = 'green';
  regMessage.textContent = `Usuário ${nome} registrado com sucesso!`;

  setTimeout(() => {
    modalRegistro.style.display = 'none';
    clearRegisterForm();
  }, 1500);
});
