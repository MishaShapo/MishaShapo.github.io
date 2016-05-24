/*
fix spacing between bare minimums       //  kinda done
add the tables/outlets                  //  half-way there 
make obstacles kill                     //  
score counter                           //
start and end screen with death animation
*/
var Bagels = Bagels || {};

Bagels.GameState = {
  init: function(){
    
    this.JUMPING_SPEED = 800;
    this.maxJumpDistance = 160;
    this.LEVEL_SPEED = 200;
    this.spawnOffset = 200;
    
    this.game.physics.arcade.gravity.y = 1000;
    
    this.cursors = this.game.input.keyboard.createCursorKeys();

    
    this.tableKeys = this.game.cache.getKeys(Phaser.Cache.IMAGE).filter(function(key){
      return key.indexOf('table') !== -1;
    });
    
    this.shelfKeys = this.game.cache.getKeys(Phaser.Cache.IMAGE).filter(function(key){
      return key.indexOf('shelf') !== -1;
    });
    
    this.coinKeys = ['howdy','patternone','physics','smile','patterntwo','zoe'];
    
    this.currentItem = null;
    this.myCoins = 0;
    this.game.time.advancedTiming = true;
    this.isJumping = false;
    
    this.currentItemPlaceholder = {
      right: (this.game.width + 10),
      width: 80
    }
    
  },
  create: function(){
    
    this.game.world.setBounds(0,0,this.game.world.width,this.game.world.height-15);
    this.loadLevel();
    this.createSprites();
    this.createControls();
    
    console.log('map');
    console.log(this.map);    
    this.input.keyboard.addKey(Phaser.KeyCode.W).onDown.add(function(){
      //this.time.slowMotion += 0.5;
      //console.log('slower');
    },this);
    
     this.input.keyboard.addKey(Phaser.KeyCode.S).onDown.add(function(){
      //this.time.slowMotion -= 0.5;
     // console.log('faster');
    },this);
    
//    this.input.onDown.add(function(){
//      this.player.body.velocity.x = -100;
//    },this);
    
    this.input.keyboard.addKey(Phaser.KeyCode.H).onDown.add(function(){
      console.log("FPS: " + this.game.time.fps);
    },this)
    
    this.currentItem = this.spawnWithKey(this.game.width,this.game.height - 64,'table',this.spritePool);
  },
  update: function(){
    
    if(this.currentItem.right < 0){
      this.loadNextItem();
    }
    
    this.spritePool.forEachAlive(function(item){
      
      // this.game.physics.arcade.collide(this.player, item);
      this.game.physics.arcade.collide(this.player,item,this.hitObstacle,null,this)
      if(item.right < 0){
        item.kill();
      }
    },this);
    
    this.coinPool.forEachAlive(function(coin){
      this.game.physics.arcade.overlap(this.player,coin,this.collectCoin,null,this);
      
      if(coin.right < 0){
        if(coin.customParams && coin.customParams.isLastOne){
          this.currentItemPlaceholder.right = -100;
        }
        coin.kill();
        
      }
    },this);
    
    this.pendulumPool.forEachAlive(function(pendulum){
      // console.log(this.game);
      if(pendulum.customParams.inception < 0){
        pendulum.customParams.inception = this.game.time.now;
      }
      if(this.game.time.now - pendulum.customParams.inception > pendulum.customParams.delay){
        pendulum.rotation = this.pendulumTweenData[pendulum.customParams.index].rotation;
        pendulum.customParams.index += pendulum.customParams.step;
        if(pendulum.customParams.index >= this.pendulumTweenData.length){
          if(pendulum.customParams.isLastOne){
            this.currentItemPlaceholder.right = -100;
            console.log("last one");
          }
          pendulum.kill();
          
        }
      }
    },this);
    

      if(this.cursors.up.isDowm || this.game.input.activePointer.isDown){
        this.playerJump();
      } else if ((this.cursors.up.isUp || this.game.input.activePointer.isUp) && this.isJumping){
        this.isJumping = false;
      }
      
    
  },
  playerJump: function(){
    if(this.player.body.onFloor() || this.player.body.blocked.down || this.player.body.touching.down){
      //starting point of jump
      this.startJumpY = this.player.y;
      
      //keep track of jump
      this.isJumping = true;
      this.jumpPeaked = false;
      
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    } else if(this.isJumping && !this.jumpPeaked){
      var distanceJumped = this.startJumpY - this.player.y;
      
      if(distanceJumped <= this.maxJumpDistance){
        this.player.body.velocity.y = -300;
      } else {
        this.jumpPeaked = true;
      }
    }
  },
  hitObstacle: function(player, obstacle){
    if(obstacle.y > player.y && player.body.touching.right && !this.tripTween.isRunning){
      //trip
      console.log('playing trip tween');
      this.player.body.velocity.y = -100;
      this.tripTween.start();
      this.LEVEL_SPEED = 0;
      this.bg.autoScroll(0,0);
    } else {
      //clothes-line
    }
  },
  render: function(){
    
      this.game.debug.body(this.currentItem);
//    this.spritePool.forEachAlive(function(item){
//      this.game.debug.body(item);
//    },this);
    
    // this.game.debug.body(this.currentItem);
    // this.game.debug.body(this.player);
    
  },
  createSprites: function(){
    
    
    this.pendulumPool = this.add.group();
    this.pendulumTweenData = this.game.make.tween({rotation: -2/3 * Math.PI}).to({rotation: 1/3 * Math.PI},1000 * 5).generateData();
  
    
    
    this.spritePool = this.add.group();
    this.spritePool.enableBody = true;
    this.coinPool = this.add.group();
    this.coinPool.enableBody = true;
    // this.game.world.sendToBack(this.coinPool);
    // this.game.world.sendToBack(this.spritePool);
    
    this.player = this.add.sprite(50,50,'daigle');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('running',['Daigle6','Daigle7'],6,true,false);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(140,200,0,10);
    this.player.animations.play('running');
    this.player.scale.setTo(0.5);
    this.tripTween = this.game.add.tween(this.player).to({'alpha' : 0},300);
    // this.playerHitBox = this.add.image(0,0,'hitbox');
    // this.playerHitBox.anchor.setTo(0.5);
    // this.playerHitBox.visible = false;
    // this.player.addChild(this.playerHitBox);
    this.player.body.setSize(120,150,15,15);
    
    this.imageSizes = {};
    this.tableKeys.forEach(function(key){
      var image = this.cache.getImage(key);
      this.imageSizes[key] = {
        w: image.width,
        h: image.height
      };
    },this);
    
    this.shelfKeys.forEach(function(key){
      var image = this.cache.getImage(key);
      this.imageSizes[key] = {
        w: image.width,
        h: image.height
      };
    },this);
    
    this.imageSizes['outlet'] = {
      w: 32,
      h: 42
    }
    
  },
  loadLevel: function(){
    
    //this.maps.push(this.add.tilemap(stage));
    this.map = this.add.tilemap('bm_map');
    this.map.addTilesetImage('bareminimum','bare_minimum');
    
    this.bg = this.add.tileSprite(0,0,this.game.world.width,this.game.world.height+20,'daiglesroom');
    this.bg.autoScroll(-this.LEVEL_SPEED * 0.75,0);
    this.game.world.sendToBack(this.bg);
    
  },
  loadNextItem: function(){
    this.obstacleChance = this.game.rnd.realInRange(0,0.85);
//    this.obstacleChance = 0.4;
    if(this.obstacleChance < 0.25){
      this.spawnTable();
    } else if(this.obstacleChance < 0.5){
      this.spawnShelf();
    } else if(this.obstacleChance < 0.75){
      this.spawnBM();
    } else if(this.obstacleChance < 0.85){
      this.spawnPendulum();
    } else if(this.obstacleChance < 0.90){
      this.spawnCapacitor();
    } else if(this.obstacleChance < 0.95){
      this.spawnStrings();
    } else{
      this.spawnVanDeGraff();
    }
  },
  spawnWithKey: function(x,y,key,pool){
    var sprite = pool.getFirstExists(false);
    if(!sprite){
      sprite = pool.create(x,y,key);
      sprite.body.immovable = true;
      sprite.body.allowGravity = false;
      sprite.body.friction.x = 0;
    } else {
      sprite.reset(x,y);
      sprite.loadTexture(key);
      sprite.body.setSize(this.imageSizes[key].w,this.imageSizes[key].h);
    }
    
    sprite.body.velocity.x = -this.LEVEL_SPEED;
    
    return sprite;
  },
  spawnTable: function(){
    var x = this.game.rnd.between(this.game.width + this.currentItem.width,this.game.width + this.currentItem.width + 200);
    this.currentItem = this.spawnWithKey(x,this.game.height - this.map.tileHeight * 2,'table',this.spritePool);
  },
  spawnShelf: function(){
    var x = this.game.rnd.between(this.game.width + this.currentItem.width,this.game.width + this.currentItem.width + 200);
    this.currentItem = this.spawnWithKey(x,this.map.tileHeight * 3,'outlet',this.spritePool);
    this.currentItem.body.setSize(32,42,0,120);
    this.currentItem.y-= 100;
  },
  spawnBM: function(){
    var sprite = null, obj = null, lastMarker = null;
    var rndCoin = this.game.rnd.between(0,5);
    this.map.objects[this.coinKeys[rndCoin]].forEach(function(obj){ 
      sprite = this.coinPool.getFirstExists(false);
      if(!sprite){
        sprite = this.coinPool.create(this.game.width + this.spawnOffset + obj.x,obj.y - this.map.tileHeight,'bare_minimum');
        sprite.body.immovable = true;
        sprite.body.allowGravity = false;
        sprite.body.velocity.x = -this.LEVEL_SPEED;
      } else {
        sprite.reset(this.game.width + this.spawnOffset + obj.x,obj.y - this.map.tileHeight);
      }
      
      if(!lastMarker || obj.x > lastMarker.x){
        lastMarker = sprite;
      }
      
    },this);
    lastMarker.customParams = {'isLastOne' : true};
    this.coinPool.setAll('body.velocity.x',-this.LEVEL_SPEED);
    this.currentItemPlaceholder.right = this.game.width - 10;
    this.currentItem = this.currentItemPlaceholder;
  },
  
  /*
  Think of algorithm for creating valid pendulum lengths
  */
  spawnPendulum: function(){
    var rand = this.game.rnd.between(1,3), sprite = null, lastMarker = null;
    
    if(!this.map['pendulum'+rand]){
      return;
    }
    this.map.objects['pendulum' + rand].forEach(function(obj){
        sprite = this.createPendulum(obj.y,obj.properties.delay);
        if(!lastMarker || obj.properties.delay > lastMarker.customParams.delay){
          lastMarker = sprite;
        }
    },this);
    lastMarker.customParams.isLastOne = true;
    // this.currentItem = lastMarker.getChildAt(0);
    
    this.currentItemPlaceholder.right = this.game.width - 10;
    this.currentItem = this.currentItemPlaceholder;
    
  },
  spawnCapacitor: function(){
    
  },
  spawnVanDeGraff: function(){
    
  },
  collectCoin: function(player,coin){
    if(coin.customParams && coin.customParams.isLastOne == true){
      this.currentItemPlaceholder.right = -100;
      coin.customParams.isLastOne = false;
    }
    coin.kill();
    this.myCoins++;
  },
  createControls: function(){
   // this.game.input.
  },
  createPendulum: function(length,delay){
    var pendulum = this.pendulumPool.getFirstDead(false);
    if(!pendulum){
      pendulum = new Phaser.TileSprite(this.game,50,-this.map.tileHeight,this.map.tileHeight,length,'pendulum_string');
      pendulum.anchor.setTo(0.5,0);
      //pendulum.revive();
      var mass = new Phaser.Sprite(this.game,0,length,'pendulum_mass');
      mass.anchor.setTo(0.5,0);
      this.game.physics.arcade.enable(mass);
      mass.body.allowGravity = false;
      mass.body.immovable = true;
      pendulum.addChild(mass);
    } else {
      pendulum.height = length;
      pendulum.revive();
    }
    pendulum.rotation = -2/3 * Math.PI;
    pendulum.getChildAt(0).position.setTo(0,length);
    pendulum.customParams = {};
    pendulum.customParams.index = 0;
    pendulum.customParams.step = ~~(5000 / (1/2 * Math.PI * length + 1800)); 
    pendulum.customParams.delay = delay;
    pendulum.customParams.inception = -1;
    
    this.pendulumPool.add(pendulum);
    return pendulum;
  }
}