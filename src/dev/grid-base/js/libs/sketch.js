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
    p.background(10);

    p.push();
    p.translate(-p.width / 2, -p.height / 2);
    sbgrid(p, Math.floor(p.random(3, 7)), sb, false, true, colors);
    sbgrid(p, Math.floor(p.random(3, 7)), sb, false, true, colors);
    p.pop();

    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);
    base(p, pg, colors);
    pg.pop();
    p.image(pg, 0, 0);

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

const base = (p, pg, colors) => {
  pg.push();
  pg.fill(p.random(colors));
  pg.rect(0, 0, pg.width, pg.height);
  pg.erase();
  pg.rect(0, 0, pg.width * 0.9, pg.height * 0.9);
  pg.noErase();
  pg.pop();
  p.drawingContext.filter = "drop-shadow(8px 8px 8px rgba(46,46,46,0.7))";
};

const sbgrid = (p, num, sb, f, s, colors) => {
  p.push();
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      if (f) {
        p.fill(p.random(colors));
      } else {
        p.noFill();
      }
      if (s) {
        p.stroke(p.random(colors));
        p.strokeWeight(4);
      } else {
        p.noStroke();
      }
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      sb.scribbleEllipse(x + nw / 2, y + nw / 2, nw, nw);
    }
  }
  p.pop();
};
