(function (ViewSwitcher, MenuView) {
  
	function onScoreUpdate () {
	  $$('.js-scoreboard-here').forEach(el => {
	    scoreboard.render(el);
	  });
	}
  
	function miscSetup () {
	  Events.on($('#volume-toggle'), 'click', function () {
		if(AudioPool.mute) {
		  AudioPool.mute = false;
		  this.classList.add('on');
		} else {
		  AudioPool.mute = true;
		  this.classList.remove('on');
		}
		});
		$('#js-reset-scores')[0].addEventListener('click', function () {
      scoreboard.reset();
    })
	}
  
	window.main = (function (e) {
	  miscSetup();
  
  
	  // Create Simple Views that use a viewstarter template
	  const CreditsView = ViewStarters.ButtonView('CreditsView', $('#credits-menu')[0], () => {
		MainView.loadView(MenuView.name);
	  });
	//   const OptionsView = ViewStarters.ButtonView('OptionsView', $('#options-menu')[0], () => {
	// 	MainView.loadView(MenuView.name);
	//   });
	  const HighScoresView = ViewStarters.ButtonView('HighScoresView', $('#highscores-view')[0], () => {
		MainView.loadView(MenuView.name);
	  });
	  // setup the main view switcher
	  window.MainView = ViewSwitcher();
	  MainView.addViews(MenuView, CreditsView, HighScoresView, GameView);
		MainView.loadView(MenuView.name);
		window.scoreboard = ScoreBoard("High Scores");
		scoreboard.events.addEventListener('high-score-update', onScoreUpdate);
		onScoreUpdate();
	})

	AudioPool.addMusic('menu', require('../assets/sounds/10 Arpanauts.mp3'));
	AudioPool.addMusic('game', require('../assets/sounds/03 Chibi Ninja.mp3'));
	AudioPool.addSFX('menu_click', require('../assets/sounds/270324__littlerobotsoundfactory__menu-navigate-00.wav'));
	AudioPool.addSFX('menu_navigate', require('../assets/sounds/270322__littlerobotsoundfactory__menu-navigate-02.wav'));
	AudioPool.addSFX('hit', require('../assets/sounds/270326__littlerobotsoundfactory__hit-01.wav'));
	AudioPool.addSFX('eat', require('../assets/sounds/eat.wav'));
	AudioPool.addSFX('game_over', require('../assets/sounds/270328__littlerobotsoundfactory__hero-death-00.wav'));
	AudioPool.addSFX('game_win', require('../assets/sounds/270333__littlerobotsoundfactory__jingle-win-00.wav'));
  
	// will call main when the DOM has been fully loaded
	window.addEventListener('load', main);
  
  })(ViewSwitcher, MenuView);
  