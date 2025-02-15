import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  const colors = ["#D91656", "#FFB200"];
  const colors2 = ["#640D5F", "#EB5B00"];

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
    p.background(110);
    p.translate(-p.width / 2, -p.height / 2);

    p.push();
    p.translate(p.width / 2, p.height / 2);
    ring(p, 10, 80, colors);
    ring(p, 40, 150, colors2);
    ring(p, 60, 200, colors);

    //p.image(pg, 0, 0);
    p.pop();
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      p.saveGif("image", 4);
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
const draw_leaf = (p, rot, r) => {
  const points = [];
  const a = 3;
  const testX = [];
  const testY = [];

  p.beginShape();
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
    p.vertex(afin[0], afin[1]);
  }

  for (let i = 0; i < 60; i++) {
    const afin = afin_rotate(
      p.radians(180 + rot),
      points[i].x,
      points[i].y,
      middleX,
      middleY
    );
    p.vertex(afin[0], afin[1]);
  }
  p.endShape(p.CLOSE);
};

const ring = (p, num, r, colors) => {
  // const num = 40;
  const angle = 360 / num;
  // const r = 150;
  for (let i = 0; i < num + 1; i++) {
    p.push();

    let startX = Math.cos(angle * i) * r;
    let startY = Math.sin(angle * i) * r;

    // ベクトルの終点
    let endX = Math.cos(angle * i) * (r / 2);
    let endY = Math.sin(angle * i) * (r / 2);

    // ベクトルの成分を求める
    let dx = endX - startX;
    let dy = endY - startY;

    // ベクトルの角度を求める
    let angles = p.atan2(dy, dx);

    const x = Math.cos(angle * i) * r;
    const y = Math.sin(angle * i) * r;

    p.translate(x, y);
    p.rotate(angles);
    p.fill(p.random(colors));
    draw_leaf(p, 90, 20);
    p.pop();
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
