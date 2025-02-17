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
    base(p, pg);

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

const base = (p, pg) => {
  let num = 100;
  let r = 100;
  let angle = 360 / num;
  const coords = [];

  for (let i = 0; i < num; i++) {
    const x = r * p.cos(p.radians(angle * i));
    const y = r * p.sin(p.radians(angle * i));

    const xx = (r + r / 3) * p.cos(p.radians(angle * i));
    const yy = (r + r / 3) * p.sin(p.radians(angle * i));

    const xxx = (r + (r / 3) * 2) * p.cos(p.radians(angle * i));
    const yyy = (r + (r / 3) * 2) * p.sin(p.radians(angle * i));
    coords.push([x, y]);
    coords.push([xx, yy]);
    coords.push([xxx, yyy]);
  }

  pg.push();
  pg.translate(pg.width / 2, pg.height / 2);
  for (let i = 0; i < num; i++) {
    const xy = p.random(coords);
    pg.circle(xy[0], xy[1], 10);
  }
  pg.pop();
};
