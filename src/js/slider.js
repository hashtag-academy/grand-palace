// residential/commercial (rc) slider

let rc_btn_prev = document.querySelector(".btn-arrow-prev"),
    rc_btn_next = document.querySelector(".btn-arrow-next"),
    rc_slider_line = document.querySelector(".js-slider"),
    rc_slides = document.querySelectorAll(".slide"),
    scrollWidth = rc_slides[1].getBoundingClientRect().width,
    navigationButtons = document.querySelectorAll(".filter-queue__items input"),
    currentSlideBtn = document.querySelector(".currentSlideBtn"),
    currentSlide = document.querySelector(".currentSlide");

for(let i = 0; i < rc_slides.length; i++){    // set data attribute with order numbers of each picture
  navigationButtons[i].dataset.orderNumber = i;
  rc_slides[i].dataset.orderNumber = i;
}

rc_slider_line.scroll(rc_slider_line.scrollLeft+=scrollWidth*currentSlideBtn.getAttribute("data-order-number"), 0);
rc_slides[currentSlideBtn.getAttribute("data-order-number")].classList.add("currentSlide");

navigationButtons.forEach(e => {
  e.onclick = goToSlide;
});

rc_btn_next.onclick = goToNextSlide;      // call function to move to next slide
rc_btn_prev.onclick = goToPrevSlide;      // call function to move to prev slide

function goToNextSlide (event){
  event.preventDefault();
  // currentSlide.classList.remove(".currentSlide");
  rc_slider_line.scroll(rc_slider_line.scrollLeft+=scrollWidth, 0);
}

function goToPrevSlide (event){
  event.preventDefault();
  rc_slider_line.scroll(rc_slider_line.scrollLeft-scrollWidth, 0);
}

function goToSlide (event){
  event.preventDefault();
  currentSlideBtn.classList.remove("currentSlidebtn");
  event.target.classList.add("currentSlideBtn");

  currentSlideBtn = document.querySelector(".currentSlideBtn");
  
  if(currentSlideBtn.getAttribute("data-order-number") >= img){
    rc_slider_line.scroll(rc_slider_line.scrollLeft+=scrollWidth*currentSlideBtn.getAttribute("data-order-number"), 0);
  }

}

