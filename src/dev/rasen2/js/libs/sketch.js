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
    // p.background(110);

    p.push();
    pg.push();
    // pg.translate(pg.width / 2, pg.height / 2);
    // base(p, pg, 1000);
    grid(p, 20, pg, 200);
    pg.pop();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    // shaderImage();

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
  pg.background("#FEF3E2");
  pg.fill(255);
  pg.noStroke();
};

// 参考：
// https://www.mathartroom.com/processing/spiral/
// https://note.com/deconbatch/n/ne0d44d86eade
const base = (p, pg, STEP_num) => {
  // フェルマー螺旋
  let STEP = 2 * p.PI * 0.01; // 曲線の精度
  let theta = 0;
  pg.push();
  pg.stroke(0);
  pg.noFill();
  pg.strokeWeight(5);
  pg.beginShape();
  const rand = p.random(0.01, 0.03);
  for (let i = 0; i < STEP_num; i++) {
    const noises = p.noise(i * rand);
    let x = 15.0 * p.sqrt(theta) * p.cos(theta) * noises;
    let y = 15.0 * p.sqrt(theta) * p.sin(theta) * noises;
    pg.vertex(x, y);
    theta += STEP;
  }
  pg.endShape();
  pg.pop();
};

const grid = (p, num, pg, STEP_num, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      pg.push();
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);

      const rand = Math.floor(p.random(1, 4));
      pg.translate(x + nw / 2, y + nw / 2);
      base(p, pg, STEP_num);
      pg.pop();
    }
  }
};
