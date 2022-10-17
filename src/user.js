import express from 'express'
import userLogin from './model/user-login.js'
import userPassword from './model/user-password.js'
import auth from './auth.js'
import userProfil from './model/user-profil.js'
import userList from './model/user-list.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/password', auth, userPassword)
router.get('/profil', auth, userProfil)
router.get('/list', auth, userList)

export default router