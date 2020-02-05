

import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';
import express from 'express';
import { getAllTodos } from 'src/services/Todos';
import Boom from 'boom';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get All Todos - "GET /api/todos/all"
 ******************************************************************************/

router.get('/all', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let todos = await getAllTodos();
        res.status(OK).json({ data: todos })
    }
    catch (e) {
        next(Boom.badRequest('crashed!!!').output)
    }
})

export default router;
