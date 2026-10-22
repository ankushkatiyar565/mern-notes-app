import express from 'express'
const app = express()
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js'
import connectDb from './config/db.js'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/notes",userRoutes)

app.get("/",(req,res)=>{
  res.send("hii baby boy....")
})

connectDb()

app.listen(PORT,()=>{
  console.log("server start bhai.....")
})