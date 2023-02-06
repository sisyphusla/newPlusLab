import React from "react";
import pic from './image/cover.png';

const CourseIntro = () => {

  return (
    <div className="introContainer">
      <div className="introPic">
        <img src={pic} alt="" className="img" />
      </div>
      <div className="introText">
        <pre>
          {`
美國聯準會（Fed）主席鮑爾演講意外鴿派，市場預期後續將放緩升息，
國際股市仍處樂觀氣氛，台股周線已連5紅，但投顧分析師指出，股市短線行情可能稍有遲滯，
但以長線格局來看，大循環修正也已完成，建議逢低應該布局，預期指數在12月下旬應有表現空間，
外資回流，選股仍以電子藍籌股優先，指數區間看14500點至15300點。


台股上周五下跌42.12點，失守15000點關卡，收在14970.68點；但上週指數仍上揚192.17點，
週線連5紅。上週集中市場外資買超328.65億元，投信買超31.47億，自營商含避險賣超157.17元，
三大法人合計買超202.95億元。永豐投顧分析，以技術指標KD來看是高檔向下，短線再突破不易，
然週KD指標依舊向上，中線仍有向上空間，故股價降溫，應為買進良機。
          `}
        </pre>
      </div>
    </div>
  )
}

export default CourseIntro;