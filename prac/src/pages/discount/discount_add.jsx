import React, { Component } from "react";
import { Form, Card, Input, Button, Icon, message, DatePicker, InputNumber } from "antd";

import LinkButton from "../../components/link-button";
import RichTextEdit from "./rich-text-edit";
import { reqAddDiscount } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import storageUtils from "../../utils/storageUtils";

const { Item } = Form;

class DiscountAdd extends Component {
  edit = React.createRef();
 state={value:100};
  submit = () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        //蒐集數據
        const { username } = storageUtils.getUser();
        const { name, author } = values;
        const detail = this.edit.current.getDetail();
        const update = formateDate(Date.now());
        
        const discount = { username, name, author, detail, update };
        //如果是修改要加_id
        if (this.isUpdate) {
          discount._id = this.discount._id;
        }
        //調用街口去發表文章
        const result = await reqAddDiscount(discount);
        if (result.status === 0) {
          message.success(`${this.isUpdate ? "修改" : "發表"}優惠劵成功`);
          this.props.history.goBack();
        } else {
          message.error(`${this.isUpdate ? "修改" : "發表"}優惠劵失敗`);
        }
      }
    });
  };
 
   
  onChangepercent = (newValue) => {
      this.setState({ value: newValue });
      
    };
  componentWillMount() {
    const discount = this.props.location.state; //如果是修改代表有值，否則沒值
    this.isUpdate = !!discount; //強制轉換成布林值，保存是否為點擊修改
    this.discount = discount || {};
  }
 
  render() {
     console.log(this);
    const { isUpdate, discount } = this;
    const { detail } = discount;
    const { getFieldDecorator } = this.props.form;
  
    const formItemLayout = {
      wrapperCol: { span: 12 },
    };

    const title = (
      <span>
        <LinkButton
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          <Icon type="arrow-left" />
        </LinkButton>
        <span>{isUpdate ? "修改優惠劵" : "添加優惠劵"}</span>
      </span>
    );

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>
              優惠劵名稱:
            </div>
            {getFieldDecorator("name", {
              initialValue: discount.name,
              rules: [{ required: true, message: "必須輸入優惠劵名稱" }],
            })(<Input placeholder="請輸入優惠劵(上限25字)" maxLength={25} />)}
          </Item>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>發放者:</div>
            {getFieldDecorator("author", {
              initialValue: discount.author,
              rules: [{ required: true, message: "必須輸入發放者" }],
            })(<Input placeholder="請輸入發放者(上限25字)" maxLength={25} />)}
          </Item>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>折扣碼:</div>
            {getFieldDecorator("discountCode", {
              initialValue: discount.discountCode,
              rules: [{ required: true, message: "必須輸入折扣碼" }],
            })(<Input placeholder="請輸入折扣碼(上限25字)" maxLength={25} />)}
          </Item>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>
              折扣百分比:
            </div>
            {getFieldDecorator("discount", {
              initialValue: discount.discount,
              rules: [{ required: true, message: "必須輸入折扣碼" }],
            })(
              <InputNumber
                defaultValue={this.state.value}
                min={0}
                step={5}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={this.onChangepercent}
              />
            )}
          </Item>
          <Item>
            <div style={{ fontWeight: "bolder", fontSize: 15 }}>有效期間:</div>
            {getFieldDecorator("EXP", {
              initialValue: discount.EXP,
              rules: [{ required: true, message: "必須輸入有效期間" }],
            })(
              <DatePicker.RangePicker
                style={{
                  width: "50%",
                }}
                placeholder="請輸入有效期間"
                maxLength={25}
              />
            )}
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              發送
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

const Discount = Form.create()(DiscountAdd);
export default Discount;
