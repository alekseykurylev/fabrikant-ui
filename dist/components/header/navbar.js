"use strict";document.querySelectorAll("[uk-navbar]").forEach((e=>{const t=e.querySelector("ul"),o=t.querySelectorAll(":scope > li:not(.more)"),r=t.querySelector(":scope > li:last-child");let l=[];r.classList.contains("more")?l=[...r.querySelector(".uk-nav").children]:t.insertAdjacentHTML("beforeend",'<li class="more">\n          <a href="#">Ещё...</a>\n          <ul class="uk-nav" uk-drop></ul>\n        </li>');const c=()=>{const r=t.querySelector(":scope > li.more"),c=r.querySelector(":scope > .uk-nav");c.replaceChildren(...l),o.forEach((e=>{e.hidden=!1}));const n=e.offsetWidth;let s=r.offsetWidth;o.forEach((e=>{n>=s+e.offsetWidth?s+=e.offsetWidth:(c.insertAdjacentHTML("afterbegin",e.outerHTML),e.hidden=!0)})),c.childNodes.length>0?r.hidden=!1:r.hidden=!0;const i=c.querySelectorAll("[uk-drop]");i&&i.forEach((e=>{UIkit.drop(e,{pos:"right-top"})}))};c(),window.addEventListener("resize",c)}));