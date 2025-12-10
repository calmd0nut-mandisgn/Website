// --- 1. Image Blur-Up Loading ---
const img = document.getElementById("heroImage");
if (img && img.complete) {
  img.classList.add("loaded");
} else if (img) {
  img.onload = () => img.classList.add("loaded");
}

// --- 2. Micro-Interaction: Hover Effect ---
const submitTrigger = document.getElementById("submitTrigger");
const wrapper = document.getElementById("mainWrapper");

// We moved the color change to CSS, so JS only needs to handle the Zoom
submitTrigger.addEventListener("mouseenter", () => {
  wrapper.classList.add("zooming");
});

submitTrigger.addEventListener("mouseleave", () => {
  wrapper.classList.remove("zooming");
});

// UX FIX: Clicking the "Notify Me" text submits the form
// (The button inside handles the click automatically, but clicking the text needs help)
const notifyLabel = document.querySelector(".notify-label");
const submitBtn = document.getElementById("submitBtn");

notifyLabel.addEventListener("click", () => {
  submitBtn.click();
});

// --- 3. Success State Logic ---
const form = document.getElementById("notifyForm");
const successMsg = document.getElementById("successMsg");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbx-6WXBguXp0OOVjgfUsUupt-19XBJtsYP2KDoQ_9YGS_A3HcDRegBCEWTRJUCnuZIU/exec"; // Keep your existing URL

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.add("hidden");
  setTimeout(() => {
    successMsg.classList.add("visible");
  }, 300);

  const formData = new FormData(form);
  fetch(scriptURL, { method: "POST", body: formData, mode: "no-cors" })
    .then(() => console.log("Email saved."))
    .catch((error) => console.error("Error:", error));
});

// --- 4. Typewriter Effect ---
const words = ["beautiful", "anti-bacterial", "anti-humid", "absorbent"];
const el = document.getElementById("typewriter");
let wordIndex = 0;
let charIndex = words[0].length;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  // Determine text to show based on deleting/typing state
  if (isDeleting) {
    el.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  // Speed controls
  let typeSpeed = 150; // Typing speed
  if (isDeleting) typeSpeed = 75; // Deleting speed (faster)

  // Logic to switch states
  if (!isDeleting && charIndex === currentWord.length) {
    // Word finished typing, pause before deleting
    isDeleting = true;
    typeSpeed = 2000; // Wait 2 seconds before deleting
  } else if (isDeleting && charIndex === 0) {
    // Word finished deleting, switch to next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Loop back to start
    typeSpeed = 500; // Pause briefly before typing new word
  }

  setTimeout(type, typeSpeed);
}

// Start the effect
document.addEventListener("DOMContentLoaded", () => {
  // Small delay to let the user read the first word initially
  setTimeout(type, 2000);
});
