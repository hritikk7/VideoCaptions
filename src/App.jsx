import { useState, useRef, useEffect } from "react";
import "./App.css";
import Video from "./component/Video";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handleStart = () => {
    if (validateVideoUrl(videoUrl)) {
      setShowVideo(true);
      setErrMsg(""); // Clear error message if URL is valid
    } else {
      setErrMsg("Please enter a valid video URL.");
    }
  };

  const validateVideoUrl = (url) => {
    const videoUrlPattern = /^(https?:\/\/.*\.(mp4|webm|ogg))$/i;
    return videoUrlPattern.test(url);
  };

  return (
    <div className="h-screen w-screen p-4 sm:p-6 lg:p-12 flex flex-col items-center justify-center md:p-18">
      {!showVideo ? (
        <>
          <h1 className="text-4xl mt-12 font-bold text-white">
            Add Captions to your Video
          </h1>
          <p className="text-sm mt-4">
            You can visit{" "}
            <a
              className="font-bold text-green-600"
              target="_blank"
              rel="noopener noreferrer"
              href="https://gist.github.com/jsturgis/3b19447b304616f18657"
            >
              Sample Video URLs
            </a>{" "}
            to get some hosted Videos.
          </p>
        </>
      ) : null}

      {showVideo ? (
        <Video videoUrl={videoUrl} />
      ) : (
        <div className="h-full w-full mt-2 flex">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <input
              className="w-2/3 h-9 p-3 rounded-lg border-gray-50 focus:outline-none"
              type="text"
              placeholder="Enter Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            {errMsg && <p className="text-red-600 mt-2">{errMsg}</p>}
            <button
              onClick={handleStart}
              className="btn flex h-9 w-1/4 bg-white mt-5 justify-center font-bold border-2 rounded-lg items-center"
            >
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
