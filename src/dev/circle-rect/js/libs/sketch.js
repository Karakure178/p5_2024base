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
    pg.push();
    grid(p, 30, pg, ["#84c46e", "#c0ebe6", "#78a991"]);
    //pg.translate(pg.width / 2, pg.height / 2);
    //const w = 100;
    //cornersCircle(p, pg, 0, 0, w, Math.random());
    pg.pop();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();

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

const cornersCircle = (p, pg, x, y, w, rand) => {
  pg.push();
  pg.noFill();
  pg.stroke(255);
  pg.strokeWeight(3);
  // pg.rotate(p.QUARTER_PI);
  pg.rect(x, y, w, w);
  if (rand < 0.25) {
    pg.translate(x - w / 2, y - w / 2);
    pg.arc(0, 0, w, w, 0, p.HALF_PI);
    pg.arc(0, 0, w * 1.25, w * 1.25, 0, p.HALF_PI);
  } else if (rand < 0.5) {
    pg.translate(x + w / 2, y - w / 2);
    pg.arc(0, 0, w, w, p.HALF_PI, p.PI);
    pg.arc(0, 0, w * 1.25, w * 1.25, p.HALF_PI, p.PI);
  } else if (rand < 0.75) {
    pg.translate(x + w / 2, y + w / 2);
    pg.arc(0, 0, w, w, p.PI, p.PI + p.HALF_PI);
    pg.arc(0, 0, w * 1.25, w * 1.25, p.PI, p.PI + p.HALF_PI);
  } else {
    pg.translate(x - w / 2, y + w / 2);
    pg.arc(0, 0, w, w, p.PI + p.HALF_PI, p.TWO_PI);
    pg.arc(0, 0, w * 1.25, w * 1.25, p.PI + p.HALF_PI, p.TWO_PI);
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
      cornersCircle(p, pg, x + nw / 2, y + nw / 2, nw, Math.random());
    }
  }
  pg.pop();
};
