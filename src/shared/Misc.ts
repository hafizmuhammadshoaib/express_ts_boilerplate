import { logger } from './Logger';


export const _Err = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};
export const _Info = (method: string, url: string, body: Object) => {
    logger.info((`method:${method} url:${url} body:${body}`));
}
