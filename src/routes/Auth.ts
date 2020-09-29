import { _Err } from '@shared';
import { Request, Response, Router, NextFunction } from 'express';
import Boom from 'boom';
import { ISignup } from 'src/inputs/AuthInputs';
import { SigninValidator, SignupValidator } from 'src/validators/AuthValidator';
import { addUser, getUser } from 'src/services/Auth';
import { OK } from 'http-status-codes';
import { generateJWT } from 'src/services/Jwt';
import { User } from 'src/entity';


const router = Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signup User
 *     description: Add a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                  min: 3
 *                  max: 25
 *                email:
 *                  type: string
 *                password:
 *                 type: string
 *                 min: 8
 *                 max: 15
 *           example:
 *              {
 *               "name":"abc",
 *              "email":"abc@member.com",
 *              "password":"12345678"
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
 *                name:
 *                  type: string
 *                  min: 3
 *                  max: 25
 *                email:
 *                  type: string
 *                password:
 *                 type: string
 *                 min: 8
 *                 max: 15
 *             example:
 *               "data": {
 *                   "name": "abcd",
 *                   "email": "abc@member.com",
 *                   "id": 3,
 *                   "token":"...."
 *                   }
 *
 */

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ISignup = { ...req.body };
        const { error } = SignupValidator.validate(payload);
        if (!error) {
            const user: User = await addUser(payload);
            delete user.password;
            let token = await generateJWT({ ...user });
            user['token'] = token;
            res.status(OK).json({ data: user })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        _Err(e);
        if (e.message.includes("ER_DUP_ENTRY")) {
            next(Boom.conflict(e.message).output)
        } else {
            next(Boom.badImplementation().output)
        }
    }
});


/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Signin User
 *     description: Get a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                  type: string
 *                  min: 3
 *                  max: 25
 *                email:
 *                  type: string
 *                password:
 *                 type: string
 *                 min: 8
 *                 max: 15
 *           example:
 *              {
 *              "email":"abc@member.com",
 *              "password":"12345678"
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
 *                name:
 *                  type: string
 *                  min: 3
 *                  max: 25
 *                email:
 *                  type: string
 *                password:
 *                 type: string
 *                 min: 8
 *                 max: 15
 *             example:
 *               "data": {
 *                   "email": "abc@member.com",
 *                   "id": 3,
 *                   "token":"...."
 *                   }
 *
 */

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: ISignup = { ...req.body };
        const { error } = SigninValidator.validate(payload);
        if (!error) {
            const user: User = await getUser(payload);
            delete user.password;
            let token = await generateJWT({ ...user });
            user['token'] = token;
            res.status(OK).json({ data: user })
        } else {
            next(Boom.badRequest(error.message).output);
        }
    }
    catch (e) {
        _Err(e);
        next(Boom.badRequest(e.message).output)
    }
});
export default router;