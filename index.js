import{a as u,S as p,i as d}from"./assets/vendor-DqB7j7Ix.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const f=e=>`<li class="gallery-item">
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
</li>`,m={loaderEl:document.querySelector(".loader")};u.defaults.baseURL="https://pixabay.com";u.interceptors.response.use(function(e){return m.loaderEl.classList.remove("active"),e},function(e){return m.loaderEl.classList.remove("active"),Promise.reject(e)});const h=(e,r)=>{const a={key:"50834675-61314f789662a68656002458b",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};return u.get("/api/",{params:a})},s={formEl:document.querySelector(".gallery-form"),galleryEl:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader"),loadMoreEl:document.querySelector(".load-more-btn")},y=new p(".gallery a",{captionsData:"alt",captionDelay:250});let n=1,l="";const v=async e=>{try{e.preventDefault();const{target:r}=e;if(l=r.elements.user_query.value,l===""){d.error({title:"",message:"The field is empty.<br>Please enter something to continue.",position:"topRight"}),s.galleryEl.innerHTML="";return}s.loaderEl.classList.add("active"),s.loadMoreEl.classList.add("is-hiden"),n=1;const{data:a}=await h(l,n);if(a.total===0){d.error({title:"",message:"Sorry, there are no images matching<br>your search query. Please try again!",position:"topRight"}),s.galleryEl.innerHTML="";return}a.totalHits>1&&(s.loadMoreEl.classList.remove("is-hiden"),s.loadMoreEl.addEventListener("click",g));const i=a.hits.map(t=>f(t)).join("");s.galleryEl.innerHTML=i,y.refresh(),r.reset()}catch(r){console.log("Fetch error:",r)}},g=async e=>{try{n++;const{data:r}=await h(l,n),a=r.hits.map(o=>f(o)).join("");s.galleryEl.insertAdjacentHTML("beforeend",a),r.hits.length<15&&(s.loadMoreEl.classList.add("is-hiden"),d.info({title:"",message:"We're sorry, but you've reached<br>the end of search results.",position:"topRight"}),s.loadMoreEl.removeEventListener("click",g));const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}catch(r){console.log("Fetch error:",r)}};s.formEl.addEventListener("submit",v);
//# sourceMappingURL=index.js.map
