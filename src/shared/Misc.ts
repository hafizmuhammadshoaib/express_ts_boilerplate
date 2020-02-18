import { logger } from './Logger';


export const _Err = (err: Error) => {
    if (err) {
        logger.log('error',err.message);
    }
};
export const _Info = (method: string, url: string, body: Object) => {
    logger.log('info',(`method:${method} url:${url} body:${body}`));
}
