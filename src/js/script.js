const lngToggle = document.querySelectorAll(".header__lng-toggle > a"),
  header = document.querySelector(".header"),
  headerHeight = header.getBoundingClientRect().height;

let language = localStorage.getItem("lang")
  ? localStorage.getItem("lang")
  : window.navigator
  ? window.navigator.language ||
    window.navigator.systemLanguage ||
    window.navigator.userLanguage
  : "uk";

language = language.substring(0, 2);

function changeLocation(lang) {
  if (lang === "ru" && !/^\/ru/.test(location.pathname)) {
    location.pathname = "/ru" + location.pathname;
  } else if (lang !== "ru" && /^\/ru/.test(location.pathname)) {
    location.pathname = location.pathname.replace("/ru", "");
  }
  toggleLanguage(document.querySelector(`[data-lang="${lang}"]`));
}

if (lngToggle) {
  lngToggle.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("lang", this.dataset.lang);
      changeLocation(this.dataset.lang);
    });
  });
}

function toggleLanguage(item) {
  if (!item.classList.contains("active")) {
    lngToggle.forEach((item) => {
      item.classList.toggle("active");
    });
  }
}

changeLocation(language);

//Menu
const iconMenu = document.querySelector(".icon__menu"),
  menuAncorLink = document.querySelectorAll('.menu__link[href^="#"]');
if (iconMenu) {
  iconMenu.addEventListener("click", () => {
    document.body.classList.toggle("lock");
    iconMenu.classList.toggle("active");
    header.classList.toggle("menu-active");
  });
}

if (menuAncorLink) {
  menuAncorLink.forEach((item) => {
    item.addEventListener("click", function (e) {
      document.body.classList.remove("lock");
      iconMenu.classList.remove("active");
      header.classList.remove("menu-active");
    });
  });
}

//Menu

//real-estate img slider
const sliderRealEstateImg = document.querySelectorAll(".images-slider__items");

if (sliderRealEstateImg.length) {
  sliderRealEstateImg.forEach(function (item) {
    const realEstateImg = item.querySelectorAll(".images-slider__item");
    let currentSlider = item.querySelector(".images-slider__item.active");

    if (realEstateImg.length) {
      realEstateImg.forEach((item) => {
        let mouseInside;
        item.onmouseover = function () {
          mouseInside = true;
          setTimeout(() => {
            // То что нужно сделать по событию
            if (mouseInside && !this.classList.contains("active")) {
              currentSlider.classList.remove("active");
              currentSlider = this;
              currentSlider.classList.add("active");
            }
          }, 200);
        };
        item.onmouseleave = function () {
          mouseInside = false;
        };
      });
    }

    function nextSlideRealEstate() {
      if (currentSlider.nextElementSibling !== null) {
        currentSlider.classList.remove("active");
        currentSlider = currentSlider.nextElementSibling;
        currentSlider.classList.add("active");
      }
    }

    function prevSlideRealEstate() {
      if (currentSlider.previousElementSibling !== null) {
        currentSlider.classList.remove("active");
        currentSlider = currentSlider.previousElementSibling;
        currentSlider.classList.add("active");
      }
    }

    touchEvent(item, prevSlideRealEstate, nextSlideRealEstate);
  });
}

//real-estate img slider

//slider
const prev = document.querySelector(".overview-btn__container .btn-arrow-prev"),
  next = document.querySelector(".overview-btn__container .btn-arrow-next"),
  slides = document.querySelectorAll(".overview__items");

let index = 0;

const activeSlide = (n) => {
  for (slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    activeSlide(index);
  } else {
    index++;
    activeSlide(index);
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    activeSlide(index);
  } else {
    index--;
    activeSlide(index);
  }
};
if (prev) prev.addEventListener("click", prevSlide);
if (next) next.addEventListener("click", nextSlide);
//slider

//panorama switcher
const switcher = document.querySelector(".panorama-slider__switcher"),
  switcherItem = document.querySelectorAll(".panorama-slider__switcher > span"),
  panoramaSliderItem = document.querySelectorAll(".panorama-slider__item");

if (switcher) {
  switcher.onclick = () => {
    switcherItem.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
    panoramaSliderItem.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  };
}
//panorama switcher

const floorList = document.querySelectorAll(".list-item");

if (floorList) {
  floorList.forEach((i) => {
    i.addEventListener("click", function () {
      document.querySelector(".custom-select").open = false;
    });
  });
}

// mobile Slider for Construction block

