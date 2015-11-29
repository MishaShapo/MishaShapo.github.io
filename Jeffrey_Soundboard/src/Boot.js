var JeffreySoundboard = JeffreySoundboard || {};

JeffreySoundboard.Boot = function(game){};

JeffreySoundboard.Boot.prototype = {
  preload: function(){
    this.load.image("loader_bar","assets/loader_bar.png");
    this.load.image("titleImage","assets/titleImage.png")
  },
  create: function(){
    console.log("booting up....")
     // set up input max pointers
//        this.game.input.maxPointers = 1;
        // set up stage disable visibility change
//        this.game.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.scale.setMinMax(560,960,560,960);
//        this.scale.setGameSize(560,960);
        //this.scale.windowContraints = {"right":"layout","bottom":"layout"};
//        this.stage.forcePortrait = true;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

		
//        this.scale.setResizeCallback(function resizeGame(){
//          this.game.scale.setGameSize(560, 960);
//          console.log('resized');
//          console.log(resizeGame.caller);
//        }, this);
//        this.game.scale.updateLayout(true);
//        this.game.input.addPointer();
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.game.stage.backgroundColor = '#171642';
//        this.game.stage.width = 560;
//        this.game.stage.height = 960;
//        this.stage.scale.maxWidth = 570;
//        this.game.scale.refresh();
        console.log('starting preloader from boot');
       
        this.game.state.start('Preloader');
  }
}