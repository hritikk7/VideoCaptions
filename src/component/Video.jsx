import React from "react";
import { useState, useRef, useEffect } from "react";

function Video({ videoUrl }) {
  const [subStartTime, setSubStartTime] = useState("");
  const [subDuration, setSubDuration] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [videoSource, setVideoSource] = useState("");
  const [currentSub, setCurrentSub] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const videoRef = useRef(null);

  const handleAddSubtitle = () => {
    if (subtitleText && videoUrl && subStartTime && subDuration) {
      if (!videoSource) {
        setVideoSource(videoUrl);
      }
      setSubtitles([
        ...subtitles,
        {
          startTime: parseFloat(subStartTime),
          duration: parseFloat(subDuration),
          text: subtitleText,
        },
      ]);
      setSubStartTime("");
      setSubDuration("");
      setSubtitleText("");
      setErrMsg("");
    } else {
      setErrMsg("Please enter valid values for all fields.");
    }
  };

  const handleTimeUpdate = (event) => {
    const currentTime = event.target.currentTime;
    const currentSubTitle = subtitles.find(
      (sub) =>
        currentTime >= sub.startTime &&
        currentTime <= sub.startTime + sub.duration
    );
    setCurrentSub(currentSubTitle ? currentSubTitle.text : "");
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [subtitles]);

  return (
    <div className="h-full w-full mt-2 flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/4 lg:p-5 sm:p-1">
        <div className="flex-1 justify-start">
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <label
                htmlFor="captionText"
                className="text-sm font-medium"
              >
                Subtitle Text:
              </label>
              <input
                type="text"
                id="subText"
                value={subtitleText}
                onChange={(e) => setSubtitleText(e.target.value)}
                placeholder="Enter Subtitle"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="text-sm font-semibold ">
                Start Time (in seconds):
              </label>
              <input
                type="number"
                id="sub-start-time"
                value={subStartTime}
                onChange={(e) => setSubStartTime(e.target.value)}
                placeholder="Enter start time"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start">
              <label
                htmlFor="sub-duration"
                className="block text-sm font-semibold"
              >
                Duration (in seconds):
              </label>
              <input
                type="number"
                id="sub-duration-input"
                value={subDuration}
                onChange={(e) => setSubDuration(e.target.value)}
                placeholder="Enter duration"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <button
              onClick={handleAddSubtitle}
              className="btn w-full text-white py-2 rounded-md "
            >
              Add Subtitle
            </button>
            {errMsg && <p className="text-red-600 mt-2">{errMsg}</p>}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Subtitles:</h2>
            <ul>
              {subtitles.map((sub, index) => (
                <li key={index}>
                  <strong>
                    {sub.startTime}s - {sub.startTime + sub.duration}s:
                  </strong>{" "}
                  {sub.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-3/4 lg:p-5 sm:p-4 mt-4 sm:mt-0">
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            id="videoPlayer"
            controls
            className="w-full h-auto rounded-lg shadow-md"
          >
            {videoSource && <source src={videoSource} type="video/mp4" />}
            Your browser does not support the video tag.
          </video>
          {currentSub && (
            <div className="bottom-1/4 absolute left-1/2 transform -translate-x-1/2 text-lg bg-black text-white px-4 shadow-lg">
              {currentSub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Video;
