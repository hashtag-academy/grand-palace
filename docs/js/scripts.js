const lngToggle=document.querySelectorAll(".header__lng-toggle > a"),header=document.querySelector(".header"),headerHeight=header.getBoundingClientRect().height;let language=localStorage.getItem("lang")?localStorage.getItem("lang"):window.navigator?window.navigator.language||window.navigator.systemLanguage||window.navigator.userLanguage:"uk";function changeLocation(e){"ru"!==e||/^\/ru/.test(location.pathname)?"ru"!==e&&/^\/ru/.test(location.pathname)&&(location.pathname=location.pathname.replace("/ru","")):location.pathname="/ru"+location.pathname,toggleLanguage(document.querySelector(`[data-lang="${e}"]`))}function toggleLanguage(e){e.classList.contains("active")||lngToggle.forEach(e=>{e.classList.toggle("active")})}language=language.substring(0,2),lngToggle&&lngToggle.forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault(),localStorage.setItem("lang",this.dataset.lang),changeLocation(this.dataset.lang)}))}),changeLocation(language);const iconMenu=document.querySelector(".icon__menu"),menuAncorLink=document.querySelectorAll('.menu__link[href^="#"]');iconMenu&&iconMenu.addEventListener("click",()=>{document.body.classList.toggle("lock"),iconMenu.classList.toggle("active"),header.classList.toggle("menu-active")}),menuAncorLink&&menuAncorLink.forEach(e=>{e.addEventListener("click",(function(e){document.body.classList.remove("lock"),iconMenu.classList.remove("active"),header.classList.remove("menu-active")}))});const sliderRealEstateImg=document.querySelectorAll(".images-slider__items");sliderRealEstateImg.length&&sliderRealEstateImg.forEach((function(e){const t=e.querySelectorAll(".images-slider__item");let n=e.querySelector(".images-slider__item.active");t.length&&t.forEach(e=>{let t;e.onmouseover=function(){t=!0,setTimeout(()=>{t&&!this.classList.contains("active")&&(n.classList.remove("active"),n=this,n.classList.add("active"))},200)},e.onmouseleave=function(){t=!1}}),touchEvent(e,(function(){null!==n.previousElementSibling&&(n.classList.remove("active"),n=n.previousElementSibling,n.classList.add("active"))}),(function(){null!==n.nextElementSibling&&(n.classList.remove("active"),n=n.nextElementSibling,n.classList.add("active"))}))}));const prev=document.querySelector(".overview-btn__container .btn-arrow-prev"),next=document.querySelector(".overview-btn__container .btn-arrow-next"),slides=document.querySelectorAll(".overview__items");let index=0;const activeSlide=e=>{for(slide of slides)slide.classList.remove("active");slides[e].classList.add("active")},nextSlide=()=>{index==slides.length-1?(index=0,activeSlide(index)):(index++,activeSlide(index))},prevSlide=()=>{0==index?(index=slides.length-1,activeSlide(index)):(index--,activeSlide(index))};prev&&prev.addEventListener("click",prevSlide),next&&next.addEventListener("click",nextSlide);const switcher=document.querySelector(".panorama-slider__switcher"),switcherItem=document.querySelectorAll(".panorama-slider__switcher > span"),panoramaSliderItem=document.querySelectorAll(".panorama-slider__item");switcher&&(switcher.onclick=()=>{switcherItem.forEach(e=>{e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}),panoramaSliderItem.forEach(e=>{e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")})});const floorList=document.querySelectorAll(".list-item");function touchEvent(e,t,n){let o=null,i=null;const a=function(e){o={x:e.changedTouches[0].clientX},i={x:o.x}},s=function(e){i={x:e.changedTouches[0].clientX}},c=function(e){let a={x:o.x-i.x};Math.abs(a.x)>40&&(a.x>0?n():t())};return e.addEventListener("touchstart",a),e.addEventListener("touchmove",s),e.addEventListener("touchend",c),{touchStartSlider:a,touchMoveSlider:s,touchEndSlider:c}}floorList&&floorList.forEach(e=>{e.addEventListener("click",(function(){document.querySelector(".custom-select").open=!1}))}),function(){const e=document.querySelector(".construction-progress__galery");let t,n,o=-1,i=!0;const a=function(){1===o?(i?(e.style.transform="translateX(-300%)",i=!1):(e.style.transform="translateX(-200%)",i=!0),o=-1):(e.style.transform="translateX(-300%)",i=!1)},s=function(){-1===o?(i?(e.style.transform="translateX(-100%)",i=!1):(e.style.transform="translateX(-200%)",i=!0),o=1):(e.style.transform="translateX(-100%)",i=!1)},c=function(){n=setInterval(a,4e3)},l=function(){clearInterval(n)};function r(){document.querySelectorAll(".construction-progress__img.clone").forEach(e=>{e.remove()}),l(),e.removeEventListener("transitionend",d),e.removeEventListener("touchstart",t.touchStartSlider),e.removeEventListener("touchmove",t.touchMoveSlider),e.removeEventListener("touchend",t.touchEndSlider),e.removeEventListener("touchstart",l),e.removeEventListener("touchend",c),window.removeEventListener("blur",l),window.removeEventListener("focus",c),e.style.transition="none",e.style.transform="translateX(0%)"}function d(){i||(1===o?e.prepend(e.lastElementChild):e.append(e.firstElementChild)),o=-1,e.style.transform="translateX(-200%)",setTimeout(()=>{},0),i=!0}window.matchMedia("(max-width: 540px)").matches&&(function(){const t=document.querySelectorAll(".construction-progress__img");if(t.length>=5)e.prepend(e.lastElementChild),e.prepend(e.lastElementChild);else for(let n=0;n<2;n++){let o,i;o=t[n].cloneNode(!0),i=t[t.length-n-1].cloneNode(!0),o.classList.add("clone"),i.classList.add("clone"),e.append(o),e.prepend(i)}}(),e.addEventListener("transitionend",d),e.addEventListener("touchstart",l),e.addEventListener("touchend",c),window.addEventListener("blur",l),window.addEventListener("focus",c),e.style.transform="translateX(-200%)",t=touchEvent(e,s,a),i=!0),setTimeout(()=>{},0),window.onresize=()=>{window.matchMedia("(max-width: 540px)").matches||r()}}();
let currentSlide,rc_btn_prev=document.querySelector(".btn-arrow-prev"),rc_btn_next=document.querySelector(".btn-arrow-next"),rc_slider_line=document.querySelector(".js-slider"),rc_slides=document.querySelectorAll(".slide"),scrollWidth=rc_slides[1].getBoundingClientRect().width,navigationButtons=document.querySelectorAll(".filter-queue__items input"),currentSlideBtn=document.querySelector(".currentSlideBtn"),floor=document.querySelectorAll(".js-floor");for(let e=0;e<rc_slides.length;e++)navigationButtons[e].dataset.orderNumber=e,rc_slides[e].dataset.orderNumber=e;function goToNextSlide(e){e.preventDefault(),rc_slides=Array.from(rc_slides);let r=rc_slides.indexOf(currentSlide);currentSlide.classList.remove("currentSlide"),rc_slides[r+1].classList.add("currentSlide"),currentSlide=document.querySelector(".currentSlide"),buttonHide(),navigationButtons=Array.from(navigationButtons);let t=navigationButtons.indexOf(currentSlideBtn);currentSlideBtn.classList.remove("currentSlideBtn"),navigationButtons[t+1].classList.add("currentSlideBtn"),currentSlideBtn=document.querySelector(".currentSlideBtn"),rc_slider_line.scroll(rc_slider_line.scrollLeft+=scrollWidth,0)}function goToPrevSlide(e){e.preventDefault(),rc_slides=Array.from(rc_slides);let r=rc_slides.indexOf(currentSlide);currentSlide.classList.remove("currentSlide"),rc_slides[r-1].classList.add("currentSlide"),currentSlide=document.querySelector(".currentSlide"),buttonHide(),console.log(rc_btn_prev.innerText),navigationButtons=Array.from(navigationButtons);let t=navigationButtons.indexOf(currentSlideBtn);currentSlideBtn.classList.remove("currentSlideBtn"),navigationButtons[t-1].classList.add("currentSlideBtn"),currentSlideBtn=document.querySelector(".currentSlideBtn"),rc_slider_line.scroll(rc_slider_line.scrollLeft-scrollWidth,0)}function goToSlide(e){e.preventDefault(),currentSlideBtn.classList.remove("currentSlideBtn"),e.target.classList.add("currentSlideBtn"),navigationButtons=Array.from(navigationButtons),rc_slides=Array.from(rc_slides),currentSlideBtn=document.querySelector(".currentSlideBtn"),currentSlide.classList.remove("currentSlide"),rc_slides[navigationButtons.indexOf(currentSlideBtn)].classList.add("currentSlide"),currentSlide=document.querySelector(".currentSlide"),rc_slider_line.scroll(rc_slider_line.scrollLeft=scrollWidth*navigationButtons.indexOf(currentSlideBtn),0)}function buttonHide(e){let r=rc_btn_prev.querySelector("span span"),t=rc_btn_next.querySelector("span span"),n=document.querySelector(".plan-nav__title h3");1==rc_slides.indexOf(currentSlide)?(rc_btn_prev.style.visibility="visible",rc_btn_next.style.visibility="visible",n.innerText="II черга",r.innerText="I черга",t.innerText="III черга"):0==rc_slides.indexOf(currentSlide)?(n.innerText="I черга",rc_btn_prev.style.visibility="hidden",t.innerText="II черга"):2==rc_slides.indexOf(currentSlide)&&(n.innerText="III черга",rc_btn_next.style.visibility="hidden",r.innerText="II черга")}rc_slider_line.scroll(rc_slider_line.scrollLeft+=scrollWidth*currentSlideBtn.getAttribute("data-order-number"),0),rc_slides[currentSlideBtn.getAttribute("data-order-number")].classList.add("currentSlide"),currentSlide=document.querySelector(".currentSlide"),navigationButtons.forEach(e=>{e.onclick=goToSlide}),rc_btn_next.onclick=goToNextSlide,rc_btn_prev.onclick=goToPrevSlide;