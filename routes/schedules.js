import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as schedulesCtrl from '../controllers/schedules.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)

// Route for creating a new schedule
router.post('/', checkAuth, schedulesCtrl.create);

export { router }