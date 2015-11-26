SoundIcon = function(index,imageKey,soundKey,labelText,graphics,game){
  this.game = game;
  this.x = this.game.world.width / 2 - 140
  this.y = 240 + Math.floor(index / 1) * 245;
  this.index = index;
  this.pause = this.game.add.image(this.x,this.y,'pause');
  this.pause.alpha = 0.3;
  this.pause.visible = false;
  
  this.sound = this.game.add.audio(soundKey);
  this.sound.onStop.add(function(){
    this.pause.visible = false;
  },this);
  this.playSound = function(){
    if(this.sound.isPlaying){
      this.sound.stop();
      this.pause.visible = false;
    } else {
      this.sound.play();
      this.pause.visible = true;
    }
  }
  
  //var x = 20 + (((this.game.world.width - 4 * 20)/3)) * (index % 3);
 // var x = 20 + (20 + 240) * (index % 1);
  
  this.button = this.game.add.button(this.x,this.y,imageKey,this.playSound,this);
  this.label = this.game.add.text(this.x,this.y+170,labelText,{fill: "#ffffff"});
  this.label.x = this.game.world.width/2 - this.label.width/2;
  graphics.drawRoundedRect(this.x - 15, this.y - 15,280 + 30,222 + 10,15);
  this.game.world.bringToTop(this.pause);
  
}


// create Game function in BasicGame
JeffreySoundboard.Game = function (game) {
};

// set Game function prototype
JeffreySoundboard.Game.prototype = {
    create: function () {
      console.log('creating game');
  
      this.graphics = this.game.add.graphics();
      this.graphics.lineStyle(5,Phaser.Color.hexToRGB("#fff"),1)
      this.title = this.game.add.image(this.game.world.centerX,100,"title");
      
      this.title.anchor.set(0.5);
      this.title.scale.set(1.6);
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
      var imageIndex = 1;
      var index = 0;
      var underscoreRemov = new RegExp("_","gim");
      this.game.cache.getKeys(Phaser.Cache.SOUND).forEach(function(key,index){
        var textLabel = key.replace(underscoreRemov," ");
        icons.push(new SoundIcon(index,"Jeffrey_"+imageIndex,key,textLabel,this.graphics,this.game));
        imageIndex++;
        index++;
        if(imageIndex >= 21){
          imageIndex = 1;
        }
      },this);
       
       this.game.world.setBounds(0, 0, 570, 8700);
    }
};