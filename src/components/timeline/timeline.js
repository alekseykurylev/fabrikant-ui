(() => {
  const timeline = document.querySelector('.uk-timeline');
  const itemFirst = document.querySelector('.uk-timeline > li:first-child');
  const itemLast = document.querySelector('.uk-timeline > li:last-child');

  const qwe = () => {
    // console.log(timeline);
  };

  qwe();

  window.addEventListener('scroll', qwe);
  window.addEventListener('resize', qwe);
})();
