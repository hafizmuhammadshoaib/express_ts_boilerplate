

import { logger, _Err } from '@shared';
import { Request, Response, Router, Express, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import { getAllTodos, addTodo, updateTodo, deleteTodo, getCount } from 'src/services/Todos';
import Boom from 'boom';
import { ITodoInsert, ITodoUpdate, ITodoDelete } from 'src/inputs/TodoInputs';
import { InsertValidator, UpdateValidator } from 'src/validators/TodoValidator';


const router = Router();


/**
* @swagger
* /api/todos/all:
*   get:
*     tags:
*       - Todo
*     summary: get all todos
*     description: Returns an array.
*     parameters:
*       - page:
*         in: query
*         name: page
*         description: The number of page to return
*         schema:
*             type: integer
*             minimum: 1
*             default: '1'  
*     produces:
*       - application/json
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                   currentPage:
*                       type: number
*                   hasMorePages:
*                       type: boolean
*                   totalPages:
*                       type: number
*                   todos:
*                       type: object
*                       properties:
*                           id:
*                               type: number
*                           item:
*                               type: string
*                               min: 10
*                               max: 255
*                           title:
*                               type: string
*                               max: 25
*                               min: 3
*                           createdAt:
*                               type: string
*                           updatedAt:
*                               type: string
*               example:
*                "data": {
*        "todos": [
*            {
*                "id": 1,
*                "title": "work task",
*                "item": "abcdefghiklmnop",
*                "createdAt": "2020-02-19T10:31:53.113Z",
*                "updatedAt": "2020-02-19T10:31:53.113Z"
*            },
*            {
*                "id": 2,
*                "title": "hello",
*                "item": "this is something to be happen",
*                "createdAt": "2020-02-19T10:58:20.483Z",
*                "updatedAt": "2020-02-19T10:58:20.483Z"
*            }
*        ],
*        "currentPage": 1,
*        "hasMorePages": true,
*        "totalPages": 2
*    }
*       500:
*         $ref: ''
*/

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const perPage = 10;
        const { page } = req.query
        const currentPage: number = Number(page) || 1;
        const todos = await getAllTodos(page, perPage);
        const count = await getCount();
        const totalPages: number = Math.ceil(count / perPage);
        res.status(OK).json({
            data: {
                todos,
                currentPage,
                hasMorePages: currentPage !== totalPages,
                totalPages
            }
        })
    }
    catch (e) {
        _Err(e);
        next(Boom.badImplementation('Internal Server Error').output)
    }
});
/**
 * @swagger
 * /api/todos/:
 *   post:
 *     tags:
 *       - Todo
 *     summary: Add Todo
 *     description: Add a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                item:
 *                  type: string
 *                  min: 10
 *                  max: 255
 *                title:
 *                  type: string
 *                  max: 25
 *                  min: 3
 *           example:
 *              {
 *               "title":"work task",
 *              "item":"abcdefghiklmnop"
 *              }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: number
 *                item:
 *                  type: string
 *                  min: 10
 *                  max: 255
 *                title:
 *                  type: string
 *                  max: 25
 *                  min: 3
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *             example:
 *               "data": {
 *                   "title": "work task",
 *                   "item": "abcdefghiklmnop",
 *                   "id": 3,
 *                   "createdAt": "2020-02-13T17:13:40.997Z",
 *                   "updatedAt": "2020-02-13T17:13:40.997Z"
 *                   }
 *
 */

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ITodoInsert = { ...req.body };
        const { error } = InsertValidator.validate(payload);
        if (!error) {
            const todos = await addTodo(payload.title, payload.item);
            res.status(OK).json({ data: todos })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        _Err(e);
        next(Boom.badImplementation('Internal Server Error').output)
    }
});

/**
 * @swagger
 * /api/todos/:
 *   put:
 *     tags:
 *       - Todo
 *     summary: Update Todo
 *     description: Update a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                id:
 *                  type: number
 *                item:
 *                  type: string
 *                  min: 10
 *                  max: 255
 *                title:
 *                  type: string
 *                  max: 25
 *                  min: 3
 *           example:
 *              {
 *          "id":3,
 *           "title":"work task",
 *           "item":"abcdefghiklmnop"
 *               }
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: number
 *                item:
 *                  type: string
 *                  min: 10
 *                  max: 255
 *                title:
 *                  type: string
 *                  max: 25
 *                  min: 3
 *                createdAt:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *             example:
 *               "data": {
 *                   "title": "work task",
 *                   "item": "abcdefghiklmnop",
 *                   "id": 3,
 *                   "createdAt": "2020-02-13T17:13:40.997Z",
 *                   "updatedAt": "2020-02-13T17:13:40.997Z"
 *                   }
 *
 */

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ITodoUpdate = { ...req.body };
        const { error } = UpdateValidator.validate(payload);
        if (!error) {
            const todos = await updateTodo(payload);
            res.status(OK).json({ data: payload })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        _Err(e);
        next(Boom.badImplementation('Internal Server Error').output)
    }
});
/**
 * @swagger
 * /api/todos/:
 *   delete:
 *     tags:
 *       - Todo
 *     summary: Delete Todo
 *     description: Delete a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                id:
 *                  type: number
 *           example:
 *              {
 *              "id":3
 *              }
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *             example:
 *               "data": {
 *                   "title": "deleted successfully"
 *                   }
 *
 */
router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ITodoDelete = { ...req.body };
        const { error } = UpdateValidator.validate(payload);
        if (!error) {
            const todos = await deleteTodo(payload.id);
            res.status(OK).json({ data: { 'message': 'deleted successfully' } })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        _Err(e);
        next(Boom.badImplementation('Internal Server Error').output)
    }
})

export default router;
