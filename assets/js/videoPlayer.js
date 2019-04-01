import getBlobDutation from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreenBtn");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const videoViews = document.getElementById("jsVideoViews");

const registerView = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
  if (response.status === 200) {
    videoViews.innerHTML = parseInt(videoViews.innerHTML, 10) + 1;
  }
};

function handlePlayStateChange() {
  playBtn.innerHTML = videoPlayer.paused
    ? '<i class="fas fa-play"></i>'
    : '<i class="fas fa-pause"></i>';
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
  handlePlayStateChange();
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    volumeRange.value = videoPlayer.volume;
    videoPlayer.muted = false;
    if (volumeRange.value >= 0.6) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (volumeRange.value >= 0.2) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

let interval = null;

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
  if (currentTime.innerHTML === totalTime.innerHTML) {
    clearInterval(interval);
  }
}

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  const duration = await getBlobDutation(blob);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  interval = setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

function handleScreenStateChange() {
  if (
    !document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.removeEventListener("click", exitFullScreen);
    fullScreenBtn.addEventListener("click", goFullScreen);
  }
}

function init() {
  registerView();
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("playing", handlePlayStateChange);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoContainer.addEventListener("fullscreenchange", handleScreenStateChange);
  videoContainer.addEventListener(
    "webkitfullscreenchange",
    handleScreenStateChange
  );
  videoContainer.addEventListener(
    "mozfullscreenchange",
    handleScreenStateChange
  );
  videoContainer.addEventListener(
    "MSFullscreenChange",
    handleScreenStateChange
  );
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
