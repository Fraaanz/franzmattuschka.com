var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
var container, stats, camera, scene, renderer, obj;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();
function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(345, window.innerWidth / window.innerHeight, 1, 6500);
  camera.position.z = 800;
  camera.position.x = -224;
  camera.position.y = -112;
  scene = new THREE.Scene();
  var ambient = new THREE.AmbientLight(0xeeeeee);
  scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0x666666);
  directionalLight.position.set(0, 10, 1);
  scene.add(directionalLight);
  // texture
  var manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };
  // model
  var loader = new THREE.OBJLoader(manager);
  loader.load('generative-design/abstract-insta/love-red.obj', function (object) {
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) { // child.material.map = texture;
        child.material.color.setHex(0xFFFFFF)
      }
    });
    object.position.x = 50;
    object.position.y = 0;
    object.position.z = -100;
    object.rotation.x = 0 * Math.PI / 180;
    object.rotation.z = 0 * Math.PI / 180;
    object.rotation.x = 0 * Math.PI / 180;
    object.scale.x = 184;
    object.scale.y = 184;
    object.scale.z = 184;
    obj = object
    scene.add(obj);
  });
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  container.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);

}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 6;
  mouseY = (event.clientY - windowHalfY) / 6;
}
function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  obj.rotation.x += (-0.12 * (Math.PI / 180));
  obj.rotation.y += (0.2 * (Math.PI / 180));
  obj.rotation.x %= 360;
  renderer.setPixelRatio(1);
  camera.position.z = 600;
  camera.position.x = -124;
  camera.position.y = 112;
  camera.position.x += ((30 + mouseX * -12.5) - camera.position.x) * .05;
  camera.position.y = ((mouseY * -2.2) - camera.position.y);
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
