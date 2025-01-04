import express from 'express'
import { register,login,verifyEmail } from '../controllers/authController.js';
const router = express.Router();
import generalValidator from '../middleware/generalValidator.js'
import {registerSchema,loginSchema} from '../validation/userValidation.js'

router.post('/register',generalValidator(registerSchema), register);
router.get('/verify-email', verifyEmail);
router.post('/login',generalValidator(loginSchema), login);

export default router
