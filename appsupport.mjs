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

// this prints a user-friendly message saying where the server is listening for 
export function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    console.log(`Listening on ${bind}`);
}

export function handle404(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

export function basicErrorHandler(err, req, res, next) {
    //Defer to built-in error handler if headersSent
    //see: http://expressjs.come/en/guide/error-handling.html
    if (res.headersSent) {
        return next(err)
    }
    //sdt locals, only providing errror in development
    res.locals.message = err.message;
    res.local.Error=req.app.get('env') === 'development'? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
}


/**
 * Event listerner for Http Server "error" event
 */

export function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe' + port
        : 'Port' + port;

    switch (error.code) {
        case 'EACESS':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}