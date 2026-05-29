const BASE_URL = window.location.protocol === 'file:'
  ? 'http://127.0.0.1:8080/projetoP1dsm2sem042026/projetoP2FatecAppOrgFin-main/codigos'
  : window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function cadastrarUsuario() {
  const nome = document.getElementById('signup-nome').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const senha = document.getElementById('signup-senha').value;
  const nascimento = document.getElementById('signup-nascimento').value;
  const ocupacao = document.getElementById('signup-ocupacao').value.trim();

  if (!nome || !email || !senha || !nascimento) {
    alert('Por favor, preencha nome, email, senha e data de nascimento.');
    return;
  }

  fetch(`${BASE_URL}/salvar_usuario.php`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email, senha, nascimento, ocupacao })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Cadastro realizado com sucesso!');
        document.getElementById('signup-form').reset();
        container.classList.remove('right-panel-active');
      } else {
        alert('Erro no cadastro: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao enviar cadastro.');
    });
}

function loginUsuario() {
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;

  if (!email || !senha) {
    alert('Por favor, preencha email e senha.');
    return;
  }

  fetch(`${BASE_URL}/login.php`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('currentUserId', data.user_id);
        localStorage.setItem('currentUserName', data.user_name);
        alert('Login realizado com sucesso!');
        window.location.href = 'home.html';
      } else {
        alert('Erro no login: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao enviar login.');
    });
}

