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

// --- 4. Typewriter Effect (Robust Version) ---
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typewriter");

  // Safety Check: If the span is missing, stop to prevent errors
  if (!el) {
    console.error("Could not find element with id 'typewriter'");
    return;
  }

  const words = ["beautiful", "anti-bacterial", "anti-humid", "fast-absorbent"];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 70;
    if (isDeleting) typeSpeed = 45;

    if (!isDeleting && charIndex >= currentWord.length) {
      isDeleting = true;
      typeSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start the effect after 2 seconds
  setTimeout(type, 2000);
});
