document.addEventListener('DOMContentLoaded', async () => {
    const profileForm = document.getElementById('profile-form');
    const usernameInput = document.getElementById('username');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const profileMessage = document.getElementById('profile-message');

    // Fetch user data on page load
    try {
        const response = await fetch('/api/user');
        const data = await response.json();

        if (response.ok) {
            usernameInput.value = data.username;
            nameInput.value = data.name;
            emailInput.value = data.email;
        } else {
            profileMessage.style.color = 'red';
            profileMessage.textContent = data.error || 'Failed to load profile. Please log in.';
            // Redirect to login if unauthorized
            if (response.status === 401) {
                setTimeout(() => { window.location.href = '/login'; }, 1500);
            }
        }
    } catch (error) {
        profileMessage.style.color = 'red';
        profileMessage.textContent = 'An error occurred while loading profile.';
        console.error('Fetch profile error:', error);
    }

    // Handle form submission
    if (profileForm) {
        profileForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = nameInput.value;
            const email = emailInput.value;

            try {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email }),
                });

                const data = await response.json();

                if (response.ok) {
                    profileMessage.style.color = 'green';
                    profileMessage.textContent = data.message || 'Profile updated successfully!';
                } else {
                    profileMessage.style.color = 'red';
                    profileMessage.textContent = data.error || 'Failed to update profile.';
                    if (response.status === 401) {
                        setTimeout(() => { window.location.href = '/login'; }, 1500);
                    }
                }
            } catch (error) {
                profileMessage.style.color = 'red';
                profileMessage.textContent = 'An error occurred during profile update.';
                console.error('Update profile error:', error);
            }
        });
    }
});
