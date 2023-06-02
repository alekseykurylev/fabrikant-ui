(() => {
  const navtabs = document.querySelectorAll('.uk-navtab');

  navtabs.forEach((navtab) => {
    const navLeft = navtab.querySelector('.uk-navtab-left > .uk-navtab-nav');
    const itemsLeft = navtab.querySelectorAll('.uk-navtab-left > .uk-navtab-nav > li');
    const navRight = navtab.querySelector('.uk-navtab-right > .uk-navtab-nav');

    navLeft.insertAdjacentHTML(
      'beforeend',
      `<li class="uk-more">
        <a href="#">Ещё</a>
        <ul uk-drop="pos: bottom-right" uk-nav></ul>
      </li>`
    );

    const onResize = () => {
      const itemRight = navtab.querySelector('.uk-navtab-right > .uk-navtab-nav');
      const itemMore = navtab.querySelector('.uk-navtab-left > .uk-navtab-nav > li.uk-more');
      const navDrop = navtab.querySelector('.uk-navtab-left > .uk-navtab-nav > li.uk-more > ul');

      const navtabWidth = navtab.offsetWidth;
      const itemRightWidth = itemRight ? itemRight.offsetWidth : 0;
      const itemMoreWidth = itemMore.offsetWidth;

      itemsLeft.forEach((item) => {
        item.hidden = false;
      });

      navDrop.innerHTML = '';

      let stopWidth = itemMoreWidth + itemRightWidth + 24;

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
    };

    onResize();

    window.addEventListener('resize', onResize);
  });
})();
