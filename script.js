const rootElement = document.documentElement;
const body = document.body;
const openUndangan = document.getElementById("open-undangan");

function disableScroll() {
  window.scrollTo(0, 0);
  body.style.overflow = "hidden";
  body.style.height = "100vh";
  window.onscroll = () => window.scrollTo(0, 0);
  rootElement.style.scrollBehavior = "auto";
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
  }, 1000); // Sesuai durasi transisi
}

disableScroll();
