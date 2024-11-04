/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  const colors = ["#FF885B", "#557C56", "#33372C"];

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
    pg.background("#FAF7F0");

    p.push();
    const num = Math.floor(p.random(4, 9));
    grid(p, num, pg, colors);
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

const grid = (p, num, pg, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      pg.push();
      pg.fill(p.random(colors));
      pg.stroke(p.random(colors));
      pg.translate(x + nw / 2, y + nw / 2);
      base(p, pg, 60, 30);
      // pg.circle(0, 0, nw / 2);
      pg.pop();
    }
  }
};

const base = (p, pg, num, r) => {
  pg.push();
  const angle = 360 / num;
  pg.stroke(255);
  pg.circle(0, 0, 100);
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(angle * i));
    let y = r * p.sin(p.radians(angle * i));
    pg.strokeWeight(3);
    pg.point(x, y);

    x = (r + r * 0.3) * p.cos(p.radians(angle * i));
    y = (r + r * 0.3) * p.sin(p.radians(angle * i));
    let xx = (r + r * 0.5) * p.cos(p.radians(angle * i));
    let yy = (r + r * 0.5) * p.sin(p.radians(angle * i));
    pg.line(x, y, xx, yy);
  }

  const rand = p.random(0, num);
  const rand2 = p.random(0, num);
  let x = r * p.cos(p.radians(angle * rand));
  let y = r * p.sin(p.radians(angle * rand));
  pg.circle(x, y, r * 0.4);

  x = (r + r * 0.4) * p.cos(p.radians(angle * rand2));
  y = (r + r * 0.4) * p.sin(p.radians(angle * rand2));
  pg.circle(x, y, r * 0.7);
  pg.pop();
};
