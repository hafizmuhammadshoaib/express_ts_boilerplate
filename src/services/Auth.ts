import { ISignin, ISignup } from 'src/inputs/AuthInputs';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../entity'

const saltRounds = 10;
export function addUser(payload: ISignup): Promise<User> {
    return new Promise((resolve, reject) => {
        const userRepo = getConnection().getRepository(User);
        let password = payload.password;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (!err) {
                payload.password = hash
                userRepo.save(userRepo.create(payload)).then((user) => {
                    resolve(user)
                }).catch(err => {
                    reject(err)
                })
            } else {
                reject(err);
            }
        })
    })
}

export function getUser(payload: ISignin): Promise<User> {
    return new Promise((resolve, reject) => {
        const userRepo = getConnection().getRepository(User);
        console.log(payload.email)
        userRepo.findOne({ where: { email: payload.email } }).then(user => {
            bcrypt.compare(payload.password, user.password, (err, matched) => {
                if (!err && matched) {
                    resolve(user)
                } else if (!matched) {
                    reject({ message: 'invalid email or password' })
                } else {
                    reject(err)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
}
