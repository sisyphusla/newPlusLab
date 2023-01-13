import React, { Fragment,useEffect,useState } from "react";
import { Link } from "react-router-dom";


import  Couponbar  from "../../components/CoursePage/Couponbar";
import ForYouCourse from "../../components/CoursePage/ForYouCourse";
import PopCourse from "../../components/CoursePage/PopCourse";
import RecentClass from "../../components/CoursePage/RecentClass";
import SelectCourse from "../../components/CoursePage/SelectCourse";
import Top from "../../components/top/Top";
const Coursepage = () => {
    let title = [
      {
        key: 1,
        title: "熱門課程",
        clsNam: ["divText"," divHot"],
        compos: PopCourse,
      },
      {
        key: 2,
        title: "為你推薦",
        clsNam: ["divText", "divToYouText"],
        compos: ForYouCourse,
      },
      {
        key: 3,
        title: "最近開課",
        clsNam: ["divText"],
        compos: RecentClass,
      },
      {
        key: 4,
        title: "精選課程",
        clsNam: ["divText"],
        compos: SelectCourse,
      },
    ];
    
   
  
    return (
      <Fragment>
        {/* <Helmet><title>課程列表</title> </Helmet> */}
        <div className="headersss"></div>

        <Couponbar />
        {title.map((t) => {
          return (
            <Fragment key={t.key}>
              <div className={t.clsNam.join(" ")} id={t.compos}>
                
                  <span>{t.title}</span>
              </div>
              <t.compos />
            </Fragment>
          );
        })}

        <Top />

        {/* <div className="divText divHot">
        <span>熱門課程</span>
      </div>
      <PopCourse />
      <div className="divText divToYouText">
        <span>為你推薦</span>
      </div>
      <ForYouCourse />
      <div className="divText">
        <span>最近開課</span>
      </div>
      <RecentClass />
      <div className="divText">
        <span>精選課程</span>
      </div>
      <SelectCourse /> */}
      </Fragment>
    );
};
export default Coursepage;
