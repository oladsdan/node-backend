import { port, server } from './app.mjs';


/* This function below safely converting a port number string into a 
numerical value that can be used in the applicationv*/
export function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)){
        return val;
    }
    if (port >=0) {
        return port;
    }
    return false;
}


export function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    console.log(`Listening on ${bind}`);
}