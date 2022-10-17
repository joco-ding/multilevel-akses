import express from 'express'
import productList from './model/product-list.js'

const router = express.Router()
router.get('/list', productList)

export default router