import express from 'express';
import mongoose from 'mongoose';
import userrouter from './Routes/user.js';
import bodyParser from 'express';
import cookieParser from 'cookie-parser';
import blogrouter from './Routes/blog.js';
import { config } from 'dotenv';
import cors from 'cors';

const app = express();
config({path:'./.env'})
app.use(cors({
    origin:[process.env.FRONEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
    
}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api/user',userrouter);
app.use('/api/blog',blogrouter);


mongoose.connect(process.env.MONGO_URI,
    {
        dbName:"MyDb3"
    }
).then(()=>console.log('MongoDb connected')).catch((e)=>console.log(e));

// app.get('/',(req,res)=>{
//     res.json({message:"success"})
// })

const port = process.env.PORT;

app.listen(port,()=>console.log(`server is running on port ${port}`));
