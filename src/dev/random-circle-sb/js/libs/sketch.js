import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let circles;
  let sb;

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
    sb = new Scribble(p);

    circles = getRandomCircles(p, 10000, p.width * 0.4, p.height * 0.4);
    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);
  };

  p.draw = () => {
    p.background(110);
    p.push();

    pg.push();
    // pg.translate(pg.width / 2, pg.height / 2);
    // circles.forEach((c) => pg.circle(c.x, c.y, c.z));
    // pg.pop();
    // p.image(pg, 0, 0);

    circles.forEach((c) => {
      //sb.scribbleEllipse(c.x, c.y, c.z, c.z);
      const num = 4;
      const angle = 360 / num;
      const xCoords = [];
      const yCoords = [];
      for (let i = 0; i < num; i++) {
        let x = (c.z / 2) * p.cos(p.radians(i * angle));
        let y = (c.z / 2) * p.sin(p.radians(i * angle));
        xCoords.push(x);
        yCoords.push(y);
      }
      p.push();
      p.translate(c.x, c.y);
      p.stroke(0);
      p.strokeWeight(3);
      sb.scribbleFilling(xCoords, yCoords, 10, p.PI / 4);
      p.pop();
    });

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

const getRandomCircles = (p, _num, _w, _h) => {
  let circles = [];
  for (let i = 0; i < _num; i++) {
    let x = p.random(-1, 1) * _w;
    let y = p.random(-1, 1) * _h;
    let z = p.random(30, 150); // z軸の値を円の大きさとして使用
    if (circles.every((c) => p.dist(x, y, c.x, c.y) > (z + c.z) * 0.5)) {
      circles.push(p.createVector(x, y, z));
    }
  }
  return circles;
};
