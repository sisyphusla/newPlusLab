const express = require('express')
const md5 = require('blueimp-md5')


const UserModel = require('../models/UserModel')
const ProductModel = require('../models/ProductModel')
const RoleModel = require('../models/RoleModel')
const StockModel = require('../models/StockModel')
// const LessonModel = require('../models/LessonModel')


const router = express.Router()

  //登入
router.post('/login', (req, res) => {
    const {username, password} = req.body
    // 根据username和password查詢數據庫users
    UserModel.findOne({username, password: md5(password)})
      .then(user => {
        if (user) { // 登入成功
          // 生成一个cookie(userid: user._id), 并交给瀏覽器保存
          res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
          // if (user.role_id) {
          //   RoleModel.findOne({_id: user.role_id})
          //     .then(role => {
          //       user._doc.role = role
          //       console.log('role user', user)
          //       res.send({status: 0, data: user})
          //     })
          // } else {
            // user._doc.role = {menus: []}
            // 返回登入成功信息(包含user)
            res.send({status: 0, data: user})
          // }
  
        } else {// 登陆失败
          res.send({status: 1, msg: '用户名或密码不正确!'})
        }
      })
      .catch(error => {
        console.error('登陆异常', error)
        res.send({status: 1, msg: '登陆异常, 请重新尝试'})
      })
  })


  // 獲取文章列表
router.get('/manage/article/list', (req, res) => {
    const {pageNum, pageSize,username} = req.query
    if(!!username){
      ProductModel.find({username})
      .then(article => {
        res.send({status: 0, data: pageFilter(article, pageNum, pageSize)})
      })
      .catch(error => {
        console.error('獲取異常', error)
        res.send({status: 1, msg: '獲取異常'})
      })
    }else{
      ProductModel.find({})
      .then(article => {
        res.send({status: 0, data: pageFilter(article, pageNum, pageSize)})
      })
      .catch(error => {
        console.error('獲取商品列表異常', error)
        res.send({status: 1, msg: '獲取商品列表異常'})
      })
    }
    
  })

//   // 獲取課程列表
// router.get('/manage/lesson/list', (req, res) => {
//   const {pageNum, pageSize,username} = req.query
//   if(!!username){
//     LessonModel.find({username})
//     .then(article => {
//       res.send({status: 0, data: pageFilter(article, pageNum, pageSize)})
//     })
//     .catch(error => {
//       console.error('獲取異常', error)
//       res.send({status: 1, msg: '獲取異常'})
//     })
//   }else{
//     LessonModel.find({})
//     .then(article => {
//       res.send({status: 0, data: pageFilter(article, pageNum, pageSize)})
//     })
//     .catch(error => {
//       console.error('獲取課程列表異常', error)
//       res.send({status: 1, msg: '獲取課程列表異常'})
//     })
//   }
  
// })



  // 發表文章
router.post('/manage/article/add', (req, res) => {
  const product = req.body
  ProductModel.create(product)
    .then(product => {
      res.send({status: 0, data: product})
    })
    .catch(error => {
      res.send({status: 1, msg: '發表文章異常, 请重新嘗試'})
    })
})

// 更新文章
router.post('/manage/article/update', (req, res) => {
  const product = req.body
  ProductModel.findOneAndUpdate({_id: product._id}, product)
    .then(oldProduct => {
      res.send({status: 0})
    })
    .catch(error => {
      console.error('更新商品異常', error)
      res.send({status: 1, msg: '更新商品名稱異常, 請重新嘗試'})
    })
})


// 搜索文章列表
router.get('/manage/article/search', (req, res) => {
  const {pageNum, pageSize, searchName, productName, productAuth} = req.query
  let contition = {}
  if (productName) {
    contition = {name: new RegExp(`^.*${productName}.*$`)}
  } else if (productAuth) {
    contition = {author: new RegExp(`^.*${productAuth}.*$`)}
  }
  ProductModel.find(contition)
    .then(products => {
      res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
    })
    .catch(error => {
      console.error('搜索商品列表異常', error)
      res.send({status: 1, msg: '搜索商品列表異常'})
    })
})



// 獲取角色列表
router.get('/manage/role/list', (req, res) => {
  RoleModel.find()
    .then(roles => {
      res.send({status: 0, data: roles})
    })
    .catch(error => {
      console.error('獲取腳色列表異常', error)
      res.send({status: 1, msg: '獲取腳色列表異常'})
    })
})


