import React, { useState } from 'react';
import expand1 from './image/expand1.svg';
import expand2 from './image/expand2.svg';
const data = [
  { title: "第一章", content: ["1-1"] },
  { title: "第二章", content: ["2-1", "2-2"] },
  { title: "第三章", content: ["3-1", "3-2", "3-3"] },
  { title: "第四章", content: ["4-1", "4-2", "4-3", "4-4", "4-5"] },
  { title: "第五章", content: ["5-1", "5-2", "5-3", "5-4", "5-5", "5-6"] },
  { title: "第六章", content: ["6-1", "6-2", "6-3", "6-4", "6-5", "6-6", "6-1", "6-2", "6-3", "6-4", "6-5", "6-6",] },
  { title: "第七章", content: ["7-1", "7-2", "7-3", "7-4", "7-5", "7-6", "7-1", "7-2", "7-3", "7-4", "7-5", "6-6",] },
];
const ClassList = () => {

  const [expanded, setExpanded] = useState(new Array(data.length).fill(false));

  const toggleExpanded = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="classListContainer">
      <div className="classListHead" >
        <span>課程列表</span>
      </div>
      <div className='classListBody'>
        {data.map((item, index) => (
          <div key={item.title} className='classListChapter'>
            <div className='titleContainer' onClick={() => toggleExpanded(index)}>
              {expanded[index] ? (
                <div className="expandSvg">
                  <img src={expand2} />
                </div>) : (
                <div className="expandSvg">
                  <img src={expand1} />
                </div>)
              }
              <div className='title'>
                <span>
                  {item.title}
                </span>
              </div>
            </div>
            {expanded[index] && (
              <ul >
                {item.content.map((subitem) => (
                  <li key={subitem}>{subitem}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default ClassList;