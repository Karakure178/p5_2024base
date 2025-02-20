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
    pg.translate(pg.width / 2, pg.height / 2);
    enMany(p, pg, 160, Math.floor(p.random(3, 10)));

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
  let colors = ["#E4F1AC", "#A7D477", "#FF748B"];
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

const enMany = (p, pg, r, num) => {
  let angle = 360 / num;
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(angle * i));
    let y = r * p.sin(p.radians(angle * i));
    pg.translate(x, y);
    drawHex(p, pg, p.random(20, 50), 0, 0, Math.floor(p.random(3, 10)));
  }
};
