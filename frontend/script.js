document.addEventListener('DOMContentLoaded', () => {
    console.log('Turnstile script loaded.');

    const form = document.getElementById('registration-form');
    const tosModal = document.getElementById('tos-modal');
    const openTosModal = document.getElementById('open-tos-modal');
    const closeTosModal = document.getElementById('close-tos-modal');
    const tosCheckbox = document.querySelector('input[name="agree-tos"]');
    const allowedDomains = ['example.edu', 'university.edu']; // CONFIGURE: Replace with your allowed email domains

    // Automatically show the Terms of Service modal on page load
    if (tosModal) {
        tosModal.style.display = 'block';
    }

    // Handle Terms of Service modal
    if (openTosModal && tosModal) {
        openTosModal.addEventListener('click', (event) => {
            event.preventDefault();
            tosModal.style.display = 'block';
        });
    }

    if (closeTosModal && tosModal) {
        closeTosModal.addEventListener('click', () => {
            tosModal.style.display = 'none';
            //if (tosCheckbox) tosCheckbox.checked = true; // Auto-check ToS checkbox
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === tosModal) {
            tosModal.style.display = 'none';
            //if (tosCheckbox) tosCheckbox.checked = true; // Auto-check ToS checkbox
        }
    });

    // Ensure the form exists
    if (!form) {
        console.error('Form not found!');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emailInput = document.querySelector('input[name="email"]');
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email) {
            alert('Email is required.');
            return;
        }
        // Validate email
        const emailDomain = email.split('@')[1];
        if (!allowedDomains.includes(emailDomain)) {
            alert(`You must use a valid email from the following domains: ${allowedDomains.join(', ')}.`);
            return;
        }

        // Ensure the Terms of Service checkbox is checked
        if (!tosCheckbox || !tosCheckbox.checked) {
            alert('You must agree to the Terms of Service and the Privacy Policy to continue.');
            return;
        }

        // Retrieve Turnstile token
        const turnstileResponseElement = document.querySelector('input[name="cf-turnstile-response"]');
        const captchaToken = turnstileResponseElement ? turnstileResponseElement.value : '';

        if (!captchaToken) {
            console.error('CAPTCHA token is missing.');
            alert('Please complete the CAPTCHA.');
            return;
        }

        console.log('Submitting with Turnstile token:', captchaToken);

        try {
            const response = await fetch('https://YOUR_BACKEND_API_URL/signup', { // CONFIGURE: Replace with your backend API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, captcha: captchaToken }),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Registration successful! Check your email to set your password.');
                emailInput.value = ''; // Clear the form
            } else {
                const error = await response.text();
                console.error('Backend error:', error);
                alert(`Registration failed: ${error}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
