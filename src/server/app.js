import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para habilitar CORS e servir arquivos estáticos
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));

// Rota para servir os dados do gráfico
app.get('/api/data', (req, res) => {
    const dataPath = path.join(__dirname, '../../public/data/data.json');
    res.sendFile(dataPath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo data.json:', err);
            res.status(500).send('Erro interno no servidor');
        }
    });
});

// Middleware para tratar erros 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});