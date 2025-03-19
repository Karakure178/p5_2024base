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
  let circles = [];
  let colors = ["#257180", "#FD8B51", "#CB6040"];

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

    for (let i = 0; i < p.height; i += 50) {
      circles.push(getRandomCircles(p, 1000, p.width, i));
    }
  };

  p.draw = () => {
    p.background(110);

    p.push();
    for (let i = 0; i < circles.length; i++) {
      circles[i].forEach((c) => {
        pg.fill(p.random(colors));
        pg.circle(c.x, c.y, c.z);
        //pg.rect(c.x, c.y, c.z, c.z);
      });
    }

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
  pg.background(60);
  pg.fill(255);
  pg.noStroke();
};

const getRandomCircles = (p, _num, _w, y) => {
  let circles = [];
  for (let i = 0; i < _num; i++) {
    let x = p.random(-1, 1) * _w;
    // let y = p.random(-1, 1) * _h;
    let z = p.random(10, 50); // z軸の値を円の大きさとして使用
    if (circles.every((c) => p.dist(x, y, c.x, c.y) > (z + c.z) * 0.5)) {
      circles.push(p.createVector(x, y, z));
    }
  }
  return circles;
};

const base = (p, pg, x, y, z) => {
  pg.push();
  for (let i = 0; i < 20; i++) {
    pg.circle(x, y, i * 10);
  }
  pg.pop();
};
