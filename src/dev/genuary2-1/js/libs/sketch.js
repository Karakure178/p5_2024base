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

    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);
    tenten(p, 10, pg, colors);
    pg.pop();
    p.image(pg, 0, 0);
    p.pop();

    //sbgrid(p, 5, sb, true, false, colors);
    //sbgrid(p, 5, sb, false, true, colors);
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

// 点々した線を描く
const tenten = (p, num, pg, colors) => {
  for (let i = 0; i < num; i++) {
    pg.push();
    pg.stroke(p.random(colors));
    pg.strokeWeight(2);
    pg.noFill();
    if (i % 2 === 0 && i !== num - 1) {
      const y = i * 10;
      //pg.circle(100, y, 10);
      pg.line(100, y, 100, (i + 1) * 10);
    }
    
    pg.pop();
  }
};
