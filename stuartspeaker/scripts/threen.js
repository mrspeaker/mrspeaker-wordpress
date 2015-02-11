(function () {

  if (!THREE || !Detector || !Detector.webgl) {
    return;
  }

  $("h1:first").css("background-image", "none");

  var scene = new THREE.Scene(),
    height = 377,
    width = 1050,
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000),
    r = new THREE.WebGLRenderer({ alpha: true }),
    dom = r.domElement;

  r.setSize(width, height);
  r.setClearColor(0x000000, 0);
  dom.style.position = "absolute";
  dom.style.top = 0;
  dom.setAttribute("id", "webngl");
  $("#header").append(dom);

  dom.addEventListener("click", function () {
    window.location.href = "http://www.mrspeaker.net/";
  }, false);

  var geometry = new THREE.BoxGeometry(1, 1, 1),
    material = new THREE.MeshPhongMaterial( { color: 0xf0f0f0 } );

  var cubes = [
    [0, 0.1],
    [0, 0.1],
    [0, 0.1]
  ].map(function (c, i) {
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = c[0];
    cube.position.y = c[1];
    cube.rotation.x = ((Math.PI * 2) / 3) * i;
    cube.rotation.y = ((Math.PI * 2) / 3) * i;
    cube._rotSpeed = (1 + (Math.random())) * 0.005;
    return cube;
  });

  cubes.forEach(function (c) { scene.add(c); });

  camera.position.z = 2.9;

  var light = new THREE.DirectionalLight(0xf7f7f7, 0.5);
  light.position.set(0, 0, 1);
  scene.add(light);

  var light2 = new THREE.DirectionalLight(0xf7f7f7, 0.5);
  light2.position.set(0, 1, 1);
  scene.add(light2);

  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var material = new THREE.MeshBasicMaterial({
  color: 0xeeeeee
});

var radius = 0.4;
var segments = 32;

var circleGeometry = new THREE.CircleGeometry( radius, segments );
var circle = new THREE.Mesh( circleGeometry, material );
circle.position.y = -1.5;
circle.rotation.x = 0.7;
scene.add( circle );

  window._sceen = {
    camera: camera,
    cubes:  cubes,
    light1:  light,
    light2: light2
  };

  function cubanimate () {
    requestAnimationFrame(cubanimate);
    cubes.forEach(function (c) {
      c.rotation.x += c._rotSpeed * (Math.sin(Date.now() / 5000));
      c.rotation.y += c._rotSpeed * (Math.cos(Date.now() / 5000));
    });
    circle.scale.x = (10 + Math.sin(Date.now() / 1000)) * 0.15
    circle.scale.y = (10 + Math.sin(Date.now() / 1000)) * 0.15
    r.render(scene, camera);
  };
  requestAnimationFrame(cubanimate);

}());
