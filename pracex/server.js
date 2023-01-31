const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
// 声明使用解析post请求的中间件
app.use(express.urlencoded({ extended: true })); // 请求体参数是: name=tom&pwd=123
app.use(express.json()); // 请求体参数是json结构: {name: tom, pwd: 123}

// 聲明使用解析cookie數據的中間鍵
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));
// 聲明使用路由器中間件
const indexRouter = require("./routers");
app.use("/", indexRouter);

const courseRouter = require("./routers/course");
app.use("/course", courseRouter);

const cartRouter = require("./routers/cart");
app.use("/cart", cartRouter);

const collectionsRouter = require("./routers/collections");
app.use("/collection", collectionsRouter);

const orderRouter = require("./routers/order");
app.use("/orderCourse", orderRouter);

const fs = require("fs");

// 通過mongoose連接數據庫
mongoose
  .connect("mongodb://127.0.0.1:27017/server_db1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("連接數據庫成功!!!");
    // 只有當連上數據庫才去啟動服務器
    app.listen("5000", () => {
      console.log("服務器啟動成功, 請訪問: http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("連接數據庫失敗", error);
  });
