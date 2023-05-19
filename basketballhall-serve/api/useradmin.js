const router = require('express').Router()
const bcrypt = require('bcrypt')
require('../config/Date')


// TOKEN相关
const jwt = require('jsonwebtoken')
const jwtKey = require('../secret/jwtkey').KEYORSECRET
// 数据库模型
const usermsg = require('../dbModel/usermsg')
const siteModel = require('../dbModel/site')
const equipModel = require('../dbModel/equipment')
const userlike = require('../dbModel/userlike')
// const subequip = require('../dbModel/subequip')
const subSite = require('../dbModel/subsite')
const subequip = require('../dbModel/subequip')
// 获取预约器材信息
router.get('/allsubequit', (req, res) => {
    subequip.find()
        .then(sites => {
            console.log('获取所有的场地 allsite=>', sites)
            sites.length ? res.status(200).json({ status: 200, result: sites }) : res.status(200).json({ status: 200, result: [] })
        })
})
// 获取预约场地信息
router.get('/allsubsite', (req, res) => {
    subSite.find()
        .then(sites => {
            console.log('获取所有的场地 allsite=>', sites)
            sites.length ? res.status(200).json({ status: 200, result: sites }) : res.status(200).json({ status: 200, result: [] })
        })
})
// 获取用户所有信息
router.post('/allpersonmsg', (req, res) => {
    const email = req.body.email
    usermsg.findOne({ email })
        .then(equitments => {
            console.log('equitments=>', equitments)
            // console.log('获取所有的器材 allsite=>', sites)
            res.status(200).json({ status: 200, result: equitments })
        }).catch(err => {
            console.log('allpersonmsg err=>', err)
            res.status(500).json({ status: 500, result: err })
        })
})
// 编辑个人信息
router.post('/editmsg', (req, res) => {
    console.log('编辑个人信息req=>', req.body)
    const _id = req.body._id
    const newmsg = {}

    newmsg.avatar = req.body.avatar
    newmsg.password = req.body.password
    newmsg.nickname = req.body.nickname
    newmsg.age = req.body.age
    newmsg.email = req.body.email
    newmsg.mobilePhoneNumber = req.body.mobilePhoneNumber
    newmsg.sex = req.body.sex
    newmsg.id = req.body.id
    newmsg.account = req.body.account
    newmsg.area = req.body.area
    newmsg.hobby = req.body.hobby
    newmsg.work = req.body.work
    newmsg.design = req.body.design
    newmsg.poster = req.body.poster
    newmsg.username = req.body.username
    newmsg.identity = req.body.identity ? req.body.identity : ''
    newmsg.date = new Date().format('yyyy年MM月dd日 HH:mm:ss')


    console.log('newmsg=>', newmsg)


    usermsg.findOneAndUpdate({ _id }, { $set: newmsg }, { new: true }).then(site => {
        console.log('更新site=>', site)
        if (site) {
            res.status(200).json({ status: 200, result: site })
        } else {
            res.status(200).json({ status: 200, result: [] })
        }
    }).catch(error => {
        res.status(500).json({ status: 500, result: '修改个人信息失败，服务器内部错误' })
    })

})
router.get('/rowsite', (req, res) => {
    const _id = req.body._id
    userlike.find()
        .then(equitments => {
            // console.log('获取所有的器材 allsite=>', sites)
            res.status(200).json({ status: 200, result: equitments })
        }).catch(err => {
            res.status(500).json({ status: 500, result: err })
        })
})
// 添加收藏
router.post('/site/like', (req, res) => {
    const siteName = req.body.siteName
    const siteAmount = req.body.siteAmount
    const siteAddress = req.body.siteAddress
    const siteTime = req.body.siteTime
    const sitePhone = req.body.sitePhone
    const siteIntroduce = req.body.siteIntroduce
    const style = req.body.style
    const poster = req.body.poster
    const siteId = req.body._id

    const date = new Date().format("yyyy/MM/dd HH:mm:ss")
    // 去重的判断
    userlike.findOne({ siteName }).then(hasOne => {
        if (hasOne) {
            const isExist = hasOne.siteAddress === siteAddress
            if (isExist) {//场地地址
                res.status(200).json({ status: 200, result: '场地已经存在，请勿重复添加' })
            } else {
                const site = {
                    siteName,
                    siteAmount,
                    siteAddress,
                    siteTime,
                    sitePhone,
                    siteIntroduce,
                    style,
                    date,
                    poster,
                    siteId
                }
                const newSite = new userlike(site)
                newSite.save().then(() => {
                    // 返回的数据是json格式的
                    res.json({ status: '200', result: '添加收藏场地成功' })
                }).catch(err => {
                    // console.log('添加收藏场地err=>', err)
                    res.status(500).json({ status: 500, result: '添加场地失败，服务器内部错误' })
                })

            }
        } else {//场地不存在
            const site = {
                siteName,
                siteAmount,
                siteAddress,
                siteTime,
                sitePhone,
                siteIntroduce,
                style,
                date,
                poster,
                siteId

            }
            const newSite = new userlike(site)
            newSite.save().then(() => {
                // 返回的数据是json格式的
                res.json({ status: '200', result: '添加场地成功' })
            }).catch(err => {
                console.log('添加场地err=>', err)
                res.status(500).json({ status: 500, result: '添加场地失败，服务器内部错误' })
            })

        }
    })

})
// 预约场地
router.post('/site/sub', (req, res) => {
    const subsite = req.body.subsite[0]
    console.log(subsite);
    const subdate = req.body.subdate
    const subtime = JSON.stringify(req.body.subtime)
    const subphone = req.body.subphone
    const subId = req.body.subId

    siteModel.findOne({ _id: subsite._id }).then(hasOne => {
        if (hasOne) {
            if (Number(hasOne.siteAmount) < 0) {

            } else {
                const site = {
                    subsite: JSON.stringify(subsite),
                    subdate,
                    subtime,
                    subphone,
                    subId

                }
                const newSite = new subSite(site)
                newSite.save().then(() => {
                    // 返回的数据是json格式的
                    res.json({ status: '200', result: '预约场地成功' })

                }).catch(err => {
                    console.log('添加收藏场地err=>', err)
                    res.status(500).json({ status: 500, result: '预约场地失败，服务器内部错误' })
                })
                let siteAmount = Number(hasOne.siteAmount) - 1
                siteModel.findOneAndUpdate({ _id: subId }, { $set: { siteAmount: siteAmount } }, { new: true })
                    .then(site => {
                        if (site) {
                            // res.status(200).json({ status: 200, result: site })
                        } else {
                            // res.status(200).json({ status: 200, result: [] })
                        }
                    }).catch(err => {
                        console.log('xxx=>', err)
                    })

            }

        } else {


        }
    })

})
// 预约器材
router.post('/equit/sub', (req, res) => {
    const subsite = req.body.subsite[0]
    // console.log(subsite);
    const subdate = req.body.subdate
    const subtime = JSON.stringify(req.body.subtime)
    const subphone = req.body.subphone
    const subId = req.body.subId

    equipModel.findOne({ _id: subsite._id }).then(hasOne => {
        if (hasOne) {
            if (Number(hasOne.siteAmount) < 0) {

            } else {
                const site = {
                    subsite: JSON.stringify(subsite),
                    subdate,
                    subtime,
                    subphone,
                    subId

                }
                const newSite = new subequip(site)
                newSite.save().then(() => {
                    // 返回的数据是json格式的
                    res.json({ status: '200', result: '预约器材成功' })

                }).catch(err => {
                    // console.log('添加收藏场地err=>', err)
                    res.status(500).json({ status: 500, result: '预约器材失败，服务器内部错误' })
                })
                let siteAmount = Number(hasOne.siteAmount) - 1
                equipModel.findOneAndUpdate({ _id: subId }, { $set: { siteAmount: siteAmount } }, { new: true })
                    .then(site => {
                        if (site) {
                            // res.status(200).json({ status: 200, result: site })
                        } else {
                            // res.status(200).json({ status: 200, result: [] })
                        }
                    }).catch(err => {
                        console.log('xxx=>', err)
                    })

            }

        } else {


        }
    })

})
// 删除收藏
router.post('/deletelike', (req, res) => {
    const _id = req.body._id
    userlike.deleteOne({ _id }, (err) => {
        if (err) {
            res.status(500).json({ status: 500, result: '删除失败' })
        } else {
            res.status(200).json({ status: 200, result: '删除成功' })
        }
    })
}),
    // 添加场地
    router.post('/site/add', (req, res) => {
        const siteName = req.body.siteName
        const siteAmount = req.body.siteAmount
        const siteAddress = req.body.siteAddress
        const siteTime = req.body.siteTime
        const sitePhone = req.body.sitePhone
        const siteIntroduce = req.body.siteIntroduce
        const style = req.body.style
        const poster = req.body.poster

        const date = new Date().format("yyyy/MM/dd HH:mm:ss")
        // 去重的判断
        Site.findOne({ siteName }).then(hasOne => {
            if (hasOne) {
                const isExist = hasOne.siteAddress === siteAddress
                if (isExist) {//场地地址
                    res.status(200).json({ status: 200, result: '场地已经存在，请勿重复添加' })
                } else {
                    const site = {
                        siteName,
                        siteAmount,
                        siteAddress,
                        siteTime,
                        sitePhone,
                        siteIntroduce,
                        style,
                        date,
                        poster,

                    }
                    const newSite = new Site(site)
                    newSite.save().then(() => {
                        // 返回的数据是json格式的
                        res.json({ status: '200', result: '添加场地成功' })
                    }).catch(err => {
                        console.log('添加场地err=>', err)
                        res.status(500).json({ status: 500, result: '添加场地失败，服务器内部错误' })
                    })

                }
            } else {//场地不存在
                const site = {
                    siteName,
                    siteAmount,
                    siteAddress,
                    siteTime,
                    sitePhone,
                    siteIntroduce,
                    style,
                    date,
                    poster,

                }
                const newSite = new Site(site)
                newSite.save().then(() => {
                    // 返回的数据是json格式的
                    res.json({ status: '200', result: '添加场地成功' })
                }).catch(err => {
                    console.log('添加场地err=>', err)
                    res.status(500).json({ status: 500, result: '添加场地失败，服务器内部错误' })
                })

            }
        })

    })

