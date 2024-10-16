const loginForm = document.querySelector('.login__form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  // Verifier authentification via API
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });
});
