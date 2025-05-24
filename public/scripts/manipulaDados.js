// >>>MANIPULANDO OS DADOS DO ARQUIVO JSON<<<
async function fetchData() { //receber os dados e retornar em formato json
    const response = await fetch('/api/data'); //recebendo os dados do servidor (por meio de promises)
    const data = await response.json(); 
    return data;
}

const dados = await fetchData();

export function prepareNotaData() {
    const notas = dados.reduce((acc, item) => {
        acc[item.nota] = (acc[item.nota] || 0) + 1;
        return acc;
    }, {});

     // Transforma o objeto em array de arrays: [["ótimo", 3], ["bom", 2], ...]
        const datas = Object.entries(notas);
        return datas;
}

export function frequenciaClientes() {
    const clientes = dados.reduce((acc, item) => {
        acc[item.cliente] = (acc[item.cliente] || 0) + 1;
        return acc;
    }, {});

     // Transforma o objeto em array de arrays: [["ótimo", 3], ["bom", 2], ...]
        const datas = Object.entries(clientes);

        return datas;
}

export function preparePrioridadeData() {
    const prioridades = dados.reduce((acc, item) => {
        acc[item.prioridade] = (acc[item.prioridade] || 0) + 1;
        return acc;
    }, {});

    const datas = Object.entries(prioridades);
    return datas;
}