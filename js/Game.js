class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

 
    this.leftKeyActive = false;
   
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    shooter1 = createSprite(width / 2 - 50, height - 100);
    shooter1.addImage("shooter1", redCube);
    shooter1.scale = 0.25;

    shooter2 = createSprite(width / 2 + 100, height - 100);
    shooter2.addImage("shooter2", blueCube);
    shooter2.scale = 0.07;

    shooters = [shooter1, shooter2];

  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

 
  }

  
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }



  handlePlayerControls() {
 
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }

      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
        this.leftKeyActive = true;
        player.positionX -= 5;
        player.update();
      }

      if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        this.leftKeyActive = false;
        player.positionX += 5;
        player.update();
      }
    
  }

  play() {
    console.log("play");

    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    // handling keyboard events
    this.handlePlayerControls();

    drawSprites();
    }

}
