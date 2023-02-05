/*
能操作products集合數據的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const dateThailand = formateDate(moment.tz(Date.now(), "Asia/Taipei"));

// function formateDate(time) {
//   if (!time) return ''
//   let date = new Date(time)
//   return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
//   + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
//   }


// 2.定義Schema
const discountsSchema = new mongoose.Schema({
    EXP: { type: Date, required: true, default: new Date() },
    discountName: { type: String, required: true },
    discountCode: { type: String, required: true },
    discount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }

)


// 3. 定義Model(與集合對應, 可以操作集合)
const DiscountsModel = mongoose.model("discounts", discountsSchema);

// 4. 向外暴露Model
module.exports = DiscountsModel;