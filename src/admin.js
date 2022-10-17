import express from 'express'
import auth from './auth.js'
import adminList from './model/admin-list.js'

const router = express.Router()
router.get('/list', auth, adminList)

export default router