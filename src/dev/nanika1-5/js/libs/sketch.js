import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#A5DEE4", "#EB7A77", "#F9BF45"];
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
      p.noFill();
      // p.strokeWeight(0.5);
    };
    init();

    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background(255);
    base(
      p,
      sb,
      Math.floor(p.random(3, 8)),
      p.width / 2,
      p.height / 2 - p.height / 4,
      100,
      colors
    );
    base(
      p,
      sb,
      Math.floor(p.random(3, 8)),
      p.width / 2,
      p.height / 2,
      100,
      colors
    );
    base(
      p,
      sb,
      Math.floor(p.random(3, 8)),
      p.width / 2,
      p.height / 2 + p.height / 4,
      100,
      colors
    );
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

const base = (p, sb, n, x, y, r, colors) => {
  // const n = 8;
  const haba = 50;
  p.stroke(p.random(colors));
  for (let i = 1; i < n; i++) {
    sb.scribbleEllipse(x, y, r + i * haba, r + i * haba);

    const num = 360;
    const angle = 360 / num;
    let xCoords = [];
    let yCoords = [];
    for (let j = 0; j < num; j++) {
      const xx = ((r + i * haba) / 2) * p.cos(p.radians(j * angle));
      const yy = ((r + i * haba) / 2) * p.sin(p.radians(j * angle));
      xCoords.push(x + xx);
      yCoords.push(y + yy);
    }
    sb.scribbleFilling(xCoords, yCoords, 9, 45 + i * 3);
  }
};
