import { login, signup } from './login.js';
import { addLink, deleteLink, updateLink } from './link.js';
import { userSettings } from './settings.js';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const addLinkForm = document.querySelector('.form--add-link');
const editLinkForm = document.querySelector('.form--edit-link');
const userSettingsForm = document.querySelector('.form--user-settings');
const userSocialSettingForm = document.querySelector(
  '.form--user-socialSettings'
);
const userPasswordForm = document.querySelector('.form--user-password');
const mediaLinkOption_linkDelete = document.querySelector(
  '#link-option--delete'
);

if (mediaLinkOption_linkDelete) {
  mediaLinkOption_linkDelete.addEventListener('click', () => {
    deleteLink(mediaLinkOption_linkDelete.dataset.linkId);
  });
}

if (userSettingsForm) {
  userSettingsForm.addEventListener('submit', e => {
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

    // const name = document.getElementById('name').value;
    // const userName = document.getElementById('user-name').value;
    // const userBio = document.getElementById('user-bio').value;
    // const email = document.getElementById('email').value;

    userSettings(form, 'data');
  });
}
if (userSocialSettingForm) {
  userSocialSettingForm.addEventListener('submit', e => {
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

    userSettings(data, 'social');
    document.querySelector('.btn--save-data').textContent = 'Save';
  });
}
if (userPasswordForm)
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
    signup(name, userName.replace(/ /g, "").toLowerCase(), email, password, passwordConfirm);
  });
