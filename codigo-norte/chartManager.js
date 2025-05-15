class ChartManager {
    constructor(ctx, type, data, options) {         
        this.ctx = ctx;   // O contexto do canvas HTML (onde o gráfico será desenhado)
        this.type = type;  // Tipo do gráfico (ex: "bar", "pie", "line")
        this.data = data;   // Dados do gráfico (labels e datasets)
        this.options = options;  // Opções de configuração (título, legendas etc.)
        this.chart = null;         // Aqui será armazenado o objeto Chart criado
    }
    
//cria e renderiza o gráfico na tela utilizando a classe Chart
    render() {
        this.chart = new Chart(this.ctx, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }
}
