var Game = {
  score: 0,
  lastKey: null,
  threes: [],
  logs:[],
  cars: []
};

Game.init = function() {
  //Create player and add it
  this.player = ObjectGenerator.createPlayer();
  scene.add(this.player);
  // Add some things
  three = ObjectGenerator.createThree();
  three.moveLeft();
  three.moveLeft();
  scene.add(three);
  this.threes.push(three);
  scene.add(ObjectGenerator.createGrassSection().grass);
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
  for (car of cars) {

  }
}
