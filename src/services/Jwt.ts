
import jwt from 'jsonwebtoken';
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