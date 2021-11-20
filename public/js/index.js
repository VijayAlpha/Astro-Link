import { login , signup } from './login.js';
import { addLink } from './addlink.js';
import { userSettings } from './settings.js';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const addLinkForm = document.querySelector('.form--add-link');
const userSettingsForm = document.querySelector('.form--user-settings');

if(userSettingsForm){
  userSettingsForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('userName', document.getElementById('user-name').value);
    form.append('userBio', document.getElementById('user-bio').value);
    form.append('email', document.getElementById('email').value);

    form.append('avatar', document.getElementById('profile-image').files[0]);

    // const name = document.getElementById('name').value;
    // const userName = document.getElementById('user-name').value;
    // const userBio = document.getElementById('user-bio').value;
    // const email = document.getElementById('email').value;

    userSettings(form);
  });
}

if(addLinkForm){
  addLinkForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('link', document.getElementById('link').value);
    form.append('linkName', document.getElementById('link-name').value);
    form.append('linkDescription', document.getElementById('link-description').value);
    form.append('photo', document.getElementById('link-image').files[0]);

    // const linkName = document.getElementById('link-name').value;
    // const linkDescription = document.getElementById('link-description').value;
    // const photo = document.getElementById('link-image').value;
    addLink(form);
  });
}

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

