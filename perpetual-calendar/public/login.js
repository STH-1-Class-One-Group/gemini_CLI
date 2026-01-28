document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    loginMessage.style.color = 'green';
                    loginMessage.textContent = 'Login successful! Redirecting...';
                    window.location.href = '/edit-profile'; // Redirect to profile page on success
                } else {
                    loginMessage.style.color = 'red';
                    loginMessage.textContent = data.error || 'Login failed.';
                }
            } catch (error) {
                loginMessage.style.color = 'red';
                loginMessage.textContent = 'An error occurred during login.';
                console.error('Login error:', error);
            }
        });
    }
});
