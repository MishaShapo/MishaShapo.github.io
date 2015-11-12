SoundIcon = function(index,imageKey,soundKey,labelText,graphics,game){
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
 // var x = 20 + (20 + 240) * (index % 1);
  var x = this.game.world.width / 2 - 140
  var y = 240 + Math.floor(index / 1) * 245;
  this.button = this.game.add.button(x,y,imageKey,this.playSound,this);
  this.label = this.game.add.text(x,y+170,labelText,{fill: "#ffffff"});
  this.label.x = this.game.world.width/2 - this.label.width/2;
  graphics.drawRoundedRect(x - 15, y - 15,280 + 30,222 + 10,15)
  
}


// create Game function in BasicGame
JeffreySoundboard.Game = function (game) {
};

// set Game function prototype
JeffreySoundboard.Game.prototype = {
    create: function () {
      console.log('creating game');
      var labels = [
        "Aww Dang",
        "Good Luck, Mang",
        "It Was Really Noice",
        "Lame",
        "Hahahaha",
        "Oh, Baby",
        "Oh, Dang",
        "RIP",
        "Show Your Work",
        "That's Pretty True Mang",
        "They Cheated",
        "Whoops"
      ];
      this.graphics = this.game.add.graphics();
      this.graphics.lineStyle(5,Phaser.Color.hexToRGB("#fff"),1)
      console.log(this.graphics);
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
      for(var i = 0; i < 12; i++){
        var imageKey = "jeffrey_"+ (i+1);
        var soundKey = "jeffrey_" + (i+1) + "_sfx";
        icons.push(new SoundIcon(i,imageKey,soundKey,labels[i],this.graphics,this.game))
      }
       this.game.world.setBounds(0, 0, 1000, 3500);
    }
};