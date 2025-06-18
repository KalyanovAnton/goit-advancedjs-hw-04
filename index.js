import{a as h,S as y,i as l}from"./assets/vendor-DqB7j7Ix.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const f=e=>`<li class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
    <img
      class="gallery-image"
      src="${e.webformatURL}"
      data-source="${e.largeImageURL}"
      alt="${e.tags}"
    />
  </a>
  <div class="div-info">
      <div class="info-gallery">
        <h2 class="info-title">Likes</h2>
        <p class="info-st">${e.likes}</p>
      </div>
      <div class="info-gallery">
        <h2 class="info-title">Views</h2>
        <p class="info-st">${e.views}</p>
      </div>
      <div class="info-gallery">
        <h2 class="info-title">Comments</h2>
        <p class="info-st">${e.comments}</p>
      </div>
      <div class="info-gallery">
        <h2 class="info-title">Downloads</h2>
        <p class="info-st">${e.downloads}</p>
      </div>
    </div>
</li>`,m={loaderEl:document.querySelector(".loader")};h.defaults.baseURL="https://pixabay.com";h.interceptors.response.use(function(e){return m.loaderEl.classList.remove("active"),e},function(e){return m.loaderEl.classList.remove("active"),Promise.reject(e)});const g=async(e,r)=>{const i={key:"50834675-61314f789662a68656002458b",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await h.get("/api/",{params:i})).data}catch(a){console.log(a)}},o={formEl:document.querySelector(".form"),galleryEl:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader"),loadMoreEl:document.querySelector(".load-more-btn")},p=new y(".gallery a",{captionsData:"alt",captionDelay:250});let c=1,n="";const v=async e=>{try{e.preventDefault();const{target:r}=e;if(n=r.elements.user_query.value,n===""){l.error({title:"",message:"The field is empty.<br>Please enter something to continue.",position:"topRight"}),o.galleryEl.innerHTML="";return}o.loaderEl.classList.add("active"),o.loadMoreEl.classList.add("is-hiden"),c=1;const i=await g(n,c);if(i.totalHits>1&&(o.loadMoreEl.classList.remove("is-hiden"),o.loadMoreEl.addEventListener("click",u)),i.hits.length<15&&(o.loadMoreEl.classList.add("is-hiden"),l.info({title:"",message:"We're sorry, but you've reached<br>the end of search results.",position:"topRight"}),o.loadMoreEl.removeEventListener("click",u)),i.total===0){l.error({title:"",message:"Sorry, there are no images matching<br>your search query. Please try again!",position:"topRight"}),o.galleryEl.innerHTML="";return}const a=i.hits.map(t=>f(t)).join("");o.galleryEl.innerHTML=a,p.refresh(),r.reset()}catch(r){console.log("Fetch error:",r)}},u=async e=>{try{c++;const r=await g(n,c),i=r.hits.map(s=>f(s)).join("");o.galleryEl.insertAdjacentHTML("beforeend",i),p.refresh(),r.hits.length<15&&(o.loadMoreEl.classList.add("is-hiden"),l.info({title:"",message:"We're sorry, but you've reached<br>the end of search results.",position:"topRight"}),o.loadMoreEl.removeEventListener("click",u));const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}catch(r){console.log("Fetch error:",r)}};o.formEl.addEventListener("submit",v);
//# sourceMappingURL=index.js.map
