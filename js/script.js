"use strict";

const menuBlock = document.querySelector(".header_menu_block");
const menu = document.querySelector(".menu");
const menuBurgerBtn = document.querySelector(".menu_burger_btn");
let dropMenuItems = document.querySelectorAll(".menu_item_list");

function dropMenuList(event) {
  let target = event.target.closest(".menu_item_list");

  if (!target) {
    return;
  }

  target.classList.toggle("active");
}

menuBlock.addEventListener("click", dropMenuList);

function showHideMenu() {
  menuBurgerBtn.classList.toggle("active");
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    menu.style.height = menu.scrollHeight + "px";
    menu.style.overflow = "auto";
  } else {
    menu.style.height = "";
    menu.style.overflow = "";

    if (dropMenuItems.length) {
      for (let item of dropMenuItems) {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      }
    }
  }
}

function hideMenuAfterLinkAction(event) {
  if (!menuBurgerBtn.classList.contains("active")) {
    return;
  }
  if (!event.target.closest("a")) {
    return;
  }
  showHideMenu();
}

menuBurgerBtn.addEventListener("click", showHideMenu);
menuBlock.addEventListener("click", hideMenuAfterLinkAction);

//Projects gallery

const projectGalleryBtnsBlock = document.querySelector(".page_projects_btns");
let projectGalleryBtns = document.querySelectorAll(".page_projects_btn");
let projectsGalleryItems = document.querySelectorAll(".project_gallery_item");

function showTargetProjects(event) {
  let target = event.target.closest(".page_projects_btn");

  if (!target || target.classList.contains("active")) {
    return;
  }

  let marker = target.dataset.marker;

  for (let btn of projectGalleryBtns) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  }
  target.classList.add("active");

  for (let item of projectsGalleryItems) {
    if (!marker) {
      item.style.display = "";
    } else {
      if (marker === item.dataset.marker) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  }
}

projectGalleryBtnsBlock.addEventListener("click", showTargetProjects);

//Team slider

const teamSlider = document.querySelector(".team_slider");
const teamSliderLine = document.querySelector(".team_slider_line");
let teamSlides = document.querySelectorAll(".team_slider_item");
let teamSlideWidth = teamSlides[0].offsetWidth;
let teamCloneSlides = [];
let teamActiveSlide = 0;
let sliderLineStyles = getComputedStyle(teamSliderLine);
let teamSliderTransitionDuration =
  parseFloat(sliderLineStyles.transitionDuration) * 1000;
let teamSliderInterval = null;

console.log(teamSlideWidth);
for (let slide of teamSlides) {
  let clone = slide.cloneNode(true);
  teamCloneSlides.push(clone);
}

const prevTeamSlideBtn = document.querySelector(".team_slider_prev");
const nextTeamSlideBtn = document.querySelector(".team_slider_next");

teamSliderLine.style.transform = `translateX(0px)`;

function nextTeamSlide() {
  clearInterval(teamSliderInterval);
  nextTeamSlideBtn.removeEventListener("click", nextTeamSlide);
  prevTeamSlideBtn.removeEventListener("click", prevTeamSlide);

  if (teamSliderLine.classList.contains("active")) {
    teamSliderLine.classList.remove("active");
  }
  teamSlides = document.querySelectorAll(".team_slider_item");
  let slidesForEdit = [];

  for (let slide of teamCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }

  teamSliderLine.append(slidesForEdit[teamActiveSlide]);
  teamSliderLine.style.transform = `translateX(-${teamSlideWidth}px)`;

  setTimeout(() => {
    teamSlides = document.querySelectorAll(".team_slider_item");

    if (!teamSliderLine.classList.contains("active")) {
      teamSliderLine.classList.add("active");
    }
    teamSlides[0].remove();
    teamSliderLine.style.transform = `translateX(0px)`;

    if (teamActiveSlide < teamCloneSlides.length - 1) {
      teamActiveSlide++;
    } else {
      teamActiveSlide = 0;
    }
    nextTeamSlideBtn.addEventListener("click", nextTeamSlide);
    prevTeamSlideBtn.addEventListener("click", prevTeamSlide);
    teamSliderInterval = setInterval(nextTeamSlide, 5000);
  }, teamSliderTransitionDuration);
}

