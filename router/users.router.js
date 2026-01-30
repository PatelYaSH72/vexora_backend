import express from 'express';
import emailSend from '../controller/emailSend.js';

const userrouter = express.Router();

userrouter.post('/sendEmail',emailSend)

export default userrouter