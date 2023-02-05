import React, { useState, useRef } from 'react'
import { Form, Card, Input, Button, Icon, message } from 'antd'

import LinkButton from '../../components/link-button'
import { reqAddLesson } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import PicturesLesson from './picture'
import { BASE_IMG_URL } from '../../utils/constant'

const { Item } = Form;

function LessonAdd(props) {

  const [article, setArticle] = useState(props.location.state || {})
  const [isUpdate, setIsUpdate] = useState(!!props.location.state)
  const lv = useRef()

  const submit = () => {
    props.form.validateFields(async (error, values) => {
      if (!error) {
        //蒐集數據
        const { username } = storageUtils.getUser()
        const { name, author } = values
        const lessonvideo = lv.current.getImg()
        const detail = BASE_IMG_URL + lessonvideo;
        const update = formateDate(Date.now());
        const article = { username, name, author, lessonvideo, detail, update };
        //如果是修改要加_id
        if (isUpdate) {
          article._id = article._id
        }
        //調用接口去發表課程
        const result = await reqAddLesson(article);
        if (result.status === 0) {
          message.success(`${isUpdate ? '修改' : '發表'}課程成功`);
          props.history.goBack()
        } else {
          message.error(`${isUpdate ? '修改' : '發表'}文章失敗`);
        }
      }
    })
  }

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    wrapperCol: { span: 12 },
  };

  const title = (
    <span>
      <LinkButton onClick={() => { props.history.goBack() }}>
        <Icon type='arrow-left' />
      </LinkButton>
      <span>{isUpdate ? '修改課程' : '添加課程'}</span>
    </span>
  )

  return (
    <Card title={title}>
      <Form {...formItemLayout}>
        <Item>
          <div style={{ fontWeight: 'bolder', fontSize: 15 }}>課程標題123:</div>
          {getFieldDecorator('name', {
            initialValue: article.name,
            rules: [
              { required: true, message: '必須輸入課程標題' }
            ]
          })(
            <Input
              placeholder='請輸入標題(上限25字)'
              maxLength={25}
            />
          )}
        </Item>
        <Item>
          <div style={{ fontWeight: 'bolder', fontSize: 15 }}>作者123:</div>
          {getFieldDecorator('author', {
            initialValue: article.author,
            rules: [
              { required: true, message: '必須輸入作者' }
            ]
          })(
            <Input
              placeholder='請輸入作者'
            />
          )}
        </Item>
        <Item>
          <div style={{ fontWeight: 'bolder', fontSize: 15 }}>上傳課程影片:</div>
          <PicturesLesson ref={lv} img={article.lessonvideo} />
        </Item>
        <Item>
          <Button type='primary' onClick={submit}>發表</Button>
        </Item>
      </Form>
    </Card>
  )

}

export default Form.create()(LessonAdd);