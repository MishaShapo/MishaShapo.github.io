var MrHop = MrHop || {};

MrHop.PreloadState = {
  preload: function(){
    
    this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);
    
    this.load.setPreloadSprite(this.preloadBar);
    
    
    this.load.image('background','assets/images/background.png');
    this.load.image('coin','assets/images/coin.png');
    this.load.image('floor','assets/images/floor.png');
    this.load.image('player_dead','assets/images/player_dead.png');
    this.load.spritesheet('player','assets/images/player_spritesheet.png',51,67,5,2,3);
    //this.load.image('preloader-bar',['assets/images/preloader-bar.png']);
    this.load.image('water','assets/images/water.png');
    this.load.image('yellow_block','assets/images/yellow_block.png');
    this.load.audio('coinSFX',['assets/audio/coinSFX.ogg','assets/audio/coinSFX.mp3']);

  },
  create: function(){
    this.state.start('Game');
  }
}