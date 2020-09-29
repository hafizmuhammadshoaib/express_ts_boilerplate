import { Router } from 'express';
import TodoRouter from './Todos';
import AuthRouter from './Auth';
import Docs from './docs';
import { authMiddleware } from 'src/middlewares/AuthMiddleware';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);

router.use('/todos', authMiddleware, TodoRouter);

router.use('/docs', Docs);

// Export the base-router
export default router;
