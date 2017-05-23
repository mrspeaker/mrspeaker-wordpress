/*global $ THREE Detector*/

(function() {
  if (!THREE || !Detector || !Detector.webgl) {
    return;
  }

  const treeImg = THREE.ImageUtils.loadTexture(
    "/images/tree2.png",
    null,
    () => {
      $("h1:first").fadeOut("slow", () => {
        $("h1:first").css("background-image", "none");
        $("h1:first").fadeIn();
      });
      anotherDimension();
    }
  );
  //treeImg.magFilter = THREE.NearestFilter;
  //treeImg.minFilter = THREE.NearestFilter;

  function anotherDimension() {
    const scene = new THREE.Scene();
    const height = 377;
    let width = $(document.body).width();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const dom = r.domElement;

    window.addEventListener(
      "resize",
      function() {
        width = $(document.body).width();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        r.setSize(width, height);
      },
      false
    );

    r.setSize(width, height);
    r.setClearColor(0, 0);
    dom.style.position = "absolute";
    dom.style.top = 0;
    dom.style.left = 0;
    dom.setAttribute("id", "webngl");
    $("#placeToBe").append(dom);

    class Trees {
      constructor () {
        const treeGeometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
        const treeMaterial = new THREE.MeshLambertMaterial({
          transparent: true,
          map: treeImg
        });

        this.trees = [];
        for (let i = 0; i < 60; i++) {
          const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
          this.trees.push(treeMesh);
          treeMesh.position.x = (Math.random() - 0.5) * (width * (0.014 * 2)); //(Math.random() - 0.5) *
          treeMesh.position.y = -1.1;
          treeMesh.position.z = 1 - Math.random() * 5;
          treeMesh.scale.set(0.7, 0.7, 0.7);
          scene.add(treeMesh);
        }
      }

      tick(dt) {
        this.trees.forEach(t => {
          t.translateX(-0.0005 * dt);
          if (t.position.x < -width * 0.014) {
            t.position.x = width * 0.014 + Math.random();
            t.position.z = 1 - Math.random() * 5;
          }
        });
      }
    }

    const trees = new Trees();
    scene.fog = new THREE.Fog(15790320, 0, 4);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 15790320 });

    const cubes = [[0, 0.1], [0, 0.1], [0, 0.1]].map((c, i) => {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = c[0];
      cube.position.y = c[1];
      cube.rotation.x = Math.PI * 2 / 3 * i;
      cube.rotation.y = Math.PI * 2 / 3 * i;
      cube._rotSpeed = (1 + Math.random()) * 0.005;
      return cube;
    });

    cubes.forEach(c => scene.add(c));
    camera.position.z = 2.9;

    const light = new THREE.DirectionalLight(16250871, 0.5);
    light.position.set(0, 0, 1);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(16250871, 0.5);
    light2.position.set(0, 1, 1);
    scene.add(light2);

    const light3 = new THREE.AmbientLight(4210752); // soft white light
    scene.add(light3);

    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 14606046,
      transparent: true,
      opacity: 0.5
    });

    var radius = 0.4;
    var segments = 32;

    var circleGeometry = new THREE.CircleGeometry(radius, segments);
    var circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.y = -1.7;
    circle.rotation.x = 0.95;
    circle.position.z = -0.3;
    scene.add(circle);

    let last;
    let dt;
    function cubanimate(time) {
      if (!last) {
        last = time;
      }
      dt = Math.min(time - last, 33.333);
      last = time;

      time *= 0.0001;
      requestAnimationFrame(cubanimate);
      cubes.forEach(c => {
        c.rotation.x += c._rotSpeed * Math.sin(Date.now() / 5000);
        c.rotation.y += c._rotSpeed * Math.cos(Date.now() / 5000);
      });
      circle.scale.x = (10 + Math.sin(Date.now() / 1000)) * 0.15;
      circle.scale.y = (10 + Math.sin(Date.now() / 1000)) * 0.15;

      trees.tick(dt);
      r.render(scene, camera);
    }
    requestAnimationFrame(cubanimate);
  }
})();
