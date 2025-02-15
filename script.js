$(document).ready(function () {
  const $rootElement = $(document.documentElement);
  const $body = $("body");
  const $openUndangan = $("#open-undangan");
  const $audioIconWrapper = $(".audio-icon-wrapper");
  const $audioIcon = $(".speaker");
  const lihatUndangan = $("#lihat-undangan");
  let isPlaying = false;
  const song = $("#song")[0]; // Pastikan ada elemen audio dengan id 'song'
  const $galleryGrid = $(".gallery-grid");
  const $images = $galleryGrid.find("img").toArray();

  // LIHAT UNDANGAN
  function disableScroll() {
    $(window).scrollTop(0);
    $body.css({ overflow: "hidden", height: "100vh" });
    $(window).on("scroll", function () {
      $(this).scrollTop(0);
    });
    $rootElement.css("scroll-behavior", "auto");
  }
  function playAudio() {
    song.volume = 0.1;
    song.play();
    isPlaying = true;
  }
  function enableScroll() {
    $openUndangan.addClass("d");
    setTimeout(() => {
      $body.css({ overflow: "auto", height: "auto" });
      $(window).off("scroll");
      $rootElement.css("scroll-behavior", "smooth");
      $openUndangan.hide();
      playAudio();
    }, 1000);
  }

  $audioIconWrapper.on("click", function () {
    if (isPlaying) {
      song.pause();
      $audioIcon.attr("src", "img/template-animasi/mute.png");
    } else {
      song.play();
      $audioIcon.attr("src", "img/template-animasi/noisy.png");
    }
    isPlaying = !isPlaying;
  });

  lihatUndangan.on("click", function () {
    enableScroll();
  });

  disableScroll();

  // LIHAT UNDANGAN

  // Nama tamu undangan
  const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get("to") || "";
  $("#open-undangan .nama-tamu span").text(nama.replace(/ ,$/, ","));
  // Nama tamu undangan

  // COUNTDOWN
  simplyCountdown(".simply-countdown", {
    year: 2025, // required
    month: 3, // required
    day: 27, // required
    hours: 8, // Default is 0 [0-23] integer
    words: {
      days: { singular: "hari", plural: "hari" },
      hours: { singular: "jam", plural: "jam" },
      minutes: { singular: "menit", plural: "menit" },
      seconds: { singular: "detik", plural: "detik" },
    },
  });
  // COUNTDOWN

  // GALERI
  $galleryGrid.empty(); // Kosongkan grid sebelum diisi ulang

  $images.forEach((img) => {
    $(img).on("load", function () {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const $imgWrapper = $("<div>").addClass("gallery-item").append(img);

      if (width > height) {
        // Jika gambar landscape, buat 1 baris penuh (span 2 kolom)
        $imgWrapper.addClass("landscape");
      } else {
        // Jika gambar portrait, tetap dalam 1 kolom
        $imgWrapper.addClass("portrait");
      }

      $galleryGrid.append($imgWrapper);
    });

    // Jika gambar sudah dimuat sebelum event onload (cache), jalankan manual
    if (img.complete) {
      $(img).trigger("load");
    }
  });
  // GALERI

  // SALIN NO REKENING
  $(".btn-rsvp").on("click", function () {
    const accountNumber = $(this).siblings("h2").first().text().trim();
    const tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val(accountNumber).select();
    document.execCommand("copy");
    tempInput.remove();

    const $notification = $("<div>")
      .addClass("copy-notif")
      .text("Nomor rekening berhasil disalin!")
      .css({
        position: "fixed",
        bottom: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "250px",
        maxWidth: "480px",
        background: "rgba(117, 123, 137, 0.7)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        zIndex: 1000,
      });
    $("body").append($notification);

    setTimeout(() => {
      $notification.fadeOut(500, function () {
        $(this).remove();
      });
    }, 2000); // Notifikasi akan hilang dalam 2 detik
  });
});
