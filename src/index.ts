import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const dbUri = process.env.DB_URI as string;

mongoose.connect(dbUri).then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    const app = express();

    app.use(express.json());
    app.use(routes);

    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });

}).catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});

