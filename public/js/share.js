import { showAlert } from './alerts.js';

const btn = document.querySelector('#profile-share-button');
const userName = document.querySelector('.text-box__user-name').innerHTML;
const shareData = {
  text: `@${userName}`,
  url: `${window.location.hostname}/${userName}`,
};

// Share must be triggered by "user activation"
if (btn) {
  btn.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showAlert('success', 'Shared successfully!');
      } catch (err) {
        showAlert('error', err);
      }
    } else {
      const markup = `<div class="alert alert--success">Your Profile Link is : <a href="${userName}" class="link" style="text-decoration:underline"> ${window.location.hostname}/${userName}<a> </div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      window.setTimeout(() => {
        const el = document.querySelector('.alert');
        if (el) el.parentElement.removeChild(el);
      }, 10000);
    }
  });
}
