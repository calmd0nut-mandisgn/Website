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

// --- 3. Success State Logic (Connected to Formspree) ---
const form = document.getElementById("notifyForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the page from reloading

  const formData = new FormData(form);

  // REPLACE 'YOUR_FORMSPREE_ID' BELOW WITH YOUR ACTUAL URL
  fetch("https://formspree.io/f/xnnegded", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // 1. Success! Fade out form
        form.classList.add("hidden");

        // 2. Fade in message
        setTimeout(() => {
          successMsg.classList.add("visible");
        }, 300);

        // Optional: Reset form
        form.reset();
      } else {
        // Handle errors (optional)
        alert("Oops! There was a problem submitting your form.");
      }
    })
    .catch((error) => {
      alert("Oops! There was a problem submitting your form.");
    });
});
