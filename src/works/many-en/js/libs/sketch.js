/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
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
    p.background(110);
    p.push();

    // ここに描く
    const colors_1 = ["#000B58", "#FFF4B7"];
    pg.push();
    grid(p, 10, pg, colors_1);
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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

const base = (p, pg, r, colors) => {
  // r(100)を基準に
  const r1 = r * 1.8;
  const r2 = r * 1;
  const r3 = r * 0.9;
  const r4 = r * 0.3;
  pg.fill(colors[0]);
  pg.circle(0, 0, r1);

  pg.fill(colors[1]);
  pg.circle(0, 0, r2);

  pg.fill(colors[0]);
  pg.circle(0, 0, r3);

  pg.fill(colors[1]);
  pg.circle(0, 0, r4);
};

const base2 = (p, pg, r, colors) => {
  const r1 = r * 2;
  const r2 = r * 1.8;
  const r3 = r * 1;
  const r4 = r * 0.5;
  pg.fill(colors[0]);
  pg.circle(0, 0, r1);

  pg.fill(colors[1]);
  pg.circle(0, 0, r2);

  pg.fill(colors[0]);
  pg.circle(0, 0, r3);

  pg.fill(colors[1]);
  pg.circle(0, 0, r4);
};

const base3 = (p, pg, r, colors) => {
  const r1 = r * 2;
  const r2 = r * 1.8;
  const r3 = r * 1.5;
  const r4 = r * 1.2;
  pg.fill(colors[0]);
  pg.circle(0, 0, r1);

  pg.fill(colors[1]);
  pg.circle(0, 0, r2);

  pg.fill(colors[0]);
  pg.circle(0, 0, r3);

  pg.fill(colors[1]);
  pg.circle(0, 0, r4);
};

const grid = (p, num, pg, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      pg.push();
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);

      const rand = Math.floor(p.random(1, 4));
      pg.translate(x + nw / 2, y + nw / 2);
      if (rand === 1) {
        base(p, pg, nw * 0.8, colors);
      } else if (rand === 2) {
        base2(p, pg, nw * 0.8, colors);
      } else {
        base3(p, pg, nw * 0.8, colors);
      }
      // pg.circle(x + nw / 2, y + nw / 2, nw);
      pg.pop();
    }
  }
};
