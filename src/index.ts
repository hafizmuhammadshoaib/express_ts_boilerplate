import app from '@server';
import './LoadEnv';
import { logger, _Err } from '@shared';

import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection().then(async connection => {

    // If DB connects successfully
    // Start the server
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });

}).catch(error => _Err(error));

