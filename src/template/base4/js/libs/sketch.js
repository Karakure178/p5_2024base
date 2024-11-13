import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#453368", "#e6b352", "#e4681b"];
  let pgs = [];
  let sb;
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

    const w = p.width / num;
    for (let i = 0; i < num; i++) {
      pgs.push([]);
      for (let j = 0; j < num; j++) {
        pgs[i].push(p.createGraphics(w, w));
        pgs[i][j].noStroke();
      }
    }
    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#e3e9e3");
    p.push();
    p.translate(p.width / 2, p.height / 2);
    draw_leaf(p, 200, 200);

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
