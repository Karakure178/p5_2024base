import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#61688a", "#f27858", "#d0cec5"];
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

    // enMany(p, 30, sb, colors);
    sbgrid(p, Math.floor(p.random(3, 10)), sb, colors);
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
  pg.background(255);
  pg.fill(255);
  pg.noStroke();
};

const sbgrid = (p, num, sb, colors) => {
  p.push();
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      enMany(p, 60, sb, colors, x + nw / 2, y + nw / 2, nw / 2);
    }
  }
  p.pop();
};

const enMany = (p, num, pg, colors, x, y, r) => {
  const n = num;
  const angle = 360 / n;
  for (let i = 0; i < n; i++) {
    p.push();
    p.strokeWeight(3);
    p.translate(x, y);
    p.translate(
      r * p.cos(p.radians(angle * i)),
      r * p.sin(p.radians(angle * i))
    );
    p.stroke(p.random(colors));
    pg.scribbleLine(0, 0, 20, 0);
    p.pop();
  }
};
