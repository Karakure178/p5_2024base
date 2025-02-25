import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#FFCDB2", "#FFB4A2", "#E5989B"];
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
      p.noFill();
      p.strokeWeight(4);
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
    p.background("#B5828C");
    p.push();

    // sbgrid(p, 5, sb, colors);
    drawRand(p, sb, 100, colors);
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
  pg.background("#B5828C");
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

      sb.scribbleEllipse(x + nw / 2, y + nw / 2, nw, nw);
    }
  }
  p.pop();
};

const drawRand = (p, pg, num, colors) => {
  for (let i = 0; i < num; i++) {
    p.push();
    p.translate(p.random(p.width), p.random(p.height));
    p.stroke(p.random(colors));
    pg.scribbleEllipse(0, 0, p.random(20, 100), p.random(20, 100));
    p.pop();
  }
};
