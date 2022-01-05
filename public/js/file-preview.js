import { updateLink } from './link.js';

const profileImageInput = document.getElementById('profile-image');
const profileImage = document.getElementById('profile-img');

const bannerImageInput = document.getElementById('banner-image');
const bannerImage = document.getElementById('banner-img');

const linkImageInput = document.getElementById('link-image');
const linkImage = document.getElementById('input--image-preview');
const linkImageDelete = document.getElementById('link-image--delete');
const editLinkForm = document.querySelector('.form--edit-link');

if (profileImageInput) {
  profileImageInput.addEventListener('change', function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = profileImage;
      preview.style.backgroundImage = `url(${src})`;
    }
  });
}

if (bannerImage) {
  bannerImageInput.addEventListener('change', function showPreview(event) {
    if (event.target.files.length > 0) {
      console.log("Here!")
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = bannerImage;
      preview.style.backgroundImage = `url(${src})`;
    }
  });
}

if (linkImageInput) {
  linkImageInput.addEventListener('change', function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = linkImage;
      preview.style.backgroundImage = `url(${src})`;
    }
  });
}
if (linkImageDelete) {
  linkImageDelete.addEventListener('click', e => {
    e.preventDefault();
    linkImage.src = '../img/link-image/add-image.svg';
    const photo = undefined;

    const form = new FormData();
    form.append('photo', photo);

    updateLink(editLinkForm.id, form);
  });
}
