// ── Menu lateral ──────────────────────────────────────────
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

// ── Popup do formulário ───────────────────────────────────
const btnAbrirFormAdd = document.querySelector('.btn-add-gastos');
const btnFecharFormAdd = document.querySelector('.btn-fechar-form');

btnAbrirFormAdd.addEventListener('click', function () {
    document.querySelector('.popup-form-add').style.display = 'flex';
});
btnFecharFormAdd.addEventListener('click', function () {
    document.querySelector('.popup-form-add').style.display = 'none';
});

// ── Exibe nome do usuário (do localStorage — apenas cosmético) ──
const nomeDisplay = document.getElementById('user-nome-display');
if (nomeDisplay) {
    nomeDisplay.textContent = localStorage.getItem('currentUserName') || '';
}

// ── Estado local de transações (cache em memória) ─────────
let transacoes = [];

// ── Formulário de adição ──────────────────────────────────
const formAddReg = document.querySelector('.form-add-mov');

formAddReg.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataReg  = document.getElementById('extrato-data').value;
    const descReg  = document.getElementById('descricao-form').value;
    const categReg = document.getElementById('extrato-categ');
    const tipoReg  = document.getElementById('extrato-tipo');
    const inputValor = document.getElementById('valor-form');

    const valorReg = parseFloat(
        inputValor.value.replace('R$', '').replace(/\s/g, '').replace(',', '.')
    ) || 0;

    if (!dataReg || !descReg || valorReg <= 0) {
        showToast('warn', 'Campos obrigatórios', 'Por favor, preencha todos os campos!');
        return;
    }

    const novoRegistro = {
        codigo:    Date.now(),
        data:      dataReg,
        descricao: descReg,
        categoria: categReg.options[categReg.selectedIndex].text,
        tipo:      tipoReg.options[tipoReg.selectedIndex].text,
        valor:     valorReg
    };

    fetch('salvar_transacao.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoRegistro)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Adiciona ao cache local e re-renderiza sem precisar recarregar do banco
            transacoes.push(novoRegistro);
            renderTable();
            formAddReg.reset();
            document.querySelector('.popup-form-add').style.display = 'none';
            alert('Registro salvo com sucesso!');
        } else {
            if (data.redirect) {
                alert('Sessão expirada. Faça login novamente.');
                window.location.href = data.redirect;
                return;
            }
            alert('Erro no servidor: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    });
});

// ── Renderização da tabela ────────────────────────────────
function renderTable() {
    const tableBody = document.querySelector('.extrato table tbody');
    tableBody.innerHTML = '';

    let currentBalance = 0;

    if (transacoes.length === 0) {
        const emptyRow  = tableBody.insertRow();
        const emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = 8;
        emptyCell.style.textAlign = 'center';
        emptyCell.style.padding   = '2rem';

        const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#97959556" class="bi bi-card-list" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
            </svg>`;

        const imgSrc = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`;

        const emptyContent    = document.createElement('div');
        emptyContent.className = 'empty-state';
        emptyContent.style.cssText = 'display:inline-block;max-width:100%;text-align:center;';

        const emptyImage    = document.createElement('img');
        emptyImage.src      = imgSrc;
        emptyImage.alt      = 'Nenhum registro encontrado';
        emptyImage.style.cssText = 'max-width:220px;width:100%;height:auto;margin-bottom:1rem;';

        const message = document.createElement('p');
        message.textContent = 'Nenhum registro encontrado. Adicione sua primeira transação!';
        message.style.cssText = 'margin:0;color:#666;font-size:0.95rem;';

        emptyContent.appendChild(emptyImage);
        emptyContent.appendChild(message);
        emptyCell.appendChild(emptyContent);

        atualizarSaldo(0);
        return;
    }

    transacoes.forEach(t => {
        const amount  = t.valor;
        // Aceita tanto o formato do banco ('receita'/'despesa')
        // quanto o formato do formulário ('Renda'/'Gasto')
        const tipoRaw = (t.tipo || '').toLowerCase();
        const isGasto = (tipoRaw === 'gasto' || tipoRaw === 'despesa' || tipoRaw === 'option1');

        if (isGasto) {
            currentBalance -= amount;
        } else {
            currentBalance += amount;
        }

        const newRow = tableBody.insertRow();

        newRow.insertCell().textContent = t.codigo;
        newRow.insertCell().textContent = t.data;
        newRow.insertCell().textContent = t.descricao;

        const typeCell = newRow.insertCell();
        typeCell.textContent = t.tipo;
        typeCell.style.color = isGasto ? '#ee2626ff' : '#31c931ff';

        newRow.insertCell().textContent = t.categoria;

        const valorCell     = newRow.insertCell();
        const valorFormatado = amount.toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL', minimumFractionDigits: 2
        }).replace('R$', '');

        valorCell.textContent = isGasto ? `- ${valorFormatado}` : `+ ${valorFormatado}`;
        valorCell.style.color = isGasto ? '#df0a0a' : '#0de40d';

        const balanceCell = newRow.insertCell();
        balanceCell.textContent = currentBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        balanceCell.style.color = currentBalance >= 0 ? '#2A9D8F' : '#E76F51';

        const actionsCell = newRow.insertCell();
        const removeBtn   = document.createElement('button');
        removeBtn.textContent      = 'Remover';
        removeBtn.className        = 'btn-action btn-remove';
        removeBtn.dataset.codeRem  = t.codigo;
        actionsCell.appendChild(removeBtn);
    });

    atualizarSaldo(currentBalance);
}

