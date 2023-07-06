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

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const downMouse = function (e) {
    if (timeline.scrollWidth > timeline.clientWidth) {
      timeline.style.cursor = 'grabbing';
      timeline.style.userSelect = 'none';

      pos = {
        left: timeline.scrollLeft,
        top: timeline.scrollTop,

        x: e.clientX,
        y: e.clientY
      };

      document.addEventListener('mousemove', moveMouse);
      document.addEventListener('mouseup', upMouse);
    }
  };

  const moveMouse = function (e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    timeline.scrollTop = pos.top - dy;
    timeline.scrollLeft = pos.left - dx;
  };

  const upMouse = function () {
    timeline.style.removeProperty('cursor');
    timeline.style.removeProperty('user-select');

    document.removeEventListener('mousemove', moveMouse);
    document.removeEventListener('mouseup', upMouse);
  };

  setOverlap();
  setBar();

  window.addEventListener('resize', setOverlap);
  timeline.addEventListener('mousedown', downMouse);
  timeline.addEventListener('scroll', setOverlap);
})();
