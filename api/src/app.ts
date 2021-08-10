import express from 'express';
import cors from 'cors';
import APIRouter from './graphql';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/_graphql',APIRouter);

app.use((req,res)=>{
  res.json({error: "Please use the API"});
})

export default app;