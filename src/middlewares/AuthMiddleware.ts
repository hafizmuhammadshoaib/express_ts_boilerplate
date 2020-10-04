import Boom from 'boom';
import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from 'src/services/Jwt';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        try {
            let decodedToken = await verifyJWT(bearerToken);
            req['token'] = decodedToken;
            next()
        } catch (e) {
            next(Boom.unauthorized(e.message).output)
        }
    } else {
        next(Boom.forbidden().output)
    }
}