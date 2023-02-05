import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfoHead = () => {
  const [cousreName, setCousreName] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8800/courseadd')
      .then(res => {
        // console.log(res.data[0].courseList[0]);
        setCousreName(res.data[0].courseList[0].classname)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="infoHead">
        <div className="infoHeadTitle">
          <span>{cousreName}</span>
        </div>
        {/* <div className="infoHeadPrice"><span>NT$ 1,600</span></div>
        <div className="infoHeadShopCart">
          <button type="button"><span>加入購物車</span></button>
        </div>
        <div className="infoHeadBuyNow">
          <button type="button"><span>立即購買</span></button>
        </div> */}
      </div>
      <div className="containerLine"></div>
    </div>
  )
}

export default InfoHead;