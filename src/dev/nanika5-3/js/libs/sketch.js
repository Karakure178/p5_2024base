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
  let colors = ["#FFB22C", "#854836", "#000000"];

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

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();
    for (let i = 0; i < 10; i++) {
      base(
        p,
        pg,
        p.width / 2,
        p.height / 2,
        100 + i * 50,
        Math.floor(p.random(5, 20)),
        colors
      );
    }
    p.image(pg, 0, 0);
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
  pg.background("#F7F7F7");
  pg.fill(255);
  pg.noStroke();
};

const base = (p, pg, w, h, r, num, colors) => {
  const angle = 360 / num;
  pg.push();
  pg.translate(w, h);
  pg.rotate(p.radians(5));
  for (let i = 0; i < num; i++) {
    const x = r * Math.cos(p.radians(angle * i));
    const y = r * Math.sin(p.radians(angle * i));
    pg.push();
    pg.translate(x, y);
    pg.rotate(p.radians(angle * i));
    const size = p.random(10, 50);
    pg.fill(p.random(colors));
    pg.rect(0, 0, size, size);
    pg.pop();
  }
  pg.pop();
};
