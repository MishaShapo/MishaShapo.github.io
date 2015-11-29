var JeffreySoundboard = JeffreySoundboard || {};
        JeffreySoundboard.game = new Phaser.Game(560, 960, Phaser.AUTO);
        //  Add the States your game has.
        //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
        JeffreySoundboard.game.state.add("Boot", JeffreySoundboard.Boot);
        JeffreySoundboard.game.state.add("Preloader", JeffreySoundboard.Preloader);
        JeffreySoundboard.game.state.add('Game', JeffreySoundboard.Game);

        //  Now start the Game state.
        JeffreySoundboard.game.state.start('Boot');