import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import BaseRouter from './routes';
import Boom from 'boom';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', BaseRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
    next(Boom.notFound('not found').output);

});

// error handler
app.use(function (err: Boom.Output, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500)
    res.json(err.payload)
});


// Export express instance
export default app;
