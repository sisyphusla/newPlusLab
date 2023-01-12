import React, { Component } from 'react'
import { message,Icon} from 'antd'

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import Nav from '../../components/nav/Nav'
import NavLogOut from '../../components/nav/NavLogOut'
import Footer from "../../components/footer/Footer";
import './profile.css'
import {reqUpdateUser} from '../../api/index'
import PicturesWall from './picture'
import {BASE_IMG_URL} from '../../utils/constant'
import profilePic from  "../../assets/imgs/profilePic.png";



export default class Profile extends Component {

  pw = React.createRef();

  beTeacher=async()=>{
    const user=  storageUtils.getUser()
    user.auth_status = '請求當老師'
    const result = await reqUpdateUser(user)
    if(result.status === 0){
      storageUtils.saveUser(user); //保存到local中
      memoryUtils.user = user; //保存到內存中
      
      message.success('請求成功')
    }else{
      message.error('請求失敗')
    
    }
  }

  
  profilSubmit=async()=>{
    const img = this.pw.current.getImg()
    const user=  storageUtils.getUser()
    user.user_profile = BASE_IMG_URL+img
    const result = await reqUpdateUser(user)
    if(result.status === 0){
      storageUtils.saveUser(user); //保存到local中
      memoryUtils.user = user; //保存到內存中
      message.success('更新大頭貼成功')
    }else{
      message.error('更新大頭貼失敗')
    
    }
  }

  render() {
    // const {username,auth_level} = storageUtils.getUser()
    const username1 = memoryUtils.user.username ||memoryUtils.user.displayName || '';
    const {user_profile,auth_level,username} = storageUtils.getUser()
    return (
      <div>
        {username1 ?<Nav />:<NavLogOut/>}
        <div className='profileDiv'>
          <div className='profileDivTop'>
            <img src={user_profile ? user_profile : profilePic} alt="" style={{width:60,height:60,borderRadius:'50%',objectFit:'cover'}}/>
            <div className='topDiv'>
              <Icon type="star" theme="filled" style={{color:'white',fontSize:25}}/>
              <span className='topDivLv'>Lv.{(username==='admin')?'4':auth_level}</span>
            </div>
            <div className='downDiv'></div>
          </div>
          {/* <button onClick={this.beTeacher}>我要當老師</button>
          <PicturesWall ref={this.pw}/>
          <button onClick={this.profilSubmit}>提交</button> */}
        </div>
        
        <Footer/>
      </div>
    )
  }
}
