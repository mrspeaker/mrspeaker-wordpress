var colours = {
  drawJoints: true,
  joints: "#ccc",
  jointWidth: "1",

  drawPoints: true,
  points: "#f00",
  pointWidth: "4",

  drawOutline: false,
  outline: "#555",
  outlineWidth: "1",
  drawFill: true,
  fill: "#f0f0f0",

  drawEnv: true,
  envWidth: 0,
  envBorder: "#fff",
  envFill: "#fff"
};

var MainController = {
  canvas: null,
  context: null,
  env: null,
  frame: 0,
  s1: null,
  s2: null,
  s3: null,
  sc1: null,
  sc2: null,
  sc3: null,

  init: function() {
    this.canvas = document.getElementById("blobs");
    if (!this.canvas.getContext) {
      //("Sorry cobber, no Canvas support in yo' browser...");
      return;
    }

    this.context = this.canvas.getContext("2d");

    document.getElementById("btnJoints").addEventListener(
      "click",
      function() {
        colours.drawJoints = !colours.drawJoints;
      },
      false
    );
    document.getElementById("btnPoints").addEventListener(
      "click",
      function() {
        colours.drawPoints = !colours.drawPoints;
      },
      false
    );
    document.getElementById("btnOutline").addEventListener(
      "click",
      function() {
        colours.drawOutline = !colours.drawOutline;
      },
      false
    );
    document.getElementById("btnFill").addEventListener(
      "click",
      function() {
        colours.drawFill = !colours.drawFill;
      },
      false
    );
    document.getElementById("btnForce").addEventListener(
      "click",
      function() {
        MainController.addForce();
      },
      false
    );

    this.env = new Environment(0.0, 0.0, 1.0, 0.8);
    this.s1 = new Structure(this.env);
    this.s1.init();

    this.s2 = new Structure(this.env);
    this.s2.init();

    this.s3 = new Structure(this.env);
    this.s3.init();

    this.sc1 = new Joint(this.s1.points[0], this.s2.points[1], 1.5, 40.0);
    this.sc2 = new Joint(this.s2.points[0], this.s3.points[1], 1.5, 40.0);
    this.sc3 = new Joint(this.s3.points[0], this.s1.points[1], 1.5, 40.0);

    this.frame = 0;
    this.main();
  },

  addForce: function() {
    let xx = Math.random() * 30 - 15;
    let yy = Math.random() * 70 - 35;
    let vec = new Vector(xx, yy);
    MainController.s1.addForce(vec);
    xx = Math.random() * 30 - 15;
    yy = Math.random() * 70 - 35;
    vec = new Vector(xx, yy);
    MainController.s2.addForce(vec);
    xx = Math.random() * 30 - 15;
    yy = Math.random() * 70 - 35;
    vec = new Vector(xx, yy);
    MainController.s3.addForce(vec);
  },

  main: function() {
    this.update();
    this.sc1.sc();
    this.sc1.sc();
    this.sc2.sc();
    this.sc2.sc();
    this.sc3.sc();
    this.sc3.sc();
    this.draw();
    setTimeout(function() {
      MainController.main();
    }, 40);
  },

  update: function() {
    this.frame++;

    this.s1.update();
    this.s2.update();
    this.s3.update();

    if (this.frame > 150) {
      if (document.getElementById("chkAuto").checked) this.addForce();
      this.frame = 0;
    }
  },

  draw: function() {
    this.context.clearRect(0, 0, 500, 500);
    this.env.draw(this.context, 400);
    this.s1.draw(this.context, 400);
    this.s2.draw(this.context, 400);
    this.s3.draw(this.context, 400);
  }
};

