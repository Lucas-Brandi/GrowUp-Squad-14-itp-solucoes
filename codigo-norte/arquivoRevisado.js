export function processarDadosBrutos(dados) { // Processa os dados brutos para o formato esperado pelo gráfico
    return dados.map(item => [item.categoria, item.valor]);
}

export function aplicarFiltro(dados, filtroCategoria) { // Aplica um filtro nos dados com base na categoria
    return dados.filter(item => item.categoria === filtroCategoria);
}

export function calcularTotal(dados) { // Calcula o total dos valores dos dados
    return dados.reduce((soma, item) => soma + item.valor, 0);
}