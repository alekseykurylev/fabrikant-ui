const itemsTab = document.querySelectorAll('#tab-nav > li');
const buttonTab = document.querySelector('#tab-button');

UIkit.util.on('.uk-switcher', 'show', function () {
  itemsTab.forEach(function (item) {
    if (item.classList.contains('uk-active')) {
      buttonTab.innerText = item.innerText;
      UIkit.dropdown('#tab-dropdown').hide(false);
    }
  });
});
