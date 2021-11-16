import { login , signup } from './login.js';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const userName = document.getElementById('user-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    signup(name , userName , email, password , passwordConfirm);
  });

