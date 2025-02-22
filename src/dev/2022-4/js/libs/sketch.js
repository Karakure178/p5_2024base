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
  let colors = ["#D98324", "#EFDCAB", "#F2F6D0"];

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
    base(p, pg, 50, 20, colors, 1.0);
    base(p, pg, 120, 20, colors, 1.0);
    base(p, pg, 250, 20, colors, 1.2);
    base(p, pg, 300, 20, colors, 1.2);
    shaderImage();

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
  pg.background("#443627");
  pg.noFill();
  // pg.fill(255);
  // pg.noStroke();
};

const base = (p, pg, r, size, colors, a) => {
  // const a = 1.0;
  pg.push();
  pg.stroke(p.random(colors));
  pg.translate(pg.width / 2, pg.height / 2);
  for (let i = 0; i < 360; i++) {
    const x = a * Math.pow(p.cos(p.radians(i)), 3);
    const y = a * Math.pow(p.sin(p.radians(i)), 3);

    pg.circle(x * r, y * r, size);
  }
  pg.pop();
};
