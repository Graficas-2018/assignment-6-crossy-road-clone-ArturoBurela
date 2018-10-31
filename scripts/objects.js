var ObjectGenerator = {};
var loader = new THREE.OBJLoader();

ObjectGenerator.objects = {
  player:{
    geometry: new THREE.BoxGeometry(1, 1, 1),
    material: new THREE.MeshPhongMaterial({color:0xb80128}),
    url: 'models/duck.obj'
  },
  three:{
    geometry: new THREE.BoxGeometry(0.9, 0.9, 0.9),
    material: new THREE.MeshPhongMaterial({color:0x00ff54})
  },
  car:{
    geometry: new THREE.BoxGeometry(1.5, 1, 1),
    material: new THREE.MeshPhongMaterial({color:0xf4a419})
  },
  log:{
    geometry: new THREE.BoxGeometry(1, 1, 1),
    material: new THREE.MeshPhongMaterial({color:0x5e3f09})
  },
  grass:{
    geometry: new THREE.PlaneGeometry(15, 2),
    material: new THREE.MeshPhongMaterial({color:0x1e6413, side: THREE.DoubleSide})
  },
  road:{
    geometry: new THREE.PlaneGeometry(15, 2),
    material: new THREE.MeshPhongMaterial({color:0x4d504d, side: THREE.DoubleSide})
  },
  water:{
    geometry: new THREE.PlaneGeometry(15, 2),
    material: new THREE.MeshPhongMaterial({color:0x4ea0e5, side: THREE.DoubleSide})
  }
};

ObjectGenerator.loadObjs = function () {
  loader.load(
  	// resource URL
  	this.objects.player.url,
  	// called when resource is loaded
  	function ( object ) {
  		//scene.add( object );
      ObjectGenerator.objects.player.object = object;
  	},
  	// called when loading is in progresses
  	function ( xhr ) {
  		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  	},
  	// called when loading has errors
  	function ( error ) {
  		console.log( 'An error happened' );
  	}
  );
}

ObjectGenerator.create = function (geometry, material) {
  var mesh = new THREE.Mesh(geometry, material);
  var BBox = new THREE.BoxHelper(mesh, 0x00ff00);
  BBox.update();
  BBox.visible = true;
  mesh.BBox = BBox;
  var Box = new THREE.Box3().setFromObject(BBox);
  mesh.Box = Box;
  //BoxFront
  mesh.BoxFront = new THREE.Box3().setFromObject(BBox);
  mesh.BoxFront.translate(new THREE.Vector3( 1, 0, 0 ));
  //BoxLeft
  mesh.BoxLeft = new THREE.Box3().setFromObject(BBox);
  mesh.BoxLeft.translate(new THREE.Vector3( 0, 0, -1 ));
  //BoxRight
  mesh.BoxRight = new THREE.Box3().setFromObject(BBox);
  mesh.BoxRight.translate(new THREE.Vector3( 0, 0, 1 ));

  mesh.updateColliders = function () {
    this.BBox.update();
    this.Box = new THREE.Box3().setFromObject(this.BBox);
    this.BoxFront = new THREE.Box3().setFromObject(this.BBox);
    this.BoxFront.translate(new THREE.Vector3( 1, 0, 0 ));
    //BoxLeft
    mesh.BoxLeft = new THREE.Box3().setFromObject(this.BBox);
    mesh.BoxLeft.translate(new THREE.Vector3( 0, 0, -1 ));
    //BoxRight
    mesh.BoxRight = new THREE.Box3().setFromObject(this.BBox);
    mesh.BoxRight.translate(new THREE.Vector3( 0, 0, 1 ));
  }

  mesh.moveUp = function (n = 1) {
    mesh.position.x += n;
    this.updateColliders();
  };
  mesh.moveDown = function (n = 1) {
    mesh.position.x -= n;
    this.updateColliders();
  };
  mesh.moveLeft = function (n = 1) {
    mesh.position.z -= n;
    this.updateColliders();
  };
  mesh.moveRight = function (n = 1) {
    mesh.position.z += n;
    this.updateColliders();
  };
  return mesh;
};

ObjectGenerator.createPlayer = function () {
  var player = this.create(this.objects.player.geometry, this.objects.player.material);
  return player;
};

ObjectGenerator.createThree = function () {
  return this.create(this.objects.three.geometry, this.objects.three.material);
};

ObjectGenerator.createCar = function () {
  return this.create(this.objects.car.geometry, this.objects.car.material);
};

function translatePlane(g) {
  g.rotation.x = -Math.PI / 2;
  g.rotation.z = -Math.PI / 2;
  g.position.y = -0.5;
};

ObjectGenerator.createGrass = function () {
  var g = this.create(this.objects.grass.geometry, this.objects.grass.material);
  translatePlane(g);
  return g;
};

ObjectGenerator.createRoad = function () {
  var g = this.create(this.objects.road.geometry, this.objects.road.material);
  translatePlane(g);
  return g;
};

ObjectGenerator.createGrassSection = function () {
  var section = new THREE.Object3D;
  section.grass = this.createGrass();
  section.threes = [];
  return section;
};
