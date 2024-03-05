const itemsTab = document.querySelectorAll('.uk-droptab > ul > li');
const buttonTab = document.querySelector('.uk-droptab > button');

function setLimit(elm) {
  const list = elm.target.querySelector('.tariffs-list');
  const buttonShowText = 'Свернуть';
  const buttonHideText = 'Показать еще';
  const limit = 5;

  if (list && list.children.length > limit) {
    const button = elm.target.querySelector('.rest-button') || document.createElement('button');
    button.className = 'rest-button uk-button uk-button-default uk-width-1-1 uk-margin-top uk-text-weight-500';
    button.style.borderRadius = '8px';
    button.innerText = buttonHideText;
    button.ariaExpanded = false;
    list.after(button);

    for (let i = 0; i < list.children.length; i++) {
      if (i > limit - 1) {
        list.children[i].classList.add('rest-item');
        list.children[i].hidden = 'true';
      }
    }

    UIkit.toggle('.rest-button', {
      target: '.rest-item'
    });

    UIkit.util.on('.rest-item', 'show', function () {
      button.innerText = buttonShowText;
    });

    UIkit.util.on('.rest-item', 'hide', function () {
      button.innerText = buttonHideText;
    });
  }
}

function setActiveDroptab() {
  itemsTab.forEach(function (item) {
    if (item.classList.contains('uk-active')) {
      buttonTab.innerText = item.innerText;
      UIkit.drop('.uk-droptab > ul').hide(false);
    }
  });
}

UIkit.util.on('.uk-switcher', 'show', function (elm) {
  setActiveDroptab();
  setLimit(elm);
});