function Structure(environment) {
  this.zeroForce = new Vector(0.0, 0.0);
  this.gravity = new Vector(0.0, 0.005);
  this.points = [];
  this.joints = [];
  this.env = environment;
  this.init = function() {
    this.points.push(new PointMass(0.15, 0.5, 1.0));
    this.points.push(new PointMass(0.3, 0.3, 1.0));
    this.points.push(new PointMass(0.5, 0.3, 1.0));
    this.points.push(new PointMass(0.65, 0.5, 1.0));
    this.points.push(new PointMass(0.5, 0.7, 1.0));
    this.points.push(new PointMass(0.3, 0.7, 1.0));

    // Set up the constraints
    this.joints.push(new Joint(this.points[0], this.points[3], 0.45, 0.7));
    this.joints.push(new Joint(this.points[1], this.points[4], 0.45, 0.7));
    this.joints.push(new Joint(this.points[2], this.points[5], 0.45, 0.7));

    this.joints.push(new Joint(this.points[0], this.points[1], 0.25, 0.5));
    this.joints.push(new Joint(this.points[1], this.points[2], 0.25, 0.5));
    this.joints.push(new Joint(this.points[2], this.points[3], 0.25, 0.5));
    this.joints.push(new Joint(this.points[3], this.points[4], 0.25, 0.5));
    this.joints.push(new Joint(this.points[4], this.points[5], 0.25, 0.5));
    this.joints.push(new Joint(this.points[5], this.points[0], 0.25, 0.5));

    // Add some force!
    this.points[Math.floor(Math.random() * this.points.length)].force.add(
      new Vector(10, -21.5)
    );
  };

  this.update = function() {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      point.force.add(this.gravity);
      point.move(0.05);
      point.force.set(this.zeroForce);
      point.friction = this.env.collision(point.current, point.previous)
        ? 0.1
        : 0.01;
    }

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < this.joints.length; i++) {
        this.joints[i].sc();
      }
    }
  };

  this.getPointMass = function(index) {
    index += this.points.length;
    index = index % this.points.length;
    return this.points[index];
  };

  this.draw = function(context, scaleFactor) {
    if (colours.drawOutline || colours.drawFill) {
      context.strokeStyle = colours.outline;
      context.fillStyle = colours.fill;
      context.lineWidth = colours.outlineWidth;
      context.beginPath();
      context.moveTo(
        this.points[0].current.x * scaleFactor,
        this.points[0].current.y * scaleFactor
      );

      for (var i = 0; i < this.points.length; i++) {
        var px, py, nx, ny, tx, ty, cx, cy;
        var prevPointMass, currentPointMass, nextPointMass, nextNextPointMass;
        prevPointMass = this.getPointMass(i - 1);
        currentPointMass = this.getPointMass(i);
        nextPointMass = this.getPointMass(i + 1);
        nextNextPointMass = this.getPointMass(i + 2);
        tx = nextPointMass.current.x;
        ty = nextPointMass.current.y;
        cx = currentPointMass.current.x;
        cy = currentPointMass.current.y;
        px = cx * 0.5 + tx * 0.5;
        py = cy * 0.5 + ty * 0.5;
        nx = cx - prevPointMass.current.x + tx - nextNextPointMass.current.x;
        ny = cy - prevPointMass.current.y + ty - nextNextPointMass.current.y;
        px += nx * 0.16;
        py += ny * 0.16;
        px = px * scaleFactor;
        py = py * scaleFactor;
        tx = tx * scaleFactor;
        ty = ty * scaleFactor;
        context.bezierCurveTo(px, py, tx, ty, tx, ty);
      }
      context.closePath();
      if (colours.drawOutline) context.stroke();
      if (colours.drawFill) context.fill();
    }

    if (colours.drawJoints) {
      // Draw the joints
      for (let i = 0; i < this.joints.length; i++) {
        this.joints[i].draw(context, scaleFactor);
      }
    }

    if (colours.drawPoints) {
      // Draw the points
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].draw(context, scaleFactor);
      }
    }
  };

  this.addForce = function(vec) {
    //this.points[ 1 ].force.set( vec );
    for (var i = 0; i < this.points.length; i++) {
      var x = vec.x * (Math.random() * 0.75 + 0.25);
      var y = vec.y * (Math.random() * 0.75 + 0.25);
      this.points[i].force.add(new Vector(x, y));
    }
  };
}

function PointMass(currentX, currentY, mass) {
  this.current = new Vector(currentX, currentY);
  this.previous = new Vector(currentX, currentY);
  this.mass = mass;
  this.force = new Vector(0.0, 0.0);
  this.result = new Vector(0.0, 0.0);
  this.friction = 0.01;

  this.move = function(dt) {
    var t, a, c, dtdt;
    dtdt = dt * dt;

    a = this.force.x / this.mass;
    c = this.current.x;
    t =
      (2.0 - this.friction) * c -
      (1.0 - this.friction) * this.previous.x +
      a * dtdt;

    this.previous.x = c;
    this.current.x = t;

    a = this.force.y / this.mass;
    c = this.current.y;
    t =
      (2.0 - this.friction) * c -
      (1.0 - this.friction) * this.previous.y +
      a * dtdt;
    this.previous.y = c;
    this.current.y = t;
  };

  this.getVelocity = function() {};

  this.draw = function(ctx, scaleFactor) {
    ctx.fillStyle = colours.points;
    ctx.beginPath();
    ctx.arc(
      this.current.x * scaleFactor,
      this.current.y * scaleFactor,
      colours.pointWidth,
      0.0,
      Math.PI * 2.0,
      true
    );

    ctx.fill();
  };
}

