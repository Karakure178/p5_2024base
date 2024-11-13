import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#493628", "#AB886D", "#D6C0B3"];
  let yellows = ["#FAB12F", "#FFE31A"];
  let pg;
  const num = 5;

  p.setup = () => {
    const init = () => {
      const canvasid = document.getElementById("mycanvas");
      canvas = p.createCanvas(
        canvasid.clientWidth,
        canvasid.clientHeight,
        p.WEBGL
      );
      canvas.parent(canvasid);
      p.imageMode(p.CENTER);
      p.textureMode(p.NORMAL);
      p.frameRate(24);
      p.noStroke();
    };
    init();

    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);
  };

  p.draw = () => {
    // p.translate(-p.width / 2, -p.height / 2);
    pg.background("#A6AEBF");
    p.push();
    randomCircles(p, pg, colors, 1000);
    randomCircles(p, pg, yellows, 100);

    p.image(pg, 0, 0);
    p.pop();
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      //p.saveGif("image", 4);
    }
  };
};

/** pgの初期化関数
 * @function image_init
 * @param {p5.Graphics} pg - p5.Graphics
 * @param {p5.canvas} p - p5インスタンス
 */
const image_init = (pg, p) => {
  pg.rectMode(p.CENTER);
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

//葉っぱを描く
const draw_leaf = (p, pg, rot, r) => {
  const points = [];
  const a = 3;
  const testX = [];
  const testY = [];

  pg.beginShape();
  for (let i = 0; i < 60; i++) {
    const x = (r / 3) * a * p.pow(p.cos(p.radians(i * 1.5)), 4.5);
    const y = (r / 3) * a * p.pow(p.sin(p.radians(i * 1.5)), 4.5);
    points.push(new p.createVector(x, y));
    testX.push(x);
    testY.push(y);
  }

  //pointsで一番小さい点と大きい点を割り出す
  const middleX = p.map(0.5, 0, 1.0, Math.min(...testX), Math.max(...testX));
  const middleY = p.map(0.5, 0, 1.0, Math.min(...testY), Math.max(...testY));
  //point(middleX, middleY); //回転する中心座標

  // rotateじゃなくてafin変換で回転させてる
  for (let i = 0; i < 60; i++) {
    const afin = afin_rotate(
      p.radians(0 + rot),
      points[i].x,
      points[i].y,
      middleX,
      middleY
    );
    pg.vertex(afin[0], afin[1]);
  }

  for (let i = 0; i < 60; i++) {
    const afin = afin_rotate(
      p.radians(180 + rot),
      points[i].x,
      points[i].y,
      middleX,
      middleY
    );
    pg.vertex(afin[0], afin[1]);
  }
  pg.endShape(p.CLOSE);
};

const randomCircles = (p, pg, colors, num) => {
  for (let i = 0; i < num; i++) {
    pg.push();
    const x = p.random(-pg.width / 2, pg.width);
    const y = p.random(-pg.height / 2, pg.height);
    const r = p.random(30, 100);
    pg.fill(p.random(colors));
    // pg.circle(x, y, r);
    pg.translate(x, y);
    draw_leaf(p, pg, r / 2, r / 1.8);
    pg.pop();
  }
};

//行列計算
const afin = (a, b) => {
  let x;
  let y;
  for (let k = 0; k < 3; k++) {
    let a0 = a[k][0] * b[0];
    let a1 = a[k][1] * b[1];
    let a2 = a[k][2] * b[2];
    if (k == 0) {
      x = a0 + a1 + a2;
    } else if (k == 1) {
      y = a0 + a1 + a2;
    }
  }
  return [x, y];
};

//回転
const afin_rotate = (shita, x, y, tx, ty) => {
  let a = [
    [
      Math.cos(shita),
      -Math.sin(shita),
      tx - tx * Math.cos(shita) + ty * Math.sin(shita),
    ],
    [
      Math.sin(shita),
      Math.cos(shita),
      ty - tx * Math.sin(shita) - ty * Math.cos(shita),
    ],
    [0, 0, 1],
  ];
  let b = [x, y, 1];
  return afin(a, b);
};
