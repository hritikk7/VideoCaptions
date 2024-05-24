import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
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
        { startTime: parseFloat(subStartTime), duration: parseFloat(subDuration), text: subtitleText },
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
      (sub) => currentTime >= sub.startTime && currentTime <= sub.startTime + sub.duration
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
    <div className="h-screen w-screen lg:p-20 md:p-14 p-10">
      <h1 className="lg:text-4xl md:text-3xl sm:text-3xl font-bold text-white">
        Add Captions to your Video
      </h1>
      <div className="h-full w-full mt-2 flex">
        <div className=" w-1/4 lg:p-8 sm:p-5">
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="videoUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video URL:
                </label>
                <input
                  type="text"
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter video URL here"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div>
                <label
                  htmlFor="captionText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Caption Text:
                </label>
                <input
                  type="text"
                  id="captionText"
                  value={subtitleText}
                  onChange={(e) => setSubtitleText(e.target.value)}
                  placeholder="Enter caption text here"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div>
                <label
                  htmlFor="captionStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time (in seconds):
                </label>
                <input
                  type="number"
                  id="captionStartTime"
                  value={subStartTime}
                  onChange={(e) => setSubStartTime(e.target.value)}
                  placeholder="Enter start time in seconds"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <div>
                <label
                  htmlFor="captionDuration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration (in seconds):
                </label>
                <input
                  type="number"
                  id="captionDuration"
                  value={subDuration}
                  onChange={(e) => setSubDuration(e.target.value)}
                  placeholder="Enter duration in seconds"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-300"
                />
              </div>
              <button
                onClick={handleAddSubtitle}
                className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600"
              >
                Add Caption
              </button>
              {errMsg && (
                <p className="text-red-600 mt-2">{errMsg}</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Captions:</h2>
              <ul>
                {subtitles.map((sub, index) => (
                  <li key={index}>
                    <strong>{sub.startTime}s - {sub.startTime + sub.duration}s:</strong> {sub.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-3/4 lg:p-10 sm:p-5">
          <div className="flex-1 relative">
          {videoUrl ? (
            <div className="flex-1 relative">
              <video
                ref={videoRef}
                id="videoPlayer"
                controls
                className="w-full mt-6 h-4/5 rounded-lg shadow-md"
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl font-bold text-gray-700">Enter a video URL to start</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
