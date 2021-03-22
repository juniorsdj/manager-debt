import { createServer } from 'http';
import dotenv from 'dotenv';
import signale from 'signale';
import ApplicationServer from './server';
import 'reflect-metadata';

dotenv.config()


new ApplicationServer()
    .setupApp()
    .then(app => {
        const server = createServer(app);


        const PORT = process.env.PORT || 3333;

        function onListing() {
            signale.complete(`🚀 Server listening on port: ${PORT}`);
        }

        function onError(error: string) {
            signale.error('There was an error:', error);
        }

        server.listen(PORT);
        server.on('listening', onListing);
        server.on('error', onError);
    })
    .catch(err => {
        signale.error('Erro ao startar aplicação', err.toString());
        process.exit();
    });
