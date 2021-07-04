const express = require('express')
var cors = require("cors");
var router = require('./router')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ana URL adı burası
app.use('/company', cors(), router)

module.exports = app
