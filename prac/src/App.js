import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
import Register from './pages/register'
import DashBoard from './pages/dashboard/DashBoard'
import VideoPage from './pages/videopage/VideoPage'
import Homepage from './pages/homepage/Homepage'
import Coursepage from './pages/coursepage/Coursepage'
import OrderHistoryPage from './pages/orderhistory/OrderHistoryPage'
import Cartpage from './pages/cartpage/Cartpage'
import Checkpage from "./pages/checkpage/checkpage";
import Profile from './pages/profile/profile'
import './assets/styles/style.css'
import Context from './components/CartPage/CartContext'


export default class App extends Component {
  render() {
    return (
      <Context>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/login" component={Login}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/register" component={Register} />
            <Route path="/video" component={VideoPage} />
            <Route path="/Coursepage" component={Coursepage} />
            <Route path="/orderHistorypage" component={OrderHistoryPage} />
            <Route path="/Cartpage" component={Cartpage} />
            <Route path="/checkpage" component={Checkpage} />
            <Route path="/admin" component={Admin}></Route>
            <Route path="/" component={Homepage}></Route>
          </Switch>
        </BrowserRouter>
      </Context>
    );
  }
}
