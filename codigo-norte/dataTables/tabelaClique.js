chart.on('click', function (params) {
    const container = document.getElementById('interaction-output');

    // Exibe informação do clique
    if (!document.getElementById(`info-${params.name}`)) {
        const p = document.createElement('p');
        p.id = `info-${params.name}`;
        p.textContent = `Você clicou em: ${params.name}`;
        container.appendChild(p);
    }

    // Filtra os dados originais com base no nome clicado
    const dadosFiltrados = dadosOriginais.filter(item => item.atendente === params.name);

    // Atualiza a tabela com os dados filtrados
    if ($.fn.DataTable.isDataTable('#tabelaAtendimentos')) {
        $('#tabelaAtendimentos').DataTable().clear().rows.add(dadosFiltrados).draw();
    }
});