// 用户登录
// 跟app相似，就到登录的接口
router.post('/account/userlogin', (req, res) => {
    // 判断用户名和密码
    const email = req.body.email
    // 判断用户名是否存在
    usermsg.findOne({ email })
        .then(admin => {
            if (!admin) {
                res.status(406).json({ status: 406, result: '用户名或者密码不存在' })
            } else {
                const password = req.body.pass
                console.log(admin)
                // 把用户输入的密码和数据库中的密码比对
                const isVaildPassword = bcrypt.compareSync(password, admin.password)
                if (!isVaildPassword) {
                    res.status(406).json({ status: 406, result: '用户名或者密码错误' })
                } else {
                    // 颁发token
                    const rule = {
                        id: String(admin._id),
                        email: admin.email,
                        username: admin.username,
                        date: admin.date,
                        identity: admin.identity
                    }
                    // 签证
                    jwt.sign(rule, jwtKey, { expiresIn: 36000 }, (err, token) => {
                        if (err) {
                            res.status(500).json({ status: '500', result: '生成token失败，服务器内部错误' })
                        } else {
                            res.status(200).json({ status: 200, result: '登录成功', token: 'Bearer ' + token })
                        }
                    })

                }
            }
        })
    // 用户名存在就验证这个用户的密码

})
// 用户注册接口
router.post('/account/userregister', (req, res) => {
    const email = req.body.email;
    const avatar = '';
    const nickname = '';
    const age = '';
    const sex = '';
    const mobilePhoneNumber = '';
    const id = '';
    const account = '';
    const area = '';
    const hobby = '';
    const work = '';
    const design = '';
    const poster = '';
    const username = ''
    // 判断邮箱是否存在
    // 寻找email是否存在
    console.log(email)
    usermsg.findOne({ email }).then(hasOne => {
        if (hasOne) {
            // 如果存在就显示邮箱被占用
            // 返回422
            res.status(422).json({ status: 422, result: '邮箱已经存在' })
        } else {
            // const username = req.body.username
            const password = req.body.pass


            const identity = req.body.identity ? req.body.identity : null

            const date = new Date().format('yyyy/MM/dd HH:mm:ss')

            const newAdmin = new usermsg({
                // 每一个key的名称应该和数据库的文档字段名称一致
                email,
                username,
                // password:bcrypt.hashSync(password,10)
                password,
                identity,
                date,
                avatar,
                nickname,
                age,
                mobilePhoneNumber,
                sex,
                id,
                account,
                area,
                hobby,
                poster,
                design,
                work,
            })

            newAdmin.save().then(() => {
                // 返回的数据是json格式的
                res.json({ status: '200', result: '注册成功' })
            }).catch(err => {
                res.status(500).json({ status: '500', result: '注册失败,服务器内部错误' })
            })

        }
    })


})

module.exports = router