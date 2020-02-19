import dotenv from 'dotenv';
import { logger } from './shared/Logger';

// Set the env file
logger.log('info', `env: ${process.env.NODE_ENV}`)
const result2 = dotenv.config({
    path: `./env/${process.env.NODE_ENV}.env`,
});
if (result2.error) {
    throw result2.error;
}
