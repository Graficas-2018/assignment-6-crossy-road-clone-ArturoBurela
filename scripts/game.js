var Game = {
  score: 0,
  lastKey: null,
  threes: [],
  logs:[],
  cars: [],
  clock: new THREE.Clock()
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
  this.player.moveLeft();
  this.lastKey = "l";
}

Game.moveRight = function(){
  this.player.moveRight();
  this.lastKey = "r";
}

Game.moveUp = function(){
  this.player.moveUp();
  this.lastKey = "u";
  this.score += 10;
}

Game.verfiyCollisions = function(){
  // Bloquear si es con árboles
  for (three of this.threes) {
    if (this.player.Box.intersectsBox(three.Box)) {
      console.log("Chocando con arbol");
      switch (this.lastKey) {
        case "l":
        this.moveRight();
        break;
        case "r":
        this.moveLeft();
        break;
        case "u":
        this.player.moveDown();
        break;
        default:
        break;
      }
    }
  }
  // Muere con los autos
  for (car of this.cars) {
    if (this.player.Box.intersectsBox(car.Box)) {
      console.log("Atropellado");
    }
  }
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
}
