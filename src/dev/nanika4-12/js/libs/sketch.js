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
    //shaderImage();
    grid(p, Math.floor(p.random(2, 6)), pg);

    p.image(pg, 0, 0);
    p.noLoop();
    p.pop();
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
  pg.background("#F8E1B7");
  pg.fill(255);
  pg.noStroke();
};

const drawHex = (p, pg, r, w, h, num) => {
  pg.push();
  let colors = ["#3D8D7A", "#B3D8A8", "#A3D1C6"];
  pg.fill(p.random(colors));
  const angle = 360 / num;
  pg.translate(w, h);
  pg.rotate(p.radians(30));
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(angle * i));
    let y = r * p.sin(p.radians(angle * i));
    // pg.vertex(x, y);
    pg.circle(x, y, r * 1.5);
  }
  pg.fill("#E82561");
  pg.circle(0, 0, r);
  pg.pop();
};

const grid = (p, num, pg) => {
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
      drawHex(p, pg, nw / 3, 0, 0, 5);
      pg.pop();
    }
  }
};
