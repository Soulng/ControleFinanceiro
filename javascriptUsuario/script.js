// ── Menu lateral ──────────────────────────────────────────
const API_BASE = window.location.protocol === 'file:'
    ? 'http://127.0.0.1:8080/projetoP1dsm2sem042026/projetoP2FatecAppOrgFin-main/codigos'
    : window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');

const itemMenu = document.querySelectorAll('.item-menu');

function selectLink() {
    itemMenu.forEach(item => item.classList.remove('ativo'));
    this.classList.add('ativo');
}
itemMenu.forEach(item => item.addEventListener('click', selectLink));

const btnExpandir  = document.querySelector('#bt-exp');
const menuLat      = document.querySelector('.menu-lateral');
const conteudoMain = document.querySelector('.main-content');

btnExpandir.addEventListener('click', function () {
    menuLat.classList.toggle('expandir');
    conteudoMain.classList.toggle('expandir');
});

// ── Carrega dados do usuário autenticado ──────────────────
// REMOVIDO: o envio de ?id= pela URL.
// O PHP agora usa exclusivamente $_SESSION['user_id'].
window.addEventListener('DOMContentLoaded', function () {
    fetch(`${API_BASE}/get_user.php`, {
        method: 'GET',
        credentials: 'same-origin', // envia cookie de sessão
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            if (data.success) {
                document.getElementById('user-nome').textContent       = data.user.nome;
                document.getElementById('user-email').textContent      = data.user.email;
                document.getElementById('user-nascimento').textContent = data.user.data_nascimento;
                document.getElementById('user-idade').textContent      = data.user.idade;
                document.getElementById('user-ocupacao').textContent   = data.user.ocupacao || 'Não informado';
            } else {
                if (data.redirect) {
                    window.location.href = data.redirect;
                    return;
                }
                ['user-nome','user-email','user-nascimento','user-idade','user-ocupacao']
                    .forEach(id => { document.getElementById(id).textContent = 'Não disponível'; });
                console.error('Erro ao carregar dados do usuário:', data.error);
            }
        } catch (e) {
            console.error('JSON parse error:', e, 'response text:', text);
            ['user-nome','user-email','user-nascimento','user-idade','user-ocupacao']
                .forEach(id => { document.getElementById(id).textContent = 'Erro'; });
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        ['user-nome','user-email','user-nascimento','user-idade','user-ocupacao']
            .forEach(id => { document.getElementById(id).textContent = 'Erro'; });
    });
});

// ── Logout ────────────────────────────────────────────────
const btnLogout = document.getElementById('btn-logout');

btnLogout.addEventListener('click', function (e) {
    e.preventDefault();

    fetch(`${API_BASE}/logout.php`, {
        method: 'POST',
        credentials: 'same-origin'
    })
    .then(() => {
        localStorage.removeItem('currentUserName');
        window.location.href = 'index.html';
    })
    .catch(() => {
        localStorage.removeItem('currentUserName');
        window.location.href = 'index.html';
    });
});