// 添加角色
router.post('/manage/role/add', (req, res) => {
  const {roleName} = req.body
  RoleModel.create({name: roleName})
    .then(role => {
      res.send({status: 0, data: role})
    })
    .catch(error => {
      console.error('添加角色異常', error)
      res.send({status: 1, msg: '添加角色異常'})
    })
})


// 更新角色權限
router.post('/manage/role/update', (req, res) => {
  const role = req.body
  role.auth_time = Date.now()
  RoleModel.findOneAndUpdate({_id: role._id}, role)
    .then(oldRole => {
      // console.log('---', oldRole._doc)
      res.send({status: 0, data: {...oldRole._doc, ...role}})
    })
    .catch(error => {
      console.error('更新角色異常', error)
      res.send({status: 1, msg: '更新角色異常'})
    })
})

// 授權用戶權限
router.post('/manage/user/update', (req, res) => {
  const user = req.body
  
  UserModel.findOneAndUpdate({_id: user._id}, user)
    .then(oldUser => {
      // console.log('---', oldRole._doc)
      res.send({status: 0, data: {...oldUser._doc, ...user}})
    })
    .catch(error => {
      console.error('更新角色異常', error)
      res.send({status: 1, msg: '更新角色異常, 請重新嘗試'})
    })
})

// 獲取所有用戶列表
router.get('/manage/user/list', (req, res) => {
  UserModel.find({username: {'$ne': 'admin'}})
    .then(users => {
      // RoleModel.find().then(roles => {
        res.send({status: 0, data: {users}})
      // })
    })
    .catch(error => {
      console.error('獲取用戶列表異常', error)
      res.send({status: 1, msg: '獲取用戶列表異常'})
    })
})

// 删除用户
router.post('/manage/user/delete', (req, res) => {
  const {userId} = req.body
  UserModel.deleteOne({_id: userId})
    .then((doc) => {
      res.send({status: 0})
    })
})

// 添加用户
router.post('/manage/user/add', (req, res) => {
  // 讀取請求參數數據
  const {username, password} = req.body
  // 判斷用戶是否存在
  // 根據username查詢
  UserModel.findOne({username})
    .then(user => {
      // 如果user有值(已存在)
      if (user) {
       
        res.send({status: 1, msg: '此用户已存在'})
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 保存
        return UserModel.create({...req.body, password: md5(password || 'atguigu')})
      }
    })
    .then(user => {
      // 返回包含user的json數據
      res.send({status: 0, data: user})
    })
    .catch(error => {
      console.error('註冊異常', error)
      res.send({status: 1, msg: '添加用戶異常'})
    })
})

// 更新用户
router.post('/manage/user/update', (req, res) => {
  const user = req.body
  UserModel.findOneAndUpdate({_id: user._id}, user)
    .then(oldUser => {
      const data = Object.assign(oldUser, user)
      // 返回
      res.send({status: 0, data})
    })
    .catch(error => {
      console.error('更新用户異常', error)
      res.send({status: 1, msg: '更新用户異常'})
    })
})

// 儲存股票資訊
router.post('/manage/stock/add', (req, res) => {
  const stock = req.body
  StockModel.create(stock)
    .then(product => {
      res.send({status: 0, data: product})
    })
    .catch(error => {
      res.send({status: 1, msg: '儲存股票異常'})
    })
})

// 獲取所有股票列表
router.get('/manage/stock/list', (req, res) => {
  StockModel.find()
    .then(stocks => {
        res.send({status: 0, data: stocks})
    })
    .catch(error => {
      console.error('獲取股票列表異常', error)
      res.send({status: 1, msg: '獲取股票列表異常'})
    })
})

function pageFilter(arr, pageNum, pageSize) {
  pageNum = pageNum * 1
  pageSize = pageSize * 1
  const total = arr.length
  const pages = Math.floor((total + pageSize - 1) / pageSize)
  const start = pageSize * (pageNum - 1)
  const end = start + pageSize <= total ? start + pageSize : total
  const list = []
  for (var i = start; i < end; i++) {
    list.push(arr[i])
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  }
}

require('./file-upload')(router)

  module.exports = router
