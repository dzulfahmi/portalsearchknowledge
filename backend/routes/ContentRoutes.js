import express from 'express'
import { 
    admin, 
    protect 
} from '../middleware/AuthMiddleware.js'
import { 
    countContents,
    getContentById, 
    getContents,
    countContents2
} from '../controllers/ContentController.js'

const router = express.Router()

router.route('/')
    .post(protect, admin, getContents)
router.route('/count')
    .post(protect, admin, countContents)
router.route('/count2')
    .get(protect, admin, countContents2)
router.route('/:id')
    .get(protect, admin, getContentById)

export default router