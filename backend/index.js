import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
import connectDb from './database.js';


const app = express()
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    connectDb()
    console.log(`server is running on PORT ${PORT}`)
});