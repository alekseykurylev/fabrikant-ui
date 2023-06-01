(() => {
  const container = document.querySelector('.uk-toolbar-container');
  const toolbar = container.querySelector('.uk-toolbar');
  const list = toolbar.querySelector('.uk-toolbar-list');
  const items = toolbar.querySelectorAll('.uk-toolbar-list > li');

  const heightToolbar = UIkit.util.height(container);
  UIkit.util.height(container, heightToolbar);

  list.insertAdjacentHTML(
    'afterbegin',
    `<li class="uk-more uk-flex-none" hidden>
      <button class="uk-button uk-button-medium uk-button-icon uk-button-default uk-visible@s" type="button">
        <span uk-icon="more"></span>
      </button>
      <ul class="uk-nav" uk-drop="pos: top-left" uk-nav></ul>
    </li>`
  );

  const onResize = () => {
    const itemMore = toolbar.querySelector('.uk-toolbar-list > li.uk-more');
    const nav = toolbar.querySelector('.uk-toolbar-list > li.uk-more > .uk-nav');

    items.forEach((item) => {
      item.hidden = false;
    });

    nav.innerHTML = '';

    let stopWidth = itemMore.offsetWidth;

    for (let i = items.length - 1; i >= 0; i--) {
      if (list.offsetWidth >= stopWidth + items[i].offsetWidth) {
        stopWidth += items[i].offsetWidth;
      } else {
        const navItem = items[i].firstElementChild.cloneNode(true);
        const bold = navItem.classList.contains('uk-button-primary') ? 'uk-text-bold' : '';

        navItem.classList = bold;
        nav.insertAdjacentHTML('afterbegin', `<li>${navItem.outerHTML}</li>`);
        items[i].hidden = true;
      }
    }

    if (nav.childNodes.length > 0) {
      itemMore.hidden = false;
    } else {
      itemMore.hidden = true;
    }
  };

  const onSticky = () => {
    let isInView = UIkit.util.isInView(container, heightToolbar * -1);

    if (isInView) {
      toolbar.classList.remove('uk-position-fixed');
    } else {
      toolbar.classList.add('uk-position-fixed', 'uk-animation-slide-bottom');
    }
  };

  onResize();
  onSticky();

  window.addEventListener('scroll', onSticky);
  window.addEventListener('resize', onResize);
})();
