var player
var ground
var score = 0
var gameState = "play"
function preload() {
  playerImage = loadImage("player.jpg")
  groundImage = loadImage("ground1.jpg")
  bgImage = loadImage("bg.png")
  obstacle3 = loadImage("triangle.png")
  obstacle1 = loadImage("obstacle1.jpg")
  obstacle2 = loadImage("obstacle2.jpg")
  obstacle4 = loadImage("obstacle3.jpg")
  // coin1=loadImage("coin1.jpg")
  // coin2=loadImage("coin2.jpg")
  coin3 = loadImage("coin3.png")
  coin4 = loadImage("coin4.png")
  restart = loadImage("restart.png")
  go = loadImage("gameOver.jpg")

  coinSound = loadSound("sounds/coinCollect.mp3")
  gameSong = loadSound("sounds/fullSong.mp3")
  gameOverSound = loadSound("sounds/gameOver.mp3")
  winSound = loadSound("sounds/Win.mp3")
}

function setup() {

  createCanvas(innerWidth, innerHeight);
  bg = createSprite(width / 2, height / 2)
  bg.addImage("bg", bgImage)

  console.log(width, height)

  player = createSprite(width*0.15, height*0.85);
  player.addImage("player", playerImage)
  player.scale = width < 600 ? 0.3 : 0.5

  ground = createSprite(width / 2, height*2.3, width, 100)
  ground.scale = 1.7
  ground.addImage("ground", groundImage)

  reset = createSprite(width / 2, height / 2 - height * 0.1)
  reset.addImage(restart)
  reset.scale = 0.5

  gameOver = createSprite(width / 2, height / 2 - height * 0.3)
  gameOver.addImage(go)

  obstacleGroup = new Group()

  coinGroup = new Group()

  rectGroup = new Group()
}

function draw() {
  background(0, 255, 255);



  if (gameState === "play") {
    if (keyDown("up")    && player.y > height*0.4) {
      //console.log(player.y)      //this was to print the value
      player.velocityY = -15
    }
    player.velocityY = player.velocityY + 0.7 //gravity
    bg.velocityX = -(5 + score / 10)

    if (bg.x < 0) {
      bg.x = width / 2
    }

    if(player.isTouching(coinGroup)) {
      for (var i = 0; i < coinGroup.length; i++) {
        if (player.isTouching(coinGroup[i])) {
          coinSound.play()
          coinGroup[i].destroy()
        }

      }
      score += 5
    }
    //createRectangles()
    createCoins()
    createObstacle()
    reset.visible = false
    gameOver.visible = false
    if (player.isTouching(obstacleGroup)) {
      gameOverSound.play()
      gameState = "over"

    }

  }
  else if (gameState === "over") {
    obstacleGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
    rectGroup.setVelocityXEach(0)
    bg.velocityX = 0

    obstacleGroup.setLifetimeEach(-1)
    coinGroup.setLifetimeEach(-1)
    rectGroup.setLifetimeEach(-1)

    reset.visible = true
    gameOver.visible = true
    player.velocityY = 0

    if (mousePressedOver(reset)) {
      resetgame()
    }
  }
  player.collide(ground)
  player.collide(rectGroup)
  drawSprites();

  fill("white")
  textSize(width * 0.02) // scales with screen width
  textAlign(CENTER)
  text("YOUR SCORE: " + score, width / 2, height * 0.1)
}



function createObstacle() {
  if (frameCount % 100 == 0) {
    obstacle = createSprite(random(width, width + width * 0.5), height *0.56)

    num = Math.round(random(1, 4))
    switch (num) {
      case 1:
        obstacle.addImage(obstacle1)
        obstacle.scale = 0.7
        break
      case 2:
        obstacle.addImage(obstacle2)
        obstacle.scale = 0.7
        break
      case 3:
        obstacle.addImage(obstacle3)
        obstacle.scale = 0.5
        obstacle.debug = false
        obstacle.setCollider("circle", 0, 0, 50)
        break
      case 4:
        obstacle.addImage(obstacle4)
        obstacle.scale = 0.5



        break
      default: break
    }

    obstacle.velocityX = -(5 + score / 10)
    obstacleGroup.add(obstacle)
    obstacle.lifetime = (width + 500) / 5
  }

}
// function createRectangles() {
//   if (frameCount % 150 == 0) {
//     rect = createSprite(random(width,width+500), height - 320)
//     r = Math.round(random(1,2))
//     switch (r) {

//       default: break
//     }
//     rect.scale=0.8
//     rect.velocityX = -5
//    player.collide(rect)
//    rectGroup.add(rect)
//    rect.lifetime=(width+500)/5
//   }
// }
function createCoins() {
  if (frameCount % 100 == 0) {
    coins = createSprite(random(width, width + 500), random(height*0.1, height*0.4))
    cns = Math.round(random(3, 4))
    switch (cns) {
      //    case 1:
      //     coins.addImage(coin1)
      // break
      //     case 2:
      //     coins.addImage(coin2)
      //     break
      case 3:
        coins.addImage(coin3)
        break
      case 4:
        coins.addImage(coin4)
        break
      default: break
    }
    coins.velocityX = -(5 + score / 10)
    coins.scale = 0.5
    coinGroup.add(coins)
    coins.lifetime = (width + 500) / 5
     //double centuary marked
  }

}
function resetgame() {
  gameState = "play"
  reset.visible = false

  obstacleGroup.destroyEach()
  coinGroup.destroyEach()
  rectGroup.destroyEach()
  score = 0

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Reposition critical elements
  bg.position.x = width / 2;
  bg.position.y = height / 2;
  reset.position.x = width / 2;
  reset.position.y = height / 2 - height * 0.1;
  gameOver.position.x = width / 2;
  gameOver.position.y = height / 2 - height * 0.3;
  ground.position.x = width / 2;
  ground.position.y = height*2.3;
}
