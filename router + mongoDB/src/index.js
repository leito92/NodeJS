import express from 'express'
//import products from './models/fileSystem/product.json' assert {type: 'json'}
import './config/mongoDB.js'
import { router as productRouter} from './routers/product.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
app.use("/api/products", productRouter)
app.listen(PORT, (err) => {
    err ? console.log(`${err}`) : console.log(`server up: http://localhost:${PORT}`)
})

/*
app.get('/', (req,res) => {
    res.send(`<h1>api</h1>`)
})
app.get('/products', (req,res) => {
    if(products.length) {
        res.status(200).json(products)
    }else {
        res.status(404).json()
    }
})
*/