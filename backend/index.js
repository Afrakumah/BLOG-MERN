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

//middleware to handle error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(PORT, () => {
    connectDb()
    console.log(`server is running on PORT ${PORT}`)
});

// app.get('/testAPI', (req,res) => {
//     res.json({message: 'testing API'})
// })