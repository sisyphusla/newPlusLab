import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd'
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import './courseadd.css'

const CourseAdd = ({ getChapterList, getSubChapterList, getCourseVideo }) => {

  // const [showButtons, setShowButtons] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [chapterName, setChapterName] = useState('');
  const [chapterList, setChapterList] = useState([]);

  const handleShowAddChapter = () => {
    setShowAddChapter(!showAddChapter);
  };

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleCancel = () => {
    setChapterName('');
    setShowAddChapter(false);
  };

  const handleAddChapter = () => {
    if (chapterName.trim() === '') {
      return;
    }
    setChapterList([...chapterList, chapterName]);
    setChapterName('');
    setShowAddChapter(false);
    getChapterList([...chapterList, chapterName])

  };

  const [showAddSubChapter, setShowAddSubChapter] = useState(-1);
  const [subChapterName, setSubChapterName] = useState('');
  const [subChapterList, setSubChapterList] = useState([]);

  const handleShowAddSubChapter = (index) => {
    setShowAddSubChapter(index);
  };

  const handleSubChapterNameChange = (event) => {
    setSubChapterName(event.target.value);
  };

  const handleAddSubChapter = (index) => {
    const newSubChapterList = [...subChapterList];
    if (!newSubChapterList[index]) {
      newSubChapterList[index] = [];
    }
    newSubChapterList[index].push(subChapterName);
    setSubChapterList(newSubChapterList);
    setSubChapterName('');
    setShowAddSubChapter(-1);
    getSubChapterList(subChapterList)
  };

  const [editingChapterIndex, setEditingChapterIndex] = useState(-1);
  const [newChapterName, setNewChapterName] = useState('');

  const handleEditChapter = (index) => {
    setEditingChapterIndex(index);
    setNewChapterName(chapterList[index]);
  }

  const handleSaveChapter = (index) => {
    // 儲存新章節名稱到chapterList
    const newChapterList = [...chapterList];
    newChapterList[index] = newChapterName;
    setChapterList(newChapterList);
    setEditingChapterIndex(-1);
    setNewChapterName('');
    getChapterList(chapterList)
  }

  const [editingSubChapterIndex, setEditingSubChapterIndex] = useState([-1, -1]);
  const [subChapterEditName, setSubChapterEditName] = useState('');


  const handleEditSubChapter = (index, subIndex) => {
    setEditingSubChapterIndex([index, subIndex]);
    setSubChapterEditName(subChapterList[index][subIndex]);
  }

  const handleUpdateSubChapter = (index, subIndex) => {
    const newSubChapterList = [...subChapterList];
    newSubChapterList[index][subIndex] = subChapterEditName;
    setSubChapterList(newSubChapterList);
    setEditingSubChapterIndex([-1, -1]);
    setSubChapterName('');
    // getSubChapterList(subChapterList)
  };

  const handleCancelSubChapterEdit = () => {
    setEditingSubChapterIndex([-1, -1]);
  };


  const [courseVideo, setCourseVideo] = useState([]);

  //取得用戶上傳的影片檔案，依照index組成陣列，陣列內的排序為subIndex
  const handleCourseVideo = (index, subIndex, e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile.type !== ("video/mp4")) {
      alert('請上傳mp4格式的影片！');
      return;
    } else {
      const updatedCrouseVideo = [...courseVideo];
      if (!updatedCrouseVideo[index]) {
        updatedCrouseVideo[index] = [];
      }
      updatedCrouseVideo[index][subIndex] = uploadedFile;
      setCourseVideo(updatedCrouseVideo);
    }
  };



  useEffect(() => {
    getCourseVideo(courseVideo);
  }, [courseVideo]);

  useEffect(() => {
    getSubChapterList(subChapterList)
  }, [subChapterList]);


  return (
    <div className='courseAdd'>

      {chapterList.map((item, index) => (
        <div key={index} className='chapterArea'>
          {editingChapterIndex !== index ? (
            <div
              className='chapterTitle'
            // onMouseEnter={() => setShowButtons(true)}
            // onMouseLeave={() => setShowButtons(false)}
            >
              {index + 1}、章節名稱：{item}
              {/* {showButtons && (
                <> */}
              <button className='titleRename' onClick={() => handleEditChapter(index)}>
                <BsFillPencilFill />
              </button>
              <button className='titleCancel'>
                <BsFillTrashFill />
              </button>
              {/* </>
              )} */}
            </div>
          ) : (
            <div className='chapterTitle'>
              {index + 1}.章節名稱：
              <Input value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} style={{ width: '300px' }} />
              <button className='titleRename' onClick={() => handleSaveChapter(index)}>保存</button>
              <button className='titleCancel' onClick={() => setEditingChapterIndex(-1)}>取消</button>
            </div>
          )}
          {subChapterList[index] &&
            subChapterList[index].map((subItem, subIndex) => (
              <div key={subIndex} className='subChapter'>
                {editingSubChapterIndex[0] !== index || editingSubChapterIndex[1] !== subIndex ? (
                  <div
                    className='subChapterTitle'
                  // onMouseEnter={() => setShowButtons(true)}
                  // onMouseLeave={() => setShowButtons(false)}
                  >
                    課程{subIndex + 1}：{subItem}
                    {/* {showButtons && (
                      <> */}

                    <input
                      type="file"
                      onChange={(e) => handleCourseVideo(index, subIndex, e)}
                      accept="video/mp4"
                      name='file'
                    />

                    <button className='titleRename' onClick={() => handleEditSubChapter(index, subIndex)}>
                      <BsFillPencilFill />
                    </button>
                    <button className='titleCancel'>
                      <BsFillTrashFill />
                    </button>
                    {/* </>
                    )} */}
                  </div>
                ) : (
                  <div>
                    <Input onChange={(e) => setSubChapterEditName(e.target.value)} value={subChapterEditName} style={{ width: '300px' }} />
                    <Button onClick={() => handleUpdateSubChapter(index, subIndex)}>保存</Button>
                    <Button onClick={() => handleCancelSubChapterEdit()}>取消</Button>
                  </div>
                )}
              </div>
            ))}
          {showAddSubChapter === index ? (
            <div className='addSupChapterArea'>
              <div>
                <span>新課程名稱：</span>
                <Input
                  onChange={handleSubChapterNameChange}
                  value={subChapterName}
                  style={{ width: '300px' }}
                  placeholder='請輸入新課程名稱'
                />
              </div>
              <Button onClick={() => handleAddSubChapter(index)} style={{ margin: '10px 5px 0 0' }}>加入課程</Button>
              <Button onClick={() => setShowAddSubChapter(false)}>取消</Button>
            </div>
          ) : (
            <Button onClick={() => handleShowAddSubChapter(index)} className='addSubChapterBtn' style={{ width: '16%' }}>新增課程</Button>
          )}
        </div>
      ))}
      {showAddChapter && (
        <div className='addChapterArea'>
          <div>
            <span>新章節名稱：</span>
            <Input
              onChange={handleChapterNameChange}
              value={chapterName}
              style={{ width: '300px' }}
              placeholder='請輸入新章節名稱'
            />
          </div>
          <Button onClick={handleAddChapter} style={{ margin: '20px 5px 0 0' }}>加入章節</Button>
          <Button onClick={handleCancel}>取消</Button>
        </div>
      )}
      <Button onClick={handleShowAddChapter} >新增章節</Button>
    </div>
  );


};

export default CourseAdd;