import { login, signup, forgotpassword } from './login.js';
import { addLink, deleteLink, updateLink } from './link.js';
import { userSettings , resetPassword} from './settings.js';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const addLinkForm = document.querySelector('.form--add-link');
const editLinkForm = document.querySelector('.form--edit-link');
const userSettingsForm = document.querySelector('.form--user-settings');
const forgotPasswordForm = document.querySelector('.form--forgot-password');
const resetPasswordForm = document.querySelector('.form--reset-password');
const userSocialSettingForm = document.querySelector(
  '.form--user-socialSettings'
);
const userPasswordForm = document.querySelector('.form--user-password');
const mediaLinkOption_linkDelete = document.querySelector(
  '#link-option--delete'
);

// LOGIN CONTROLLER login.js
if (loginForm){
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--login').textContent = 'Logging...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
    document.querySelector('.btn--login').textContent = 'Login';
  });
}
if (signupForm){
  signupForm.addEventListener('submit',  async e => {
    e.preventDefault();
    document.querySelector('.btn--sign-up').textContent = 'Creating...';

    const name = document.getElementById('name').value;
    const userName = document.getElementById('user-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    await  signup(name, userName.replace(/ /g, "").toLowerCase(), email, password, passwordConfirm);
    document.querySelector('.btn--sign-up').textContent = 'Create';

  });
}
if(forgotPasswordForm){
  forgotPasswordForm.addEventListener('submit' , e=>{
    e.preventDefault();
    document.querySelector('.btn--forgot-password').textContent = 'Sending...';
    const email = document.getElementById('email').value;
    forgotpassword(email);
  })
}

// USER SETTINGS settings.js
if (userSettingsForm) {
  userSettingsForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-data').textContent = 'Updating...';

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('userName', document.getElementById('user-name').value.replace(/ /g, ""));
    form.append('userBio', document.getElementById('user-bio').value);
    form.append('email', document.getElementById('email').value);

    const profilePic = document.getElementById('profile-image').files[0];
    const bannerPic = document.getElementById('banner-image').files[0];
    if (profilePic) form.append('avatar', profilePic);
    if (bannerPic) form.append('banner', bannerPic);

    await userSettings(form, 'data');
    document.querySelector('.btn--save-data').textContent = 'Update';
  });
}
if (userSocialSettingForm) {
  userSocialSettingForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.querySelector('.btn--save-data').textContent = 'Updating...';
    const email = document.getElementById('social-email').value,
      phone = document.getElementById('social-phone-number').value,
      instagram = document.getElementById('social-instagram').value,
      twitter = document.getElementById('social-twitter').value,
      snapchat = document.getElementById('social-snapchat').value,
      clubhouse = document.getElementById('social-clubhouse').value;

    const data = {};

    if (email && email !== 'undefined') {
      data.email = document.getElementById('social-email').value;
    }
    if (phone && phone !== 'undefined') {
      data.phone = phone;
    }
    if (instagram && instagram !== 'undefined') {
      data.instagram = instagram;
    }
    if (twitter && twitter !== 'undefined') {
      data.twitter = twitter;
    }
    if (clubhouse && clubhouse !== 'undefined') {
      data.clubhouse = clubhouse;
    }
    if (snapchat && snapchat !== 'undefined') {
      data.snapchat = snapchat;
    }

    await userSettings(data, 'social');
    document.querySelector('.btn--save-data').textContent = 'Save';
  });
}
if (userPasswordForm){
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await userSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
if(resetPasswordForm){
  resetPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--reset-password').textContent = 'Updating...';

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await resetPassword( resetPasswordForm.id , 
      { password, passwordConfirm }
    );

    document.querySelector('.btn--rest-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

// LINK CONTROLLER link.js
// ADD LINK
if (addLinkForm) {
  addLinkForm.addEventListener('submit', e => {
    e.preventDefault();

    const link = document.getElementById('link').value;
    const linkName = document.getElementById('link-name').value;
    const linkDescription = document.getElementById('link-description').value;
    const photo = document.getElementById('link-image').files[0];

    const form = new FormData();
    form.append('link', link);
    form.append('linkName', linkName);
    if (linkDescription) form.append('linkDescription', linkDescription);
    if (photo) form.append('photo', photo);

    // const linkName = document.getElementById('link-name').value;
    // const linkDescription = document.getElementById('link-description').value;
    // const photo = document.getElementById('link-image').value;
    addLink(form);
  });
}
// EDIT LINK
if (editLinkForm) {
  editLinkForm.addEventListener('submit', e => {
    e.preventDefault();

    const link = document.getElementById('link').value;
    const linkName = document.getElementById('link-name').value;
    const linkDescription = document.getElementById('link-description').value;
    const photo = document.getElementById('link-image').files[0];

    const form = new FormData();
    if (link) form.append('link', link);
    if (linkName) form.append('linkName', linkName);
    if (linkDescription) form.append('linkDescription', linkDescription);
    if (photo) form.append('photo', photo);

    updateLink(editLinkForm.id, form);
  });
}
// DELETE LINK
if (mediaLinkOption_linkDelete) {
  mediaLinkOption_linkDelete.addEventListener('click', () => {
    deleteLink(mediaLinkOption_linkDelete.dataset.linkId);
  });
}

