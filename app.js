const express = require('express')
var cors = require("cors");
var logger = require('morgan');
var dotenv = require('dotenv');
var helmet = require('helmet')
const { authJwt } = require("./auth/middleware");

const { sequelize } = require('./models')
const {
    companyRouter,
    mediaRouter,
    parameterRouter,
    vehicleRouter,
    addressRouter,
    typeRouter,
    productRouter
} = require('./src/api.router')

dotenv.config();
const port = process.env.PORT || 3300

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(helmet())

app.use('/company', companyRouter)
app.use('/media', mediaRouter)
app.use('/parameter', parameterRouter)
app.use('/vehicle', vehicleRouter)
app.use('/address', addressRouter)
app.use('/product', productRouter)
app.use('/type', typeRouter)
app.use('/product', productRouter)


//auth
// routes
require('./auth/routes/auth.routes')(app);
require('./auth/routes/user.routes')(app);

// middleware
// app.use(authJwt.setHeader)
 //app.use(authJwt.verifyToken)

//helmet bu işlemi de yapıo
//app.disable('x-powered-by'); // güvenlik gerekçesiyle server tipi gönderilmiyor

if (process.env.NODE_ENV === 'docker') {
    const { db } = require('./models')
    db.sync({ force: true }).then(() => {
        console.log('Drop and Resync Database with { force: true }');
    });
}

app.listen({ port }, async () => {
    console.log('Server up on http://localhost:' + port)
    await sequelize.authenticate()
    console.log('Database Connected!')
})