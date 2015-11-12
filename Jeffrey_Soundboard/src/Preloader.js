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
        this.load.image("jeffrey_1","asset/thmb/jeffrey_01.png");
        this.load.image("jeffrey_2","asset/thmb/jeffrey_02.png");
        this.load.image("jeffrey_3","asset/thmb/jeffrey_03.png");
        this.load.image("jeffrey_4","asset/thmb/jeffrey_04.png");
        this.load.image("jeffrey_5","asset/thmb/jeffrey_05.png");
        this.load.image("jeffrey_6","asset/thmb/jeffrey_06.png");
        this.load.image("jeffrey_7","asset/thmb/jeffrey_07.png");
        this.load.image("jeffrey_8","asset/thmb/jeffrey_08.png");
        this.load.image("jeffrey_9","asset/thmb/jeffrey_09.png");
        this.load.image("jeffrey_10","asset/thmb/jeffrey_10.png");
        this.load.image("jeffrey_11","asset/thmb/jeffrey_11.png");
        this.load.image("jeffrey_12","asset/thmb/jeffrey_12.png");
        this.load.audio('jeffrey_1_sfx', ['asset/sfx/new/aww_dang.mp3','asset/sfx/new/aww_dang.ogg','asset/sfx/new/aww_dang.m4a']);
        this.load.audio('jeffrey_2_sfx', ['asset/sfx/new/best_of_luck.mp3','asset/sfx/new/best_of_luck.ogg','asset/sfx/new/best_of_luck.m4a']);
        this.load.audio('jeffrey_3_sfx', ['asset/sfx/new/it_was_really_noice.mp3','asset/sfx/new/it_was_really_noice.ogg','asset/sfx/new/it_was_really_noice.m4a']);
        this.load.audio('jeffrey_4_sfx', ['asset/sfx/new/lame.mp3','asset/sfx/new/lame.ogg','asset/sfx/new/lame.m4a']);      
        this.load.audio('jeffrey_5_sfx', ['asset/sfx/new/laugh.mp3','asset/sfx/new/laugh.ogg','asset/sfx/new/laugh.m4a']);
        this.load.audio('jeffrey_6_sfx', ['asset/sfx/new/low_oh_baby.mp3','asset/sfx/new/low_oh_baby.ogg','asset/sfx/new/low_oh_baby.m4a']);
        this.load.audio('jeffrey_7_sfx', ['asset/sfx/new/oh_dang.mp3','asset/sfx/new/oh_dang.ogg','asset/sfx/new/oh_dang.m4a']);
        this.load.audio('jeffrey_8_sfx', ['asset/sfx/new/rip.mp3','asset/sfx/new/rip.ogg','asset/sfx/new/rip.m4a']);
        this.load.audio('jeffrey_9_sfx', ['asset/sfx/new/show_your_work.mp3','asset/sfx/new/show_your_work.ogg','asset/sfx/new/show_your_work.m4a']);
        this.load.audio('jeffrey_10_sfx', ['asset/sfx/new/thats_pretty_true_mang.mp3','asset/sfx/new/thats_pretty_true_mang.ogg','asset/sfx/new/thats_pretty_true_mang.m4a']);
        this.load.audio('jeffrey_11_sfx', ['asset/sfx/new/they_cheated.mp3','asset/sfx/new/they_cheated.ogg','asset/sfx/new/they_cheated.m4a']);
        this.load.audio('jeffrey_12_sfx', ['asset/sfx/new/whoops.mp3','asset/sfx/new/whoops.ogg','asset/sfx/new/whoops.m4a']);
        console.log("even finished preloading!");
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('jeffrey_12_sfx') && this.ready == false) {
            this.ready = true;
            this.state.start('Game');
        }
	}
};