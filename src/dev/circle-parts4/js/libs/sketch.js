import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let colors = ["#efefef", "#585f71", "#2a2f33", "#dc5b01"];
  // let colors2 = ["#febebf", "#ffe0d9", "#f7f7f7", "#7880ad"];
  // let colors3 = ["#ffc4be", "#ffe1df", "#7eb5a2", "#c5e2d6"];
  // let colors4 = ["#febebf", "#ffe0d9", "#f7f7f7", "#7880ad"];
  // let colors5 = ["#febebf", "#ffe0d9", "#f7f7f7", "#7880ad"];
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
    // p.translate(-p.width / 2, -p.height / 2);
    p.background("#fffefd");
    grid(p, 10, pg, colors);

    p.shader(theShader1);
    theShader1.setUniform(`u_tex`, pg);
    theShader1.setUniform(`u_time`, p.frameCount / 35);
    theShader1.setUniform("u_resolution", [pg.width, pg.height]);
    p.image(pg, 0, 0);

    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      // p.saveGif("image", 4);
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
  // pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

const circleParts = (p, pg, num, r, rotate) => {
  pg.push();
  const angle = 360 / num;
  let x = r * p.cos(p.radians(angle * 0));
  let xx = r * p.cos(p.radians(angle * 1));
  let y = r * p.sin(p.radians(angle * 0));
  let yy = r * p.sin(p.radians(angle * 1));
  pg.rotate(p.radians(rotate));

  pg.beginShape();
  pg.vertex(0, 0);
  pg.vertex(x, y);
  pg.vertex(xx, yy);
  pg.endShape(p.CLOSE);

  pg.pop();
};

const circles = (p, pg, x, y, colors) => {
  pg.push();
  pg.translate(x, y);
  const n = 150;
  const angle = 360 / n;
  for (let i = 0; i < n; i++) {
    if (p.random(0, 2) > 1) {
      pg.fill(p.random(colors));
      circleParts(p, pg, 15, p.random(30, 60), angle * i);
    }
  }
  pg.pop();
};

const grid = (p, num, pg, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  pg.push();
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      circles(p, pg, x + nw / 2, y + nw / 2, colors);
    }
  }
  pg.pop();
};
