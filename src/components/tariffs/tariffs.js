const itemsTab = document.querySelectorAll('.uk-droptab > ul > li');
const buttonTab = document.querySelector('.uk-droptab > button');

UIkit.util.on('.uk-switcher', 'show', function () {
  itemsTab.forEach(function (item) {
    if (item.classList.contains('uk-active')) {
      buttonTab.innerText = item.innerText;
      UIkit.drop('.uk-droptab > ul').hide(false);
    }
  });
});