(function mobileSliderOfConstruction() {
  const slider = document.querySelector(".construction-progress__galery");
  let cancelTouchEvent;

  let sliderInterval;
  let direction = -1;
  let transitionEnd = true;
  const transitionDuration = 0.75;

  const transitionOn = function (target, duration) {
    //cn target.style.transition = `${duration}s ease`;
  };

  const transitionOff = function (target) {
    //cn target.style.transition = "none";
  };

  const next = function () {
    if (direction === 1) {
      if (transitionEnd) {
        slider.style.transform = "translateX(-300%)";
        transitionEnd = false;
      } else {
        slider.style.transform = "translateX(-200%)";
        transitionEnd = true;
      }
      direction = -1;
    } else {
      slider.style.transform = "translateX(-300%)";
      transitionEnd = false;
    }
  };

  const prev = function () {
    if (direction === -1) {
      if (transitionEnd) {
        slider.style.transform = "translateX(-100%)";
        transitionEnd = false;
      } else {
        slider.style.transform = "translateX(-200%)";
        transitionEnd = true;
      }
      direction = 1;
    } else {
      slider.style.transform = "translateX(-100%)";
      transitionEnd = false;
    }
  };

  const startSlider = function () {
    sliderInterval = setInterval(next, 4000);
  };

  const stopSlider = function () {
    clearInterval(sliderInterval);
  };

  transitionOff(slider);

  if (window.matchMedia("(max-width: 540px)").matches) {
    initMobile();
  }

  setTimeout(() => {
    transitionOn(slider, transitionDuration);
  }, 0);

  function addSlides() {
    const sliderItem = document.querySelectorAll(".construction-progress__img");
    if (sliderItem.length >= 5) {
      slider.prepend(slider.lastElementChild);
      slider.prepend(slider.lastElementChild);
    } else {
      for (let i = 0; i < 2; i++) {
        let cloneAppend, clonePreppend;
        cloneAppend = sliderItem[i].cloneNode(true);
        clonePreppend = sliderItem[sliderItem.length - i - 1].cloneNode(true);
        cloneAppend.classList.add("clone");
        clonePreppend.classList.add("clone");
        slider.append(cloneAppend);
        slider.prepend(clonePreppend);
      }
    }
  }

  function removeCloneSlides() {
    const sliderCloneItem = document.querySelectorAll(
      ".construction-progress__img.clone"
    );

    sliderCloneItem.forEach((item) => {
      item.remove();
    });
  }

  function initMobile() {
    addSlides();
    slider.addEventListener("transitionend", transitionend);
    slider.addEventListener("touchstart", stopSlider);
    slider.addEventListener("touchend", startSlider);
    window.addEventListener("blur", stopSlider);
    window.addEventListener("focus", startSlider);
    slider.style.transform = "translateX(-200%)";
    cancelTouchEvent = touchEvent(slider, prev, next);
    // startSlider();
    transitionEnd = true;
  }

  function endMobile() {
    removeCloneSlides();
    stopSlider();
    slider.removeEventListener("transitionend", transitionend);
    slider.removeEventListener("touchstart", cancelTouchEvent.touchStartSlider);
    slider.removeEventListener("touchmove", cancelTouchEvent.touchMoveSlider);
    slider.removeEventListener("touchend", cancelTouchEvent.touchEndSlider);
    slider.removeEventListener("touchstart", stopSlider);
    slider.removeEventListener("touchend", startSlider);
    window.removeEventListener("blur", stopSlider);
    window.removeEventListener("focus", startSlider);
    slider.style.transition = "none";
    slider.style.transform = "translateX(0%)";
  }

  function transitionend() {
    if (!transitionEnd) {
      if (direction === 1) {
        slider.prepend(slider.lastElementChild);
      } else {
        slider.append(slider.firstElementChild);
      }
    }
    direction = -1;
    transitionOff(slider);
    slider.style.transform = "translateX(-200%)";
    setTimeout(() => {
      transitionOn(slider, transitionDuration);
    }, 0);
    transitionEnd = true;
  }

  window.onresize = () => {
    if (window.matchMedia("(max-width: 540px)").matches) {
      // initMobile();
    } else {
      endMobile();
    }
  };


})();

function touchEvent(target, prev, next) {
  const sensitivity = 40;
  let touchStart = null;
  let touchPosition = null;

  const touchStartSlider = function (e) {
    touchStart = {
      x: e.changedTouches[0].clientX
    };
    touchPosition = {
      x: touchStart.x
    };
  };

  const touchMoveSlider = function (e) {
    touchPosition = {
      x: e.changedTouches[0].clientX
    };
  };

  const touchEndSlider = function (e) {
    let d = {
      x: touchStart.x - touchPosition.x
    };

    if (Math.abs(d.x) > sensitivity) {
      if (d.x > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  target.addEventListener("touchstart", touchStartSlider);
  target.addEventListener("touchmove", touchMoveSlider);
  target.addEventListener("touchend", touchEndSlider);

  return { touchStartSlider, touchMoveSlider, touchEndSlider };
}
