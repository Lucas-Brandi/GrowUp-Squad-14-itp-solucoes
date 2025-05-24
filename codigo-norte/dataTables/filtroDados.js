async function fetchData() {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Erro ao buscar dados');
  return await response.json();
}

async function carregarTabela() {
  try {
    const dadosBrutos = await fetchData();

    // Filtra e mapeia os dados conforme desejado
    const dadosFiltrados = dadosBrutos
      .filter(item => item.nota === 'Excelente') // ou qualquer outro filtro que desejar
      .map(item => ({
        codigo_atendimento: item.codigo_atendimento,
        cliente: item.cliente,
        servico: item.servico,
        atendente: item.atendente,
        interacoes: item.interacoes
      }))
      
      

    $('#tabelaAtendimentos').DataTable({
      data: dadosFiltrados,
      columns: [
        { data: 'codigo_atendimento', title: 'Código' },
        { data: 'cliente', title: 'Cliente' },
        { data: 'servico', title: 'Serviço' },
        { data: 'atendente', title: 'Atendente' },
        { data: 'interacoes', title: 'Interações' }
      ],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
      }
    });

  } catch (erro) {
    alert('Erro ao carregar dados: ' + erro.message);
  }
}

carregarTabela();