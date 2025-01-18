import * as brush from "p5.brush";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#FFD700", "#40E0D0", "#FF69B4", "#32CD32"];
  brush.instance(p);

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
      p.frameRate(2);
      p.noStroke();
    };
    init();

    p.push();
    p.background(220);
    // grid(p, Math.floor(p.random(3, 10)), colors, -p.width / 2, -p.height / 2);
    brush.noStroke();
    grid(p, 2, colors, -p.width / 2, -p.height / 2);

    // brush.noStroke();
    // brush.fill("#E84545", p.random(30, 140));
    // brush.rect(-p.width / 2, -p.height / 2, p.width, p.height);

    // // brush.fill("#000000", p.random(30, 140));
    // brush.rect(-p.width / 2, -p.height / 2, p.width, p.height);
    p.pop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
    }
  };

  const grid = (p, num, colors, w, h) => {
    const n1 = num + 1;

    const margin_left = p.width / n1 / n1;
    const margin_bottom = p.height / n1 / n1;

    const nw = p.width / n1;
    const nh = p.height / n1;
    brush.fill(p.random(colors), p.random(30, 140));

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        const x = nw * i + margin_left * (i + 1);
        const y = nh * j + margin_bottom * (j + 1);
        const randX = p.random(x + 10, x + nw - 10);
        const randY = p.random(y + 10, y + nw - 10);
        brush.rect(x + w, y + h, -x + randX, -y + randY);
        brush.rect(randX + w, randY + h, nw + x - randX, nw + y - randY);
      }
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
