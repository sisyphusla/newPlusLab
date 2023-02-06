import React, { useRef, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import videoo1 from './image/1.mp4';
import videoo2 from './image/2.mp4';
import play from './image/play.svg';
import stop from './image/stop.svg';
import fullScreen from './image/fullscreen.svg';
import smallScreen from './image/smallScreen.svg';
import videoback from './image/videoback.svg';
import videoforward from './image/videoforward.svg';
import voice from './image/voice.svg';
// import voiceMute from './image/voiceMute.svg';


const VideoInterface = ({ getCurrentTime, videoRefProps }) => {

  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const videoControlBarRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const voiceBarRef = useRef(null);
  const voiceFillRef = useRef(null);
  const showSpeedListRef = useRef(null)
  const vidoeSpeedUlRef = useRef(null)
  const [VideoEle, setVideoEle] = useState(false);
  const [fullScreenEle, setFullScreenEle] = useState(false);
  const [className, setClassName] = useState('videoControlBar');
  const [speed, setSpeed] = useState('1')
  const [speedBtn, setSpeedBtn] = useState(false)
  const [videoDurationTime, setVideoDurationTime] = useState(null);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [courseVideo, setCourseVideo] = useState(videoo1);
  const videoSelf = courseVideo;
  const history = useHistory();


  useEffect(() => {
    const pathArray = history.location.pathname.split('/');
    const lastPath = pathArray[pathArray.length - 1];
    // console.log(lastPath);

    if (lastPath === "選股SOP戰略") {
      setCourseVideo(videoo1)
      console.log(lastPath);
    } else if (lastPath === "選股SOP核心概念") {
      setCourseVideo(videoo2)
      console.log(lastPath);
    }
  }, [history.location.pathname]);



  useEffect(() => {
    videoRefProps.current = videoRef.current;
  }, [videoRefProps, videoRef]);

  // // 影片暫停改圖標
  useEffect(() => {
    const handlePause = () => {
      if (!videoRef.current) return;
      if (videoRef.current.paused == true) {
        setVideoEle(false)
      } else {
        setVideoEle(true)
      }
    }
    videoRef.current.addEventListener('pause', handlePause);
    return () => {
      if (videoRef.current) videoRef.current.removeEventListener('pause', handlePause);
    }
  }, [videoRef])

  // // 滑鼠移動增加className
  useEffect(() => {
    const handleMouseMove = () => {
      setClassName(`${className} hover`);
    };
    document.addEventListener('mousemove', handleMouseMove);
  }, [])

  // // 大於三秒沒有偵測到移動滑鼠時取消hover效果
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClassName(className.replace(' hover', ''));
    }, 5000);
    // 在組件卸載時清除timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [className]);

  // // 捕捉影片時間渲染時間進度條
  useEffect(() => {
    const handleProgress = () => {
      if (!videoRef.current) return;
      const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressBarRef.current.style.flexBasis = `${percent}%`;
    };
    videoRef.current.addEventListener('timeupdate', handleProgress);
    return () => {
      if (videoRef.current) videoRef.current.removeEventListener('timeupdate', handleProgress);
    }
  }, [])

  // // 捕捉聲音渲染音量進度條
  useEffect(() => {
    const handleVolume = () => {
      const percent = (videoRef.current.volume / 1) * 100;
      voiceFillRef.current.style.flexBasis = `${percent}%`;
    };
    videoRef.current.addEventListener('volumechange', handleVolume);
    return () => {
      if (videoRef.current) videoRef.current.removeEventListener('volumechange', handleVolume);
    }
  }, [])

  // // 點擊音量Bar控制音量
  useEffect(() => {
    const voiceScrub = (e) => {
      const scrubV = (e.offsetX / voiceBarRef.current.offsetWidth);
      videoRef.current.volume = scrubV;
    };
    voiceBarRef.current.addEventListener('click', voiceScrub);
    return () => {
      if (videoRef.current) videoRef.current.removeEventListener('click', voiceScrub);
    }
  }, [])

  // // 點擊時間進度調控制影片進度
  useEffect(() => {
    const scrub = (e) => {
      const scrubTime = (e.offsetX / progressRef.current.offsetWidth) * videoRef.current.duration;
      videoRef.current.currentTime = scrubTime;
    };
    progressRef.current.addEventListener('click', scrub);
  }, [])

  // // 設定影片時間顯示
  useEffect(() => {
    const handleDurationChange = () => {
      const duration = videoRef.current.duration;
      const minutes = new Date(duration * 1000).getUTCMinutes();
      const seconds = new Date(duration * 1000).getUTCSeconds();
      setVideoDurationTime(`${minutes}:${seconds}`);
    };
    const handleCurrentTime = () => {
      if (!videoRef.current) return;
      const current = videoRef.current.currentTime;
      const currentMinutes = new Date(current * 1000).getUTCMinutes().toString().padStart(2, '0');
      const currentSeconds = new Date(current * 1000).getUTCSeconds().toString().padStart(2, '0');
      setCurrentTime(`${currentMinutes}:${currentSeconds} `);
      getCurrentTime(`${currentMinutes}:${currentSeconds} `); //傳到問與答做使用
    };
    videoRef.current.addEventListener('loadedmetadata', handleDurationChange);
    videoRef.current.addEventListener('timeupdate', handleCurrentTime);
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleDurationChange);
        videoRef.current.removeEventListener('timeupdate', handleCurrentTime);
      }

    }
  }, [videoRef]);



  // 影片暫停與播放 
  const playToggle = () => {
    if (VideoEle === false) {
      setVideoEle(true); videoRef.current.play();
    } else {
      setVideoEle(false); videoRef.current.pause();
    }
  };
  // 影片快轉與倒轉
  const videoReverse = () => {
    videoRef.current.currentTime -= 5;
  }
  const videoForward = () => {
    videoRef.current.currentTime += 5;
  };
  // 全螢幕切換
  const videoFullScreen = () => {
    if (fullScreenEle === false) {
      setFullScreenEle(true);
      videoContainerRef.current.requestFullscreen();
    } else {
      setFullScreenEle(false);
      document.exitFullscreen();
    }
  };
  // 影片播放速度按鈕點擊開合
  const switchSpeed = (e) => {
    if (speedBtn === false) {
      setSpeedBtn(true);
      showSpeedListRef.current.style.display = 'flex';
    } else {
      setSpeedBtn(false);
      showSpeedListRef.current.style.display = 'none';
    }
  };
  // 點擊切換影片速度
  const toggleVideoSpeed = (e) => {
    setSpeed(e.target.value / 100);
    videoRef.current.playbackRate = parseFloat(e.target.value) / 100;
  };


  const stopPic = () => {
    switch (VideoEle) {
      case false:
        return (<img src={play} alt="" />)
      case true:
        return (<img src={stop} alt="" />)
      default:
        break;
    }
  };


  const fullScreenPic = () => {
    switch (fullScreenEle) {
      case false:
        return (<img src={fullScreen} alt="" />)
      case true:
        return (<img src={smallScreen} alt="" />)
      default:
        break;
    }
  };
  return (
    <div className="video" ref={videoContainerRef}  >
      <video
        onClick={playToggle}
        ref={videoRef}
        src={videoSelf}  >
      </video>
      <div className={className} ref={videoControlBarRef} >
        <div className="progress" ref={progressRef}>
          <div className="progressFilled" ref={progressBarRef}></div>
        </div>
        <div className="videoBtnContainer">
          <button onClick={videoReverse}>
            <img src={videoback} alt="" />
          </button>
        </div>
        <div className="videoBtnContainer">
          <button onClick={playToggle}>
            {stopPic()}
          </button>
        </div>
        <div className="videoBtnContainer">
          <button onClick={videoForward}>
            <img src={videoforward} alt="" />
          </button>
        </div>
        <div className="videoTime">
          <span className="currentTimeSpace">{currentTime}</span> / <span>{videoDurationTime}</span>
        </div>
        <div className="videoBtnContainer voiceBtn">
          <button>
            <img src={voice} alt="" />
          </button>
          <div className="voiceBar" ref={voiceBarRef}>
            <div className="voiceFill" ref={voiceFillRef}></div>
          </div>
        </div>
        <div className=" videoSpeed">
          <div className="videoSpeedList" ref={showSpeedListRef} onClick={toggleVideoSpeed}>
            <ul ref={vidoeSpeedUlRef}>
              <li value={200}>2x</li>
              <li value={150}>1.5X</li>
              <li value={125}>1.25x</li>
              <li value={100}>1x</li>
              <li value={75}>0.75x</li>
              <li value={50}>0.5x</li>
            </ul>
          </div>
          <button onClick={switchSpeed}><span>{speed}x</span></button>
        </div>
        <div className="videoBtnContainer fullScreenBtn">
          <button onClick={videoFullScreen}>
            {fullScreenPic()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoInterface;