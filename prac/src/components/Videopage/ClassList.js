import React, { useState, useEffect } from 'react';
import expand1 from './image/expand1.svg';
import expand2 from './image/expand2.svg';
import axios from 'axios';

const ClassList = () => {
  const [cousreName, setCousreName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:8800/courseadd')
      .then(res => {
        console.log(res.data[0].courseList);
        res.data[0].courseList.splice(0, 1);
        setCousreName(res.data[0].courseList);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [isLoading]);

  const [expanded, setExpanded] = useState(new Array(cousreName.length).fill(false));


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
        {cousreName.map((item, index) => (
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