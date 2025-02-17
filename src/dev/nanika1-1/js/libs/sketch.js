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

    // nanika(p, pg, p.width / 2, p.height / 3 + p.height / 3, 100, 20);
    // nanika(p, pg, p.width / 2, p.height / 3, 100, 30);

    grid(p, 2, pg, colors);
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

      const num = 70;
      const angle = 360 / num;
      for (let i = 0; i < num; i++) {
        const x = p.random(20, 80) * p.cos(p.radians(i * angle));
        const y = p.random(20, 80) * p.sin(p.radians(i * angle));
        nanika(p, pg, x, y, p.random(150, 200), 20, colors);
      }

      pg.pop();
    }
  }
};
