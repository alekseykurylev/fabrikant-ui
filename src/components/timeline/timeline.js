(() => {
  const container = document.querySelector('.uk-timeline-container');
  const timeline = container.querySelector('.uk-timeline');
  const itemToday = timeline.querySelector('.uk-timeline > li.uk-timeline-today');
  const itemFirst = timeline.querySelector('.uk-timeline > li:first-child');
  const itemLast = timeline.querySelector('.uk-timeline > li:last-child');
  const bar = timeline.querySelector('.uk-timeline > li.uk-timeline-today > .uk-timeline-bar');

  const thumb = document.createElement('span');
  thumb.classList.add('uk-timeline-thumb');

  const setOverlap = () => {
    const itemFirstWidth = itemFirst.offsetWidth - 1;
    const itemLastWidth = itemLast.offsetWidth - 1;

    if (UIkit.util.isInView(itemFirst, 0, itemFirstWidth * -1)) {
      container.classList.remove('uk-left-overlap');
    } else {
      container.classList.add('uk-left-overlap');
    }

    if (UIkit.util.isInView(itemLast, 0, itemLastWidth * -1)) {
      container.classList.remove('uk-right-overlap');
    } else {
      container.classList.add('uk-right-overlap');
    }
  };

  const setBar = () => {
    const days = itemToday.dataset.days;
    const day = itemToday.dataset.day;

    thumb.style.left = `${100 / (days / day)}px`;

    bar.append(thumb);
  };

  setOverlap();
  setBar();

  timeline.addEventListener('scroll', setOverlap);
  window.addEventListener('resize', setOverlap);
})();
