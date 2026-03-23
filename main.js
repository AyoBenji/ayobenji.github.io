const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const downloadCv = document.getElementById("download-cv");

downloadCv.addEventListener("click", (e) => {
  const aElement = document.createElement("a");
  aElement.setAttribute("download", "CV.pdf");
  aElement.setAttribute("href", "/assets/CV.pdf");
  aElement.click();
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h4", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__container .header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

const progressBar = document.querySelectorAll(".about__progressbar");

Array.from(progressBar).forEach((bar) => {
  const progress = bar.dataset.progress;
  bar.querySelector("span").style.width = progress + "%";
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".about__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".about__content .about__progress", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 500,
});

const tabList = document.querySelector(".resume__tablist");

tabList.addEventListener("click", (e) => {
  const tabIndex = e.target.dataset.tab;
  if (!tabIndex) return;

  const tabs = document.querySelectorAll("[data-tab]");
  Array.from(tabs).forEach((tab) => {
    if (tab.dataset.tab === tabIndex) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  const activePanel = document.querySelector(".panel__grid.active");
  const toActivePanel = document.querySelector(`[data-panel="${tabIndex}"]`);
  if (activePanel.dataset.panel === tabIndex) return;
  activePanel.classList.add("close");
  activePanel.addEventListener(
    "animationend",
    (e) => {
      activePanel.classList.remove("active");
      activePanel.classList.remove("close");
      toActivePanel.classList.add("active");
    },
    { once: true }
  );
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

ScrollReveal().reveal(".blog__card", {
  ...scrollRevealOption,
  interval: 500,
});


const texts = ["IT Support Specialist", "Junior Web Developer"];
let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

const textElement = document.getElementById('animated-text');

function type() {
  currentText = texts[index];
  
  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 2000); // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(() => requestAnimationFrame(type), typingSpeed);
}

// Start the typing effect
type();

emailjs.init("99VPUPGjFIQdDXHXd"); // replace with your actual public key

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector("button[type='submit']");
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  emailjs.sendForm("service_qto2vf5", "template_zq75wnr", contactForm)
    .then(() => {
      formStatus.style.display = "block";
      formStatus.style.color = "#009df8";
      formStatus.textContent = "✅ Message sent successfully!";
      contactForm.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    })
    .catch((error) => {
      formStatus.style.display = "block";
      formStatus.style.color = "red";
      formStatus.textContent = "❌ Something went wrong. Please try again.";
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      console.error("EmailJS error:", error);
    });
});