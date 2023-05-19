const router = require('express').Router()
const bcrypt = require('bcrypt')
const uploadImg = require('../config/uploadImg')
const path = require('path')

// TOKEN相关
const jwt = require('jsonwebtoken')
const jwtKey = require('../secret/jwtkey').KEYORSECRET
// 数据库模型
const Admin = require('../dbModel/admin')
const Site = require('../dbModel/site')
const Equipment = require('../dbModel/equipment')
// const Personmsg = require('../dbModel/personmsg')
// const admin = require('../dbModel/admin')
const mylike = require('../dbModel/mylikesites')
require('../config/Date')
// 获取收藏夹的信息
router.get('/rowsite', (req, res) => {
    const _id = req.body._id
    mylike.find()
        .then(equitments => {
            // console.log('获取所有的器材 allsite=>', sites)
            res.status(200).json({ status: 200, result: equitments })
        }).catch(err => {
            res.status(500).json({ status: 500, result: err })
        })
})
// 获取所有的场地
router.get('/allsite', (req, res) => {
    Site.find()
        .then(sites => {
            console.log('获取所有的场地 allsite=>', sites)
            sites.length ? res.status(200).json({ status: 200, result: sites }) : res.status(200).json({ status: 200, result: [] })
        })
})
// 获取所有的器材
router.get('/allequipment', (req, res) => {
    Equipment.find()
        .then(equitments => {
            // console.log('获取所有的器材 allsite=>', sites)
            equitments.length ? res.status(200).json({ status: 200, result: equitments }) : res.status(200).json({ status: 200, result: [] })
        })
})
// 获取管理所有信息
router.post('/allpersonmsg', (req, res) => {
    const email = req.body.email
    Admin.findOne({ email })
        .then(equitments => {
            console.log('equitments=>', equitments)
            // console.log('获取所有的器材 allsite=>', sites)
            res.status(200).json({ status: 200, result: equitments })
        }).catch(err => {
            console.log('allpersonmsg err=>', err)
            res.status(500).json({ status: 500, result: err })
        })
})

