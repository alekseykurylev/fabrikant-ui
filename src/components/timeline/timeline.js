(() => {
  const container = document.querySelector('.uk-timeline-container');
  const timeline = container.querySelector('.uk-timeline');
  const itemFirst = timeline.querySelector('.uk-timeline > li:first-child');
  const itemLast = timeline.querySelector('.uk-timeline > li:last-child');

  const qwe = () => {
    const itemFirstWidth = itemFirst.offsetWidth - 1;
    const itemLastWidth = itemLast.offsetWidth - 1;

    if (UIkit.util.isInView(itemFirst, 0, itemFirstWidth * -1)) {
      container.classList.remove('uk-timeline-box-shadow-left');
    } else {
      container.classList.add('uk-timeline-box-shadow-left');
    }

    if (UIkit.util.isInView(itemLast, 0, itemLastWidth * -1)) {
      container.classList.remove('uk-timeline-box-shadow-right');
    } else {
      container.classList.add('uk-timeline-box-shadow-right');
    }
  };

  qwe();

  timeline.addEventListener('scroll', qwe);
  window.addEventListener('resize', qwe);
})();
