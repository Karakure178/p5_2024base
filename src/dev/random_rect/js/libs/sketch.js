import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  const colors = [
    "#A6E3E9",
    "#FC6736",
    "#FFB0B0",
    "#F9ED69",
    "#F08A5D",
    "#B83B5E",
    "#6A2C70",
  ];
  let circles1, circles2, circles3, circles4;
  let color1, color2, color3, color4;
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

    color1 = p.random(colors);
    color2 = p.random(colors);
    color3 = p.random(colors);
    color4 = p.random(colors);

    circles1 = getRandomCircles(p, 1000, p.width, p.height);
    circles2 = getRandomCircles(p, 1000, p.width, p.height);
    circles3 = getRandomCircles(p, 1000, p.width, p.height);
    circles4 = getRandomCircles(p, 1000, p.width, p.height);

    theShader1 = p.createShader(vs, fs);
  };

  p.draw = () => {
    p.push();
    pg.background("#EADBC8");
    random_rect(pg, color1, circles1);
    random_rect(pg, color2, circles2);
    random_rect(pg, color3, circles3);
    random_rect(pg, color4, circles4);

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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

/** ランダムに四角を描く関数
 * @function random_rect
 **/
const random_rect = (pg, color, circles) => {
  pg.push();
  pg.fill(color);
  circles.forEach((c) => {
    pg.rect(c.x, c.y, c.z * 0.75, c.z * 0.75);
  });
  pg.pop();
};

const getRandomCircles = (p, _num, _w, _h) => {
  let circles = [];
  for (let i = 0; i < _num; i++) {
    let x = p.random(-1, 1) * _w;
    let y = p.random(-1, 1) * _h;
    let z = p.random(30, 200); // z軸の値を円の大きさとして使用
    if (circles.every((c) => p.dist(x, y, c.x, c.y) > (z + c.z) * 0.5)) {
      circles.push(p.createVector(x, y, z));
    }
  }
  return circles;
};
