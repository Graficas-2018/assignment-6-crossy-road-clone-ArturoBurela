var Game = {
  score: 0,
  lastKey: null,
  game: true,
  threes: [],
  logs:[],
  cars: [],
  clock: new THREE.Clock(),
  scene:[],
  tiles: [],
  waterTiles: [],
  offset: 0
};

Game.init = function() {
  //Create player and add it
  this.player = ObjectGenerator.createPlayer();
  scene.add(this.player);
  // Add some things
  three = ObjectGenerator.createThree();
  three.moveLeft(2);
  scene.add(three);
  this.threes.push(three);
  three = ObjectGenerator.createThree();
  three.moveUp(2);
  three.moveRight(5);
  scene.add(three);
  this.threes.push(three);
  three = ObjectGenerator.createThree();
  three.moveUp(4);
  three.moveLeft(5);
  scene.add(three);
  this.threes.push(three);
  three = ObjectGenerator.createThree();
  three.moveUp(4);
  three.moveRight(1);
  scene.add(three);
  this.threes.push(three);
  scene.add(ObjectGenerator.createGrassSection().grass);
  // Create empty grass
  var grass = ObjectGenerator.createGrassSection();
  grass.grass.moveUp(2);
  scene.add(grass.grass);
  // Other createGrassSection
  grass = ObjectGenerator.createGrassSection();
  grass.grass.moveUp(4);
  scene.add(grass.grass);
  //Create a Road
  var road = ObjectGenerator.createRoad();
  road.moveUp(6);
  scene.add(road);
  //Create Water
  var w = ObjectGenerator.createWater();
  w.moveUp(8);
  scene.add(w);
  this.waterTiles.push(w);
  //Create log
  var log = ObjectGenerator.createLog();
  log.moveUp(8);
  log.moveRight(7);
  this.logs.push(log);
  scene.add(log);
  // Add a car
  var car = ObjectGenerator.createCar();
  car.moveUp(6);
  car.moveLeft(7);
  this.cars.push(car);
  scene.add(car);
  // init score and time
  this.score = 0;
  this.offset = 10;
  for (var i = 0; i < 20; i++) {
    var r = Math.random();
    // Create grass tile
    if (r<=0.333) {
      var tile = ObjectGenerator.createGrassTile();
      // Move tile objects
      for (t of tile.trees) {
        t.moveUp(this.offset);
        this.threes.push(t);
        scene.add(t);
      }
      //Move tile
      tile.grass.moveUp(this.offset);
      scene.add(tile.grass);
      this.tiles.push(tile);
      continue;
    }
    // Create water tile
    if (r<=0.666) {
      continue;
    }
    // Create road tile
    console.log("Creando tile");
    this.offset += 2;
  }
}

Game.moveLeft = function(){
  for (three of this.threes) {
    if (this.player.BoxLeft.intersectsBox(three.Box)) {
      return;
    }
  }
  this.player.moveLeft();
}

Game.moveRight = function(){
  for (three of this.threes) {
    if (this.player.BoxRight.intersectsBox(three.Box)) {
      return;
    }
  }
  this.player.moveRight();
}

Game.moveUp = function(){
  // Round in case of going out of log
  this.player.roundPosition();
  for (three of this.threes) {
    if (this.player.BoxFront.intersectsBox(three.Box)) {
      return;
    }
  }
  for (log of this.logs) {
    if (this.player.BoxFront.intersectsBox(log.Box)) {
      console.log("Tron al frente");
      if (this.player) {

      } else {

      }
    }
  }
  this.player.moveUp();
  this.score += 10;
  // Update tile
}

Game.updateTiles = function(){

}

Game.endGame = function () {
  this.game = false;
}

Game.run = function () {
  if (this.game) {
    Game.verfiyCollisions();
    Game.moveAndUpdate();
  }
}

Game.verfiyCollisions = function(){
  // Muere con los autos
  for (car of this.cars) {
    if (this.player.Box.intersectsBox(car.Box)) {
      this.endGame();
    }
  }
  // Muere con agua y sin tronco
}

Game.moveAndUpdate = function(){
  // Get time getDelta
  var delta = this.clock.getDelta();
  var inLog = false;
  // Move cars
  for (car of this.cars) {
    car.moveRight(5*delta);
    if(car.position.z > 8){
      car.moveLeft(15);
    }
  }
  // Move logs
  for (log of this.logs) {
    log.moveLeft(2.5*delta);
    // Move player with logs
    if (this.player.Box.intersectsBox(log.Box) ) {
      this.player.moveLeft(2.5*delta);
      inLog = true;
    }
    if(log.position.z < -8){
      log.moveRight(15);
    }
  }
  // Kill player if contact with water but not log
  for (w of this.waterTiles) {
    if (this.player.Box.intersectsBox(w.Box) && !inLog) {
      this.endGame();
    }
  }

  // Update score and time
  document.getElementById("score").innerHTML = "Score: " + this.score + "<br> Time: " + Math.round(this.clock.elapsedTime);
  // Mover camara
  camera.position.x += delta;
  if(camera.position.x > this.player.position.x - 2){
    this.endGame();
  }
}
