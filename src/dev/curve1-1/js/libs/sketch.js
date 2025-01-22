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
  const colors = ["#aa493b", "#e0ba4e", "#484d5a", "#4a99e9"];

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
    base(p, pg, colors);
    pg.filter(p.BLUR, 3);

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
  pg.background("#242726");
  pg.fill(255);
  pg.noStroke();
};

const base = (p, pg, colors) => {
  const n = 10;
  pg.push();
  pg.strokeWeight(3);
  pg.noFill();
  for (let j = 0; j < 10; j++) {
    pg.beginShape();
    for (let i = 0; i < n; i++) {
      pg.stroke(p.random(colors));
      const x = p.random(pg.width);
      const y = p.random(pg.height);
      pg.curveVertex(x, y);
    }
    pg.endShape();
  }
  pg.pop();
};
