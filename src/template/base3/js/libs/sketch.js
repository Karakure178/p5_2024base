import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#453368", "#e6b352", "#e4681b"];
  let pgs = [];
  let sb;
  const num = 5;

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

    const w = p.width / num;
    for (let i = 0; i < num; i++) {
      pgs.push([]);
      for (let j = 0; j < num; j++) {
        pgs[i].push(p.createGraphics(w, w));
        pgs[i][j].noStroke();
      }
    }
    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#e3e9e3");
    p.push();

    grid(p, num, pgs, colors, 5);

    p.pop();
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

const grid = (p, num, pgs, colors, rand) => {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      p.push();
      p.translate(pgs[i][j].width * i, pgs[i][j].height * j);

      pgs[i][j].fill(p.random(colors));
      base(p, pgs[i][j], Math.floor(p.random(1, rand)));
      p.image(pgs[i][j], pgs[i][j].width / 2, pgs[i][j].height / 2);
      p.pop();
    }
  }
};

const base = (p, pg, num) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  pg.push();
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      pg.circle(x + nw / 2, y + nw / 2, nw);
    }
  }
  pg.pop();
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
        p.strokeWeight(2);
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
