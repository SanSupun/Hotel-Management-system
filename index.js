
import bodyParser from 'body-parser'
import express from 'express'
import userRouter from './routes/usersRoute.js'
import mongoose from 'mongoose'
import galleryItemRouter from './routes/galleryItemRoute.js'
import jwt from 'jsonwebtoken'
import categoryRouter from './routes/categoryRoute.js'; // Use './' for relative paths
import dotenv from 'dotenv'
dotenv.config()

const app = express()
 

app.use(bodyParser.json())

const connectionString = process.env.MONGODB;

app.use((req,res,next)=>{

  const token = req.header("Authorization")?.replace("Bearer ", "")

  if(token != null){
    jwt.verify(token,process.env.JWT_KEY,(err, decoded) => {
      if (decoded != null) {
          req.body.user = decoded;
          console.log("Decoded User:", decoded); // Log the decoded user
          next();
      } else {
          console.log("Token verification failed:", err); // Log the error
          next();
      }
  });
} else {
  console.log("No token provided");
  next();
}
});
     
  


mongoose.connect(connectionString).then(
  ()=>{
    console.log("Connected to the database")
  }
).catch(
  ()=>{
    console.log("Connection failed")
  }
)


app.use("/api/users",userRouter)
app.use("/api/gallery",galleryItemRouter)
app.use("/api/category",categoryRouter)
app.use("/api/login",userRouter)

app.listen(5000,(req,res)=>{
  console.log("Sever is running on on port 5000")
});

