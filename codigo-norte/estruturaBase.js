document.addEventListener("DOMContentLoaded", () => {
  const title = "Vendas por Categoria";
  const columns = ["Categoria", "Valor"]; //O que significa as colunas
  const datas = [
    ["Alimentos", 200],
    ["Bebidas", 150],
    ["Sobremesas", 100],
  ]; //Dados (Categoria, valor)

  // Criando e renderizando o gráfico de Pizza
  const pie = new PieChart("nota", title, columns, datas);
  pie.createChart();

  // Criando e rederizando o grafico de Linha
  const line = new LineChart("linechart", title, columns, datas);
  line.createChart();

  // Criando e rederizando o grafico de Barra
  const bar = new BarChart("barchart", title, columns, datas);
  bar.createChart();
});