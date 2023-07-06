(() => {
  const container = document.querySelector('.uk-toolbar-container');
  const toolbar = container.querySelector('.uk-toolbar');
  const nav = toolbar.querySelector('.uk-toolbar-nav');
  const navItems = toolbar.querySelectorAll('.uk-toolbar-nav > li');

  nav.insertAdjacentHTML(
    'afterbegin',
    `<li class="uk-more uk-flex-none" hidden>
      <button class="uk-button uk-button-medium uk-button-icon uk-button-default uk-visible@s" type="button">
        <span uk-icon="more"></span>
      </button>
      <ul uk-drop="pos: top-left; mode: click" uk-nav></ul>
    </li>`
  );

  const onSticky = () => {
    const toolbarHeight = toolbar.clientHeight;
    container.style.height = `${toolbarHeight}px`;

    let isInView = UIkit.util.isInView(container, toolbarHeight * -1);

    if (isInView) {
      toolbar.classList.remove('uk-position-fixed');
    } else {
      toolbar.classList.add('uk-position-fixed', 'uk-animation-slide-bottom1');
    }
  };

  const onResize = () => {
    const itemMore = toolbar.querySelector('.uk-toolbar-nav > li.uk-more');
    const navDrop = toolbar.querySelector('.uk-toolbar-nav > li.uk-more > ul');

    navItems.forEach((item) => {
      item.hidden = false;
    });

    navDrop.innerHTML = '';

    let stopWidth = 0;

    for (let i = navItems.length - 1; i >= 0; i--) {
      if (nav.offsetWidth >= stopWidth + navItems[i].offsetWidth) {
        stopWidth += navItems[i].offsetWidth;
      } else {
        const navItem = navItems[i].firstElementChild.cloneNode(true);
        const bold = navItem.classList.contains('uk-button-primary') ? 'uk-text-bold' : '';

        navItem.classList = bold;
        navDrop.insertAdjacentHTML('afterbegin', `<li>${navItem.outerHTML}</li>`);
        navItems[i].hidden = true;
      }
    }

    if (navDrop.childNodes.length > 0) {
      itemMore.hidden = false;
    } else {
      itemMore.hidden = true;
    }
  };

  onResize();
  onSticky();

  window.addEventListener('scroll', onSticky);
  window.addEventListener('resize', onResize);
})();
