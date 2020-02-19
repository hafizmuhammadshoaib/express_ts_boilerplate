import { Router, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const router = Router();

const swaggerDoc = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TodoApp',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'],
});
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDoc));

export default router;
