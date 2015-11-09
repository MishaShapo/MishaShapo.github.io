SoundIcon = function(index,imageKey,soundKey,game){
  this.game = game;
  this.index = index;
  
  this.sound = this.game.add.audio(soundKey);
  this.playSound = function(){
    if(this.sound.isPlaying){
      this.sound.stop();
    } else {
      this.sound.play();
    }
  }
  
  //var x = 20 + (((this.game.world.width - 4 * 20)/3)) * (index % 3);
  var x = 20 + (20 + 153) * (index % 3);
  var y = 240 + Math.floor(index / 3) * 136;
  this.button = this.game.add.button(x,y,imageKey,this.playSound,this);
  
}


// create Game function in BasicGame
JeffreySoundboard.Game = function (game) {
};

// set Game function prototype
JeffreySoundboard.Game.prototype = {
    create: function () {
      console.log('creating game');
      var title = this.game.add.image(this.game.world.centerX,100,"game_title");
      title.anchor.set(0.5);
      title.scale.set(1.6);
      this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
      this.game.kineticScrolling.configure({
          kineticMovement: true,
          timeConstantScroll: 325, //really mimic iOS
          horizontalScroll: false,
          verticalScroll: true,
          horizontalWheel: false,
          verticalWheel: true,
          deltaWheel: 40
        });
      this.game.kineticScrolling.start();
      var icons = [];
      for(var i = 0; i < 7; i++){
        var imageKey = "jeffrey_"+ (i+1);
        var soundKey = "jeffrey_" + (i+1) + "_sfx";
        icons.push(new SoundIcon(i,imageKey,soundKey,this.game))
      }
       this.game.world.setBounds(0, 0, 3000, 3000);
    }
};