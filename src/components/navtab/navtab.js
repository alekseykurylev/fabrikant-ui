(() => {
  const navtabs = document.querySelectorAll('.uk-navtab');

  navtabs.forEach((navtab) => {
    const navLeft = navtab.querySelector('.uk-navtab-left > .uk-navtab-nav');

    navLeft.insertAdjacentHTML(
      'beforeend',
      `<li class="uk-more">
        <a href="#">Ещё</a>
        <ul uk-drop="pos: bottom-right" uk-nav></ul>
      </li>`
    );

    const onResize = () => {
      const itemsLeft = navtab.querySelectorAll('.uk-navtab-left > .uk-navtab-nav > li:not(.uk-more)');
      const itemMore = navtab.querySelector('.uk-navtab-left > .uk-navtab-nav > li.uk-more');
      const navDrop = navtab.querySelector('.uk-navtab-left > .uk-navtab-nav > li.uk-more > ul');
      const navRight = navtab.querySelector('.uk-navtab-right > .uk-navtab-nav');

      itemsLeft.forEach((item) => {
        item.hidden = false;
      });
      itemMore.hidden = false;
      navDrop.innerHTML = '';

      const navtabWidth = navtab.offsetWidth;
      const navRightWidth = navRight ? navRight.offsetWidth : 0;
      const itemMoreWidth = itemMore.offsetWidth;

      let stopWidth = itemMoreWidth + navRightWidth + 24;

      itemsLeft.forEach((item) => {
        if (navtabWidth >= stopWidth + item.offsetWidth) {
          stopWidth += item.offsetWidth;
        } else {
          navDrop.insertAdjacentHTML('afterbegin', item.outerHTML);
          item.hidden = true;
        }
      });

      if (navDrop.childNodes.length > 0) {
        itemMore.hidden = false;
      } else {
        itemMore.hidden = true;
      }

      if (navDrop.querySelector('li.uk-active')) {
        itemMore.classList.add('uk-active');
      } else {
        itemMore.classList.remove('uk-active');
      }
    };

    onResize();

    window.addEventListener('resize', onResize);
  });
})();
