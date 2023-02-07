import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import addNote from './image/addNote.svg';
import trashcan from './image/trashcan.svg';
import axios from 'axios';
import instance from "../../api/axiosInstance";

const Note = ({ b, videoRefProps }) => {
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNoteBtn, setShowNoteBtn] = useState(true);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [videonote, setVideonote] = useState([]);
  const [courseSubName, setCourseSubName] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    instance.get('/')
      .then(res => {
        let videonoteCopy = [...res.data];
        videonoteCopy.sort((a, b) => {
          let bArrA = a.b.split(":");
          let bArrB = b.b.split(":");
          return (parseInt(bArrA[0]) * 60 + parseInt(bArrA[1])) - (parseInt(bArrB[0]) * 60 + parseInt(bArrB[1]));
        });
        setVideonote(videonoteCopy);
        console.log(location)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const pathArray = history.location.pathname.split('/');
    const lastPath = pathArray[pathArray.length - 1];
    // console.log(lastPath);

    setCourseSubName(lastPath)
  }, [history.location.pathname]);

  // const handleClick = () => {
  //   history.push('/video/63dfcf700f158c1a4cccda74/%E9%81%B8%E8%82%A1SOP%E6%88%B0%E7%95%A5');
  //   console.log('1' + history)
  // };

  const handleNoteBtnClick = () => {
    setShowNoteBtn(false);
    setShowNoteBox(true);
    videoRefProps.current.pause();
  }
  const handleCancelBtnClick = () => {
    setShowNoteBox(false);
    setShowNoteBtn(true);
  }

  const handleSaveBtnClick = async () => {
    setIsLoading(true);
    try {
      await instance.post('/', { note, b });
      setShowNoteBox(false);
      setShowNoteBtn(true);
      instance.get('/')
        .then(res => {
          let videonoteCopy = [...res.data];
          videonoteCopy.sort((a, b) => {
            let bArrA = a.b.split(":");
            let bArrB = b.b.split(":");
            return (parseInt(bArrA[0]) * 60 + parseInt(bArrA[1])) - (parseInt(bArrB[0]) * 60 + parseInt(bArrB[1]));
          });
          setVideonote(videonoteCopy);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 3000);
  }

  const handleDeleteNote = async (id) => {
    try {
      await instance.delete(`/${id}`);
      setVideonote(videonote.filter(note => note._id !== id));
      instance.get('/')
        .then(res => {
          let videonoteCopy = [...res.data];
          videonoteCopy.sort((a, b) => {
            let bArrA = a.b.split(":");
            let bArrB = b.b.split(":");
            return (parseInt(bArrA[0]) * 60 + parseInt(bArrA[1])) - (parseInt(bArrB[0]) * 60 + parseInt(bArrB[1]));
          });
          setVideonote(videonoteCopy);
        })
        .catch(err => {
          console.log(err);
        });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="noteContainer">

      {showNoteBox && (
        <div className="noteBox">
          <button className="videoCurrentTime">{b}</button>
          <div className="textArea">
            <textarea
              type="text"
              placeholder="在這裡紀錄您的筆記！"
              // value={note}
              onChange={e => setNote(e.target.value)}
            />
            <div className="textAreaBtn">
              <button className="cancelBtn" onClick={handleCancelBtnClick}>取消</button>
              <button
                className="saveBtn"
                onClick={handleSaveBtnClick}
                type="submit"
                disabled={isLoading}>保存</button>
            </div>
          </div>
        </div>
      )}
      {showNoteBtn && (
        <button
          className="noteBtn"
          onClick={handleNoteBtnClick}
        >
          在 {b} 作個筆記吧！
          <img src={addNote} alt="" />
        </button>
      )}


      <div className="noteList">
        {
          videonote.map((item, index) => {
            return (
              <div className='noteBox' key={index}>
                <button className="videoCurrentTime">{item.b}</button>
                <div className='noteContent'>
                  <div
                    className='noteContentDel'
                  >
                    <span >{courseSubName}</span>
                    <button onClick={() => handleDeleteNote(item._id)}>
                      <img src={trashcan} alt="" />
                    </button>
                  </div>
                  {item.note}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Note;