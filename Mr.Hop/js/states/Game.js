var MrHop = MrHop || {};

MrHop.GameState = {
  init: function(){
    
    //pool of floors
    this.floorPool = this.add.group();
    
    //pool of platforms
    this.platformPool = this.add.group();
    
    //pool of coins
    this.coinPool = this.add.group();
    
    this.game.physics.arcade.gravity.y = 1000;
    
    //max jump distance
    this.maxJumpDistance = 120;
    
    //move player up with key
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    //coins
    this.myCoins = 0;
    
    //player speed
    this.levelSpeed = 200;
    
    this.textStyle = {font: "30px Arial",fill:"#fff"};
  },
  create: function(){
    
    this.background = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height,'background');
    this.background.tileScale.y = 2;
    this.background.autoScroll(-this.levelSpeed * 0.3,0);
    this.game.world.sendToBack(this.background);
    
    //create player
    this.player = this.game.add.sprite(50,50,'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('running',[0,1,2,3,2,1],15,true);
    this.game.physics.arcade.enable(this.player);
    this.player.body.friction.x = 0;
    
    //change player bounding box
    this.player.body.setSize(38,60,0,0);
    this.player.play('running');
    
    this.currentPlatform = new MrHop.Platform(this.game,this.floorPool,this.coinPool,11,0,200, -this.levelSpeed);
  
    this.platformPool.add(this.currentPlatform);
    
    this.coinSound = this.add.audio('coinSFX');
    
    this.loadLevel();
    
    this.water = this.add.tileSprite(0,this.game.world.height - 30, this.game.world.width,30,'water');
    this.water.autoScroll(-this.levelSpeed * 0.5,0);
    
    //show number of coins
    var style = {font:'30px Arial',fill: '#fff'};
    this.coinsCountLabel = this.add.text(10,20,'0',style);
    
  },
  update: function(){
    if(this.player.alive){
      this.platformPool.forEachAlive(function(platform,index){
        this.game.physics.arcade.collide(this.player,platform);  

        //check if platform needs to be killed
        if(platform.length && platform.children[platform.length -1].right < 0){
          platform.kill();
        }
      },this);

      this.coinPool.forEachAlive(function(coin){
        if(coin.right < 0){
          coin.kill();
        }
      },this);

      this.game.physics.arcade.overlap(this.player, this.coinPool, this.collectCoin,null,this);

      if(this.player.body.touching.down){
        this.player.body.velocity.x = this.levelSpeed;
      } else {
        this.player.body.velocity.x = 0;
      }

      if(this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length-1].right < this.game.world.width){
        this.createPlatform();
      }

      if(this.cursors.up.isDowm || this.game.input.activePointer.isDown){
        this.playerJump();
      } else if (this.cursors.up.isUp || this.game.input.activePointer.isUp){
        this.isJumping = false;
      }
      
      if(this.player.top > this.game.world.height || this.player.right < 0){
        this.gameOver();
      }
    } 
    
    
  },
  playerJump: function(){
    if(this.player.body.touching.down){
      //starting point of jump
      this.startJumpY = this.player.y;
      
      //keep track of jump
      this.isJumping = true;
      this.jumpPeaked = false;
      
      this.player.body.velocity.y = -300;
    } else if(this.isJumping && !this.jumpPeaked){
      var distanceJumped = this.startJumpY - this.player.y;
      
      if(distanceJumped <= this.maxJumpDistance){
        this.player.body.velocity.y = -300;
      } else {
        this.jumpPeaked = true;
      }
    }
  },
  loadLevel: function() {
    
  },
  createPlatform: function(){
    
    var nextPlatformData = this.generateRandomPlatform();
    
    
    this.currentPlatform = this.platformPool.getFirstDead();
    if(!this.currentPlatform){
      this.currentPlatform = new MrHop.Platform(this.game,this.floorPool,this.coinPool,nextPlatformData.numTiles,this.game.world.width + nextPlatformData.separation,nextPlatformData.y,-this.levelSpeed);
    } else {
      this.currentPlatform.prepare(nextPlatformData.numTiles,this.game.world.width + nextPlatformData.separation,nextPlatformData.y,-this.levelSpeed);
    }
    
    this.platformPool.add(this.currentPlatform);
    
  },
  generateRandomPlatform: function(){
    
    var data = {};
    //distance from pervious platform
    data.separation = 60 + parseInt(Math.random() * (160-60));
    //y
    data.y = this.currentPlatform.children[0].y + (-120 + Math.random() * (120- (-120)));
    
    data.y = Math.max(150,data.y);
    data.y = Math.min(this.game.world.height -50,data.y);
    //number of tiles
    
    data.numTiles = 1 + Math.round(Math.random() * (5-1));
    
    return data;
  },
  collectCoin : function(player,coin){
    coin.kill();
    this.myCoins++;
    this.coinSound.play();
    this.coinsCountLabel.text = this.myCoins;
  },
  gameOver: function(){
    this.player.kill();
    this.updateHighscore();
    
    this.overlay = this.add.bitmapData(this.game.width,this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(0,0,this.game.width,this.game.height);
    
    //sprite for overlay
    this.panel = this.add.sprite(0,this.game.world.height,this.overlay);
    this.panel.alpha = 0.55;
    
    //overlay raising tween
    var gameOverPanel = this.add.tween(this.panel);
    gameOverPanel.to({y:0},500);
    
    //stop all movement after overlay reaches top
    gameOverPanel.onComplete.add(function(){
      this.water.stopScroll();
      this.background.stopScroll();
      
      this.add.text(this.game.width/2,this.game.height/2-30,"GAME OVER",this.textStyle).anchor.setTo(0.5);
      
      this.add.text(this.game.width/2,this.game.height/2 + 20,"High score: " + this.highScore,{font: "20px Arial",fill:"#fff"}).anchor.setTo(0.5);
      
      this.add.text(this.game.width/2,this.game.height/2 + 50,"Your score: " + this.myCoins,{font: "20px Arial",fill:"#fff"}).anchor.setTo(0.5);
      
      this.add.text(this.game.width/2,this.game.height/2 + 80,"Tap to Play Again",{font: "20px Arial",fill:"#fff"}).anchor.setTo(0.5);
      
      this.game.input.onDown.addOnce(this.restart,this);
    },this)
    
    gameOverPanel.start();
    
  },
  restart: function(){
    this.game.state.start('Game');
  },
  updateHighscore: function(){
    this.highScore = +localStorage.getItem('highScore');
    console.log("Logging high score :" + this.highScore);
    
    if(this.highScore < this.myCoins){
      this.highScore = this.myCoins;
      localStorage.setItem('highScore',this.highScore);
    }
  }
//  render: function(){
//    this.game.debug.body(this.player);
//    this.game.debug.bodyInfo(this.player,0,0);
//  }
}