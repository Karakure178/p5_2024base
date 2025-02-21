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
  let angle = 0;
  let r = 10;

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
    //pg.translate(p.width / 2, p.height / 2);
    let t = p.radians(angle);
    let x = p.cos(t) * r;
    let y = p.sin(t) * r;
    pg.fill("#E50046");
    pg.circle(pg.width / 2 + x, pg.height / 2 + y, p.random(3, 10));
    angle += 10; //角度は2ずつ増える
    r += 1 / 2; //半径を増やして螺旋を描く

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();
    base(p, pg);

    p.image(pg, 0, 0);
    p.pop();
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
  pg.background("#C7DB9C");
  pg.fill(255);
  pg.noStroke();
};

const base = (p, pg, colors) => {
  pg.push();
  pg.translate(p.width / 2, p.height / 2); //描いたものを中心に移す
  let angle = 0;
  let r = 10;
  for (let i = 0; i < 1000; i++) {
    let t = p.radians(angle);
    let x = p.cos(t) * r;
    let y = p.sin(t) * r;
    pg.fill(100);
    pg.ellipse(x, y, 10, 10);
    angle += 10; //角度は2ずつ増える
    r += 1 / 2; //半径を増やして螺旋を描く
  }
  pg.pop();
};
