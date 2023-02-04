import React, { Component } from 'react'
import {Switch,Route ,Redirect} from 'react-router-dom'




import "./discount.css";
import DiscountHome from './home'
import DiscountDetail from "./detail";
import DiscountAdd from "./discount_add";

export default class Discount extends Component {
  render() {
    return (
      <Switch>
        <Route path="/admin/discount" component={DiscountHome} exact></Route>
        <Route path="/admin/discount/addupdate" component={DiscountAdd}></Route>
        <Route path="/admin/discount/detail" component={DiscountDetail}></Route>
        <Redirect to="/admin/discount"></Redirect>
      </Switch>
    );
  }
}
