const express = require('express')
const md5 = require('blueimp-md5')
const fs = require("fs");

const UserModel = require('../models/UserModel')
const ProductModel = require('../models/ProductModel')
const RoleModel = require('../models/RoleModel')
// const CartModel = require("../models/CartModel");


const router = express.Router()

  //登入
router.post('/login', (req, res) => {
    const {username, password} = req.body
    // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
    UserModel.findOne({username, password: md5(password)})
      .then(user => {
        if (user) { // 登陆成功
          // 生成一个cookie(userid: user._id), 并交给浏览器保存
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
            // 返回登陆成功信息(包含user)
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
    ProductModel.find({} || username)
      .then(article => {
        res.send({status: 0, data: pageFilter(article, pageNum, pageSize)})
      })
      .catch(error => {
        console.error('获取商品列表异常', error)
        res.send({status: 1, msg: '获取商品列表异常, 请重新尝试'})
      })
  })



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
      console.error('搜索商品列表异常', error)
      res.send({status: 1, msg: '搜索商品列表异常, 请重新尝试'})
    })
})



// 獲取角色列表
router.get('/manage/role/list', (req, res) => {
  RoleModel.find()
    .then(roles => {
      res.send({status: 0, data: roles})
    })
    .catch(error => {
      console.error('获取角色列表异常', error)
      res.send({status: 1, msg: '获取角色列表异常, 请重新尝试'})
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
      console.error('添加角色异常', error)
      res.send({status: 1, msg: '添加角色异常, 请重新尝试'})
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
      console.error('更新角色异常', error)
      res.send({status: 1, msg: '更新角色异常, 请重新尝试'})
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

// 获取所有用户列表
router.get('/manage/user/list', (req, res) => {
  UserModel.find({username: {'$ne': 'admin'}})
    .then(users => {
      // RoleModel.find().then(roles => {
        res.send({status: 0, data: {users}})
      // })
    })
    .catch(error => {
      console.error('获取用户列表异常', error)
      res.send({status: 1, msg: '获取用户列表异常, 请重新尝试'})
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
  // 读取请求参数数据
  const {username, password} = req.body
  // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
  // 查询(根据username)
  UserModel.findOne({username})
    .then(user => {
      // 如果user有值(已存在)
      if (user) {
        // 返回提示错误的信息
        res.send({status: 1, msg: '此用户已存在'})
        return new Promise(() => {
        })
      } else { // 没值(不存在)
        // 保存
        return UserModel.create({...req.body, password: md5(password || 'atguigu')})
      }
    })
    .then(user => {
      // 返回包含user的json数据
      res.send({status: 0, data: user})
    })
    .catch(error => {
      console.error('注册异常', error)
      res.send({status: 1, msg: '添加用户异常, 请重新尝试'})
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
      console.error('更新用户异常', error)
      res.send({status: 1, msg: '更新用户异常, 请重新尝试'})
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




  


 