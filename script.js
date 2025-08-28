const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');
const rewindBtn = player.querySelector('.rewind');
const forwardBtn = player.querySelector('.forward');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
  const skipValue = parseFloat(this.dataset.skip);
  video.currentTime += skipValue;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
skipButtons.forEach(button => button.addEventListener('click', skip));
rewindBtn.addEventListener('click', () => video.currentTime -= 10);
forwardBtn.addEventListener('click', () => video.currentTime += 25);
