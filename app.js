const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000
// const db = require('./models')

// 註冊handlebars樣板引擎，並指定副檔名.hbs
app.engine('hbs', handlebars({ extname: '.hbs' }))
// 設定使用handlebars做為樣板引擎
app.set('view engine', 'hbs')

app.use(routes)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app
