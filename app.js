const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000
// const db = require('./models')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 註冊handlebars樣板引擎，並指定副檔名.hbs
app.engine('hbs', handlebars({ extname: '.hbs' }))
// 設定使用handlebars做為樣板引擎
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'SESSION_SECRET', resave: false, saveUninitialized: false }))
app.use(passport.initialize()) // 初始化Passport
app.use(passport.session()) // 啟動session功能
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app
