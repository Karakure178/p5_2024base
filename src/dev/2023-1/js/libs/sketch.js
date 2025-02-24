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
  let colors = ["#6BC5D2", "#5A5D9D", "#390050"];

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
    shaderImage();

    squareRecusion(p, pg, 10, 10, pg.width - 20, 5, colors);
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
  pg.background("#E1F5F2");
  pg.noFill();
  pg.strokeWeight(5);
  // pg.fill(255);
  // pg.noStroke();
};

function squareRecusion(p, pg, x, y, size, n, colors) {
  pg.stroke(p.random(colors));
  pg.square(x, y, size);
  n--;
  if (n >= 0) {
    const hs = size / 2;
    squareRecusion(p, pg, x, y, hs, n, colors);
    squareRecusion(p, pg, x + hs, y, hs, n, colors);
    squareRecusion(p, pg, x + hs, y + hs, hs, n, colors);
    squareRecusion(p, pg, x, y + hs, hs, n, colors);
  }
}
