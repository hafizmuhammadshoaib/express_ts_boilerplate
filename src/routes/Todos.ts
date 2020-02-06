

import { logger } from '@shared';
import { Request, Response, Router, Express, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';
import express from 'express';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from 'src/services/Todos';
import Boom from 'boom';
import { ITodoInsert, ITodoUpdate, ITodoDelete } from 'src/inputs/TodoInputs';
import { InsertValidator, UpdateValidator } from 'src/validators/TodoValidator';

// Init shared
const router = Router();

/******************************************************************************
 *                      Get All Todos - "GET /api/todos/all"
 ******************************************************************************/

/**
* @swagger
* /api/todos/all:
*   get:
*     tags:
*       - Todo Call
*     summary: get all todos
*     description: Returns and array.
*     produces:
*       - application/json
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             schema:
*               $ref: ''
*             example:
*               data: [{
     "id": 2,
     "title": "Vue",
     "item": "Learn Vue.js",
     "createdAt": "2020-02-05T11:30:34.172Z",
     "updatedAt": "2020-02-05T11:30:34.172Z"
   }]
*       500:
*         $ref: ''
*/

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let todos = await getAllTodos();
        res.status(OK).json({ data: todos })
    }
    catch (e) {
        next(Boom.badRequest('crashed!!!').output)
    }
});
/******************************************************************************
 *                      Get Add Todos - "GET /api/todos/add"
 ******************************************************************************/
router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let payload: ITodoInsert = { ...req.body };
        let { error } = InsertValidator.validate(payload);
        if (!error) {
            let todos = await addTodo(payload.title, payload.item);
            res.status(OK).json({ data: todos })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        next(Boom.badImplementation('crashed!!!').output)
    }
});

router.put('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let payload: ITodoUpdate = { ...req.body };
        let { error } = UpdateValidator.validate(payload);
        if (!error) {
            let todos = await updateTodo(payload);
            res.status(OK).json({ data: payload })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        next(Boom.badImplementation('crashed!!!').output)
    }
});
router.delete('/delete', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let payload: ITodoDelete = { ...req.body };
        let { error } = UpdateValidator.validate(payload);
        if (!error) {
            let todos = await deleteTodo(payload.id);
            res.status(OK).json({ data: todos })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        next(Boom.badImplementation('crashed!!!').output)
    }
})

export default router;
