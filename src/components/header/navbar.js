(() => {
  const navbars = document.querySelectorAll('[uk-navbar]');

  navbars.forEach((navbar) => {
    const list = navbar.querySelector('ul');
    const items = list.querySelectorAll(':scope > li:not(.more)');
    const itemLast = list.querySelector(':scope > li:last-child');
    let listMore = [];

    if (itemLast.classList.contains('more')) {
      listMore = [...itemLast.querySelector('.uk-nav').children];
    } else {
      list.insertAdjacentHTML(
        'beforeend',
        `
        <li class="more">
          <a href="#">Ещё...</a>
          <ul class="uk-nav" uk-drop></ul>
        </li>`
      );
    }

    const handleOverflowNavbar = () => {
      const itemMore = list.querySelector(':scope > li.more');
      const itemMoreList = itemMore.querySelector(':scope > .uk-nav');

      itemMoreList.replaceChildren(...listMore);
      items.forEach((item) => {
        item.hidden = false;
      });

      const navbarWidth = navbar.offsetWidth;
      let stopWidth = itemMore.offsetWidth;
      let hiddenItems = [];

      items.forEach((item) => {
        if (navbarWidth >= stopWidth + item.offsetWidth) {
          stopWidth += item.offsetWidth;
        } else {
          itemMoreList.insertAdjacentHTML('afterbegin', item.outerHTML);
          item.hidden = true;
        }
      });

      if (itemMoreList.childNodes.length > 0) {
        itemMore.hidden = false;
      } else {
        itemMore.hidden = true;
      }

      const itemMoreDrop = itemMoreList.querySelectorAll('[uk-drop]');
      if (itemMoreDrop) {
        itemMoreDrop.forEach((item) => {
          UIkit.drop(item, {
            pos: 'right-top'
          });
        });
      }
    };

    handleOverflowNavbar();
    window.addEventListener('resize', handleOverflowNavbar);
  });
})();
