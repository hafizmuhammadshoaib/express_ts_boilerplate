import { Router } from 'express';
import TodoRouter from './Todos';
import AuthRouter from './Auth';
import Docs from './docs';

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/todos', TodoRouter);

router.use('/docs', Docs);

// Export the base-router
export default router;
