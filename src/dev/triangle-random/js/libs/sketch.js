import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let circles;
  const colors = ["#086c80", "#e1511b", "#06a4ae", "#012324"];

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

    circles = getRandomCircles(p, 800, p.width * 0.4, p.height * 0.4);
    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);
  };

  p.draw = () => {
    p.background(110);
    p.push();

    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);
    circles.forEach((c) => {
      pg.push();
      pg.translate(c.x, c.y);
      pg.rotate(p.random(0, p.PI));
      triangle(p, pg, c.z / 2, p.random(colors));
      pg.pop();
    });
    pg.pop();

    p.image(pg, 0, 0);
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
    if (circles.every((c) => p.dist(x, y, c.x, c.y) > (z + c.z) * 0.45)) {
      circles.push(p.createVector(x, y, z));
    }
  }
  return circles;
};

const triangle = (p, pg, r, c) => {
  const num = 3;
  const angle = 360 / num;
  pg.push();
  pg.noFill();
  pg.strokeWeight(5);
  pg.stroke(c);
  pg.beginShape();
  for (let i = 0; i < num; i++) {
    const x = r * p.cos(p.radians(angle * i));
    const y = r * p.sin(p.radians(angle * i));
    pg.vertex(x, y);
  }
  pg.endShape(p.CLOSE);
  pg.pop();
};
