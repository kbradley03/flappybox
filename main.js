//Initialize Phaser. Create a 400x490px game

var game = new Phaser.Game(400,490, Phaser.AUTO, 'gameDiv');

//Create our 'main' state that will contain the game
//This is the body of the game itself. It should contain all code relevant to the game running

var mainState = {

  preload: function() {
    //This function will execute at the beginning
    //which is where we'll load our assets for the game

    //Set/Change the background color of the main stage
    game.stage.backgroundColor = "#000080";

    //Let's load the bird sprite
    game.load.image('bird', 'assets/football 2.jpeg');
    game.load.image('pipe', 'assets/illinois.jpeg');
  },


  create: function(){

    //This function is called after the preload function
    //This is where we'll set up the game, place the assets, display, etc...

    //Let's start up the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //We want to display the bird on the screen now
    this.bird = this.game.add.sprite(200, 245, 'bird');

    //Now that we have the bird loaded and the physics engine started
    //we need to add gravity to the bird in order for it to actually
    //fall

    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    //Next, we need to make sure the game knows what to do whenever the
    //spacebar key is pressed, so we'll add that here

    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(20, 'pipe');
    this.timer = game.time.events.loop(1500, this.addRowOfPipes,this);

    this.score = 0;
    this.labelScore = game.add.text(20,20, "0",{font: "30px Arial", fill: "#ffffff"});
  },

  update: function(){
    //This function is called 60 times per second
    //It contains the game's logic
    //This isn't perfect, as it doesn't allow for lower hardware frame rates

    //Let's check to see where the bird is out on the screen
    //If it's off the screen or not in the world then restart the game
    if (this.bird.inWorld == false)
      this.restartGame();
    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  },

  //This function makes the bird jump
  jump: function(){

    //Let's add a vertical velocity to the bird
    //Or a jump for better explanation!

    this.bird.body.velocity.y = -350;


  },

  restartGame: function(){


    //Start the 'mainState' section again, which restarts the game

    game.state.start('main');


  },

    addOnePipe: function (x,y){
      var pipe = this.pipes.getFirstDead();
      pipe.reset(x,y);
      pipe.body.velocity.x = -200;
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
    },

  addRowOfPipes: function(){
      var hole = Math.floor(Math.random() *5) +1;
      for (var i = 0; i<8; i++)
        if (i != hole && i != hole +1){
          this.addOnePipe(400, i*60+10);
        }

    this.score +=1;
    this.labelScore.text = this.score;

  },

};


//Add and start the 'mainState' to start the game
game.state.add('main', mainState);
game.state.start('main');
