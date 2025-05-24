let dadosCompletos = [];
let tabela = null;

// Evento de clique na fatia da pizza
myChart.on("click", function (params) {
  const notaSelecionada = params.name;
  atualizarTabelaPorNota(notaSelecionada);
});

function atualizarTabelaPorNota(nota) {
  const filtrado = dadosCompletos
    .filter((item) => item.nota === nota)
    .map((item) => ({
      codigo_atendimento: item.codigo_atendimento,
      cliente: item.cliente,
      servico: item.servico,
      atendente: item.atendente,
      interacoes: item.interacoes,
    }));

  if (tabela) {
    tabela.clear();
    tabela.rows.add(filtrado);
    tabela.draw();
  } else {
    tabela = $("#tabelaAtendimentos").DataTable({
      data: filtrado,
      columns: [
        { data: "codigo_atendimento", title: "Código" },
        { data: "cliente", title: "Cliente" },
        { data: "servico", title: "Serviço" },
        { data: "atendente", title: "Atendente" },
        { data: "interacoes", title: "Interações" },
      ],
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json",
      },
    });
  }
}



