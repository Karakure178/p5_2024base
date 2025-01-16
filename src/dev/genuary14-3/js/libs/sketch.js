import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
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
    p.background(255);
    p.push();

    sbgrid(p, Math.floor(p.random(3, 10)), sb);
    //sbgrid(p, 3, sb);
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
    }
  };
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
      p.noFill();
      p.stroke(0);
      p.strokeWeight(3);

      sb.scribbleLine(x, y, randX, y);
      sb.scribbleLine(x, y, x, randY);
      sb.scribbleLine(randX, y, randX, randY);
      sb.scribbleLine(x, randY, randX, randY);

      sb.scribbleLine(x, y, randX, randY);
      sb.scribbleLine(x, randY, randX, y);

      sb.scribbleLine(randX, randY, randX, y + nw);
      sb.scribbleLine(randX, randY, x + nw, randY);
      sb.scribbleLine(x + nw, randY, x + nw, y + nw);
      sb.scribbleLine(randX, y + nw, x + nw, y + nw);

      sb.scribbleLine(randX, randY, x + nw, y + nw);
      sb.scribbleLine(x + nw, randY, randX, y + nw);

      p.translate(nw / 2, nw / 2);
      sb.scribbleRect(x, y, nw, nw);

      p.pop();
    }
  }
};
