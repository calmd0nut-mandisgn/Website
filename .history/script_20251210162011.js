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
const scriptURL = "YOUR_GOOGLE_SCRIPT_URL_HERE"; // Keep your existing URL

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

// // --- 1. Image Blur-Up Loading ---
// const img = document.getElementById("heroImage");
// if (img.complete) {
//   img.classList.add("loaded");
// } else {
//   img.onload = () => img.classList.add("loaded");
// }

// // --- 2. Micro-Interaction: Hover Effect ---
// // Constraint: Hovering the BUTTON should zoom the IMAGE
// const submitBtn = document.getElementById("submitBtn");
// const wrapper = document.getElementById("mainWrapper");
// const label = document.querySelector(".notify-label");

// submitBtn.addEventListener("mouseenter", () => {
//   wrapper.classList.add("zooming");
//   label.style.color = "#8A6A5A"; // Slightly darker terracotta
// });

// submitBtn.addEventListener("mouseleave", () => {
//   wrapper.classList.remove("zooming");
//   label.style.color = "var(--accent-color)";
// });

// // --- 3. Success State Logic (Instant Feedback) ---
// const form = document.getElementById("notifyForm");
// const successMsg = document.getElementById("successMsg");

// // YOUR GOOGLE SCRIPT URL
// const scriptURL =
//   "https://script.google.com/macros/s/AKfycbx-6WXBguXp0OOVjgfUsUupt-19XBJtsYP2KDoQ_9YGS_A3HcDRegBCEWTRJUCnuZIU/exec";

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // 1. OPTIMISTIC UPDATE: Show success immediately!
//   // Don't wait for Google. Just assume it works.
//   form.classList.add("hidden");

//   setTimeout(() => {
//     successMsg.classList.add("visible");
//   }, 300); // Small delay just for the fade-in animation smoothness

//   // 2. Send data in the background
//   const formData = new FormData(form);

//   fetch(scriptURL, {
//     method: "POST",
//     body: formData,
//     mode: "no-cors",
//   })
//     .then(() => {
//       // Data sent successfully.
//       // We don't need to do anything here because the UI is already updated.
//       console.log("Email saved to Sheets.");
//       form.reset();
//     })
//     .catch((error) => {
//       // If it actually fails, we log it.
//       // For a simple waitlist, it's usually better to not disturb the user
//       // with an error unless it's critical.
//       console.error("Background sync failed:", error.message);
//     });
// });
