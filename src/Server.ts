import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { _Info, _Err } from '@shared';
import BaseRouter from './routes';
import Boom from 'boom';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use((req: Request, res: Response, next: NextFunction) => {
    _Info(req.method, req.url, req.body);
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', BaseRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(Boom.notFound('not found').output);
});

// error handler
app.use((err: Boom.Output, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500)
    res.json(err.payload)
});


// Export express instance
export default app;