function Joint(pointMassA, pointMassB, shortConst, longConst) {
  this.pointMassA = pointMassA;
  this.pointMassB = pointMassB;
  this.delta = new Vector(0.0, 0.0);
  this.pointMassAPos = pointMassA.current;
  this.pointMassBPos = pointMassB.current;

  this.delta.set(this.pointMassBPos);
  this.delta.subtract(this.pointMassAPos);

  this.shortConst = this.delta.length() * shortConst;
  this.longConst = this.delta.length() * longConst;
  this.scSquared = this.shortConst * this.shortConst;
  this.lcSquared = this.longConst * this.longConst;

  this.middle = new Vector();
  this.t = new Vector();
  this.k = new Vector();

  this.setDist = function(shortConst, longConst) {
    this.shortConst = shortConst;
    this.longConst = longConst;
    this.scSquared = this.shortConst * this.shortConst;
    this.lcSquared = this.longConst * this.longConst;
  };
  this.scale = function(scaleFactor) {
    this.shortConst = this.shortConst * scaleFactor;
    this.longConst = this.longConst * scaleFactor;
    this.scSquared = this.shortConst * this.shortConst;
    this.lcSquared = this.longConst * this.longConst;
  };
  this.sc = function() {
    this.delta.set(this.pointMassBPos);
    this.delta.subtract(this.pointMassAPos);

    var dp = this.delta.dotProduct(this.delta);
    let scaleFactor;
    if (this.shortConst != 0.0 && dp < this.scSquared) {
      scaleFactor = this.scSquared / (dp + this.scSquared) - 0.5;
      this.delta.scale(scaleFactor);
      this.pointMassAPos.subtract(this.delta);
      this.pointMassBPos.add(this.delta);
    } else if (this.longConst != 0.0 && dp > this.lcSquared) {
      scaleFactor = this.lcSquared / (dp + this.lcSquared) - 0.5;
      this.delta.scale(scaleFactor);
      this.pointMassAPos.subtract(this.delta);
      this.pointMassBPos.add(this.delta);
    }
  };
  this.draw = function(ctx, scaleFactor) {
    ctx.lineWidth = colours.jointWidth;
    ctx.strokeStyle = colours.joints;
    ctx.beginPath();
    ctx.moveTo(
      this.pointMassAPos.x * scaleFactor,
      this.pointMassAPos.y * scaleFactor
    );
    // var x1 = this.pointMassAPos.x * scaleFactor;
    // var x2 = this.pointMassBPos.x * scaleFactor;
    // ctx.bezierCurveTo((x2 - x1 /2 ) ,50,70,70,this.pointMassBPos.x * scaleFactor, this.pointMassBPos.y * scaleFactor);
    ctx.lineTo(
      this.pointMassBPos.x * scaleFactor,
      this.pointMassBPos.y * scaleFactor
    );
    ctx.closePath();
    ctx.stroke();
  };
}

function Environment(x, y, w, h) {
  this.left = x;
  this.right = x + w;
  this.top = y;
  this.buttom = y + h;
  this.r = new Vector(0.0, 0.0);

  this.collision = function(curPos) {
    var collide = false;

    if (curPos.x < this.left) {
      curPos.x = this.left;
      collide = true;
    } else if (curPos.x > this.right) {
      curPos.x = this.right;
      collide = true;
    }
    if (curPos.y < this.top) {
      curPos.y = this.top;
      collide = true;
    } else if (curPos.y > this.buttom) {
      curPos.y = this.buttom;
      collide = true;
    }
    return collide;
  };
  this.draw = function(ctx, scaleFactor) {
    if (!colours.drawEnv) return;

    ctx.lineWidth = colours.envWidth;
    ctx.strokeStyle = colours.envBorder;
    ctx.fillStyle = colours.envFill;
    ctx.beginPath();
    ctx.moveTo(this.left * scaleFactor, this.top * scaleFactor);
    ctx.lineTo(this.right * scaleFactor, this.top * scaleFactor);
    ctx.lineTo(this.right * scaleFactor, this.buttom * scaleFactor);
    ctx.lineTo(this.left * scaleFactor, this.buttom * scaleFactor);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };
}

function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.equals = function(vector) {
    return this.x == vector.x && this.y == vector.y;
  };

  this.addX = function(x) {
    this.x += x;
  };
  this.addY = function(y) {
    this.y += y;
  };
  this.set = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
  };
  this.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
  };
  this.subtract = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  };
  this.dotProduct = function(vector) {
    return this.x * vector.x + this.y * vector.y;
  };
  this.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  this.scale = function(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
  };
  this.toString = function() {
    return " X: " + this.x + " Y: " + this.y;
  };
}

window.addEventListener(
  "load",
  function() {
    document.getElementById("blobs").addEventListener(
      "click",
      function() {
        MainController.addForce();
      },
      false
    );
    MainController.init();
  },
  false
);
