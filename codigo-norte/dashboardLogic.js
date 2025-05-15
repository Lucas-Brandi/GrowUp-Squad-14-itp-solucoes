//👹❌
async function fetchData() {
  //receber os dados e retornar em formato json
  const response = await fetch("data.json"); //recebendo os dados do servidor (por meio de promises)
  const data = await response.json();
  return data;
}

function prepareNotaData(atendimentos) {
  const notas = atendimentos.reduce((acc, item) => {
    acc[item.nota] = (acc[item.nota] || 0) + 1;
    return acc;
  }, {});

  return {
    //Chart.js
    labels: Object.keys(notas),
    datasets: [
      {
        label: "Notas dos Atendimentos",
        data: Object.values(notas),
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336", "#2196F3"],
      },
    ],
  };
}

function preparePrioridadeData(atendimentos) {
  const prioridades = atendimentos.reduce((acc, item) => {
    acc[item.prioridade] = (acc[item.prioridade] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(prioridades),
    datasets: [
      {
        label: "Prioridades dos Atendimentos",
        data: Object.values(prioridades),
        backgroundColor: ["#FF5722", "#3F51B5", "#00BCD4"],
      },
    ],
  };
}

function prepareInteracoesData(atendimentos) {
  return {
    labels: atendimentos.map((a) => a.codigo_atendimento),
    datasets: [
      {
        label: "Interações por Atendimento",
        data: atendimentos.map((a) => a.interacoes),
        fill: false,
        borderColor: "#9C27B0",
        tension: 0.1,
      },
    ],
  };
}

async function initDashboard() {
  const atendimentos = await fetchData();
  const notaCtx = document.getElementById("notaChart").getContext("2d");
  const prioridadeCtx = document
    .getElementById("prioridadeChart")
    .getContext("2d");
  const interacoesCtx = document
    .getElementById("interacoesChart")
    .getContext("2d");
  const notaChart = new ChartManager(
    notaCtx,
    "bar",
    prepareNotaData(atendimentos),
    {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Notas dos Atendimentos" },
      },
    }
  );
  const prioridadeChart = new ChartManager(
    prioridadeCtx,
    "pie",
    preparePrioridadeData(atendimentos),
    {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Prioridades dos Atendimentos" },
      },
    }
  );
  const interacoesChart = new ChartManager(
    interacoesCtx,
    "line",
    prepareInteracoesData(atendimentos),
    {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: true, text: "Interações por Atendimento" },
      },
    }
  );
  notaChart.render();
  prioridadeChart.render();
  interacoesChart.render();

  initDashboard();
}
