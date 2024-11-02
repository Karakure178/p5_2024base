/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#ff6d6d", "#4fb6d5", "#63e0b8", "#f9e455"];
  let pg;

  p.setup = () => {
    const canvasid = document.getElementById("mycanvas");
    canvas = p.createCanvas(
      canvasid.clientWidth,
      canvasid.clientHeight,
      p.WEBGL
    );
    canvas.parent(canvasid);

    init(p);
    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#fffefd");
    p.push();
    grid(p, 10, pg, true, false, colors);
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

const init = (p) => {
  p.textureMode(p.NORMAL);
  p.frameRate(24);
  p.noStroke();
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

const circleParts = (p, num, r, rotate) => {
  p.push();
  const angle = 360 / num;
  let x = r * p.cos(p.radians(angle * 0));
  let xx = r * p.cos(p.radians(angle * 1));
  let y = r * p.sin(p.radians(angle * 0));
  let yy = r * p.sin(p.radians(angle * 1));
  p.rotate(p.radians(rotate));

  p.beginShape();
  p.vertex(0, 0);
  p.vertex(x, y);
  p.vertex(xx, yy);
  p.endShape(p.CLOSE);

  p.pop();
};

const circles = (p, x, y, colors) => {
  p.push();
  p.translate(x, y);
  const n = 150;
  const angle = 360 / n;
  for (let i = 0; i < n; i++) {
    if (p.random(0, 2) > 1) {
      p.fill(p.random(colors));
      circleParts(p, 15, p.random(100, 200), angle * i);
    }
  }
  p.pop();
};

const grid = (p, num, pg, f, s, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  pg.push();
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      // if (f) {
      //   pg.fill(p.random(colors));
      // } else {
      //   pg.noFill();
      // }
      // if (s) {
      //   pg.stroke(p.random(colors));
      //   pg.strokeWeight(2);
      // } else {
      //   pg.noStroke();
      // }
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      // pg.circle(x + nw / 2, y + nw / 2, nw);
      circles(p, x + nw / 2, y + nw / 2, colors);
    }
  }
  pg.pop();
};
