"use strict";

//ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.getElementById("js-drawer-icon");
  var menu = document.getElementById("js-drawer-content");

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("is-checked");
      menu.classList.toggle("is-checked");
    });
  } // aboutセクションのモーダル


  var aboutModal = document.getElementById("js-about-modal");
  var aboutModalOpen = document.querySelector(".js-modal-open");
  var aboutModalClose = document.querySelector(".js-modal-close");
  var aboutModalHead = document.querySelector(".about-modal__head");

  if (aboutModal instanceof HTMLDialogElement && aboutModalOpen instanceof HTMLElement && aboutModalClose instanceof HTMLElement) {
    var openAboutModal = function openAboutModal() {
      aboutModal.setAttribute("aria-hidden", "false");
      aboutModal.showModal();
    };

    var closeAboutModal = function closeAboutModal() {
      aboutModal.setAttribute("aria-hidden", "true");
      aboutModal.close();
    };

    aboutModalOpen.addEventListener("click", openAboutModal);
    aboutModalClose.addEventListener("click", closeAboutModal);

    if (aboutModalHead instanceof HTMLElement) {
      aboutModalHead.addEventListener("click", closeAboutModal);
    }

    aboutModal.addEventListener("click", function (event) {
      if (event.target === aboutModal) {
        closeAboutModal();
      }
    });
    aboutModal.addEventListener("close", function () {
      aboutModal.setAttribute("aria-hidden", "true");
    });
  } // QAセクションのアコーディオン


  var qaBoxes = document.querySelectorAll(".qa-box");
  qaBoxes.forEach(function (box) {
    var head = box.querySelector(".qa-box__head");
    var body = box.querySelector(".qa-box__body");

    if (!(head instanceof HTMLElement) || !(body instanceof HTMLElement)) {
      return;
    }

    head.addEventListener("click", function () {
      box.classList.toggle("is-open");
    });
  }); // galleryセクションのSwiper

  var gallerySwiperElement = document.getElementById("js-gallery-swiper");

  if (gallerySwiperElement instanceof HTMLElement) {
    if (typeof Swiper === "undefined") {
      console.warn("Swiperが読み込まれていません。");
    } else {
      new Swiper("#js-gallery-swiper", {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
          el: "#js-gallery-pagination",
          clickable: true
        },
        navigation: {
          nextEl: "#js-gallery-next",
          prevEl: "#js-gallery-prev"
        },
        breakpoints: {
          768: {
            spaceBetween: 82
          }
        }
      });
    }
  }

  var targets = document.querySelectorAll(".js-in-view");

  if (!targets.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (target) {
      return target.classList.add("is-in-view");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in-view");
        observer.unobserve(entry.target); // 一回だけ発火
      }
    });
  }, {
    threshold: 0.2
  });
  targets.forEach(function (target) {
    return observer.observe(target);
  });
});