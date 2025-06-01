let dadosOriginais = [];  // <-- variável global para armazenar os dados

document.getElementById('arquivojson').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            dadosOriginais = JSON.parse(e.target.result);  // armazenando globalmente
            
            if ($.fn.DataTable.isDataTable('#tabelaAtendimentos')) {
                $('#tabelaAtendimentos').DataTable().clear().rows.add(dadosOriginais).draw();
            } else {
                $('#tabelaAtendimentos').DataTable({
                    data: dadosOriginais,
                    columns: [
                        { data: 'codigo_atendimento' },
                        { data: 'atendente' },
                        { data: 'cliente' },
                        { data: 'servico' },
                        { data: 'nota' },
                        { data: 'interacoes' }
                    ],
                    language: {
                        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
                    }
                });
            }
        } catch (erro) {
            alert('Erro ao carregar JSON: ' + erro.message);
        }
    };

    reader.readAsText(file);
});