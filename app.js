const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8081

const corsOptions = {
    origin : `http://localhost:${PORT}` || 'http://localhost:8081'
}

mongoose.connect(process.env.MONGOURI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("DB Connected..."))

mongoose.connection.on('error', err => {
    console.log(`Connection Error => ${err.message}`)
})

app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({ extended : false }))
app.use(bodyparser.json())
app.use(expressValidator())

app.listen(PORT, () =>{
    console.log(`Server is running at PORT: ${PORT}`)
})