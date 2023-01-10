import React, { Component } from 'react'
import {Switch,Route ,Redirect} from 'react-router-dom'

import MyArticleHome from './home'
import MyArticleAdd from './article-add'
import MyArticleDetail from './detail'
import './article.css'



export default class MyArticle extends Component {
  render() {
    return (
      <Switch>
        <Route path='/admin/myarticle' component={MyArticleHome} exact></Route>
        {/* <Route path='/admin/myarticle/addupdate' component={MyArticleAdd}></Route>
        <Route path='/admin/myarticle/detail' component={MyArticleDetail}></Route>
        <Redirect to= '/admin/myarticle'></Redirect> */}
      </Switch>
    )
  }
}
