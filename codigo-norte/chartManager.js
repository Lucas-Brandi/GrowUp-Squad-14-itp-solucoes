class ChartManager {
    constructor(ctx, type, data, options) {
        this.ctx = ctx;
        this.type = type;
        this.data = data;
        this.options = options;
        this.chart = null;
    }

    render() {
        this.chart = new Chart(this.ctx, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }
}
