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
    p.background(255);
    p.push();

    sbgrid(p, Math.floor(p.random(3, 10)), sb);
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

const sbgrid = (p, num, sb) => {
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      const randX = p.random(x + 10, x + nw - 10);
      const randY = p.random(y + 10, y + nw - 10);

      p.push();
      p.fill(0);
      //p.stroke(0);
      //p.strokeWeight(3);
      // p.translate(nw / 2, nw / 2);
      p.rectMode(p.CORNER);
      p.rect(x, y, -x + randX, -y + randY, 5, 5, 5, 5);
      p.rect(randX, randY, nw + x - randX, nw + y - randY, 5, 5, 5, 5);
      //p.rect(x, y, nw, nw);
      //sb.scribbleRect(randX, randY, x - randX, y - randY);
      // sb.scribbleRect(x, y, nw, nw);

      p.pop();
    }
  }
};
