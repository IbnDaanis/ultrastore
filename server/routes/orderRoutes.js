import express from 'express'
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
} from '../controllers/orderControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
