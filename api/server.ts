import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose'
import app from './app';

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

if(typeof(MONGO_URI)==='undefined'){
  console.log('Please enter a mongodb uri into the .env file as MONGODB_URI')
  process.exit(1)
}

mongoose.connect(MONGO_URI,{useNewUrlParser: true})
  .then(
    ()=>{
      console.log('Connected to MongoDB Database');
      app.listen(PORT,()=>console.log(`App listening at http://localhost:${PORT}`))
    },
    err=>{console.log(err)}
  )

