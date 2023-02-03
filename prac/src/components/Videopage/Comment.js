import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import trashcan from './image/trashcan.svg';
import axios from 'axios';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"

};

const Comment = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoComment, setVideoComment] = useState([]);
  const stars = Array(5).fill(0)

  useEffect(() => {
    axios.get('http://localhost:8800/comment')
      .then(res => {
        setVideoComment(res.data);
        console.log(videoComment);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClick = value => {
    setCurrentValue(value);
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const handleSaveCommentBtnClick = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8800/comment', { currentValue, comment });
      setComment('');
      axios.get('http://localhost:8800/comment')
        .then(res => {
          setVideoComment(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 3000);
  }
  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/comment/${id}`);
      setVideoComment(videoComment.filter(comment => comment._id !== id));
      axios.get('http://localhost:8800/comment')
        .then(res => {
          setVideoComment(res.data);
          console.log(videoComment);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="commentContainer">
      <div className="commentRating">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              className='ratingStar'
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <div className="commentKeyInBox">
        <div className="textArea">
          <textarea
            type="text"
            placeholder="請在此輸入您的評價"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <div className="textAreaBtn">
            <button
              className="saveBtn"
              type="submit"
              onClick={handleSaveCommentBtnClick}
              disabled={isLoading}
            >
              送出
            </button>
          </div>
        </div>
      </div>

      <div className="commentList">
        {
          videoComment.map((item, index) => {
            return (
              <div className='commentBox' key={index}>
                <div className='star-rating'>
                  {Array(5).fill(0).map((_, i) => {
                    return (
                      <FaStar
                        key={i}
                        color={i < item.currentValue ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10
                        }}
                      />
                    )
                  })}
                </div>
                <div className='commentContent'>
                  <div
                    className='commentContentDel'
                    onClick={() => handleDeleteComment(item._id)}>
                    <button>
                      <img src={trashcan} alt="" />
                    </button>
                  </div>
                  {item.comment}
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  );
};

export default Comment;