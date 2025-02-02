import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#f5cce0", "#a5bbd4", "#abdae3", "#f4dae9"];
  let pg;
  let sb;

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
    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background(110);
    p.push();

    // pg.push();
    // pg.translate(pg.width / 2, pg.height / 2);
    // grid(p, 5, pg, false, true, colors);
    // pg.pop();
    // p.image(pg, 0, 0);
    // p.pop();

    //sbgrid(p, 5, sb, true, false, colors);
    sbgrid(p, 5, sb, false, true, colors);
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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
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
      if (f) {
        pg.fill(p.random(colors));
      } else {
        pg.noFill();
      }
      if (s) {
        pg.stroke(p.random(colors));
        pg.strokeWeight(2);
      } else {
        pg.noStroke();
      }
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      pg.circle(x + nw / 2, y + nw / 2, nw);
    }
  }
  pg.pop();
};

const sbgrid = (p, num, sb, colors) => {
  p.push();
  p.noFill();
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      p.stroke(p.random(colors));
      p.strokeWeight(2);
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);

      // 大
      const randBig = p.random();
      sbRectBig(p, x, y, nw, sb);

      // 中
      const randMiddle = p.random();
      sbRectMiddle(p, x, y, nw, sb);

      // 小
      const randSmall = p.random();
      sbRectSmall(p, x, y, nw, sb);
    }
  }
  p.pop();
};

const sbRectBig = (p, x, y, nw, sb) => {
  p.push();
  p.translate(0, 0);
  sb.scribbleLine(x, y, x + nw, y);
  sb.scribbleLine(x, y + nw / 3, x + nw, y + nw / 3);
  sb.scribbleLine(x, y, x, y + nw / 3);
  sb.scribbleLine(x + nw, y, x + nw, y + nw / 3);
  sb.scribbleFilling(
    [x, x + nw, x + nw, x],
    [y, y, y + nw / 3, y + nw / 3],
    10,
    45
  );
  p.pop();
};

const sbRectMiddle = (p, x, y, nw, sb) => {
  p.push();
  p.translate(0, nw / 3);
  sb.scribbleLine(x, y, x + (nw / 3) * 2, y);
  sb.scribbleLine(x, y + nw / 3, x + (nw / 3) * 2, y + nw / 3);
  sb.scribbleLine(x, y, x, y + nw / 3);
  sb.scribbleLine(x + (nw / 3) * 2, y, x + (nw / 3) * 2, y + nw / 3);
  sb.scribbleFilling(
    [x, x + (nw / 3) * 2, x + (nw / 3) * 2, x],
    [y, y, y + nw / 3, y + nw / 3],
    5,
    45
  );

  p.pop();
};

const sbRectSmall = (p, x, y, nw, sb) => {
  p.push();
  p.translate(0, (nw / 3) * 2);
  sb.scribbleLine(x, y, x + nw / 3, y);
  sb.scribbleLine(x, y + nw / 3, x + nw / 3, y + nw / 3);

  sb.scribbleLine(x, y, x, y + nw / 3);
  sb.scribbleLine(x + nw / 3, y, x + nw / 3, y + nw / 3);
  sb.scribbleFilling(
    [x, x + nw / 3, x + nw / 3, x],
    [y, y, y + nw / 3, y + nw / 3],
    2,
    45
  );

  p.pop();
};
