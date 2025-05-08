import express from 'express';
import { Router } from 'express';
import { userLogin, userLogout, userProfile, userRegister } from '../Controllers/user.js';
import { isauthenticate } from '../middlewares/Auth.js';

const router = Router();

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/logout',userLogout)
router.get('/profile',isauthenticate,userProfile)

export default router;
