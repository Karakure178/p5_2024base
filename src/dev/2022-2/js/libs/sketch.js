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
  let colors = ["#2A004E", "#500073", "#C62300", "#F14A00"];

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
    grid(p, 3, pg, colors);
    //shaderImage();

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
  pg.background("#E8E7AB");
  pg.noFill();
  // pg.fill(255);
  // pg.noStroke();
};

const base = (p, pg, r, size, colors, a, b, w, h) => {
  pg.push();
  pg.stroke(p.random(colors));
  pg.translate(w, h);
  for (let i = 0; i < 360; i++) {
    const x =
      (a - b) * p.tan(p.radians(i)) + b * p.cos(p.radians(((a - b) / b) * i));
    // const y = (a - b) * p.sin(p.radians(i)) - b * p.sin(((a - b) / b) * i);
    const y =
      (a - b) * p.sin(p.radians(i)) - b * p.tan(p.radians(((a - b) / b) * i));
    pg.circle(x * r, y * r, size);
  }
  pg.pop();
};

const grid = (p, num, pg, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      pg.push();
      pg.translate(x + nw / 2, y + nw / 2);
      base(p, pg, nw, nw / 10, colors, 1.0, 0.2);
      base(p, pg, nw / 2, nw / 10, colors, 1.0, 0.2);
      pg.pop();
    }
  }
};
