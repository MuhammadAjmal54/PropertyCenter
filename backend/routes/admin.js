



import express from 'express';
import { adminLogin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);  // POST /api/admin/login

export default router;
