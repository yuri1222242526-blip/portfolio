//ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("js-drawer-icon");
  const menu = document.getElementById("js-drawer-content");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("is-checked");
      menu.classList.toggle("is-checked");
    });
  }

  // aboutセクションのモーダル
  const aboutModal = document.getElementById("js-about-modal");
  const aboutModalOpen = document.querySelector(".js-modal-open");
  const aboutModalClose = document.querySelector(".js-modal-close");
  const aboutModalHead = document.querySelector(".about-modal__head");

  if (
    aboutModal instanceof HTMLDialogElement &&
    aboutModalOpen instanceof HTMLElement &&
    aboutModalClose instanceof HTMLElement
  ) {
    const openAboutModal = () => {
      aboutModal.setAttribute("aria-hidden", "false");
      aboutModal.showModal();
    };

    const closeAboutModal = () => {
      aboutModal.setAttribute("aria-hidden", "true");
      aboutModal.close();
    };

    aboutModalOpen.addEventListener("click", openAboutModal);
    aboutModalClose.addEventListener("click", closeAboutModal);

    if (aboutModalHead instanceof HTMLElement) {
      aboutModalHead.addEventListener("click", closeAboutModal);
    }

    aboutModal.addEventListener("click", (event) => {
      if (event.target === aboutModal) {
        closeAboutModal();
      }
    });

    aboutModal.addEventListener("close", () => {
      aboutModal.setAttribute("aria-hidden", "true");
    });
  }

  // QAセクションのアコーディオン
  const qaBoxes = document.querySelectorAll(".qa-box");

  qaBoxes.forEach((box) => {
    const head = box.querySelector(".qa-box__head");
    const body = box.querySelector(".qa-box__body");

    if (!(head instanceof HTMLElement) || !(body instanceof HTMLElement)) {
      return;
    }

    head.addEventListener("click", () => {
      box.classList.toggle("is-open");
    });
  });

  // galleryセクションのSwiper
  const gallerySwiperElement = document.getElementById("js-gallery-swiper");

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
          clickable: true,
        },
        navigation: {
          nextEl: "#js-gallery-next",
          prevEl: "#js-gallery-prev",
        },
        breakpoints: {
          768: {
            spaceBetween: 82,
          },
        },
      });
    }
  }

  const targets = document.querySelectorAll(".js-in-view");

  if (!targets.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target); // 一回だけ発火
        }
      });
    },
    {
      threshold: 0.2,
    },
  );
  targets.forEach((target) => observer.observe(target));
});
