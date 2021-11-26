// Style Function
const mediaLinkBox = document.querySelector('.media-link');
const mediaLinkOption = document.querySelector('.link-option');
const mediaLinkOption_open = document.querySelector('#link-option--open');
const mediaLinkOption_linkDelete= document.querySelector('#link-option--delete');

mediaLinkBox.addEventListener('click', function(e) {

  if(e.target.parentNode.className == "media-link__box" && e.target.className == "media-link__icon"){
    mediaLinkOption.style.display = "block";

    mediaLinkOption_open.href = e.target.parentNode.dataset.link;
    mediaLinkOption_linkDelete.dataset.linkId = e.target.parentNode.id;
  }
  
});

mediaLinkOption.addEventListener('click' , ()=>{
  mediaLinkOption.style.display = "none";
})