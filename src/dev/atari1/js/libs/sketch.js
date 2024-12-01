import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let circles = [];

  const colors = ["#257180", "#FD8B51", "#CB6040"];
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

    for (let i = 0; i < p.height; i += 50) {
      circles.push(getRandomCircles(p, 1000, p.width, i));
    }
    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);
  };

  p.draw = () => {
    p.background("#F2E5BF");
    p.push();

    pg.push();
    pg.translate(pg.width / 2, 20);
    for (let i = 0; i < circles.length; i++) {
      circles[i].forEach((c) => {
        pg.fill(p.random(colors));
        pg.circle(c.x, c.y, c.z);
      });
    }
    pg.pop();

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
  // pg.background(110);
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
