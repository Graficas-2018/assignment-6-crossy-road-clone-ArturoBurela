var ObjectGenerator = {};

ObjectGenerator.objects = {
  player:{
    geometry: new THREE.BoxGeometry(1, 1, 1),
    material: new THREE.MeshPhongMaterial({color:0xb80128})
  },
  three:{
    geometry: new THREE.BoxGeometry(1, 1, 0.9),
    material: new THREE.MeshPhongMaterial({color:0x00ff54})
  },
  vehicle:{
    geometry: new THREE.BoxGeometry(1, 1, 1),
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

ObjectGenerator.create = function (geometry, material) {
  var mesh = new THREE.Mesh(geometry, material);
  var BBox = new THREE.BoxHelper(mesh, 0x00ff00);
  BBox.update();
  BBox.visible = true;
  mesh.BBox = BBox;
  var Box = new THREE.Box3().setFromObject(BBox);
  mesh.Box = Box;
  mesh.moveUp = function () {
    mesh.position.x++;
    this.BBox.update();
    this.Box = new THREE.Box3().setFromObject(this.BBox);
  };
  mesh.moveDown = function () {
    mesh.position.x--;
    this.BBox.update();
    this.Box = new THREE.Box3().setFromObject(this.BBox);
  };
  mesh.moveLeft = function () {
    mesh.position.z--;
    this.BBox.update();
    this.Box = new THREE.Box3().setFromObject(this.BBox);
  };
  mesh.moveRight = function () {
    mesh.position.z++;
    this.BBox.update();
    this.Box = new THREE.Box3().setFromObject(this.BBox);
  };
  return mesh;
};

ObjectGenerator.createPlayer = function () {
  return this.create(this.objects.player.geometry, this.objects.player.material);
};

ObjectGenerator.createThree = function () {
  return this.create(this.objects.three.geometry, this.objects.three.material);
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

ObjectGenerator.createGrassSection = function () {
  var section = new THREE.Object3D;
  section.grass = this.createGrass();
  section.threes = [];
  return section;
};
