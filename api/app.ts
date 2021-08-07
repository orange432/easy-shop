import express from 'express';
import path from 'path';
import APIRouter from './graphql';
const app = express();

app.use(express.json());

app.use('/_graphql',APIRouter);

app.use((req,res)=>{
  res.sendFile(path.resolve(__dirname,'public/index.html'));
})

export default app;