const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const bar = document.getElementById("bar");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
    } catch {
      alert(
        "Hãy đặt file nhạc tên music.mp3 vào cùng thư mục với index.html nhé!",
      );
    }
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playBtn.textContent = "||";
});

audio.addEventListener("pause", () => {
  playBtn.textContent = "▶";
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  current.textContent = formatTime(audio.currentTime);
  if (audio.duration) {
    bar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  }
});

progress.addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = progress.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
});
