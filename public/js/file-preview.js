import { updateLink } from './link.js';

const linkImageInput = document.getElementById('link-image');
const linkImage = document.getElementById('input--image-preview');
const linkImageDelete = document.getElementById('link-image--delete');
const editLinkForm = document.querySelector('.form--edit-link');

linkImageInput.addEventListener('change', function showPreview(event) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = linkImage;
    preview.src = src;
    preview.style.display = 'block';
  }
});

linkImageDelete.addEventListener('click', e => {
  e.preventDefault();
  linkImage.src = '../img/link-image/add-image.svg';
  const photo = null;

  const form = new FormData();
  form.append('photo', photo);

  updateLink(editLinkForm.id, form);
});
