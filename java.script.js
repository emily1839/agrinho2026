// ============================
// SCRIPT.JS - Agro Forte Sustentável
// ============================

// Array para armazenar as plantas
let plantas = [];

// Limites sustentáveis
const limiteAgua = 5000; // L
const limiteFertilizante = 1000; // kg

function adicionarPlanta() {
    // Pegar valores do formulário
    const nome = document.getElementById('nome-planta').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const agua = parseInt(document.getElementById('agua').value);
    const fertilizante = parseInt(document.getElementById('fertilizante').value);

    // Validação simples
    if (!nome || isNaN(quantidade) || isNaN(agua) || isNaN(fertilizante)) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Adicionar planta ao array
    plantas.push({
        nome,
        quantidade,
        agua,
        fertilizante
    });

    // Atualizar dashboard e tabela
    atualizarDashboard();
    atualizarTabela();

    // Limpar formulário
    document.getElementById('nome-planta').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('agua').value = '';
    document.getElementById('fertilizante').value = '';
}

function atualizarDashboard() {
    let totalAgua = 0;
    let totalFertilizante = 0;

    plantas.forEach(planta => {
        totalAgua += planta.agua * planta.quantidade;
        totalFertilizante += planta.fertilizante * planta.quantidade;
    });

    document.getElementById('agua-total').innerText = totalAgua + ' L';
    document.getElementById('fertilizante-total').innerText = totalFertilizante + ' kg';

    // Alertas
    const alertasEl = document.getElementById('alertas');
    alertasEl.innerHTML = '';
    alertasEl.className = ''; // reset class

    let mensagens = [];
    if (totalAgua > limiteAgua) mensagens.push(`⚠️ Uso excessivo de água: ${totalAgua}L (limite ${limiteAgua}L)`);
    if (totalFertilizante > limiteFertilizante) mensagens.push(`⚠️ Uso excessivo de fertilizante: ${totalFertilizante}kg (limite ${limiteFertilizante}kg)`);

    if (mensagens.length === 0) {
        alertasEl.innerText = '✅ Plantação dentro dos limites sustentáveis!';
        alertasEl.classList.add('sucesso');
    } else {
        alertasEl.innerHTML = mensagens.join('<br>');
        alertasEl.classList.add('alerta');
    }
}

function atualizarTabela() {
    const corpoTabela = document.getElementById('corpo-tabela');
    corpoTabela.innerHTML = ''; // Limpar tabela

    plantas.forEach(planta => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${planta.nome}</td>
            <td>${planta.quantidade}</td>
            <td>${planta.agua * planta.quantidade}</td>
            <td>${planta.fertilizante * planta.quantidade}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}