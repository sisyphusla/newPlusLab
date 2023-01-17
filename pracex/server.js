
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
// 声明使用解析post请求的中间件
app.use(express.urlencoded({ extended: true })); // 请求体参数是: name=tom&pwd=123
app.use(express.json()); // 请求体参数是json结构: {name: tom, pwd: 123}

// 声明使用解析cookie数据的中间件
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));
// 声明使用路由器中间件
const indexRouter = require("./routers");
app.use("/", indexRouter);


const course = require("./routers/course");
app.use("/",course);
const fs = require("fs");

// 通过mongoose连接数据库
mongoose
  .connect("mongodb://127.0.0.1:27017/server_db1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("连接数据库成功!!!");
    // 只有当连接上数据库后才去启动服务器
    app.listen("5000", () => {
      console.log("服务器启动成功, 请访问: http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("连接数据库失败", error);
  });