// 上传图片到服务器文件夹
router.post('/upload/poster', (req, res) => {
    uploadImg(req, res)
})
// 获取场地图片地址的接口
router.get('/poster', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../static/poster/" + req.query.img))
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

    const date = new Date().format("yyyy/MM/dd HH:mm:ss")
    // 去重的判断
    mylike.findOne({ siteName }).then(hasOne => {
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
                const newSite = new mylike(site)
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

            }
            const newSite = new mylike(site)
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
// 添加器材
router.post('/equipment/add', (req, res) => {
    const equipmentName = req.body.equipmentName
    const equipmentAmount = req.body.equipmentAmount
    const equipmentstyle = req.body.equipmentstyle
    const equipmentuse = req.body.equipmentuse
    const equipmentspecification = req.body.equipmentspecification
    const equipmentIntroduce = req.body.equipmentIntroduce

    const poster = req.body.poster

    const date = new Date().format("yyyy/MM/dd HH:mm:ss")
    // 去重的判断
    Equipment.findOne({ equipmentName }).then(hasOne => {
        if (hasOne) {
            const isExist = hasOne.equipmentspecification === equipmentspecification
            if (isExist) {//场地地址
                res.status(200).json({ status: 200, result: '器材已经存在，请勿重复添加' })
            } else {
                const equipment = {
                    equipmentName,
                    equipmentAmount,
                    equipmentstyle,
                    equipmentuse,

                    equipmentIntroduce,
                    equipmentspecification,
                    date,
                    poster,

                }
                const newequipment = new Equipment(equipment)
                newequipment.save().then(() => {
                    // 返回的数据是json格式的
                    res.json({ status: '200', result: '添加器材成功' })
                }).catch(err => {
                    console.log('添加器材err=>', err)
                    res.status(500).json({ status: 500, result: '添加器材失败，服务器内部错误' })
                })

            }
        } else {//器材不存在
            const equipment = {
                equipmentName,
                equipmentAmount,
                equipmentstyle,
                equipmentuse,

                equipmentIntroduce,
                equipmentspecification,
                date,
                poster,

            }
            const newequipment = new Equipment(equipment)
            newequipment.save().then(() => {
                // 返回的数据是json格式的
                res.json({ status: '200', result: '添加器材成功' })
            }).catch(err => {
                console.log('添加器材err=>', err)
                res.status(500).json({ status: 500, result: '添加器材失败，服务器内部错误' })
            })

        }
    })

})
// 删除收藏
router.post('/deletelike', (req, res) => {
    const _id = req.body._id
    mylike.deleteOne({ _id }, (err) => {
        if (err) {
            res.status(500).json({ status: 500, result: '删除失败' })
        } else {
            res.status(200).json({ status: 200, result: '删除成功' })
        }
    })
}),

// 删除场地
    router.post('/deletesite', (req, res) => {
        const _id = req.body._id
        Site.deleteOne({ _id }, (err) => {
            if (err) {
                res.status(500).json({ status: 500, result: '删除失败' })
            } else {
                res.status(200).json({ status: 200, result: '删除成功' })
            }
        })
    }),

    // 删除器材
    router.post('/deletequitpment', (req, res) => {
        const _id = req.body._id
        Equipment.deleteOne({ _id }, (err) => {
            if (err) {
                res.status(500).json({ status: 500, result: '删除失败' })
            } else {
                res.status(200).json({ status: 200, result: '删除成功' })
            }
        })
    }),
    // 编辑场地
    router.post('/editsite', (req, res) => {
        console.log('编辑场地req=>', req.body)
        const siteId = req.body._id
        const newSite = {}
        newSite.siteName = req.body.siteName
        newSite.siteAmount = req.body.siteAmount
        newSite.siteAddress = req.body.siteAddress
        newSite.siteTime = req.body.siteTime
        newSite.sitePhone = req.body.sitePhone
        newSite.siteIntroduce = req.body.siteIntroduce
        newSite.style = req.body.style
        newSite.poster = req.body.poster

        Site.findOneAndUpdate({ _id: siteId }, { $set: newSite }, { new: true }).then(site => {
            console.log('更新site=>', site)
            res.status(200).json({ status: 200, result: '修改场地成功' })
        }).catch(error => {
            res.status(500).json({ status: 500, result: '修改场地失败，服务器内部错误' })
        })
        // Site.findOne({ siteId }, (err) => {
        //     if (err) {
        //         res.status(500).json({ status: 500, result: '删除失败' })
        //     } else {
        //         res.status(200).json({ status: 200, result: '删除成功' })
        //     }
        // })
    })
// 编辑器材
router.post('/editeqiupment', (req, res) => {
    console.log('编辑场地req=>', req.body)
    const equipmentId = req.body._id
    const newequipment = {}
    newequipment.equipmentName = req.body.equipmentName
    newequipment.equipmentAmount = req.body.equipmentAmount
    newequipment.equipmentstyle = req.body.equipmentstyle
    newequipment.equipmentuse = req.body.equipmentuse
    newequipment.equipmentIntroduce = req.body.equipmentIntroduce
    newequipment.equipmentspecification = req.body.equipmentspecification
    newequipment.poster = req.body.poster

    Equipment.findOneAndUpdate({ _id: equipmentId }, { $set: newequipment }, { new: true }).then(site => {
        console.log('更新site=>', site)
        res.status(200).json({ status: 200, result: '修改器材成功' })
    }).catch(error => {
        res.status(500).json({ status: 500, result: '修改器材失败，服务器内部错误' })
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


    Admin.findOneAndUpdate({ _id }, { $set: newmsg }, { new: true }).then(site => {
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
// 搜索场地
router.post('/search', (req, res) => {
    const name = req.body.inputSearch
    const ids = req.body.inputSearch ? req.body.inputSearch : ''
    let filter = {
        $or: [
            { siteName: name },
            { siteAddress: ids }
        ]
    }
    Site.find(filter).then(sites => {
        // console.log(student);
        sites.length != 0 ? res.status(200).json({ status: 200, result: sites }) : res.status(200).json({ status: 200, result: '暂无数据' })
        console.log(sites)
    }).catch(err => {
        res.status(200).json({ status: 200, result: '内部服务器错误' })
    })
})
// 搜索器材
router.post('/searche', (req, res) => {
    const name = req.body.inputSerche
    const ids = req.body.inputSerche ? req.body.inputSerche : ''
    let filter = {
        $or: [
            { equipmentName: name },
            { equipmentspecification: ids }
        ]
    }
    Equipment.find(filter).then(sites => {
        // console.log(student);
        sites.length != 0 ? res.status(200).json({ status: 200, result: sites }) : res.status(200).json({ status: 200, result: '暂无数据' })
        console.log(sites)
    }).catch(err => {
        res.status(200).json({ status: 200, result: '内部服务器错误' })
    })
})

// 管理员登录
// 跟app相似，就到登录的接口
router.post('/account/login', (req, res) => {
    // 判断用户名和密码
    const email = req.body.email
    // 判断用户名是否存在
    Admin.findOne({ email })
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
// 注册管理员
router.post('/account/register', (req, res) => {
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
    const poster = ''
    // 判断邮箱是否存在
    // 寻找email是否存在
    Admin.findOne({ email }).then(hasOne => {
        if (hasOne) {
            // 如果存在就显示邮箱被占用
            // 返回422
            res.status(422).json({ status: 422, result: '邮箱被占用' })
        } else {
            const username = req.body.username
            const password = req.body.password


            const identity = req.body.identity ? req.body.identity : null

            const date = new Date().format('yyyy/MM/dd HH:mm:ss')

            const newAdmin = new Admin({
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