var Graphics = {};

function createScene(canvas) {
  // Create the Three.js renderer and attach it to our canvas
  renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
  // Set pixel ratio and size according to device
  renderer.setPixelRatio( window.devicePixelRatio);
  renderer.setSize( innerWidth, innerHeight );
  // Turn on shadows
  renderer.shadowMap.enabled = true;
  // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Create a new Three.js scene
  scene = new THREE.Scene();
  // Add  a camera so we can view the scene
  camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
  camera.position.set(-20, 13, 9);
  camera.lookAt(0,-4,0);
  scene.add(camera);
  ambientLight = new THREE.AmbientLight ( 0xffffff );
  scene.add(ambientLight);
  // Put in a ground plane to show off the lighting
  geometry = new THREE.PlaneGeometry(400, 400, 50, 50);
  var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:0x3f1414, side:THREE.DoubleSide}));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -4.02;
  // Add the mesh to our group
  scene.add( mesh );
  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.enableKeys=false;
  ObjectGenerator.loadObjs();
  Game.init();
}

function run() {
  requestAnimationFrame(function() { run(); });
  // Render the scene
  renderer.render( scene, camera );
  this.animate();
  orbitControls.update();
}

function animate() {
  Game.verfiyCollisions();
  Game.moveAndUpdate();
}

Graphics.createScene = createScene;
Graphics.animate = animate;
Graphics.run = run;
