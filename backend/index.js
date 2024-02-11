import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();
import connectDb from './database.js';

const app = express()
const PORT = process.env.PORT || 1000;

//to make json requests
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)



app.listen(PORT, () => {
    connectDb()
    console.log(`server is running on PORT ${PORT}`)
});

// app.get('/testAPI', (req,res) => {
//     res.json({message: 'testing API'})
// })