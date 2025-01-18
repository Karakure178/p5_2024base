import * as brush from "p5.brush";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#FFD700", "#40E0D0", "#FF69B4", "#32CD32"];
  let pg;

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
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background(255);
    p.push();

    grid(p, Math.floor(p.random(3, 10)), pg, colors);
    p.image(pg, p.width / 2, p.height / 2);
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
    }
  };
};

/** pgの初期化関数
 * @function image_init
 * @param {p5.Graphics} pg - p5.Graphics
 * @param {p5.canvas} p - p5インスタンス
 */
const image_init = (pg, p) => {
  //pg.rectMode(p.CENTER);
  pg.background(50);
  pg.fill(255);
  pg.noStroke();
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
      pg.fill(p.random(colors));
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      const randX = p.random(x + 10, x + nw - 10);
      const randY = p.random(y + 10, y + nw - 10);
      // pg.circle(x + nw / 2, y + nw / 2, nw);
      pg.rect(x, y, -x + randX, -y + randY, 5, 5, 5, 5);
      pg.rect(randX, randY, nw + x - randX, nw + y - randY, 5, 5, 5, 5);
    }
  }
  pg.pop();
};
