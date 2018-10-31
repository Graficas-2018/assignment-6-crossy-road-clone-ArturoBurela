var Game = {
  score: 0,
  lastKey: null,
  threes: [],
  logs:[],
  cars: [],
  clock: new THREE.Clock(),
  scene:[]
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
  // Add a car
  var car = ObjectGenerator.createCar();
  car.moveUp(6);
  car.moveLeft(7);
  this.cars.push(car);
  scene.add(car);
  // init score and time
  this.score = 0;

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
  for (three of this.threes) {
    if (this.player.BoxFront.intersectsBox(three.Box)) {
      return;
    }
  }
  this.player.moveUp();
  this.score += 10;
}

Game.verfiyCollisions = function(){
  // Muere con los autos
  for (car of this.cars) {
    if (this.player.Box.intersectsBox(car.Box)) {
      console.log("Atropellado");
    }
  }
  // Muere con agua y sin tronco

}

Game.moveAndUpdate = function(){
  // Get time getDelta
  var delta = this.clock.getDelta();
  // Move cars
  for (car of this.cars) {
    car.moveRight(5*delta);
    if(car.position.z > 8){
      car.moveLeft(15);
    }
  }
  // Move logs
  //Move escene

}
