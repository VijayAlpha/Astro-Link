import { login , signup } from './login.js';
import { addLink } from './addlink.js';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const addLinkForm = document.querySelector('.form--add-link');


if(addLinkForm){
  addLinkForm.addEventListener('submit', e => {
    e.preventDefault();
    const link = document.getElementById('link').value;
    const linkName = document.getElementById('link-name').value;
    const linkDescription = document.getElementById('link-description').value;
    const photo = document.getElementById('link-image').value;

    addLink(link , linkName , linkDescription , photo);
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

