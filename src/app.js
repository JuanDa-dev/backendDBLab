import express from 'express';
import indexRoutes from './routes/index.js'
import cors from 'cors'
import { URL } from './config.js'

const app = express()

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
    origin: URL,
    credentials: true
}));

//Routes
app.use(indexRoutes)

//Route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint nod found'
    })
})

export default app