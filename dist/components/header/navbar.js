"use strict";function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray(r)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(r,e){if(r){if("string"==typeof r)return _arrayLikeToArray(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,e):void 0}}function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}function _arrayLikeToArray(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,o=new Array(e);t<e;t++)o[t]=r[t];return o}document.querySelectorAll("[uk-navbar]").forEach((function(r){var e=r.querySelector("ul"),t=e.querySelectorAll(":scope > li:not(.more)"),o=e.querySelector(":scope > li:last-child"),n=[];o.classList.contains("more")?n=_toConsumableArray(o.querySelector(".uk-nav").children):e.insertAdjacentHTML("beforeend",'<li class="more">\n          <a href="#">Ещё...</a>\n          <ul class="uk-nav" uk-drop></ul>\n        </li>');var a=function(){var o=e.querySelector(":scope > li.more"),a=o.querySelector(":scope > .uk-nav");a.replaceChildren.apply(a,_toConsumableArray(n)),t.forEach((function(r){r.hidden=!1}));var i=r.offsetWidth,l=o.offsetWidth;t.forEach((function(r){i>=l+r.offsetWidth?l+=r.offsetWidth:(a.insertAdjacentHTML("afterbegin",r.outerHTML),r.hidden=!0)})),a.childNodes.length>0?o.hidden=!1:o.hidden=!0;var u=a.querySelectorAll("[uk-drop]");u&&u.forEach((function(r){UIkit.drop(r,{pos:"right-top"})}))};a(),window.addEventListener("resize",a)}));