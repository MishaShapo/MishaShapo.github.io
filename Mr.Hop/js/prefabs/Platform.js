var MrHop = MrHop || {};

MrHop.Platform = function(game,floorPool,coinPool,numTiles, x, y,speed){
  Phaser.Group.call(this,game);
  
  this.tileSize = 40;
  this.game = game;
  this.enableBody = true;
  this.floorPool = floorPool;
  this.coinPool = coinPool;
  this.coinPool.enableBody = true;
  
  this.prepare(numTiles,x,y,speed);
};

MrHop.Platform.prototype = Object.create(Phaser.Group.prototype);
MrHop.Platform.prototype.constructor = MrHop.Platform;

MrHop.Platform.prototype.prepare = function(numTiles,x,y,speed){
  
  //make alive
  this.alive = true;
  
  var i = 0;
  while (i < numTiles){
    
    var floorTile = this.floorPool.getFirstExists(false);
    
    if(!floorTile){
      var floorTile = new Phaser.Sprite(this.game,x + i * this.tileSize, y, 'floor');
    } else{
      floorTile.reset(x + i * this.tileSize,y);
    }
    
    this.add(floorTile);
    
    i++;
  }
  
  //set physics properties
  
  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity',false);
  this.setAll('body.velocity.x',speed);
  
  this.addCoins(speed);
  
}

MrHop.Platform.prototype.kill = function(){
  this.alive = false;
  this.callAll('kill');
  
  var sprites = [];
  
  this.forEach(function(tile){
    sprites.push(tile)
  },this);
  
  sprites.forEach(function(tile){
    this.floorPool.add(tile);
  },this)
}

MrHop.Platform.prototype.addCoins = function(speed){
  var coinsY = 90 + Math.random() * (110);
  
  var hasCoin;
  this.forEach(function(tile){
    hasCoin = Math.random() <= 0.4;
    
    var coin = this.coinPool.getFirstDead();
    if(hasCoin){
      if(!coin){
        coin = new Phaser.Sprite(this.game,tile.x,Math.max(tile.y - coinsY,30),'coin');
        this.coinPool.add(coin);
      }
      else {
        coin.reset(tile.x,tile.y - coinsY);
      }
      coin.body.velocity.x = speed;
      coin.body.allowGravity = false;
    } 
    
  },this);
}