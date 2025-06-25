 src="https://unpkg.com/gsap@3.12.2/dist/gsap.min.js"
 src="https://unpkg.com/gsap@3.12.2/dist/TextPlugin.min.js"


// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Typing effect for Hero Text
const heroText = document.querySelector(".animated-text");
const words = ["AI-powered Frontend Developer Portfolio", "Scroll to explore", "Made with 💡 + 🤖"];
let index = 0;

const phrases = [
  "AI-powered Frontend Developer Portfolio",
  "Scroll down to explore my universe 🚀",
  "Crafted with JavaScript, GSAP & OpenAI 🤖"
];

let typedText = document.querySelector(".typed-text");
let cursor = document.querySelector(".cursor");
let phraseIndex = 0;
let charIndex = 0;

function typePhrase() {
  if (charIndex < phrases[phraseIndex].length) {
    typedText.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typePhrase, 60);
  } else {
    setTimeout(deletePhrase, 2000);
  }
}

function deletePhrase() {
  if (charIndex > 0) {
    typedText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deletePhrase, 30);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, 300);
  }
}

typePhrase();

gsap.to(".hero-greeting", {
  opacity: 1,
  text: "> Booting AI Interface...",
  duration: 2,
  delay: 0.5,
  ease: "none"
});

gsap.from(".hero-title", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 2,
  ease: "power2.out"
});

gsap.from(".hero-description", {
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 2.5,
  ease: "power2.out"
});

gsap.from(".hero-btn", {
  scale: 0.9,
  opacity: 0,
  duration: 0.8,
  delay: 3,
  ease: "back.out(1.7)"
});

// Scroll animations
gsap.utils.toArray("section").forEach((section, i) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    delay: i * 0.1,
  });
});

// Smooth scroll to sections (optional, if you use links later)
function scrollToSection(id) {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: id,
      offsetY: 50,
    },
    ease: "power2.inOut",
  });
}

gsap.from(".animated-text", { opacity: 0, y: 20, duration: 1.2 });

gsap.from(".about-image", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  opacity: 0,
  x: -100,
  duration: 1
});

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  opacity: 0,
  x: 100,
  duration: 1,
  delay: 0.3
});

gsap.registerPlugin(ScrollTrigger);

// Utility function to animate skill bars
const animateSkills = () => {
  const skillWidths = {
    js: "90%",
    html: "95%",
    gsap: "85%",
    api: "75%",
  };

  Object.keys(skillWidths).forEach(skill => {
    gsap.to(`.bar.${skill}`, {
      scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      width: skillWidths[skill],
      duration: 1.5,
      ease: "power2.out",
      delay: 0.2
    });
  });
};

// Call the function after page load
window.addEventListener("DOMContentLoaded", animateSkills);