function atualizarSaldo(valor) {
    const el = document.getElementById('saldo-atual-user');
    if (!el) return;
    el.textContent = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    el.style.color = valor >= 0 ? '#2A9D8F' : '#E76F51';
}

// ── Remoção de registro ───────────────────────────────────
function removeRegistro(codigoParaRemover) {
    fetch('deletar_transacao.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: codigoParaRemover })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            transacoes = transacoes.filter(t => String(t.codigo) !== String(codigoParaRemover));
            renderTable();
            alert('Registro removido com sucesso!');
        } else {
            if (data.redirect) {
                alert('Sessão expirada. Faça login novamente.');
                window.location.href = data.redirect;
                return;
            }
            alert('Erro ao deletar: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor para excluir.');
    });
}

// Delegação de evento na tabela para o botão Remover
document.querySelector('.extrato table tbody').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
        const codigo = e.target.dataset.codeRem;
        if (confirm('Tem certeza que deseja remover este registro permanentemente?')) {
            removeRegistro(codigo);
        }
    }
});

// ── Carregamento inicial do banco (não do localStorage) ───
function loadTransactions() {
    fetch('get_transacoes.php', {
        method: 'GET',
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Normaliza os dados vindos do banco para o formato usado no renderTable
            transacoes = data.transacoes.map(t => ({
                codigo:    t.codigo,
                data:      t.data,
                descricao: t.descricao,
                categoria: t.categoria,
                tipo:      t.tipo,   // 'receita' ou 'despesa'
                valor:     t.valor
            }));
            renderTable();
        } else {
            if (data.redirect) {
                window.location.href = data.redirect;
                return;
            }
            console.error('Erro ao carregar transações:', data.error);
            renderTable(); // renderiza tabela vazia
        }
    })
    .catch(error => {
        console.error('Erro ao conectar:', error);
        renderTable();
    });
}

loadTransactions();

// ── Logout ────────────────────────────────────────────────
const btnLogout = document.getElementById('btn-logout');

btnLogout.addEventListener('click', function (e) {
    e.preventDefault();

    fetch('logout.php', {
        method: 'POST',
        credentials: 'same-origin'
    })
    .then(() => {
        localStorage.removeItem('currentUserName');
        window.location.href = 'index.html';
    })
    .catch(() => {
        // Mesmo com erro de rede, redireciona
        localStorage.removeItem('currentUserName');
        window.location.href = 'index.html';
    });
});
