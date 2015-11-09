JeffreySoundboard.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
    console.log('preloader constructor');
};

JeffreySoundboard.Preloader.prototype = {
    init : function(){
      console.log("init preloader")
    },
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
        console.log('setting preloadbar')
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY- 200, 'titleImage');
		this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('game_title',"asset/title.png");
        this.load.image("jeffrey_1","asset/thmb/jeffrey_1.png");
        this.load.image("jeffrey_2","asset/thmb/jeffrey_2.png");
        this.load.image("jeffrey_3","asset/thmb/jeffrey_3.png");
        this.load.image("jeffrey_4","asset/thmb/jeffrey_4.png");
        this.load.image("jeffrey_5","asset/thmb/jeffrey_5.png");
        this.load.image("jeffrey_6","asset/thmb/jeffrey_6.png");
        this.load.image("jeffrey_7","asset/thmb/jeffrey_7.png");
        this.load.audio('jeffrey_1_sfx', ['asset/sfx/jeffrey_1.mp3','asset/sfx/jeffrey_1.ogg','asset/sfx/jeffrey_1.m4a']);
        this.load.audio('jeffrey_2_sfx', ['asset/sfx/jeffrey_2.mp3','asset/sfx/jeffrey_2.ogg','asset/sfx/jeffrey_2.m4a']);
        this.load.audio('jeffrey_3_sfx', ['asset/sfx/jeffrey_3.mp3','asset/sfx/jeffrey_3.ogg','asset/sfx/jeffrey_3.m4a']);
        this.load.audio('jeffrey_4_sfx', ['asset/sfx/jeffrey_4.mp3','asset/sfx/jeffrey_4.ogg','asset/sfx/jeffrey_4.m4a']);      
        this.load.audio('jeffrey_5_sfx', ['asset/sfx/jeffrey_5.mp3','asset/sfx/jeffrey_5.ogg','asset/sfx/jeffrey_5.m4a']);
        this.load.audio('jeffrey_6_sfx', ['asset/sfx/jeffrey_6.mp3','asset/sfx/jeffrey_6.ogg','asset/sfx/jeffrey_6.m4a']);
        this.load.audio('jeffrey_7_sfx', ['asset/sfx/jeffrey_7.mp3','asset/sfx/jeffrey_7.ogg','asset/sfx/jeffrey_7.m4a']);
        console.log("even finished preloading!");
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('jeffrey_7_sfx') && this.ready == false) {
            this.ready = true;
            this.state.start('Game');
        }
	}
};