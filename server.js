const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/user')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const engine = require('ejs-mate')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')

const secret = require('./config/secret')


mongoose.connect(secret.database, secret.options).then(() => {
    console.log(`connected to ${
        secret.options.dbName
    } successfully`)
}).catch((error) => console.log(JSON.stringify(error)))


// middleware
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore(
        {url: secret.database, autoReconnect: true}
    )
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})


app.engine('ejs', engine)
app.set('view engine', 'ejs')
// app.use(expressLayouts)

// app.set('views', __dirname + './views')

const mainRoutes = require('./routes/main')
const userRoutes = require('./routes/user')
app.use(mainRoutes)
app.use(userRoutes)


app.listen(secret.port, function (err) {
    if (err) 
        throw err


    


    console.log('server is running on port ' + secret.port)

})
