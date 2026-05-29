 
 function abrirModalFoto() {
  document.getElementById("modalFoto").style.display = "block";
}

function fecharModalFoto() {
  document.getElementById("modalFoto").style.display = "none";
}

function salvarFotoUsuario() {
  const url = document.getElementById("urlFotoPerfil").value;
  if (url) {
    document.getElementById("fotoUsuario").src = url;
    document.getElementById("fotoUsuario").style.display = "block";
    document.getElementById("fotoPadrao").style.display = "none";
  }
  fecharModalFoto();
}

function removerFotoUsuario() {
  document.getElementById("fotoUsuario").src = "";
  document.getElementById("fotoUsuario").style.display = "none";
  document.getElementById("fotoPadrao").style.display = "flex";
}


    let metas = [];
    // Carregar metas do servidor ao carregar a página
    window.onload = function() {
      carregarMetas();
    };

    function carregarMetas() {
      fetch('get_metas.php')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            metas = data.metas;
            renderizarMetas();
          } else {
            console.error('Erro ao carregar metas:', data.error);
          }
        })
        .catch(error => console.error('Erro:', error));
    }

    function abrirModal() {
      document.getElementById("modal-title").innerText = "Nova Meta";
      document.getElementById("nome").value = "";
      document.getElementById("descricao").value = "";
      document.getElementById("valorTotal").value = "";
      document.getElementById("valorAtual").value = "";
      document.getElementById("iconeURL").value = "";

      document.getElementById("modal").style.display = "block";
    }

    function fecharModal() {
      document.getElementById("modal").style.display = "none";
    }

    function salvarMeta() {
      const nome = document.getElementById("nome").value;
      const descricao = document.getElementById("descricao").value;
      const valorTotal = parseFloat(document.getElementById("valorTotal").value);
      const valorAtual = parseFloat(document.getElementById("valorAtual").value);
      const iconeURL = document.getElementById("iconeURL").value;

      if (!nome || !valorTotal) {
        alert('Nome e valor total são obrigatórios!');
        return;
      }

      const data = { nome, descricao, valorTotal, valorAtual, iconeURL };

      fetch('salvar_meta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fecharModal();
          carregarMetas(); // Recarregar metas após salvar
        } else {
          alert('Erro ao salvar meta: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar meta');
      });
    }

    function removerMeta(id) {
      if (confirm('Tem certeza que deseja remover esta meta?')) {
        fetch('deletar_meta.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            carregarMetas(); // Recarregar metas após remover
          } else {
            alert('Erro ao remover meta: ' + data.error);
          }
        })
        .catch(error => {
          console.error('Erro:', error);
          alert('Erro ao remover meta');
        });
      }
    }

    function renderizarMetas() {
      const container = document.getElementById("metas");
      container.innerHTML = "";

      metas.forEach((meta) => {
        const card = document.createElement("div");
        card.className = "meta-card";

        let imagemHTML = meta.iconeURL
          ? `<img src="${meta.iconeURL}" alt="Ícone da meta">`
          : `<div class="meta-img">+</div>`;

        card.innerHTML = `
          ${imagemHTML}
          <h3>${meta.nome}</h3>
          <p>${meta.descricao}</p>
          <p>Guardado: R$${meta.valorAtual} / R$${meta.valorTotal}</p>
          <div class="progress-bar">
            <div class="progress" style="width:${meta.progresso}%"></div>
          </div>
          <div class="action-buttons">
            <button class="remove-btn" onclick="removerMeta(${meta.id})">Remover</button>
          </div>
        `;

        container.appendChild(card);
      });
    }
    // Seleciona todos os itens do menu
const itemMenu = document.querySelectorAll('.item-menu');

function selectLink() {
  itemMenu.forEach((item) => item.classList.remove('ativo'));
  this.classList.add('ativo');
}

// Adiciona evento de clique em cada item
itemMenu.forEach((item) => item.addEventListener('click', selectLink));

// Botão de expandir/recolher
const btnExpandir = document.querySelector('#bt-exp');
const menuLat = document.querySelector('.menu-lateral');

btnExpandir.addEventListener('click', function () {
  menuLat.classList.toggle('expandir');
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