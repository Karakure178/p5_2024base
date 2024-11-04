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

    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#fffefd");
    p.push();

    sbgrid(p, 10, sb, false, true, colors);
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      p.saveGif("image", 4);
    }
  };
};

const sbgrid = (p, num, sb, f, s, colors) => {
  p.push();
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num + 1; i++) {
    const x = nw * i + margin_left * (i + 1);
    sb.scribbleLine(x - nw / 2, 0, x - nw / 2, p.height);
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
      const y = nh * j + margin_bottom * (j + 1);
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
        sb.scribbleEllipse(x + nw / 2, y + nw / 2, nw, nw);
      }
    }
  }
  p.pop();
};
