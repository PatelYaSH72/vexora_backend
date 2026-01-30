import express from 'express';
import cors from 'cors';
import userrouter from './router/users.router.js';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';



dotenv.config();
connectDB();


const app = express();
app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
  res.send('Vexoraa Backend is running');
})

app.use('/api/user',userrouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log('Server is running on port',PORT)
})