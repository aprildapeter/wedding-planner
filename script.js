const rootElement = document.documentElement;
const body = document.body;
const openUndangan = document.getElementById("open-undangan");
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.speaker');


function disableScroll() {
  window.scrollTo(0, 0);
  body.style.overflow = "hidden";
  body.style.height = "100vh";
  window.onscroll = () => window.scrollTo(0, 0);
  rootElement.style.scrollBehavior = "auto";
}

function playAudio() {
  song.volume = 0.1;
  song.play();
  isPlaying = true;
}

audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.src = 'img/mute.png';
  } else {
    song.play();
    audioIcon.src = 'img/noisy.png';
  }

  isPlaying = !isPlaying;
}

function enableScroll() {
  
  // Tambahkan animasi keluar
  openUndangan.classList.add("d");
  
  // Hapus elemen setelah transisi selesai
  setTimeout(() => {
    body.style.overflow = "auto";
    body.style.height = "auto";
    window.onscroll = null;
    rootElement.style.scrollBehavior = "smooth";
    openUndangan.style.display = "none";
    playAudio();
  }, 1000); // Sesuai durasi transisi
}

disableScroll();

