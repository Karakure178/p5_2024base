import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#ff6d6d", "#4fb6d5", "#63e0b8", "#f9e455"];
  let pg;
  let sb;

  p.setup = () => {
    init(canvas, p);
    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#fffefd");
    p.translate(p.width / 2, p.height / 2);
    p.push();
    const n = 150;
    const angle = 360 / n;
    for (let i = 0; i < n; i++) {
      if (p.random(0, 2) > 1) {
        p.fill(p.random(colors));
        base(p, 15, p.random(100, 200), angle * i);
      }
    }
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      p.saveGif("image", 4);
    }
  };
};

const init = (canvas, p) => {
  const canvasid = document.getElementById("mycanvas");
  canvas = p.createCanvas(canvasid.clientWidth, canvasid.clientHeight, p.WEBGL);
  canvas.parent(canvasid);
  p.imageMode(p.CENTER);
  p.textureMode(p.NORMAL);
  p.frameRate(24);
  p.noStroke();
};

const base = (p, num, r, rotate) => {
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
