let plantas = [];
const limiteAgua = 5000;
const limiteFertilizante = 1000;

document.getElementById('btn-adicionar').addEventListener('click', () => {
    const nome = document.getElementById('nome-planta').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const agua = parseInt(document.getElementById('agua').value);
    const fertilizante = parseInt(document.getElementById('fertilizante').value);

    if (!nome || isNaN(quantidade) || isNaN(agua) || isNaN(fertilizante)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    plantas.push({ nome, quantidade, agua, fertilizante });
    atualizarDashboard();
    atualizarTabela();

    // Limpar formulário
    document.getElementById('nome-planta').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('agua').value = '';
    document.getElementById('fertilizante').value = '';
});

function atualizarDashboard() {
    let totalAgua = 0;
    let totalFertilizante = 0;

    plantas.forEach(p => {
        totalAgua += p.quantidade * p.agua;
        totalFertilizante += p.quantidade * p.fertilizante;
    });

    document.getElementById('agua-total').innerText = totalAgua + ' L';
    document.getElementById('fertilizante-total').innerText = totalFertilizante + ' kg';

    const alertasEl = document.getElementById('alertas');
    let mensagens = [];
    if (totalAgua > limiteAgua) mensagens.push(`⚠️ Uso excessivo de água: ${totalAgua}L (limite ${limiteAgua}L)`);
    if (totalFertilizante > limiteFertilizante) mensagens.push(`⚠️ Uso excessivo de fertilizante: ${totalFertilizante}kg (limite ${limiteFertilizante}kg)`);

    if (mensagens.length === 0) {
        alertasEl.innerText = '✅ Plantação dentro dos limites sustentáveis!';
        alertasEl.className = 'sucesso';
    } else {
        alertasEl.innerHTML = mensagens.join('<br>');
        alertasEl.className = 'alerta';
    }
}

function atualizarTabela() {
    const corpo = document.getElementById('corpo-tabela');
    corpo.innerHTML = '';
    plantas.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${p.nome}</td><td>${p.quantidade}</td><td>${p.agua * p.quantidade}</td><td>${p.fertilizante * p.quantidade}</td>`;
        corpo.appendChild(tr);
    });
}