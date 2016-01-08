import express from 'express';
import groups from './groups'; 

const router = express.Router();

router.use('/groups', groups);

export default router;
