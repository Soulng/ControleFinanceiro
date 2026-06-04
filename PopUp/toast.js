// ── Toast Cartão ─────────────────────────────────────────
function showToast(tipo, titulo) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
  
    const icones = { success: '✔', error: '✖', warn: '⚠' };
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
    const toast = document.createElement('div');
    toast.className = `card-toast toast-${tipo}`;
    toast.innerHTML = `
      <div class="card-toast-top">
        <div class="card-toast-icon">${icones[tipo]}</div>
        <div>
          <div class="card-toast-label">Finance Easy</div>
          ${titulo}
        </div>
      </div>
      <div class="card-toast-bottom">
        <span>Abraços STR Brasil</span>
        <span>${agora}</span>
      </div>
    `;
  
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }
  // ─────────────────────────────────────────────────────────