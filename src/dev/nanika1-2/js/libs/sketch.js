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
  let colors = ["#690B22", "#1B4D3E", "#FFCF50"];
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

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();

    const num = 70;
    const angle = 360 / num;
    for (let i = 0; i < num; i++) {
      const x = p.random(20, 80) * p.cos(p.radians(i * angle));
      const y = p.random(20, 80) * p.sin(p.radians(i * angle));
      nanika(
        p,
        pg,
        x + p.width / 2,
        y + p.height / 2,
        p.random(150, 200),
        20,
        colors
      );
    }

    // nanika(p, pg, p.width / 2, p.height / 3 + p.height / 3, 100, 20);
    // nanika(p, pg, p.width / 2, p.height / 3, 100, 30);

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
  pg.background("#F1E3D3");
  pg.fill(255);
  pg.noStroke();
};

const nanika = (p, pg, w, h, r, circle, colors) => {
  const num = 70;
  const angle = 360 / num;
  pg.push();
  pg.noFill();
  pg.stroke(p.random(colors));
  pg.strokeWeight(1);
  pg.translate(w, h);
  for (let i = 0; i < num; i++) {
    const x = r * p.cos(p.radians(i * angle));
    const y = r * p.sin(p.radians(i * angle));
    pg.circle(x, y, circle);
  }
  pg.pop();
};
