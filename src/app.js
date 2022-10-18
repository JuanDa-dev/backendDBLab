import express from 'express';
import indexRoutes from './routes/index.js'

const app = express()

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.use(indexRoutes)

//Route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint nod found'
    })
})

export default app