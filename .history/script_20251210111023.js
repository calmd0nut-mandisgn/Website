<script>
        // --- 1. Image Blur-Up Loading ---
        const img = document.getElementById('heroImage');
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.onload = () => img.classList.add('loaded');
        }

        // --- 2. Micro-Interaction: Hover Effect ---
        // Constraint: Hovering the BUTTON should zoom the IMAGE
        const submitBtn = document.getElementById('submitBtn');
        const wrapper = document.getElementById('mainWrapper');
        const label = document.querySelector('.notify-label');

        submitBtn.addEventListener('mouseenter', () => {
            wrapper.classList.add('zooming');
            label.style.color = '#8A6A5A'; // Slightly darker terracotta
        });

        submitBtn.addEventListener('mouseleave', () => {
            wrapper.classList.remove('zooming');
            label.style.color = 'var(--accent-color)';
        });

        // --- 3. Success State Logic ---
        const form = document.getElementById('notifyForm');
        const successMsg = document.getElementById('successMsg');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Fade out form
            form.classList.add('hidden');
            
            // Fade in message (slight delay for elegance)
            setTimeout(() => {
                successMsg.classList.add('visible');
            }, 300);
        });
    </script>
