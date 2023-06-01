let container = document.querySelector('.uk-sticky-bar-container');
let stickyBar = container.querySelector('.uk-sticky-bar');

let height = UIkit.util.height(container);
UIkit.util.height(container, height);

let qwe = () => {
  let isInView = UIkit.util.isInView(container, height * -1);

  if (isInView) {
    stickyBar.classList.remove('uk-position-fixed');
  } else {
    stickyBar.classList.add('uk-position-fixed', 'uk-animation-slide-bottom');
  }
};

qwe();

window.addEventListener('scroll', qwe);
