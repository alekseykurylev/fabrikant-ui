const container = document.querySelector('.uk-nav-compact');
const nav = container.querySelector('.uk-nav');
const firstItem = nav.querySelector('li:first-child');
const lastItem = nav.querySelector('li:last-child');

UIkit.util.on(nav, 'active', (event) => {
  const activeItem = nav.querySelector('li.uk-active');

  nav.scrollTo({
    top: activeItem.offsetTop - container.clientHeight / 2 + activeItem.clientHeight / 2,
    behavior: 'smooth'
  });
});

const onScroll = () => {
  if (UIkit.util.isInView(firstItem, -14)) {
    container.classList.remove('uk-top-overlap');
  } else {
    container.classList.add('uk-top-overlap');
  }

  if (UIkit.util.isInView(lastItem, -14)) {
    container.classList.remove('uk-bottom-overlap');
  } else {
    container.classList.add('uk-bottom-overlap');
  }
};

onScroll();

nav.addEventListener('scroll', onScroll);
