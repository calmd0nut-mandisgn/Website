// --- 1. Image Blur-Up Loading ---
const img = document.getElementById("heroImage");
if (img.complete) {
  img.classList.add("loaded");
} else {
  img.onload = () => img.classList.add("loaded");
}

// --- 2. Micro-Interaction: Hover Effect ---
// Constraint: Hovering the BUTTON should zoom the IMAGE
const submitBtn = document.getElementById("submitBtn");
const wrapper = document.getElementById("mainWrapper");
const label = document.querySelector(".notify-label");

submitBtn.addEventListener("mouseenter", () => {
  wrapper.classList.add("zooming");
  label.style.color = "#8A6A5A"; // Slightly darker terracotta
});

submitBtn.addEventListener("mouseleave", () => {
  wrapper.classList.remove("zooming");
  label.style.color = "var(--accent-color)";
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbx-6WXBguXp0OOVjgfUsUupt-19XBJtsYP2KDoQ_9YGS_A3HcDRegBCEWTRJUCnuZIU/exec";
// --- 3. Success State Logic (Google Sheets) ---
const form = document.getElementById("notifyForm");
const successMsg = document.getElementById("successMsg");

// PASTE YOUR GOOGLE WEB APP URL HERE
const scriptURL =
  "https://script.google.com/macros/s/AKfycbx-6WXBguXp0OOVjgfUsUupt-19XBJtsYP2KDoQ_9YGS_A3HcDRegBCEWTRJUCnuZIU/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Visual: Fade out form immediately to feel responsive
  form.classList.add("hidden");

  // Create the data payload
  const formData = new FormData(form);

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Success: Show the message
      setTimeout(() => {
        successMsg.classList.add("visible");
      }, 300);
      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      // Optional: revert the form if it fails
      alert("Something went wrong. Please try again.");
      form.classList.remove("hidden");
    });
});
