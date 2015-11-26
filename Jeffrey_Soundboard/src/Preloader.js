JeffreySoundboard.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
    console.log('preloader constructor');
};

JeffreySoundboard.Preloader.prototype = {
    init : function(){
      console.log("init preloader");
    },
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loader_bar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
        console.log('setting preloadbar');
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY- 200, 'titleImage');
		this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('title','assets/title.png');
        this.load.image('pause','assets/pause.png');
        this.load.image('Jeffrey_1','assets/thmb/Jeffrey_1.jpg');
        this.load.image('Jeffrey_10','assets/thmb/Jeffrey_10.jpg');
        this.load.image('Jeffrey_11','assets/thmb/Jeffrey_11.jpg');
        this.load.image('Jeffrey_12','assets/thmb/Jeffrey_12.jpg');
        this.load.image('Jeffrey_13','assets/thmb/Jeffrey_13.jpg');
        this.load.image('Jeffrey_14','assets/thmb/Jeffrey_14.jpg');
        this.load.image('Jeffrey_15','assets/thmb/Jeffrey_15.jpg');
        this.load.image('Jeffrey_16','assets/thmb/Jeffrey_16.jpg');
        this.load.image('Jeffrey_17','assets/thmb/Jeffrey_17.jpg');
        this.load.image('Jeffrey_18','assets/thmb/Jeffrey_18.jpg');
        this.load.image('Jeffrey_19','assets/thmb/Jeffrey_19.jpg');
        this.load.image('Jeffrey_2','assets/thmb/Jeffrey_2.jpg');
        this.load.image('Jeffrey_20','assets/thmb/Jeffrey_20.jpg');
        this.load.image('Jeffrey_3','assets/thmb/Jeffrey_3.jpg');
        this.load.image('Jeffrey_4','assets/thmb/Jeffrey_4.jpg');
        this.load.image('Jeffrey_5','assets/thmb/Jeffrey_5.jpg');
        this.load.image('Jeffrey_6','assets/thmb/Jeffrey_6.jpg');
        this.load.image('Jeffrey_7','assets/thmb/Jeffrey_7.jpg');
        this.load.image('Jeffrey_8','assets/thmb/Jeffrey_8.jpg');
        this.load.image('Jeffrey_9','assets/thmb/Jeffrey_9.jpg');
        this.load.audio('Aww_Dang',['assets/sfx/Aww_Dang.ogg','assets/sfx/Aww_Dang.mp3']);
        this.load.audio('Best_of_Luck',['assets/sfx/Best_of_Luck.ogg','assets/sfx/Best_of_Luck.mp3']);
        this.load.audio('Ehhhhhh',['assets/sfx/Ehhhhhh.ogg','assets/sfx/Ehhhhhh.mp3']);
        this.load.audio('Ghey,Ghey,Ghey',['assets/sfx/Ghey,Ghey,Ghey.ogg','assets/sfx/Ghey,Ghey,Ghey.mp3']);
        this.load.audio('Higher Noice',['assets/sfx/Higher Noice.ogg','assets/sfx/Higher Noice.mp3']);
        this.load.audio('Hmmm',['assets/sfx/Hmmm.ogg','assets/sfx/Hmmm.mp3']);
        this.load.audio('Holy_Balls',['assets/sfx/Holy_Balls.ogg','assets/sfx/Holy_Balls.mp3']);
        this.load.audio('I_LOVE_You',['assets/sfx/I_LOVE_You.ogg','assets/sfx/I_LOVE_You.mp3']);
        this.load.audio("It's_A_Blob",["assets/sfx/It's_A_Blob.ogg","assets/sfx/It's_A_Blob.mp3"]);
        this.load.audio("It's_GHEY",["assets/sfx/It's_GHEY.ogg","assets/sfx/It's_GHEY.mp3"]);
        this.load.audio('It_Was_Really_Noice',['assets/sfx/It_Was_Really_Noice.ogg','assets/sfx/It_Was_Really_Noice.mp3']);
        this.load.audio('Just_Put_One_In_There',['assets/sfx/Just_Put_One_In_There.ogg','assets/sfx/Just_Put_One_In_There.mp3']);
        this.load.audio('Lame',['assets/sfx/Lame.ogg','assets/sfx/Lame.mp3']);
        this.load.audio('Lame_Two',['assets/sfx/Lame_Two.ogg','assets/sfx/Lame_Two.mp3']);
        this.load.audio('Laugh',['assets/sfx/Laugh.ogg','assets/sfx/Laugh.mp3']);
        this.load.audio('Low_Oh_Baby',['assets/sfx/Low_Oh_Baby.ogg','assets/sfx/Low_Oh_Baby.mp3']);
        this.load.audio('Noice',['assets/sfx/Noice.ogg','assets/sfx/Noice.mp3']);
        this.load.audio('OH Dang',['assets/sfx/OH Dang.ogg','assets/sfx/OH Dang.mp3']);
        this.load.audio('Ohhh_Yeaahhh',['assets/sfx/Ohhh_Yeaahhh.ogg','assets/sfx/Ohhh_Yeaahhh.mp3']);
        this.load.audio('Really_Clever',['assets/sfx/Really_Clever.ogg','assets/sfx/Really_Clever.mp3']);
        this.load.audio('Show_Your_Work',['assets/sfx/Show_Your_Work.ogg','assets/sfx/Show_Your_Work.mp3']);
        this.load.audio('Spark 2',['assets/sfx/Spark 2.ogg','assets/sfx/Spark 2.mp3']);
        this.load.audio('Spark',['assets/sfx/Spark.ogg','assets/sfx/Spark.mp3']);
        this.load.audio("That's_Pretty_Noice",["assets/sfx/That's_Pretty_Noice.ogg","assets/sfx/That's_Pretty_Noice.mp3"]);
        this.load.audio("That's_Pretty_True",["assets/sfx/That's_Pretty_True.ogg","assets/sfx/That's_Pretty_True.mp3"]);
        this.load.audio('That_Was_Really_Bad',['assets/sfx/That_Was_Really_Bad.ogg','assets/sfx/That_Was_Really_Bad.mp3']);
        this.load.audio('They_Cheated!',['assets/sfx/They_Cheated!.ogg','assets/sfx/They_Cheated!.mp3']);
        this.load.audio('U_Wat_M8',['assets/sfx/U_Wat_M8.ogg','assets/sfx/U_Wat_M8.mp3']);
        this.load.audio('Weeeeeelll_Yeah',['assets/sfx/Weeeeeelll_Yeah.ogg','assets/sfx/Weeeeeelll_Yeah.mp3']);
        this.load.audio('Whoops',['assets/sfx/Whoops.ogg','assets/sfx/Whoops.mp3']);
        this.load.audio('YESSS',['assets/sfx/YESSS.ogg','assets/sfx/YESSS.mp3']);
        this.load.audio('You_Did_This_To_Us',['assets/sfx/You_Did_This_To_Us.ogg','assets/sfx/You_Did_This_To_Us.mp3']);
        this.load.audio('Is It Safe',['assets/sfx/is it safe.ogg','assets/sfx/is it safe.mp3']);


        console.log("even finished preloading!");
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('Is It Safe') && this.ready == false) {
            this.ready = true;
            this.state.start('Game');
        }
	}
};