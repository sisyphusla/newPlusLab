import React, { useState, useRef } from 'react'
import { Form, Card, Input, Button, Icon, message } from 'antd'

import LinkButton from '../../components/link-button'
import { reqAddLesson } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
// import PicturesLesson from './picture'
import Courseadd from './Courseadd'
// import { BASE_IMG_URL } from '../../utils/constant'
import axios from 'axios';

const { Item } = Form;

function LessonAdd(props) {

  const [chapterList, setChapterList] = useState([])
  const [subChapterList, setSubChapterList] = useState([])
  const [courseVideo, setCourseVideo] = useState([]);
  const [article, setArticle] = useState(props.location.state || {})
  const [isUpdate, setIsUpdate] = useState(!!props.location.state)
  // const lv = useRef()



  const sendCourseListToBackend = async (courseList) => {
    try {
      const result = await axios.post('http://localhost:8800/courseadd', { courseList });
      if (result.status === 200) {
        message.success('傳送資料到後端成功');
      } else {
        message.error('傳送資料到後端失敗');
      }
    } catch (error) {
      message.error(`發生錯誤: ${error}`);
    }
  };


  // const sendCourseNameToBackend = async (article) => {
  //   try {
  //     const result = await axios.post('http://localhost:8800/courseadd', { article });
  //     if (result.status === 200) {
  //       message.success('傳送資料到後端成功');
  //     } else {
  //       message.error('傳送資料到後端失敗');
  //     }
  //   } catch (error) {
  //     message.error(`發生錯誤: ${error}`);
  //   }
  // };

  const sendVideoToBackend = async () => {
    try {
      // 使用 FormData 將檔案和資料一起傳遞
      const formData = new FormData();
      courseVideo.forEach((video, index) => {
        video.forEach((subVideo, subIndex) => {
          formData.append(`video`, subVideo);
        });
      });

      const res = await axios.post('http://localhost:8800/coursevideo', formData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  const submit = (e) => {
    e.preventDefault();

    props.form.validateFields(async (error, values) => {
      if (!error) {
        //蒐集數據
        const { username } = storageUtils.getUser()
        const { name, author } = values
        // const lessonvideo = lv.current.getImg()
        // const detail = BASE_IMG_URL + lessonvideo;
        const update = formateDate(Date.now());
        const article = { username, name, author, update };
        //如果是修改要加_id
        if (isUpdate) {
          article._id = article._id
        }
        const hasEmptyOrUndefined = courseVideo.flat().some(val => val === "" || val === undefined);
        if (hasEmptyOrUndefined) {
          message.warning("courseVideo 中存在空或未定義的值，請確認后再發表");
          return;
        }
        //調用接口去發表課程
        const result = await reqAddLesson(article);
        if (result.status === 0 && courseVideo.flat().some(val => val !== "" || val !== undefined)) {
          message.success(`${isUpdate ? '修改' : '發表'}課程成功`);
          props.history.goBack()

          let courseList = [{ classname: article.name }].concat(chapterList.map((title, index) => ({
            title,
            content: subChapterList[index]
          }))
          )
          sendCourseListToBackend(courseList);

          console.log(courseList)
          sendVideoToBackend();
        } else {
          message.error(`${isUpdate ? '修改' : '發表'}文章失敗，請檢查是否完成上傳影片`);
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
          <div style={{ fontWeight: 'bolder', fontSize: 15 }}>課程標題:</div>
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
          <div style={{ fontWeight: 'bolder', fontSize: 15 }}>作者:</div>
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
        <Courseadd
          getChapterList={setChapterList}
          getSubChapterList={setSubChapterList}
          getCourseVideo={setCourseVideo}
        />
        <Item>
          <Button type='primary' onClick={submit}>發表</Button>
        </Item>
      </Form>
    </Card>
  )

}

export default Form.create()(LessonAdd);