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
    pg.translate(pg.width / 2, pg.height / 2);
    base(p, pg, 0, 0, 300, 130);

    pg.pop();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

const base = (p, pg, w, h, r, n) => {
  let radius = r; // 円の半径

  for (let i = 0; i < n; i++) {
    // ランダムにn個の点を打つ
    let angle = p.random(p.TWO_PI); // 0から2πのランダムな角度
    let r = p.sqrt(p.random(1)) * radius; // 半径は平方根でランダム化（均等分布にするため）

    let x = r * p.cos(angle); // x座標
    let y = r * p.sin(angle); // y座標

    pg.push();
    pg.translate(w, h);
    randomCircle(p, pg, x, y, ["#f08686", "#ebede6", "#70e0ef", "#333048"]);
    pg.pop();
  }
};

const randomCircle = (p, pg, x, y, colors) => {
  const radius = p.random(10, 50);
  pg.push();
  pg.noFill();
  pg.stroke(p.random(colors));
  pg.strokeWeight(p.random(1, 5));
  pg.circle(x, y, radius);
  pg.pop();
};
