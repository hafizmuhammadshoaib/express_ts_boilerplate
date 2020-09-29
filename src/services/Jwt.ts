
import jwt from 'jsonwebtoken';
import { DecodedToken } from 'src/inputs/DecodedToken';
const secretKey = 'secretKey'
export function generateJWT(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token)
            }
            else {
                reject(err)
            }
        })
    })
}
export function verifyJWT(token: string): Promise<DecodedToken> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded as DecodedToken)
            }
        });
    })

}