function prevTeamSlide() {
  clearInterval(teamSliderInterval);
  nextTeamSlideBtn.removeEventListener("click", nextTeamSlide);
  prevTeamSlideBtn.removeEventListener("click", prevTeamSlide);

  if (!teamSliderLine.classList.contains("active")) {
    teamSliderLine.classList.add("active");
  }
  teamSlides = document.querySelectorAll(".team_slider_item");
  let slidesForEdit = [];

  for (let slide of teamCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }
  if (teamActiveSlide > 0) {
    teamActiveSlide--;
  } else {
    teamActiveSlide = teamCloneSlides.length - 1;
  }

  teamSliderLine.style.transform = `translateX(-${teamSlideWidth}px)`;
  teamSliderLine.prepend(slidesForEdit[teamActiveSlide]);

  setTimeout(() => {
    if (teamSliderLine.classList.contains("active")) {
      teamSliderLine.classList.remove("active");
    }

    teamSliderLine.style.transform = `translateX(0px)`;
    nextTeamSlideBtn.addEventListener("click", nextTeamSlide);
  }, 0);
  setTimeout(() => {
    teamSlides = document.querySelectorAll(".team_slider_item");
    teamSlides[teamSlides.length - 1].remove();
    nextTeamSlideBtn.addEventListener("click", nextTeamSlide);
    prevTeamSlideBtn.addEventListener("click", prevTeamSlide);
    teamSliderInterval = setInterval(nextTeamSlide, 5000);
  }, teamSliderTransitionDuration);
}

function correctTeamSlideWidth() {
  let teamSlides = document.querySelectorAll(".team_slider_item");

  teamSlideWidth = teamSlides[0].offsetWidth;
}

nextTeamSlideBtn.addEventListener("click", nextTeamSlide);
prevTeamSlideBtn.addEventListener("click", prevTeamSlide);
teamSliderInterval = setInterval(nextTeamSlide, 5000);
window.addEventListener("resize", correctTeamSlideWidth);

//Testimonials slider

const testimonialsSliderLine = document.querySelector(
  ".testimonials_slider_line"
);
let testimonialsSlides = document.querySelectorAll(".testimonials_slider_item");
let testimonialSlideWidth = testimonialsSlides[0].offsetWidth;
let testimonialsSlideIndex = 0;
let testimonialsCloneSlides = [];
let testimonialsSliderInterval = null;
let testimonialsSliderLineStyles = getComputedStyle(testimonialsSliderLine);
let testimonialsSliderLineTransitionDuration =
  parseFloat(testimonialsSliderLineStyles.transitionDuration) * 1000;

for (let slide of testimonialsSlides) {
  let clone = slide.cloneNode(true);
  testimonialsCloneSlides.push(clone);
}

const testimonialsSliderBtnsBlock = document.querySelector(
  ".testimonials_slider_btns"
);
let testimonialsSliderBtns = document.querySelectorAll(
  ".testimonials_slider_btn"
);

function nextTestimonialSlide() {
  testimonialsSliderBtnsBlock.removeEventListener(
    "click",
    actionForTestimonialsSliderBtns
  );
  if (testimonialsSliderLine.classList.contains("active")) {
    testimonialsSliderLine.classList.remove("active");
  }
  testimonialsSlides = document.querySelectorAll(".testimonials_slider_item");
  let slidesForEdit = [];

  for (let slide of testimonialsCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }

  testimonialsSliderLine.append(slidesForEdit[testimonialsSlideIndex]);
  testimonialsSliderLine.style.transform = `translateX(-${testimonialSlideWidth}px)`;
  lightTestimonialSlide(2);
  lightTestimonialBtn();

  setTimeout(() => {
    testimonialsSlides = document.querySelectorAll(".testimonials_slider_item");

    if (!testimonialsSliderLine.classList.contains("active")) {
      testimonialsSliderLine.classList.add("active");
    }
    testimonialsSlides[0].remove();
    testimonialsSliderLine.style.transform = `translateX(0px)`;

    if (testimonialsSlideIndex < testimonialsCloneSlides.length - 1) {
      testimonialsSlideIndex++;
    } else {
      testimonialsSlideIndex = 0;
    }
    testimonialsSliderBtnsBlock.addEventListener(
      "click",
      actionForTestimonialsSliderBtns
    );
  }, testimonialsSliderLineTransitionDuration);
}

function lightTestimonialSlide(position = 0) {
  testimonialsSlides = document.querySelectorAll(".testimonials_slider_item");

  for (let slide of testimonialsSlides) {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  }

  testimonialsSlides[position].classList.add("active");
}

function lightTestimonialBtn() {
  let index = testimonialsSlideIndex;

  if (index < testimonialsCloneSlides.length - 1) {
    index++;
  } else {
    index = 0;
  }

  for (let btn of testimonialsSliderBtns) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  }

  testimonialsSliderBtns[index].classList.add("active");
}

