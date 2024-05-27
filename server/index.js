import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from "cors"
import KPI from './models/KPI.js'
import {kpis, products, transactions} from "./data/data.js"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from 'morgan'
import kpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/product.js"
import Product from "./models/Product.js";
import transactionRoutes from "./routes/transaction.js"
import Transaction from "./models/Transaction.js"
// Configuration

dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())


// routes

app.use("/kpi",kpiRoutes);
app.use("/product",productRoutes);
app.use("/transaction", transactionRoutes);

// mongoose set up

const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL)
 .then(async()=>{
    app.listen(PORT,()=> console.log(`Server PORT: ${PORT}`))

   //!  ADD DATA ONE TIME ONLY OR WHEN NEEDED

//     await mongoose.connection.db.dropDatabase();
//  Transaction.insertMany(transactions);
//    Product.insertMany(products)
//    Transaction.insertMany(transactions)
//    KPI.insertMany(kpis)

 })
 .catch((error) => console.log(`${error} did not connect`))


