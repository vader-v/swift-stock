import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as schedulesCtrl from '../controllers/schedules.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

// Route for creating a new schedule
router.post('/', checkAuth, schedulesCtrl.create);
router.get('/', checkAuth, schedulesCtrl.index);
// Route for fetching a specific schedule by ID
router.get('/:scheduleId', checkAuth, schedulesCtrl.show);
// Route for updating a specific schedule by ID
router.put('/:scheduleId', checkAuth, schedulesCtrl.update);

export { router }