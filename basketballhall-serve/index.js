const express = require('express')
const bodyParser = require('body-parser')


const app = express()
// 配置
require('./config/http')(app)//跨域
require('./mongodb/mongodb')//数据库


// 中间件
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 路由
const adminRouter = require('./api/admin')
const safecode = require('./api/safecode')
const useradminRouter = require('./api/useradmin')

// 注册路由
app.use('/api/admin', adminRouter)
app.use('/api/safecode', safecode)
app.use('/api/useradmin', useradminRouter)

app.listen(3000, err => {
    if (err) {
        throw err
    }
    console.log('Server is running at http://localhost:3000')
})