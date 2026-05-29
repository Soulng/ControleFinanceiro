// função do menu lateral
const API_BASE = window.location.protocol === 'file:'
  ? 'http://127.0.0.1:8080/projetoP1dsm2sem042026/projetoP2FatecAppOrgFin-main/codigos'
  : window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');

const itemMenu = document.querySelectorAll('.item-menu')

function selectLink() {
    itemMenu.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

itemMenu.forEach((item) =>
    item.addEventListener('click', selectLink)
)

const btnExpandir = document.querySelector('#bt-exp')
const menuLat = document.querySelector('.menu-lateral')
const conteudoMain = document.querySelector('.main-content')

btnExpandir.addEventListener('click', function () {
    menuLat.classList.toggle('expandir');
    conteudoMain.classList.toggle('expandir');
})

// Carregar informações do usuário
window.addEventListener('DOMContentLoaded', function() {
    const localUserId = localStorage.getItem('currentUserId');
    const url = localUserId ? `${API_BASE}/get_user.php?id=${localUserId}` : `${API_BASE}/get_user.php`;

    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.success) {
                    document.getElementById('user-nome').textContent = data.user.nome;
                    document.getElementById('user-email').textContent = data.user.email;
                    document.getElementById('user-nascimento').textContent = data.user.data_nascimento;
                    document.getElementById('user-idade').textContent = data.user.idade;
                    document.getElementById('user-ocupacao').textContent = data.user.ocupacao || 'Não informado';
                } else {
                    document.getElementById('user-nome').textContent = 'Não disponível';
                    document.getElementById('user-email').textContent = 'Não disponível';
                    document.getElementById('user-nascimento').textContent = 'Não disponível';
                    document.getElementById('user-idade').textContent = 'Não disponível';
                    document.getElementById('user-ocupacao').textContent = 'Não disponível';
                    console.error('Erro ao carregar dados do usuário:', data.error);
                }
            } catch (e) {
                console.error('JSON parse error:', e, 'response text:', text);
                document.getElementById('user-nome').textContent = 'Erro';
                document.getElementById('user-email').textContent = 'Erro';
                document.getElementById('user-nascimento').textContent = 'Erro';
                document.getElementById('user-idade').textContent = 'Erro';
                document.getElementById('user-ocupacao').textContent = 'Erro';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('user-nome').textContent = 'Erro';
            document.getElementById('user-email').textContent = 'Erro';
            document.getElementById('user-nascimento').textContent = 'Erro';
            document.getElementById('user-idade').textContent = 'Erro';
            document.getElementById('user-ocupacao').textContent = 'Erro';
        });
});



// Seleciona o botão de logout que criamos
const btnLogout = document.getElementById('btn-logout');

btnLogout.addEventListener('click', function(e) {
    e.preventDefault(); // Evita que o link tente navegar sozinho

    // 1. Limpa os dados de identificação do usuário
    localStorage.removeItem('currentUserId');
    
    // 2. Opcional: Se você usa Session no PHP, pode ser necessário 
    // chamar um arquivo 'logout.php' aqui, mas para o seu modelo 
    // de localStorage, apenas remover o ID já resolve.

    // 3. Redireciona para a página de login/index
    alert('Saindo do sistema...');
    window.location.href = 'index.html'; // Ajuste para o nome do seu arquivo de login
});
