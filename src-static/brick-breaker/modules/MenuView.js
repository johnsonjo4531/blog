window.MenuView = (function GameView (AudioPool) {
  var buttonMenu = null;

  function render () {
    AudioPool.playMusic('menu');
    buttonMenu.activate();
  }

  function unrender () {
    buttonMenu.deactivate();
  }

  function init () {
    AudioPool.addMusic('menu', require('../assets/04_All_of_Us.mp3'));
    AudioPool.addSFX('menu_click', require('../assets/270324__littlerobotsoundfactory__menu-navigate-00.wav'));
    AudioPool.addSFX('menu_navigate', require('../assets/270322__littlerobotsoundfactory__menu-navigate-02.wav'));
    buttonMenu = ButtonMenu($('#game-menu')[0]);
  }

  return {
    render,
    unrender,
    init,
    name: "MenuView",
  }
})(AudioPool)
