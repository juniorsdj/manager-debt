const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 2;
console.log(`CRIANDO ${WORKERS} INSTANCIAS DE EXECUÇÃO`);
throng(
    {
        workers: WORKERS,
        lifetime: Infinity,
    },
    start,
);

function start() {
    require('./src');
}
