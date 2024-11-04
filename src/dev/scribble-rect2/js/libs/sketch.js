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
    sb.bowing = p.random(1, 20);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background(210);
    p.push();

    stripeRotate(p, 30);
    sbgrid(p, 2, sb, 50, 3);
    sbgrid(p, 3, sb, 50, 3);
    // sbgrid(p, 4, sb, 50, 3);
    // sbgrid(p, 2, sb, 50, 3);

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

// なぜか塗れないので線を太くしている
function stripeRotate(p, n) {
  const h = (p.height * 2) / n;
  p.push();
  p.rectMode(p.CORNER);
  p.noFill();
  p.translate(p.width / 2, -p.height / 2);
  p.rotate(p.PI / 4);
  for (let i = n; i > 0; i--) {
    p.stroke(p.random(89, 255), 255, 255);
    p.strokeWeight(20);
    p.rect(-p.width / 2, 0, p.width * 3, h * i);
  }
  p.pop();
}

const sbgrid = (p, num, sb, r, n) => {
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      p.push();
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      p.translate(x + nw / 2, y + nw / 2);
      base(p, sb, r, n);
      p.pop();
    }
  }
};

const base = (p, sb, r, num) => {
  p.push();
  p.noFill();
  p.stroke(0);
  p.strokeWeight(5);

  const angle = 360 / num;
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(angle * i));
    let y = r * p.sin(p.radians(angle * i));
    sb.scribbleRect(x, y, 100, 100);
  }

  p.pop();
};