function leftMoveTestimonials(count) {
  clearInterval(testimonialsSliderInterval);

  if (testimonialsSliderLine.classList.contains("active")) {
    testimonialsSliderLine.classList.remove("active");
  }
  testimonialsSlides = document.querySelectorAll(".testimonials_slider_item");
  let slidesForEdit = [];

  for (let slide of testimonialsCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }

  let arrayForInsert = [];
  let count1 = count;
  let count2 = count;
  let sliderShiftValue = testimonialSlideWidth * count;
  let position = count + 1;

  while (count1) {
    arrayForInsert.push(slidesForEdit[testimonialsSlideIndex]);

    if (testimonialsSlideIndex < testimonialsCloneSlides.length - 1) {
      testimonialsSlideIndex++;
    } else {
      testimonialsSlideIndex = 0;
    }

    count1--;
  }

  testimonialsSliderLine.append(...arrayForInsert);
  lightTestimonialSlide(position);
  testimonialsSliderLine.style.transform = `translateX(-${sliderShiftValue}px)`;

  setTimeout(() => {
    if (!testimonialsSliderLine.classList.contains("active")) {
      testimonialsSliderLine.classList.add("active");
    }

    while (count2) {
      testimonialsSlides = document.querySelectorAll(
        ".testimonials_slider_item"
      );
      sliderShiftValue -= testimonialSlideWidth;
      testimonialsSlides[0].remove();
      testimonialsSliderLine.style.transform = `translateX(-${sliderShiftValue}px)`;
      count2--;
    }
    testimonialsSliderInterval = setInterval(nextTestimonialSlide, 5000);
  }, testimonialsSliderLineTransitionDuration);
}

function rightMoveTestimonials(count) {
  clearInterval(testimonialsSliderInterval);

  if (!testimonialsSliderLine.classList.contains("active")) {
    testimonialsSliderLine.classList.add("active");
  }

  testimonialsSlides = document.querySelectorAll(".testimonials_slider_item");
  let slidesForEdit = [];

  for (let slide of testimonialsCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }

  let arrayForInsert = [];
  let count1 = count;
  let count2 = count;
  let sliderShiftValue = testimonialSlideWidth * count;

  while (count1) {
    if (testimonialsSlideIndex > 0) {
      testimonialsSlideIndex--;
    } else {
      testimonialsSlideIndex = testimonialsCloneSlides.length - 1;
    }

    arrayForInsert.unshift(slidesForEdit[testimonialsSlideIndex]);
    count1--;
  }

  testimonialsSliderLine.prepend(...arrayForInsert);
  testimonialsSliderLine.style.transform = `translateX(-${sliderShiftValue}px)`;

  setTimeout(() => {
    if (testimonialsSliderLine.classList.contains("active")) {
      testimonialsSliderLine.classList.remove("active");
    }

    lightTestimonialSlide(1);

    testimonialsSliderLine.style.transform = `translateX(0px)`;
  }, 0);

  setTimeout(() => {
    while (count2) {
      testimonialsSlides = document.querySelectorAll(
        ".testimonials_slider_item"
      );

      testimonialsSlides[testimonialsSlides.length - 1].remove();
      count2--;
    }
    testimonialsSliderInterval = setInterval(nextTestimonialSlide, 5000);
  }, testimonialsSliderLineTransitionDuration);
}

function actionForTestimonialsSliderBtns(event) {
  if (!event.target.closest(".testimonials_slider_btn")) {
    return;
  }

  let target = event.target.closest(".testimonials_slider_btn");
  let placeIndex;

  testimonialsSliderBtns.forEach((item, index) => {
    if (item === target) {
      placeIndex = index;
    }
  });

  if (placeIndex == testimonialsSlideIndex) {
    return;
  }

  let count = Math.abs(placeIndex - testimonialsSlideIndex);
  let trueFunction =
    placeIndex > testimonialsSlideIndex
      ? leftMoveTestimonials
      : rightMoveTestimonials;

  trueFunction(count);

  for (let btn of testimonialsSliderBtns) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  }

  target.classList.add("active");
}

testimonialsSliderInterval = setInterval(nextTestimonialSlide, 5000);
testimonialsSliderBtnsBlock.addEventListener(
  "click",
  actionForTestimonialsSliderBtns
);

function correctTestimonialsSlideWidth() {
  let teamSlides = document.querySelectorAll(".testimonials_slider_item");

  testimonialSlideWidth = teamSlides[0].offsetWidth;
}

window.addEventListener("resize", correctTestimonialsSlideWidth);

//Page up btn

const pageUpBtn = document.querySelector(".page_up_btn");

function pageUpBtnVisibility() {
  let scrollYValue = window.pageYOffset;
  let screenHight = document.documentElement.clientHeight / 2;

  if (scrollYValue >= screenHight) {
    if (pageUpBtn.classList.contains("visible")) {
      return;
    }
    pageUpBtn.classList.add("visible");
    setTimeout(() => {
      pageUpBtn.style.opacity = 1;
    }, 0);
  } else {
    if (!pageUpBtn.classList.contains("visible")) {
      return;
    }
    pageUpBtn.style.opacity = "";

    setTimeout(() => {
      pageUpBtn.classList.remove("visible");
    }, 300);
  }
}

function pageUpBtbAction() {
  let scrollYValue = window.pageYOffset;
  if (scrollYValue > 0) {
    scrollBy(0, -40);
    setTimeout(pageUpBtbAction, 0);
  } else {
    return;
  }
}

window.addEventListener("scroll", pageUpBtnVisibility);
pageUpBtn.addEventListener("click", pageUpBtbAction);
