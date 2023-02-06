import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import expand1 from './image/expand1.svg';
import expand2 from './image/expand2.svg';
import axios from 'axios';


const ClassList = () => {
  const { id } = useParams();
  const history = useHistory();
  const listRef = useRef(null);
  const [cousreName, setCousreName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseID, setCourseID] = useState(true);
  // console.log(id)
  useEffect(() => {
    try {
      axios.get(`http://localhost:8800/courseadd/`)
        .then(res => {
          // console.log(res.data);
          res.data[0].courseList.splice(0, 1);
          const allCourse = res.data.filter(item => item._id === id)
          setCousreName(allCourse[0].courseList);
          setIsLoading(false);
          setCourseID(allCourse[0]._id)
          // console.log(allCourse[0]._id)
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }


  }, [isLoading]);


  const [expanded, setExpanded] = useState(new Array(cousreName.length).fill(false));


  const toggleExpanded = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const ccc = (listRef) => {
    // console.log(listRef.target.innerText);
    // console.log(id);
    history.push(`/video/${courseID}/${listRef.target.innerText}`);
  }

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
                  <li key={subitem} ref={listRef} onClick={ccc}>{subitem}</li>
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