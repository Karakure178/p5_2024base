import gsap from "gsap";
import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let theShader1;
  let colors = ["#AC1754", "#E53888", "#F37199"];

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

    theShader1 = p.createShader(vs, fs);
  };

  p.draw = () => {
    p.background(110);
    p.push();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    //haderImage();
    const num = 150;
    for (let i = 0; i < num; i++) {
      pg.stroke(p.random(colors));
      heartDraw(p, pg, pg.width / 2, pg.height / 2, 10 + 10 * i);
    }
    p.image(pg, 0, 0);
    p.noLoop();
    p.pop();
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
  pg.background("#F7A8C4");
  // pg.fill(255);
  // pg.noStroke();
  pg.noFill();
  pg.stroke(255);
  pg.strokeWeight(5);
};

const heartDraw = (p, pg, tx, ty, R) => {
  // const R = 20;
  let n = 700;
  pg.push();
  pg.translate(tx, ty);
  pg.beginShape();
  for (let i = 0; i < n; i++) {
    let x = xHeart((p.TAU * i) / n, R);
    let y = yHeart((p.TAU * i) / n, R);
    pg.vertex(x, y);
  }
  pg.endShape(p.CLOSE);
  pg.pop();
};

const xHeart = (angle, radius) => {
  const x = (radius / 15.0) * 16 * Math.pow(Math.sin(angle), 3);
  return x;
};

const yHeart = (angle, radius) => {
  const y =
    (radius / 15.0) *
    (-13 * Math.cos(angle) +
      5 * Math.cos(2 * angle) +
      2 * Math.cos(3 * angle) +
      Math.cos(4 * angle));
  return y;
};
